import React, { Component } from "react";
import RadarGraph from "./RadarGraph";
import * as PropTypes from "prop-types";

/**
 * Build a graph based on the national average scores range categorically and its values
 */
class AverageScoresRange extends Component{
    render(){
        return (
            <RadarGraph id={"myAverageScoresRange"} labels={this.props.label} data={
                [{
                    label : "Pre-Operation",
                    data: this.props.preOp
                },
                {
                    label: "One Week Post-Operation",
                    data: this.props.oneWeek
                },
                {
                    label: "Six Weeks Post-Operation",
                    data: this.props.sixWeeks
                }]
            } title={"Average Scores Range"} />
        )
    }
}

AverageScoresRange.propTypes = {
    label: PropTypes.array,
    preOp: PropTypes.array,
    oneWeek: PropTypes.array,
    sixWeeks: PropTypes.array
};

export default AverageScoresRange;
