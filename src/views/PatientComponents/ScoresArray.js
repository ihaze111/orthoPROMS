import * as PropTypes from 'prop-types';
import React from 'react';
import { Scores } from './Scores';

export function ScoresArray(props) {
  if (props.ehrId) {
    return <div><Scores ehrId={props.ehrId} /></div>;
  }
  return null;
}

ScoresArray.propTypes = {
  ehrId: PropTypes.string,
};
