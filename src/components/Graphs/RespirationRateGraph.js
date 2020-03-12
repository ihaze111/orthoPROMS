// import React from "react";
// import HighCharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";

// const RespirationRateGraph = props => {
//     const respirationRateMagnitude = props.magnitude;
//     const time = props.time;
//     const unit = props.units;

//     const options = {
//         chart: {
//             type : "line"
//         },
//         title: {
//             text : "Respiration Rate"
//         },
//         xAxis: {
//             title : {
//                 text : "Time"
//             },
//             categories: time
//         },
//         yAxis: {
//             title : {
//                 text : "Rate" + unit
//             }
//         },
//         tooltip:{
//             valueSuffix : unit
//         },
//         series : [
//             {
//                 name: "Respiration Rate",
//                 data: respirationRateMagnitude
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

import React, { Component } from 'react'
import Chart from "chart.js";
let myRespirationRateGraph;

Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
Chart.defaults.global.legend.display = true;

class RespirationRateGraph extends Component {
    chartRef = React.createRef();

    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.buildChart();
    }

    componentDidUpdate() {
        this.buildChart();
    }

    buildChart = () => {
        const myRespirationRateGraphRef = this.chartRef.current.getContext("2d");

        if (typeof myRespirationRateGraph !== "undefined") myRespirationRateGraph.destroy();
        const unit = this.props.units;
        myRespirationRateGraph= new Chart(myRespirationRateGraphRef, {
            type: "line",
            data: {
                labels: this.props.time,
                datasets: [
                    {
                        label: "Respiration Rate",
                        data: this.props.magnitude,
                        fill: false,
                        borderColor: "blue",
                        pointRadius : 4,
                        borderWidth : 2
                    }
                ]
            },
            options: {
                title : {
                    display: true,
                    text : "Respiration Rate",
                    fontSize: 22,
                    fontFamily: 'Lucida',
                    fontColor: '#000'
                    
                },
                legend: {
                    display:true,
                    position: 'bottom',
                    labels: {
                        fontColor: '#000'
                    }
                },
                tooltips: {
                    enabled: true,
                    displayColors: true,
                    mode: 'single',
                    callbacks: {
                        label: function (tooltipItems, data){
                            return tooltipItems.yLabel + unit;
                        }
                    }
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display : true,
                            drawBorder: true,
                            drawOnChartArea : false
                        },
                        scaleLabel: {
                            display: true,
                            labelString: "Date/Time"
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display : true,
                            drawBorder: false,
                            drawOnChartArea : true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: "Rate " + unit
                        },
                        ticks: {
                            padding: 15
                        }
                    }]
                }
            }
        });

    }

    render() {

        return (
            <div className="respiration">
                <canvas
                    id="myRespirationRate"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}

export default RespirationRateGraph;