import React, { Component } from 'react'
import Chart from "chart.js";
import * as PropTypes from "prop-types";

const graphReferences = {};
const colours = ['red', 'green', 'blue', 'orange', 'purple'];

Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";
Chart.defaults.global.legend.display = true;

/**
 * A generalized line chart - graphs based on categorical data at base (or for example time values), equidistantly
 * spaced, and continuous scale on y-axis.
 * Takes: id string, labels array, data array, title string, xLabel string, yLabel string
 */
class GeneralLineChart extends Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }

    componentDidMount() {
        this.buildChart(this.props.id);
    }

    componentDidUpdate() {
        this.buildChart(this.props.id);
    }

    optionHolder() {
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

    buildChart(ref) {
        const myScoresGraphRef = this.chartRef.current.getContext("2d");
        if (typeof graphReferences[ref] !== "undefined") graphReferences[ref].destroy();
        const data = {};
        data.labels = this.props.labels; // this.props.time
        const colorIterator = colours.values();
        data.datasets = this.props.data.map((data) => {
            return {
                label: data.label,
                data: data.data,
                fill: false,
                borderColor: colorIterator.next().value,
                pointRadius: 4,
                borderWidth: 2
            }
        });
        const options = this.optionHolder();
        graphReferences[ref] = new Chart(myScoresGraphRef, {
            type: "line",
            data,
            options
        });
    }

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

GeneralLineChart.propTypes = {
    id: PropTypes.string,
    labels: PropTypes.array,
    data: PropTypes.array,
    title: PropTypes.string,
    xLabel: PropTypes.string,
    yLabel: PropTypes.string
};

export default GeneralLineChart;
