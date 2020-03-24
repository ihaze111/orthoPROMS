import React, { Component } from "react";
import HorizontalBarGraph from "./HorizontalBarGraph";
import * as PropTypes from "prop-types";

class AgeDistributionGraph extends Component{
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
    labels: PropTypes.array
};

export default AgeDistributionGraph;