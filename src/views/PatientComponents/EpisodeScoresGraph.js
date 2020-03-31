import React from 'react';
import * as PropTypes from 'prop-types';
import { EpisodeScores } from './EpisodeScores';

export default function EpisodeScoresGraph(props) {
  if (props.ehrId) {
    return <div><EpisodeScores ehrId={props.ehrId} /></div>;
  }
  return null;
}

EpisodeScoresGraph.propTypes = {
  ehrId: PropTypes.string,
};
