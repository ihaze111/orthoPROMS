import React from 'react';
import * as PropTypes from 'prop-types';
import GeneralLineChart from './GeneralLineChart';
import ReactPerformance from 'react-performance';

/**
 * Build a graph based on arrays of standard pain scores and an array of times
 * @param props
 * @returns {*}
 * @constructor
 */
export function ScoresGraph(props) {
  return (
    <GeneralLineChart
      id="myScores"
      labels={props.time}
      data={[
        {
          label: 'Pain Score',
          data: props.pain,
        },
        {
          label: 'Limitations Score',
          data: props.limit,
        },
        {
          label: 'Walking Score',
          data: props.walking,
        },
        {
          label: 'Walking Surfaces Score',
          data: props.surface,
        },
        {
          label: 'Total Score',
          data: props.total,
        },
      ]}
      title="Progress Scores"
      xLabel="Date/Time"
      yLabel="Scores"
      linkList={props.compId.map((compId) => `/Composition?compId=${compId}`)}
    />
  );
}

ScoresGraph.propTypes = {
  pain: PropTypes.arrayOf(PropTypes.number),
  limit: PropTypes.arrayOf(PropTypes.number),
  walking: PropTypes.arrayOf(PropTypes.number),
  surface: PropTypes.arrayOf(PropTypes.number),
  total: PropTypes.arrayOf(PropTypes.number),
  time: PropTypes.arrayOf(PropTypes.string),
  compId: PropTypes.arrayOf(PropTypes.string),
};

export default ReactPerformance.measure({
    isCollapsed: false,
    getId: 'scoresGraph',
    Component: ScoresGraph,
})

