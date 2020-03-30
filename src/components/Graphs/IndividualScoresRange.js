import React from 'react';
import * as PropTypes from 'prop-types';
import RadarGraph from './RadarGraph';
import ReactPerformance from 'react-performance';

/**
 * Build a graph based on individual scores range categorically and its values
 * @param props
 * @returns {*}
 * @constructor
 */
export function IndividualScoresRange(props) {
  return (
    <RadarGraph
      id="myScoresRange"
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
      title="Scores Range"
    />
  );
}

IndividualScoresRange.propTypes = {
  label: PropTypes.arrayOf(PropTypes.string),
  preOp: PropTypes.arrayOf(PropTypes.number),
  oneWeek: PropTypes.arrayOf(PropTypes.number),
  sixWeeks: PropTypes.arrayOf(PropTypes.number),
};

export default ReactPerformance.measure({
    isCollapsed: false,
    getId: 'individualScoresRange',
    Component: IndividualScoresRange,
})

