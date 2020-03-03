import React from "react";
import HighCharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const BloodPressureGraph = props => {
    const systolic = props.systolic;
    const diastolic = props.diastolic;
    const time = props.time;
    const unit = props.units;

    const options = {
        chart: {
            type : "area"
        },
        title: {
            text : "Blood Pressure"
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
                text : "Blood Pressure / " + unit 
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
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: 0,
            y: -10,
            floating: true,
            borderWidth: 1,
            shadow: true
        },
        tooltip:{
            valueSuffix : unit
        },
        series : [
            {
                name: "Systolic",
                data: systolic
            },
            {
                name: "Diastolic",
                data: diastolic
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

export default BloodPressureGraph;