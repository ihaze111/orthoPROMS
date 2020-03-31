import React from 'react';
import * as PropTypes from 'prop-types';
import HeartRate from './HeartRate';

export default function HeartGraph(props) {
  if (props.ehrId) {
    return <div><HeartRate ehrId={props.ehrId} /></div>;
  }
  return null;
}

HeartGraph.propTypes = {
  ehrId: PropTypes.string,
};
