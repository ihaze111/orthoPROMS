import React from 'react';
import getAOFASRangeEpisodeScoresAgainstEpisodeAcrossAllEHRs
  from '../components/Queries/getAOFASRangeEpisodeScoresAgainstEpisodeAcrossAllEHRs';
import getAllEHRsInCDR from '../components/Queries/getAllEHRsInCDR';
import GenderDistributionGraph from '../components/Graphs/GenderDistributionGraph';
import AgeDistributionGraph from '../components/Graphs/AgeDistributionGraph';
import AverageScoresRange from '../components/Graphs/AverageScoresRange';
import { DownloadCSV } from '../components/DownloadCSV';

function occurrence(array) {
  const result = {};
  if (array instanceof Array) {
    array.forEach((x, i) => {
      if (!result[x]) {
        result[x] = [i];
      } else {
        result[x].push(i);
      }
    });
  }
  return result;
}

class RangeEpisodeScores extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: ['Pain', 'Activity limitations and support requirements', 'Walking',
        'Walking surfaces'],
    };
  }

  componentDidMount() {
    const promise = getAOFASRangeEpisodeScoresAgainstEpisodeAcrossAllEHRs();
    promise.then((e) => {
      this.setState({ rangeEpisodeScores: e });
    });
  }

  render() {
    if (!this.state.rangeEpisodeScores) return null;
    if (this.state.rangeEpisodeScores.length !== null) {
      return (
        <div>
          <>
            <AverageScoresRange
              preOp={this.state.rangeEpisodeScores.preOp}
              oneWeek={this.state.rangeEpisodeScores.oneWeek}
              sixWeeks={this.state.rangeEpisodeScores.sixWeeks}
              label={this.state.labels}
            />
            <br />
            <br />
            <DownloadCSV
              array={[this.state.labels, this.state.rangeEpisodeScores.preOp,
                this.state.rangeEpisodeScores.oneWeek,
                this.state.rangeEpisodeScores.sixWeeks]}
              fileName="AverageScores.csv"
            />
          </>
        </div>
      );
    }
    return <p>No reading can be found!</p>;
  }
}

export function RangeEpisodeScoresGraph() {
  return <div><RangeEpisodeScores /></div>;
}

class GenderDistribution extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      admin_genders: [],
      labels: ['Male', 'Female', 'Not Defined'],
    };
  }

  componentDidMount() {
    const promise = getAllEHRsInCDR();
    const genderList = [];
    promise.then((e) => {
      for (let i = 0; i < e.length; i += 1) {
        genderList[i] = e[i].gender;
      }
      this.setState({ genders: genderList });
    });
  }

  pushIntoArray(props) {
    this.state.admin_genders.push(props);
  }

  render() {
    if (!this.state.genders) {
      return null;
    }
    if (this.state.genders.length > 0) {
      const male = occurrence(this.state.genders).Male.length;
      const female = occurrence(this.state.genders).Female.length;
      const unknown = occurrence(this.state.genders)[''].length;
      this.pushIntoArray(male);
      this.pushIntoArray(female);
      this.pushIntoArray(unknown);
      return (
        <div>
          <>
            <GenderDistributionGraph
              title="Gender Distribution"
              genderDistribution={this.state.admin_genders}
              labels={this.state.labels}
            />
            <br />
            <br />
            <DownloadCSV
              array={[this.state.labels, this.state.admin_genders]}
              fileName="GenderDistribution.csv"
            />
          </>
        </div>
      );
    }
    return <p>No data obtained</p>;
  }
}

export function GenderDistributeGraph() {
  return <div><GenderDistribution /></div>;
}

class AgeDistribution extends React.Component {
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

  calculateAge(birthDate) {
    const result = Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10);
    return result;
  }

  pushIntoArray(props) {
    this.state.ageDistributed.push(props);
  }

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

  averageAge(array) {
    const sum = array.reduce((a, b) => a + b, 0);
    const average = sum / (array.length);
    return average;
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

export function AgeDistributeGraph() {
  return <div><AgeDistribution /></div>;
}
