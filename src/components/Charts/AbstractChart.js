import React from "react";
import Chart from "chart.js";

class AbstractChart extends React.Component {

    componentDidMount() {
        const node = this.node;
        new Chart(node, this.chartOptions);
    }

    render() {
        return (
            <div>
                <canvas
                    style={{ width: 800, height: 300 }}
                    ref={node => (this.node = node)}
                />
            </div>
        );
    }
}

export default AbstractChart;
