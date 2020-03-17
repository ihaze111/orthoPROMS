import React, { Component } from 'react'
import GeneralLineChart from "./GeneralLineChart";

class ScoresGraph extends Component {
    render() {
        return (
            <GeneralLineChart id={"myScores"} labels={this.props.time} data={[
                {
                    label: "Pain Score",
                    data: this.props.pain,
                },
                {
                    label: "Limitations Score",
                    data: this.props.limit,
                },
                {
                    label: "Walking Score",
                    data: this.props.walking,
                },
                {
                    label: "Walking Surfaces Score",
                    data: this.props.surface,
                },
                {
                    label: "Total Score",
                    data: this.props.total,
                }
            ]} title={"Progress Scores"} xLabel={"Date/Time"} yLabel={"Scores"} />
        )
    }
}

export default ScoresGraph;
