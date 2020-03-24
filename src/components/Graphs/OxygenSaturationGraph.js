import React, { Component } from 'react'
import GeneralLineChart from './GeneralLineChart';

class OxygenSaturationGraph extends Component {
    render() {
        return (
            <GeneralLineChart id={"myOxygen"} labels={this.props.time} data={
                [{
                    label: "Oxygen Concentration",
                    data: this.props.percent
                }]
            }
                              title={"Oxygen Concentration (Indirect Oximetry)"} xLabel={"Date/Time"}
                              yLabel={"Oxygen Concentration / %"}/>
        );
    }
}

export default OxygenSaturationGraph;
