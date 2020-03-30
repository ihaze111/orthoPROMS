import React from 'react';
import * as PropTypes from 'prop-types';
import GeneralLineChart from './GeneralLineChart';
import ReactPerformance from 'react-performance';

/**
 * Build a graph based on the an array of heartRates and an array of times
 * @param props
 * @returns {*}
 * @constructor
 */
export function HeartRateGraph(props) {
  return (
    <GeneralLineChart
      id="myHeart"
      labels={props.time}
      data={
        [
          {
            label: 'Heart Rate',
            data: props.heartRates,
          },
        ]
      }
      title="Heart Rate"
      xLabel="Date/Time"
      yLabel={`Heart Rate ${props.units}`}
      linkList={props.compId.map((compId) => `/Composition?compId=${compId}`)}
    />
  );
}

HeartRateGraph.propTypes = {
  heartRates: PropTypes.arrayOf(PropTypes.number),
  time: PropTypes.arrayOf(PropTypes.string),
  units: PropTypes.string,
  compId: PropTypes.arrayOf(PropTypes.string),
};

export default ReactPerformance.measure({
    isCollapsed: false,
    getId: 'heartRateGraph',
    Component: HeartRateGraph,
})
