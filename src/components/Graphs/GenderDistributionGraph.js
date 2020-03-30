import React, { Component } from "react";
import PieChart from "./PieChart";
import * as PropTypes from "prop-types";
import ReactPerformance from 'react-performance';

/**
 * Build a pie chart based on the national average of patients' administrative gender and the number of patients in each gender
 */
export class GenderDistributionGraph extends Component{
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
    labels: PropTypes.array,
    title: PropTypes.string
};

export default ReactPerformance.measure({
    isCollapsed: false,
    getId: 'genderDistributionGraph',
    Component: GenderDistributionGraph,
})

