import React from 'react';
import * as PropTypes from 'prop-types';
import IndirectOximetry from './IndirectOximetry';

export default function OxygenConcentrationGraph(props) {
  if (props.ehrId) {
    return <div><IndirectOximetry ehrId={props.ehrId} /></div>;
  }
  return null;
}

OxygenConcentrationGraph.propTypes = {
  ehrId: PropTypes.string,
};
