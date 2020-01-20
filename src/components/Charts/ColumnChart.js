import AbstractChart from "./AbstractChart";
var Chart = require("chart.js");

class ColumnChart extends AbstractChart {

    constructor(props) {
        super(props);
        this.chartOptions = {
            type: "bar",
            data: {
                labels: this.props.labels,
                datasets: [
                    {
                        label: this.props.label,
                        data: this.props.data,
                        backgroundColor: [
                            "red",
                            "orange",
                            "yellow",
                            "green",
                            "blue",
                            "indigo",
                            "violet",
                        ]
                    },
                    {
                        label: "Number 2",
                        data: [8, 5, 6, 2],
                        backgroundColor: [
                            "red",
                            "orange",
                            "yellow",
                            "green",
                            "blue",
                            "indigo",
                            "violet",
                        ]
                    },
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,
                        }
                    }]
                }
            },
        };
    }
}

export default ColumnChart;
