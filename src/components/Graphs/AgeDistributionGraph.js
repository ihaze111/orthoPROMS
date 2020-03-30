import React, { Component } from "react";
import HorizontalBarGraph from "./HorizontalBarGraph";
import * as PropTypes from "prop-types";
import ReactPerformance from 'react-performance';

/**
 * Build a graph based on arrays of age ranges and the sum of each age range
 */
export class AgeDistributionGraph extends Component{
    render(){
        return (
            <HorizontalBarGraph id={"myAgeDistributionGraph"} labels={this.props.labels} data={
                [{
                    data: this.props.ageDistribute
                }]
            } title={this.props.title} />
        )
    }
}

AgeDistributionGraph.propTypes = {
    ageDistribute: PropTypes.array,
    labels: PropTypes.array,
    title: PropTypes.string
};

export default ReactPerformance.measure({
    isCollapsed: false,
    getId: 'ageDistributionGraph',
    Component: AgeDistributionGraph,
})

