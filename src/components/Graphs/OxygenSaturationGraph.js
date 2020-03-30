import React, { Component } from 'react'
import GeneralLineChart from './GeneralLineChart';
import * as PropTypes from "prop-types";
import ReactPerformance from 'react-performance';

/**
 * Build a graph based on the an array of oxygen concentration percentages and an array of times
 */
export class OxygenSaturationGraph extends Component {
    render() {
        return (
            <GeneralLineChart id={"myOxygen"} labels={this.props.time} data={
                [{
                    label: "Oxygen Concentration",
                    data: this.props.percent
                }]
            }
                              title={"Oxygen Concentration (Indirect Oximetry)"} xLabel={"Date/Time"}
                              yLabel={"Oxygen Concentration / %"} linkList={this.props.compId.map((compId) => '/Composition?compId=' + compId)}/>
        );
    }
}

OxygenSaturationGraph.propTypes = {
    percent: PropTypes.array,
    time: PropTypes.array,
    units: PropTypes.string,
    compId: PropTypes.array
};

export default ReactPerformance.measure({
    isCollapsed: false,
    getId: 'oxygenSaturationGraph',
    Component: OxygenSaturationGraph,
})

// export default OxygenSaturationGraph;
