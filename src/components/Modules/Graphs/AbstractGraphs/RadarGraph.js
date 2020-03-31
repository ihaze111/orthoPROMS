import React, { Component } from 'react';
import Chart from 'chart.js';
import * as PropTypes from 'prop-types';

const graphReferences = {};
const colours = ['rgb(255,99,132)', 'rgb(54,162,235)', 'green'];
const pointColours = colours;
const fillColours = ['rgb(255,99,132,0.3)', 'rgb(54,162,235,0.3)', 'rgb(0,128,0,0.3)'];

Chart.defaults.global.defaultFontFamily = '\'PT Sans\', sans-serif';
Chart.defaults.global.legend.display = true;

/**
 * A generalized Radar Chart - AbstractGraphs based on categories and its associated values,
 * Takes: id string, labels array, data array, title string
 */
class RadarGraph extends Component {
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
      },
      scale: {
        angleLines: {
          display: true,
        },
      },
    };
  }

  buildChart(ref) {
    const radarGraphRef = this.chartRef.current.getContext('2d');
    if (typeof graphReferences[ref] !== 'undefined') graphReferences[ref].destroy();
    const data = {};
    data.labels = this.props.labels;
    const colorIterator = colours.values();
    const pointColoursIterator = pointColours.values();
    const fillIterator = fillColours.values();
    data.datasets = this.props.data.map((datasetData) => ({
      label: datasetData.label,
      data: datasetData.data,
      fill: true,
      borderColor: colorIterator.next().value,
      backgroundColor: fillIterator.next().value,
      pointBackgroundColor: pointColoursIterator.next().value,
      pointBorderColor: '#fff',
      pointRadius: 4,
      pointStyle: 'circle',
      borderWidth: 2,
      spanGaps: true,
    }));
    const options = this.optionHolder();
    graphReferences[ref] = new Chart(radarGraphRef, {
      type: 'radar',
      data,
      options,
    });
  }

  render() {
    return (
      <div className="radar">
        <canvas
          id={this.props.id}
          ref={this.chartRef}
        />
      </div>
    );
  }
}

RadarGraph.propTypes = {
  id: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  labels: PropTypes.arrayOf(PropTypes.number),
  title: PropTypes.string,
};

export default RadarGraph;
