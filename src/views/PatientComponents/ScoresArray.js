import { Scores } from './Scores';
import * as PropTypes from 'prop-types';
import React from 'react';

export function ScoresArray(props) {
  if (props.ehrId) {
    return <div><Scores ehrId={props.ehrId} /></div>;
  }
  return null;
}

ScoresArray.propTypes = {
  ehrId: PropTypes.string,
};
