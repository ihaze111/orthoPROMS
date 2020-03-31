import React from 'react';
import getAOFASRangeEpisodeScoresAgainstEpisodeAcrossAllEHRs
  from '../../components/Queries/getAOFASRangeEpisodeScoresAgainstEpisodeAcrossAllEHRs';
// TODO: look into this weird default export issue
// eslint-disable-next-line import/no-named-as-default
import AverageScoresRange from '../../components/Graphs/AverageScoresRange';
import { DownloadCSV } from '../../components/DownloadCSV';

export default class RangeEpisodeScores extends React.Component {
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
