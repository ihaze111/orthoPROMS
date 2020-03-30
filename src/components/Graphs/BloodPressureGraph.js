import React, { Component } from 'react';
import Chart from 'chart.js';
import * as PropTypes from 'prop-types';
import ReactPerformance from 'react-performance';

let bloodPressureGraph;
const colours = ['red', 'navy'];
const fillColours = ['rgb(255,0,0,0.4)', 'rgb(0,0,128,0.4)'];

Chart.defaults.global.defaultFontFamily = '\'PT Sans\', sans-serif';
Chart.defaults.global.legend.display = true;

/**
 * Build a graph based on the arrays of systolic and diastolic blood pressure provided
 * @param props
 * @returns {*}
 * @constructor
 */
export function BloodPressureGraph(props) {
  return (
    <BloodPressureChart
      id="myBlood"
      labels={props.time}
      data={
        [
          {
            label: 'Systolic',
            data: props.systolic,
          },
          {
            label: 'Diastolic',
            data: props.diastolic,
          }]
      }
      title="Blood Pressure"
      xLabel="Date/Time"
      yLabel={`Blood Pressure ${props.units}`}
      linkList={props.compId.map((compId) => `/Composition?compId=${compId}`)}
    />
  );
}

BloodPressureGraph.propTypes = {
  systolic: PropTypes.arrayOf(PropTypes.number),
  diastolic: PropTypes.arrayOf(PropTypes.number),
  time: PropTypes.arrayOf(PropTypes.string),
  units: PropTypes.string,
  compId: PropTypes.arrayOf(PropTypes.string),
};

/**
 * Use provided data with labels to build the blood pressure graph using Chart.js
 */
class BloodPressureChart extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.start();
  }

  componentDidUpdate() {
    this.start();
  }

  start() {
    if (this.props.id === 'myBlood') {
      this.buildChart();
    }
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
      scales: {
        xAxes: [{
          gridLines: {
            display: false,
            drawBorder: true,
            drawOnChartArea: false,
          },
          scaleLabel: {
            display: true,
            labelString: this.props.xLabel,
          },
        }],
        yAxes: [{
          gridLines: {
            display: true,
            drawBorder: false,
            drawOnChartArea: true,
          },
          scaleLabel: {
            display: true,
            labelString: this.props.yLabel,
          },
          ticks: {
            padding: 15,
          },
        }],
      },
    };
  }

  buildChart() {
    const bloodPressureGraphRef = this.chartRef.current.getContext('2d');
    if (typeof bloodPressureGraph !== 'undefined') bloodPressureGraph.destroy();
    const data = {};
    data.labels = this.props.labels; // this.props.time
    const colorIterator = colours.values();
    const fillIterator = fillColours.values();
    data.datasets = this.props.data.map((datasetData) => ({
      label: datasetData.label,
      data: datasetData.data,
      fill: 'start',
      borderColor: colorIterator.next().value,
      backgroundColor: fillIterator.next().value,
      pointRadius: 4,
      borderWidth: 2,
    }));
    const options = this.optionHolder();
    bloodPressureGraph = new Chart(bloodPressureGraphRef, {
      type: 'line',
      data,
      options,
    });
    if (this.props.linkList) {
      const linkMapping = this.props.linkList;
      this.chartRef.current.onclick = (evt) => {
        const activePoint = bloodPressureGraph.getElementAtEvent(evt);
        if (activePoint.length > 0) {
          // eslint-disable-next-line no-underscore-dangle
          window.location = linkMapping[activePoint[0]._index];
        }
      };
      this.chartRef.current.onmousemove = (evt) => {
        const activePoint = bloodPressureGraph.getElementAtEvent(evt);
        this.chartRef.current.style.cursor = activePoint.length > 0 ? 'pointer' : 'default';
      };
    }
  }

  render() {
    return (
      <div className="general">
        <canvas
          id={this.props.id}
          ref={this.chartRef}
        />
      </div>
    );
  }
}

BloodPressureChart.propTypes = {
  id: PropTypes.string,
  labels: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
  linkList: PropTypes.arrayOf(PropTypes.string),
};

export default ReactPerformance.measure({
    isCollapsed: false,
    getId: 'bloodPressureGraph',
    Component: BloodPressureGraph,
})
