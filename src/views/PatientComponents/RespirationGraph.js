import React from 'react';
import * as PropTypes from 'prop-types';
import RespirationRate from './RespirationRate';

export default function RespirationGraph(props) {
  if (props.ehrId) {
    return <div><RespirationRate ehrId={props.ehrId} /></div>;
  }
  return null;
}

RespirationGraph.propTypes = {
  ehrId: PropTypes.string,
};
