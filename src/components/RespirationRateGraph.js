import React from "react";
import HighCharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const RespirationRateGraph = props => {
    const respirationRateMagnitude = props.magnitude;
    const time = props.time;
    const unit = props.units;

    const options = {
        chart: {
            type : "line"
        },
        title: {
            text : "Respiration Rate"
        },
        xAxis: {
            title : {
                text : "Time"
            },
            categories: time
        },
        yAxis: {
            title : {
                text : "Rate" + unit
            }
        },
        tooltip:{
            valueSuffix : unit
        },
        series : [
            {
                name: "Respiration Rate",
                data: respirationRateMagnitude
            }
        ]
    };

    return(
        <div>
            <HighchartsReact
                highcharts={HighCharts}
                constructorType={"chart"}
                options={options}
            />
        </div>
    );
};

export default RespirationRateGraph;