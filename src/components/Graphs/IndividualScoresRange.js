import React, { Component } from "react";
import RadarGraph from "./RadarGraph";
import * as PropTypes from "prop-types";

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
    ageDistribute: PropTypes.array,
    labels: PropTypes.array
};

export default IndividualScoresRange;