import React, { Component } from 'react'
import Chart from "chart.js";
import * as PropTypes from "prop-types";
import GenderDistributionGraph from "./GenderDistributionGraph";

Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
Chart.defaults.global.legend.display = false;

const graphReferences = {};
const colours = ['rgba(255,0,0,0.5)', 'rgba(0,0,128,0.5)', 'rgba(0,255,0,0.5)', 'rgba(255,165,0,0.5)',
    'rgba(238,130,238,0.5)', 'rgba(0,255,255,0.5)'];

/**
 * A generalized Horizontal Bar Chart - graphs based on an array of categories and its values in array,
 * Takes: id string, labels array, data array, title string
 */
class HorizontalBarGraph extends Component {
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
            tooltips: {
                enabled: true,
                displayColors: true
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: true,
                        drawBorder: true,
                        drawOnChartArea: true
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false,
                        drawBorder: true,
                        drawOnChartArea: false
                    }
                }]
            }
        };
    }

    buildChart(ref) {
        const horizontalBarGraphRef = this.chartRef.current.getContext("2d");
        if (typeof graphReferences[ref] !== "undefined") graphReferences[ref].destroy();
        const data = {};
        data.labels = this.props.labels;
        data.datasets = this.props.data.map((data) => {
            return {
                data: data.data,
                fill: true,
                backgroundColor: colours
            }
        });
        const options = this.optionHolder();
        graphReferences[ref] = new Chart(horizontalBarGraphRef, {
            type: "horizontalBar",
            data,
            options
        });

    }

    render() {
        return (
            <div className="horizontalBar">
                <canvas
                    id={this.props.id}
                    ref={this.chartRef}
                />
            </div>
        )
    }
}

HorizontalBarGraph.propTypes = {
    id: PropTypes.string,
    data: PropTypes.array,
    labels: PropTypes.array,
    title: PropTypes.string
};

export default HorizontalBarGraph;
