import { IndirectOximetry } from './IndirectOximetry';
import * as PropTypes from 'prop-types';
import React from 'react';

export function OxygenConcentrationGraph(props) {
  if (props.ehrId) {
    return <div><IndirectOximetry ehrId={props.ehrId} /></div>;
  }
  return null;
}

OxygenConcentrationGraph.propTypes = {
  ehrId: PropTypes.string,
};
