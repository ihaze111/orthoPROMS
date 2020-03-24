import React,{ Component } from "react";
import GeneralLineChart from "./GeneralLineChart";

class HeartRateGraph extends Component{
    render(){
        return (
            <GeneralLineChart id={"myHeart"} labels={this.props.time} data={
                [
                    {
                        label : "Heart Rate",
                        data: this.props.heartRates
                    }
                ]
            }
            title={"Heart Rate"} xLabel={"Date/Time"} yLabel={"Heart Rate " + this.props.units}/>
        );
    }
}

export default HeartRateGraph;
