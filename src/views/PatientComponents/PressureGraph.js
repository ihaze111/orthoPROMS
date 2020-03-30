import { BloodPressure } from './BloodPressure';
import * as PropTypes from 'prop-types';
import React from 'react';

export function PressureGraph(props) {
  if (props.ehrId) {
    return <div><BloodPressure ehrId={props.ehrId} /></div>;
  }
  return null;
}

PressureGraph.propTypes = {
  ehrId: PropTypes.string,
};
