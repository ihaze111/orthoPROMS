import React from 'react';
import * as PropTypes from 'prop-types';
import getRespirationRateAgainstTimeByEHRId
  from '../../components/Queries/getRespirationRateAgainstTimeByEHRId';
import { RespirationRateGraph } from '../../components/Graphs/RespirationRateGraph';

export class RespirationRate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      compIdArray: [],
      respiration_magnitude: [],
      time: [],
    };
  }

  componentDidMount() {
    const promise = getRespirationRateAgainstTimeByEHRId(this.props.ehrId);
    promise.then((e) => {
      e.forEach((el) => {
        this.pushIntoArrays(el);
      });
      this.setState({ respirationRate: e });
    });
  }

  pushIntoArrays(props) {
    this.state.compIdArray.push(props.comp_id);
    this.state.respiration_magnitude.push(props.respiration_rate.magnitude);
    this.state.time.push(props.time.replace(/T/, ' ')
      .substring(0, props.time.indexOf('.')) || props.time.replace(/T/, ' ')
      .substring(0, props.time.indexOf('Z')));
  }


  render() {
    if (!this.state.respirationRate) return null;
    // eslint-disable-next-line array-callback-return
    if (this.state.respirationRate.length > 0) {
      return (
        <RespirationRateGraph
          compId={this.state.compIdArray}
          magnitude={this.state.respiration_magnitude}
          time={this.state.time}
          units={this.state.respirationRate[0].respiration_rate.units}
        />
      );
    }
    return <p>No Respiration Rate were recorded</p>;
  }
}

RespirationRate.propTypes = {
  ehrId: PropTypes.string,
};
