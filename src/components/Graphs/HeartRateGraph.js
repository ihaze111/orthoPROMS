import React, { Component } from "react";
import GeneralLineChart from "./GeneralLineChart";
import * as PropTypes from "prop-types";

/**
 * Build a graph based on the an array of heartRates and an array of times
 */
class HeartRateGraph extends Component {
    
    render() {
        console.log(this.props);
        return (
            <GeneralLineChart id={"myHeart"} labels={this.props.time} data={
                [
                    {
                        label: "Heart Rate",
                        data: this.props.heartRates
                    }
                ]
            }
            title={"Heart Rate"} xLabel={"Date/Time"} yLabel={"Heart Rate " + this.props.units}/>
        );
    }
}

HeartRateGraph.propTypes = {
    heartRates: PropTypes.array,
    time: PropTypes.array,
    units: PropTypes.string
};

export default HeartRateGraph;
