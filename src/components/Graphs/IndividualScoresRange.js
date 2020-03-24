import React, { Component } from "react";
import RadarGraph from "./RadarGraph";
import * as PropTypes from "prop-types";

/**
 * Build a graph based on individual scores range categorically and its values
 */
class IndividualScoresRange extends Component{
    render(){
        return (
            <RadarGraph id={"myScoresRange"} labels={this.props.label} data={
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
            } title={"Scores Range"} />
        )
    }
}

IndividualScoresRange.propTypes = {
    label: PropTypes.array,
    preOp: PropTypes.array,
    oneWeek: PropTypes.array,
    sixWeeks: PropTypes.array
};

export default IndividualScoresRange;
