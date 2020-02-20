import React from "react";
import HighCharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const OxygenSaturationGraph = props => {
    const percentage = props.percent;
    const time = props.time;

    const options = {
        chart: {
            type : "line"
        },
        title: {
            text : "Oxygen Concentration (Indirect Oximetry)"
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
                text : "Oxygen Concentration / %"
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
            valueSuffix : "%"
        },
        series : [
            {
                name: "Oxygen Concentration",
                data: percentage
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

export default OxygenSaturationGraph;