import React from 'react';
import * as PropTypes from 'prop-types';
import getAOFASScoresAgainstTimeByEHRId
  from '../../cdr/getAOFASScoresAgainstTimeByEHRId';
import { ScoresGraph } from '../../components/Graphs/ScoresGraph';
import { DownloadCSV } from '../../components/DownloadCSV';

export default class Scores extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      compIdArray: [],
      painArray: [],
      limitationsArray: [],
      walkingArray: [],
      walking_surfacesArray: [],
      totalArray: [],
      regTimeArray: [],
      label: ['Pain', 'Activity limitations and support requirements', 'Walking',
        'Walking surfaces',
        'Total score'],
      isLoading: true,
    };
  }

  componentWillMount() {
    const promise = getAOFASScoresAgainstTimeByEHRId(this.props.ehrId);
    promise.then((e) => {
      e.forEach((el) => {
        this.pushArray(el);
      });
      this.setState({ isLoading: false });
    });
  }

  pushArray(props) {
    this.state.compIdArray.push(props.comp_id);
    this.state.painArray.push(props.pain);
    this.state.limitationsArray.push(props.limitations);
    this.state.walkingArray.push(props.walking);
    this.state.walking_surfacesArray.push(props.walking_surfaces);
    this.state.totalArray.push(props.total);
    this.state.regTimeArray.push(props.reg_time.replace(/T/, ' ')
      .substring(0, props.reg_time.indexOf('.')) || props.reg_time.replace(/T/, ' ')
      .substring(0, props.reg_time.indexOf('Z')));
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }
    if (this.state.painArray.length > 0) {
      return (
        <div>
          <>
            <ScoresGraph
              compId={this.state.compIdArray}
              pain={this.state.painArray}
              limit={this.state.limitationsArray}
              walking={this.state.walkingArray}
              surface={this.state.walking_surfacesArray}
              total={this.state.totalArray}
              time={this.state.regTimeArray}
            />
            <br />
            <br />
            <DownloadCSV
              array={[this.state.label, this.state.painArray, this.state.limitationsArray,
                this.state.walkingArray, this.state.walking_surfacesArray, this.state.totalArray]}
              fileName="Scores.csv"
            />
          </>
        </div>
      );
    }
    return <p>No scores were found</p>;
  }
}

Scores.propTypes = {
  ehrId: PropTypes.string,
};
