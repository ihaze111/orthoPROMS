import React from 'react';
import getAllEHRsInCDR from '../../../cdr/getAllEHRsInCDR';
// TODO: look into this weird default export issue
// eslint-disable-next-line import/no-named-as-default
import AgeDistributionGraph from './AgeDistributionGraph';
import { DownloadCSV } from '../../Modules/DownloadCSV';

export default class AgeDistributionGraphContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ageDistributed: [],
      labels: ['Under 18', '18-35', '36-53', '54-71', '72-90',
        'Over 90'],
    };
  }

  componentDidMount() {
    const promise = getAllEHRsInCDR();
    const ageList = [];
    promise.then((e) => {
      for (let i = 0; i < e.length; i += 1) {
        if (e[i].birthYear !== '') {
          ageList.push(this.calculateAge(e[i].birthYear));
        }
      }
      this.setState({ ages: ageList });
    });
  }

  calculateAge = (birthDate) => {
    const result = Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10);
    return result;
  };

  averageAge = (array) => {
    const sum = array.reduce((a, b) => a + b, 0);
    const average = sum / (array.length);
    return average;
  };

  pushIntoCategories(array) {
    const minor = [];
    const youngAdults = [];
    const adults = [];
    const olderAdults = [];
    const seniors = [];
    const legends = [];
    for (let i = 0; i < array.length; i += 1) {
      if ((array[i] > -1) && (array[i] <= 17)) {
        minor.push(array[i]);
      } else if ((array[i] > 17) && (array[i] <= 35)) {
        youngAdults.push(array[i]);
      } else if ((array[i] > 35) && (array[i] <= 53)) {
        adults.push(array[i]);
      } else if ((array[i] > 53) && (array[i] <= 71)) {
        olderAdults.push(array[i]);
      } else if ((array[i] > 71) && (array[i] <= 90)) {
        seniors.push(array[i]);
      } else if (array[i] > 90) {
        legends.push(array[i]);
      }
    }
    const minorCount = minor.length;
    const youngAdultsCount = youngAdults.length;
    const adultsCount = adults.length;
    const olderAdultsCount = olderAdults.length;
    const seniorsCount = seniors.length;
    const legendsCount = legends.length;
    this.pushIntoArray(minorCount);
    this.pushIntoArray(youngAdultsCount);
    this.pushIntoArray(adultsCount);
    this.pushIntoArray(olderAdultsCount);
    this.pushIntoArray(seniorsCount);
    this.pushIntoArray(legendsCount);
    return this.state.ageDistributed;
  }

  pushIntoArray(props) {
    this.state.ageDistributed.push(props);
  }

  render() {
    if (!this.state.ages) {
      return null;
    }
    if (this.state.ages.length > 0) {
      const distribution = this.pushIntoCategories(this.state.ages);
      return (
        <>
          <div>
            <p style={{ fontSize: 20 }}>
              <strong>
                Average Age :
                {Math.round(this.averageAge(this.state.ages))}
                {' '}
                Years Old
              </strong>
            </p>
          </div>
          <AgeDistributionGraph
            title="Age Distribution"
            ageDistribute={distribution}
            labels={this.state.labels}
          />
          <br />
          <br />
          <DownloadCSV
            array={[this.state.labels, distribution]}
            fileName="AgeDistribution.csv"
          />
        </>
      );
    }
    return <p>No data obtained</p>;
  }
}
