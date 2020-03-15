import React, { Component } from 'react'
import Chart from "chart.js";


let radarGraph;
const colours = ['rgb(255,99,132)', 'rgb(54,162,235)', 'green'];
const pointColours = colours;
const fillColours = ['rgb(255,99,132,0.3)', 'rgb(54,162,235,0.3)', 'rgb(0,128,0,0.3)'];

Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";
Chart.defaults.global.legend.display = true;

class RadarGraph extends Component{
    render(){
        return (
            <RadarChart id={"myRadar"} labels={this.props.label} data={
                [{
                    label : "Pre-Operation",
                    data: this.props.preOp
                },
                {
                    label: "One Week Post-Operation",
                    data: this.props.oneWeek
                },
                {
                    label: "Six Weeks Post-Operation",
                    data: this.props.sixWeeks
                }]
            } title={"Progress Comparison"} />
        )
    }
}

class RadarChart extends Component {
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
        if (this.props.id === "myRadar"){
            this.buildChart();
            console.log(this.props.preOp);
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
                displayColors: true,
            },
            scale:{
                angleLines: {
                    display: true
                }
            }
        };
    }

    buildChart = () => {
        const radarGraphGraphRef = this.chartRef.current.getContext("2d");
        if (typeof radarGraph !== "undefined") radarGraph.destroy();
        const data = {};
        data.labels = this.props.labels; 
        const colorIterator = colours.values();
        const pointColoursIterator = pointColours.values();
        const fillIterator = fillColours.values();
        data.datasets = this.props.data.map((data) => {
            return {
                label: data.label,
                data: data.data,
                fill: true,
                borderColor: colorIterator.next().value,
                backgroundColor: fillIterator.next().value,
                pointBackgroundColor: pointColoursIterator.next().value,
                pointBorderColor: '#fff',
                pointRadius : 4,
                pointStyle : 'circle',
                borderWidth : 2,
                spanGaps: true
            }
        });
        const options = this.optionHolder();
        radarGraph = new Chart(radarGraphGraphRef, {
            type: "radar",
            data,
            options
        });

    };

    render() {
        return (
            <div className="radar">
                <canvas
                    id={this.props.id}
                    ref={this.chartRef}
                />
            </div>
        )
    }
}


// import React from "react";
// import HighCharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// // eslint-disable-next-line no-unused-vars
// import HighChartsMore from 'highcharts/highcharts-more';

// const RadarGraph = props => {
//     const preOperation = props.preOp;
//     const oneWeekPostOperation = props.oneWeek;
//     const sixWeeksPostOperation = props.sixWeeks;

//     const radarOptions = {
//         chart: {
//             polar: true,
//             type: 'line'
//         },

//         title: {
//             text: 'Progress Comparison'
//         },

//         pane: {
//             size: '100%'
//         },

//         xAxis: {
//             categories: ["Pain","Activity limitations and support requirements", "Walking","Walking surfaces"],
//             tickmarkPlacement: 'on',
//             lineWidth: 0
//         },

//         yAxis: {
//             gridLineInterpolation: 'polygon',
//             lineWidth: 0,
//             min: 0
//         },

//         tooltip: {
//             shared: true,
//             pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
//         },

//         legend: {
//             align: 'center',
//             verticalAlign: 'top'
//         },

//         series: [{
//             name: 'Pre-Operation',
//             color: 'red',
//             data: preOperation,
//             pointPlacement: 'on'
//         }, {
//             name: 'One Week Post-Operation',
//             color: 'navy',
//             data: oneWeekPostOperation,
//             pointPlacement: 'on'
//         },{
//             name: 'Six Week Post-Operation',
//             color: 'green',
//             data: sixWeeksPostOperation,
//             pointPlacement: 'on'
//         }],

//         responsive: {
//             rules: [{
//                 condition: {
//                     maxWidth: 1000
//                 },
//                 chartOptions: {
//                     legend: {
//                         align: 'center',
//                         verticalAlign: 'top'
//                     },
//                     pane: {
//                         size: '90%'
//                     }
//                 }
//             }]
//         }
//     };

//     require('highcharts/highcharts-more')(HighCharts);
//     return(
//             <HighchartsReact
//                 highcharts={HighCharts}
//                 options={radarOptions}
//             />
//     );
// };

export default RadarGraph;
