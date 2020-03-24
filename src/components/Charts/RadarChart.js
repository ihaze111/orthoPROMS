import AbstractChart from "./AbstractChart";

class RadarChart extends AbstractChart {

    constructor(props) {
        super(props);
        this.datasets = this.props.datasets;
        const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]; //TODO: make this extendible
        this.datasets.forEach((value, index) => {
            value.fill = "rgba(0, 0, 0, 0.1)";
            value.backgroundColor = colors[index];
            value.borderColor = colors[index];
            // const backgroundColor = "blue";
            // value.backgroundColor = this.data.fill(backgroundColor);
        });
        this.chartOptions = {
            type: "radar",
            data: {
                labels: this.props.labels,
                datasets: this.datasets,
            },
            options: {
                scale: {
                    ticks: {
                        beginAtZero: true,
                    }
                },
            },
        };
    }
}

export default RadarChart;
