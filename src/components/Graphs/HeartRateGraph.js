import React, { Component } from "react";
import GeneralLineChart from "./GeneralLineChart";
import * as PropTypes from "prop-types";
import ReactPerformance from 'react-performance';

/**
 * Build a graph based on the an array of heartRates and an array of times
 */
export class HeartRateGraph extends Component {
    render() {
        return (
            <GeneralLineChart id={"myHeart"} labels={this.props.time} data={
                [
                    {
                        label: "Heart Rate",
                        data: this.props.heartRates
                    }
                ]
            }
                              title={"Heart Rate"} xLabel={"Date/Time"} yLabel={"Heart Rate " + this.props.units}
                              linkList={this.props.compId.map((compId) => '/Composition?compId=' + compId)}/>
        );
    }
}

HeartRateGraph.propTypes = {
    heartRates: PropTypes.array,
    time: PropTypes.array,
    units: PropTypes.string,
    compId: PropTypes.array
};

export default ReactPerformance.measure({
    isCollapsed: false,
    getId: 'heartRateGraph',
    Component: HeartRateGraph,
})
