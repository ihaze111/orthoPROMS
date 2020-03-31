import React from 'react';
import * as PropTypes from 'prop-types';
import ReactPerformance from 'react-performance';
import GeneralLineChart from '../AbstractGraphs/GeneralLineChart';

/**
 * Build a graph based on the an array of oxygen concentration percentages and an array of times
 * @param props
 * @returns {*}
 * @constructor
 */
export function OxygenSaturationGraph(props) {
  return (
    <GeneralLineChart
      id="myOxygen"
      labels={props.time}
      data={
        [{
          label: 'Oxygen Concentration',
          data: props.percent,
        }]
      }
      title="Oxygen Concentration (Indirect Oximetry)"
      xLabel="Date/Time"
      yLabel="Oxygen Concentration / %"
      linkList={props.compId.map((compId) => `/Composition?compId=${compId}`)}
    />
  );
}

OxygenSaturationGraph.propTypes = {
  percent: PropTypes.arrayOf(PropTypes.number),
  time: PropTypes.arrayOf(PropTypes.string),
  compId: PropTypes.arrayOf(PropTypes.string),
};

export default ReactPerformance.measure({
  isCollapsed: false,
  getId: 'oxygenSaturationGraph',
  Component: OxygenSaturationGraph,
});

// export default OxygenSaturationGraph;
