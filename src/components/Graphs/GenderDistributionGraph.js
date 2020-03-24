import React, { Component } from "react";
import PieChart from "./PieChart";
import * as PropTypes from "prop-types";

/**
 * Build a pie chart based on the national average of patients' administrative gender and the number of patients in each gender
 */


class GenderDistributionGraph extends Component{
    render(){
        return (
            <PieChart id={"myGenderDistribution"} labels={this.props.labels} data={
                [{
                    label : ["Male", "Female", "Not Defined"],
                    data: this.props.genderDistribution
                }]
            } title={this.props.title} />
        )
    }
}

GenderDistributionGraph.propTypes = {
    genderDistribution: PropTypes.array,
    labels: PropTypes.array
};

export default GenderDistributionGraph;