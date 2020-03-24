import React, { Component } from 'react'
import Chart from "chart.js";

Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
Chart.defaults.global.legend.display = false;

const graphReferences = {};
const colours = ['rgba(255,0,0,0.5)', 'rgba(0,0,128,0.5)', 'rgba(0,255,0,0.5)'];

/**
 * A generalized Pie Chart - graphs based on categories and its associated values with tooltips showing its values in
 * percentages, Takes: id string, labels array, data array, title string
 */
class PieChart extends Component {
    chartRef = React.createRef();

    componentDidMount() {
        this.buildChart(this.props.id);
    }

    componentDidUpdate() {
        this.buildChart(this.props.id);
    }

    optionHolder = () => {
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
                displayColors: true,
                callbacks: {
                    label: function (tooltipItem, data) {
                        var dataset = data.datasets[tooltipItem.datasetIndex];
                        var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                        var total = meta.total;
                        var currentValue = dataset.data[tooltipItem.index];
                        var percentage = parseFloat((currentValue / total * 100).toFixed(1));
                        return currentValue + ' (' + percentage + '%)';
                    },
                    title: function (tooltipItem, data) {
                        return data.labels[tooltipItem[0].index];
                    }
                }
            }
        };
    }

    buildChart = (ref) => {
        const pieChartRef = this.chartRef.current.getContext("2d");
        if (typeof graphReferences[ref] !== "undefined") graphReferences[ref].destroy();
        const data = {};
        data.labels = this.props.labels;
        data.datasets = this.props.data.map((data) => {
            return {
                label: data.label,
                data: data.data,
                fill: true,
                backgroundColor: colours
            }
        });
        const options = this.optionHolder();
        graphReferences[ref] = new Chart(pieChartRef, {
            type: "pie",
            data,
            options
        });

    };

    render() {
        return (
            <div className="pie">
                <canvas
                    id={this.props.id}
                    ref={this.chartRef}
                />
            </div>
        )
    }
}

export default PieChart;
