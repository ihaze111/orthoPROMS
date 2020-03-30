import React from 'react';
import * as PropTypes from 'prop-types';
import PieChart from './PieChart';

/**
 * Build a pie chart based on the national average of patients' administrative gender and the
 * number of patients in each gender
 * @param props
 * @returns {*}
 * @constructor
 */
function GenderDistributionGraph(props) {
  return (
    <PieChart
      id="myGenderDistribution"
      labels={props.labels}
      data={
        [{
          label: ['Male', 'Female', 'Not Defined'],
          data: props.genderDistribution,
        }]
      }
      title={props.title}
    />
  );
}

GenderDistributionGraph.propTypes = {
  genderDistribution: PropTypes.arrayOf(PropTypes.number),
  labels: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
};

export default GenderDistributionGraph;
