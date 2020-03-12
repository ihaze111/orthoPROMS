import React, { Component } from 'react'
import Chart from "chart.js";

let bloodPressureGraph;
const colours = ['red', 'navy'];
const fillColours = ['rgb(255,0,0,0.4)', 'rgb(0,0,128,0.4)'];

Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";
Chart.defaults.global.legend.display = true;

class BloodPressureGraph extends Component{
    render(){
        return (
            <BloodPressureChart id={"myBlood"} labels={this.props.time} data={
                [{
                    label : "Systolic",
                    data: this.props.systolic
                },
                {
                    label: "Diastolic",
                    data: this.props.diastolic
                }]
            } title={"Blood Pressure"} xLabel={"Date/Time"} yLabel={"Blood Pressure" + this.props.units}/>
        )
    }
}

class BloodPressureChart extends Component {
    chartRef = React.createRef();

    componentDidMount() {
        // this.buildChart();
        this.start();
    }

    componentDidUpdate() {
        // this.buildChart();
        this.start();
    }

    start = () => {
        if (this.props.id === "myBlood"){
            this.buildChart();
        }
    }

    optionHolder = () =>{
        return {
            title: {
                display: true,
                text: this.props.title,
                fontSize: 22,
                fontFamily: 'Lucida',
                fontColor: '#000000'
            },
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    fontColor: '#000'
                }
            },
            tooltips: {
                enabled: true,
                displayColors: true
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false,
                        drawBorder: true,
                        drawOnChartArea: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: this.props.xLabel
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: true,
                        drawBorder: false,
                        drawOnChartArea: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: this.props.yLabel
                    },
                    ticks: {
                        padding: 15
                    }
                }]
            }
        };
    }

    buildChart = () => {
        const bloodPressureGraphRef = this.chartRef.current.getContext("2d");
        if (typeof bloodPressureGraph !== "undefined") bloodPressureGraph.destroy();
        const data = {};
        data.labels = this.props.labels; // this.props.time
        const colorIterator = colours.values();
        const fillIterator = fillColours.values();
        data.datasets = this.props.data.map((data) => {
            return {
                label: data.label,
                data: data.data,
                fill: 'start',
                borderColor: colorIterator.next().value,
                backgroundColor: fillIterator.next().value,
                pointRadius : 4,
                borderWidth : 2
            }
        });
        const options = this.optionHolder();
        bloodPressureGraph = new Chart(bloodPressureGraphRef, {
            type: "line",
            data,
            options
        });

    };

    render() {
        return (
            <div className="general">
                <canvas
                    id={this.props.id}
                    ref={this.chartRef}
                />
            </div>
        )
    }
}


// import React from "react";
// import HighCharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";

// const BloodPressureGraph = props => {
//     const systolic = props.systolic;
//     const diastolic = props.diastolic;
//     const time = props.time;
//     const unit = props.units;

//     const options = {
//         chart: {
//             type : "area"
//         },
//         title: {
//             text : "Blood Pressure"
//         },
//         xAxis: {
//             title : {
//                 text : "Time"
//             },
//             categories: time
//         },
//         yAxis: {
//             min: 0,
//             title : {
//                 text : "Blood Pressure / " + unit 
//             },
//             labels: {
//                 overflow: 'justify'
//             }
//         },
//         plotOptions: {
//             bar: {
//                 dataLabels: {
//                     enabled: true
//                 }
//             }
//         },
//         legend: {
//             layout: 'vertical',
//             align: 'right',
//             verticalAlign: 'top',
//             x: 0,
//             y: -10,
//             floating: true,
//             borderWidth: 1,
//             shadow: true
//         },
//         tooltip:{
//             valueSuffix : unit
//         },
//         series : [
//             {
//                 name: "Systolic",
//                 data: systolic
//             },
//             {
//                 name: "Diastolic",
//                 data: diastolic
//             }
//         ]
//     };

//     return(
//         <div>
//             <HighchartsReact
//                 highcharts={HighCharts}
//                 constructorType={"chart"}
//                 options={options}
//             />
//         </div>
//     );
// };

export default BloodPressureGraph;