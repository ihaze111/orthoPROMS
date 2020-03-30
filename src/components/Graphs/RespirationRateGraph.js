import React from 'react';
import * as PropTypes from 'prop-types';
import GeneralLineChart from './GeneralLineChart';
import ReactPerformance from 'react-performance';

/**
 * Build a graph based on the an array of respirationRates and an array of times
 * @param props
 * @returns {*}
 * @constructor
 */
export function RespirationRateGraph(props) {
  return (
    <GeneralLineChart
      id="myRespirationRate"
      labels={props.time}
      data={
        [
          {
            label: 'Respiration Rate',
            data: props.magnitude,
          },
        ]
      }
      title="Respiration Rate"
      xLabel="Date/Time"
      yLabel={`Respiration Rate ${props.units}`}
      linkList={props.compId.map((compId) => `/Composition?compId=${compId}`)}
    />
  );
}

RespirationRateGraph.propTypes = {
  magnitude: PropTypes.arrayOf(PropTypes.number),
  time: PropTypes.arrayOf(PropTypes.string),
  units: PropTypes.string,
  compId: PropTypes.arrayOf(PropTypes.string),
};

export default ReactPerformance.measure({
    isCollapsed: false,
    getId: 'respirationRateGraph',
    Component: RespirationRateGraph,
})
