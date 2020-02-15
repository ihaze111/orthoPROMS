import React from "react";
import HighCharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const HeartRateGraph = props => {
    const heartRate = props.heartRates;
    const time = props.time;
    const unit = props.units

    const options = {
        chart: {
            type : "area"
        },
        title: {
            text : "Heart Rate"
        },
        xAxis: {
            title : {
                text : "Time"
            },
            categories: time
        },
        yAxis: {
            min: 0,
            title : {
                text : "Heart Rate " + unit
            },
            labels: {
                overflow: 'justify'
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        tooltip:{
            valueSuffix : unit
        },
        series : [
            {
                name: "Heart Rate",
                data: heartRate
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

export default HeartRateGraph;