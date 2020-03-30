import React from 'react';
import * as PropTypes from 'prop-types';
import RadarGraph from './RadarGraph';
import ReactPerformance from 'react-performance';

/**
 * Build a graph based on the national average scores range categorically and its values
 * @param props
 * @returns {*}
 * @constructor
 */
export function AverageScoresRange(props) {
  return (
    <RadarGraph
      id="myAverageScoresRange"
      labels={props.label}
      data={
        [
          {
            label: 'Pre-Operation',
            data: props.preOp,
          },
          {
            label: 'One Week Post-Operation',
            data: props.oneWeek,
          },
          {
            label: 'Six Weeks Post-Operation',
            data: props.sixWeeks,
          },
        ]
      }
      title="Average Scores Range"
    />
  );
}

AverageScoresRange.propTypes = {
  label: PropTypes.arrayOf(PropTypes.string),
  preOp: PropTypes.arrayOf(PropTypes.number),
  oneWeek: PropTypes.arrayOf(PropTypes.number),
  sixWeeks: PropTypes.arrayOf(PropTypes.number),
};

export default ReactPerformance.measure({
    isCollapsed: false,
    getId: 'averageScoresRange',
    Component: AverageScoresRange,
})
