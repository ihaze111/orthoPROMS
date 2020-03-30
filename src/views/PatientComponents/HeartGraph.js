import { HeartRate } from './HeartRate';
import * as PropTypes from 'prop-types';
import React from 'react';

export function HeartGraph(props) {
  if (props.ehrId) {
    return <div><HeartRate ehrId={props.ehrId} /></div>;
  }
  return null;
}

HeartGraph.propTypes = {
  ehrId: PropTypes.string,
};
