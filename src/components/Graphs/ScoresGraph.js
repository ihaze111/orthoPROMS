import React, { Component } from 'react'
import Chart from "chart.js";
let myScoresGraph;

Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
Chart.defaults.global.legend.display = true;

class ScoresGraph extends Component {
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
        const myScoresGraphRef = this.chartRef.current.getContext("2d");

        if (typeof myScoresGraph !== "undefined") myScoresGraph.destroy();

        myScoresGraph = new Chart(myScoresGraphRef, {
            type: "line",
            data: {
                labels: this.props.time,
                datasets: [
                    {
                        label: "Pain Score",
                        data: this.props.pain,
                        fill: false,
                        borderColor: "maroon"
                    },
                    {
                        label: "Limitations Score",
                        data: this.props.limit,
                        fill: false,
                        borderColor: "green"
                    },
                    {
                        label: "Walking Score",
                        data: this.props.walking,
                        fill: false,
                        borderColor: "blue"
                    },
                    {
                        label: "Walking Surfaces Score",
                        data: this.props.surface,
                        fill: false,
                        borderColor: "red"
                    },
                    {
                        label: "Total Score",
                        data: this.props.total,
                        fill: false,
                        borderColor: "purple"
                    }
                ]
            },
            options: {
                title : {
                    display: true,
                    text : "Progress Scores",
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
                    displayColors: true
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
                            drawBorder: true,
                            drawOnChartArea : false
                        },
                        scaleLabel: {
                            display: true,
                            labelString: "Scores"
                        }
                    }]
                }
            }
        });

    }

    render() {

        return (
            <div className="scores">
                <canvas
                    id="myScores"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}

export default ScoresGraph;