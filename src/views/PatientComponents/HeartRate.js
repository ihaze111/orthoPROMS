import React from 'react';
import * as PropTypes from 'prop-types';
import getHeartRatesAgainstTimeByEHRId
  from '../../components/Queries/getHeartRatesAgainstTimeByEHRId';
import { HeartRateGraph } from '../../components/Graphs/HeartRateGraph';

export default class HeartRate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      compIdArray: [],
      heartRateReadings: [],
      time: [],
    };
  }

  componentDidMount() {
    const promise = getHeartRatesAgainstTimeByEHRId(this.props.ehrId);
    promise.then((e) => {
      e.forEach((el) => {
        this.pushIntoArrays(el);
      });
      this.setState({ heartRate: e });
    });
  }

  pushIntoArrays(props) {
    this.state.compIdArray.push(props.comp_id);
    this.state.heartRateReadings.push(props.heart_rate.magnitude);
    this.state.time.push(props.time.replace(/T/, ' ')
      .substring(0, props.time.indexOf('.')) || props.time.replace(/T/, ' ')
      .substring(0, props.time.indexOf('Z')));
  }


  render() {
    if (!this.state.heartRate) return null;
    if (this.state.heartRate.length > 0) {
      return (
        <HeartRateGraph
          compId={this.state.compIdArray}
          heartRates={this.state.heartRateReadings}
          time={this.state.time}
          units={this.state.heartRate[0].heart_rate.units}
        />
      );
    }
    return <p>No heart rates were recorded</p>;
  }
}

HeartRate.propTypes = {
  ehrId: PropTypes.string,
};
