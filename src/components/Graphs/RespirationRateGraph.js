import React, { Component } from "react";
import GeneralLineChart from "./GeneralLineChart";
import * as PropTypes from "prop-types";

/**
 * Build a graph based on the an array of respirationRates and an array of times
 */
class RespirationRateGraph extends Component {
    render() {
        return (
            <GeneralLineChart id={"myRespirationRate"} labels={this.props.time} data={
                [
                    {
                        label: "Respiration Rate",
                        data: this.props.magnitude
                    }
                ]
            }
                              title={"Respiration Rate"} xLabel={"Date/Time"}
                              yLabel={"Respiration Rate " + this.props.units}
                              linkList={this.props.compId.map((compId) => '/Composition?compId=' + compId)}/>
        );
    }
}

RespirationRateGraph.propTypes = {
    magnitude: PropTypes.array,
    time: PropTypes.array,
    units: PropTypes.string,
    compId: PropTypes.array
};

export default RespirationRateGraph;
