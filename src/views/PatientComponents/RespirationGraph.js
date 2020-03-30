import { RespirationRate } from './RespirationRate';
import * as PropTypes from 'prop-types';
import React from 'react';

export function RespirationGraph(props) {
  if (props.ehrId) {
    return <div><RespirationRate ehrId={props.ehrId} /></div>;
  }
  return null;
}

RespirationGraph.propTypes = {
  ehrId: PropTypes.string,
};
