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