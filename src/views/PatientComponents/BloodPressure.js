import React from 'react';
import * as PropTypes from 'prop-types';
import getBloodPressureByEHRId from '../../cdr/getBloodPressureByEHRId';
import { BloodPressureGraph } from '../../components/Graphs/BloodPressureGraph';

export default class BloodPressure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      compIdArray: [],
      systolicRate: [],
      diastolicRate: [],
      time: [],
    };
  }

  componentDidMount() {
    const promise = getBloodPressureByEHRId(this.props.ehrId);
    promise.then((e) => {
      e.forEach((el) => {
        this.pushIntoArrays(el);
      });
      this.setState({ bloodPressure: e });
    });
  }

  pushIntoArrays(props) {
    this.state.compIdArray.push(props.comp_id);
    this.state.systolicRate.push(props.systolic.magnitude);
    this.state.diastolicRate.push(props.diastolic.magnitude);
    this.state.time.push(props.time.replace(/T/, ' ')
      .substring(0, props.time.indexOf('.')) || props.time.replace(/T/, ' ')
      .substring(0, props.time.indexOf('Z')));
  }


  render() {
    if (!this.state.bloodPressure) return null;
    if (this.state.bloodPressure.length > 0) {
      return (
        <BloodPressureGraph
          compId={this.state.compIdArray}
          systolic={this.state.systolicRate}
          diastolic={this.state.diastolicRate}
          time={this.state.time}
          units={this.state.bloodPressure[0].systolic.units}
        />
      );
    }
    return <p>No Blood Pressure were recorded</p>;
  }
}

BloodPressure.propTypes = {
  ehrId: PropTypes.string,
};
