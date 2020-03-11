import React, { Component } from 'react'
import Chart from "chart.js";

let generalLineChartGraph;
let anothaOneMore;
const colours = ['maroon', 'green', 'blue', 'red', 'purple'];

Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";
Chart.defaults.global.legend.display = true;

class GeneralLineChart extends Component {
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
        if (this.props.id === "myScores"){
            this.buildChart1();
        }
        if (this.props.id === "myOxygen"){
            this.buildChart2();
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
                        display: true,
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
                        drawBorder: true,
                        drawOnChartArea: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: this.props.yLabel
                    }
                }]
            }
        };
    }

    buildChart1 = () => {
        const myScoresGraphRef = this.chartRef.current.getContext("2d");
        if (typeof generalLineChartGraph !== "undefined") generalLineChartGraph.destroy();
        const data = {};
        data.labels = this.props.labels; // this.props.time
        const colorIterator = colours.values();
        data.datasets = this.props.data.map((data) => {
            return {
                label: data.label,
                data: data.data,
                fill: false,
                borderColor: colorIterator.next().value
            }
        });
        const options = this.optionHolder();
        generalLineChartGraph = new Chart(myScoresGraphRef, {
            type: "line",
            data,
            options
        });

    };

    buildChart2 = () => {
        const anothaOne = this.chartRef.current.getContext("2d");
        if (typeof anothaOneMore !== "undefined") anothaOneMore.destroy();
        const data = {};
        data.labels = this.props.labels; // this.props.time
        const colorIterator = colours.values();
        data.datasets = this.props.data.map((data) => {
            return {
                label: data.label,
                data: data.data,
                fill: false,
                borderColor: colorIterator.next().value
            }
        });
        const options = this.optionHolder();
        anothaOneMore = new Chart(anothaOne, {
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

export default GeneralLineChart;