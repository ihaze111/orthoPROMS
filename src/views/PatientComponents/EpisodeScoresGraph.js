import { EpisodeScores } from './EpisodeScores';
import * as PropTypes from 'prop-types';
import React from 'react';

export function EpisodeScoresGraph(props) {
  if (props.ehrId) {
    return <div><EpisodeScores ehrId={props.ehrId} /></div>;
  }
  return null;
}

EpisodeScoresGraph.propTypes = {
  ehrId: PropTypes.string,
};
