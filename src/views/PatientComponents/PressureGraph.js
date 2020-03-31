import React from 'react';
import * as PropTypes from 'prop-types';
import BloodPressure from './BloodPressure';

export default function PressureGraph(props) {
  if (props.ehrId) {
    return <div><BloodPressure ehrId={props.ehrId} /></div>;
  }
  return null;
}

PressureGraph.propTypes = {
  ehrId: PropTypes.string,
};
