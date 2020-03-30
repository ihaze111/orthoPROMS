import React from 'react';
import * as PropTypes from 'prop-types';
import HorizontalBarGraph from './HorizontalBarGraph';
import ReactPerformance from 'react-performance';

/**
 * Build a graph based on arrays of age ranges and the sum of each age range
 * @param props
 * @returns {*}
 * @constructor
 */
export function AgeDistributionGraph(props) {
  return (
    <HorizontalBarGraph
      id="myAgeDistributionGraph"
      labels={props.labels}
      data={
        [{
          data: props.ageDistribute,
        }]
      }
      title={props.title}
    />
  );
}

AgeDistributionGraph.propTypes = {
  ageDistribute: PropTypes.arrayOf(PropTypes.number),
  labels: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
};

export default ReactPerformance.measure({
    isCollapsed: false,
    getId: 'ageDistributionGraph',
    Component: AgeDistributionGraph,
})

