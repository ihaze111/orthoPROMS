import React from 'react';
import * as PropTypes from 'prop-types';
import HorizontalBarGraph from './HorizontalBarGraph';

/**
 * Build a graph based on arrays of age ranges and the sum of each age range
 * @param props
 * @returns {*}
 * @constructor
 */
function AgeDistributionGraph(props) {
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

export default AgeDistributionGraph;
