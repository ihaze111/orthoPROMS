import React, { Component } from 'react';
import Chart from 'chart.js';
import * as PropTypes from 'prop-types';

Chart.defaults.global.defaultFontFamily = '\'PT Sans\', sans-serif';
Chart.defaults.global.legend.display = false;

const graphReferences = {};
const colours = ['rgba(255,0,0,0.5)', 'rgba(0,0,128,0.5)', 'rgba(0,255,0,0.5)'];

/**
 * A generalized Pie Chart - AbstractGraphs based on categories and its associated values with
 * tooltips showing its values in percentages, Takes: id string, labels array, data array, title
 * string
 */
class PieChart extends Component {
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
        fontColor: '#000000',
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          fontColor: '#000',
        },
      },
      tooltips: {
        enabled: true,
        displayColors: true,
        callbacks: {
          label(tooltipItem, data) {
            const dataset = data.datasets[tooltipItem.datasetIndex];
            // eslint-disable-next-line no-underscore-dangle
            const meta = dataset._meta[Object.keys(dataset._meta)[0]];
            const { total } = meta;
            const currentValue = dataset.data[tooltipItem.index];
            const percentage = parseFloat(((currentValue / total) * 100).toFixed(1));
            return `${currentValue} (${percentage}%)`;
          },
          title(tooltipItem, data) {
            return data.labels[tooltipItem[0].index];
          },
        },
      },
    };
  }

  buildChart(ref) {
    const pieChartRef = this.chartRef.current.getContext('2d');
    if (typeof graphReferences[ref] !== 'undefined') graphReferences[ref].destroy();
    const data = {};
    data.labels = this.props.labels;
    data.datasets = this.props.data.map((datasetData) => ({
      label: datasetData.label,
      data: datasetData.data,
      fill: true,
      backgroundColor: colours,
    }));
    const options = this.optionHolder();
    graphReferences[ref] = new Chart(pieChartRef, {
      type: 'pie',
      data,
      options,
    });
  }

  render() {
    return (
      <div className="pie">
        <canvas
          id={this.props.id}
          ref={this.chartRef}
        />
      </div>
    );
  }
}

PieChart.propTypes = {
  id: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  labels: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
};

export default PieChart;
