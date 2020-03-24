import React, { Component } from "react";
import PieChart from "./PieChart";
import * as PropTypes from "prop-types";

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