import React, { Component } from 'react'
import Chart from "chart.js";
import GeneralLineChart from './GeneralLineChart';
// let myOxygenSaturationGraph;

// Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
// Chart.defaults.global.legend.display = true;

class OxygenSaturationGraph extends Component {
    // chartRef = React.createRef();

    // constructor(props){
    //     super(props);
    // }

    // componentDidMount() {
    //     this.buildChart();
    // }

    // componentDidUpdate() {
    //     this.buildChart();
    // }

    // buildChart = () => {
    //     const myOxygenSaturationGraphRef = this.chartRef.current.getContext("2d");

    //     if (typeof myOxygenSaturationGraph !== "undefined") myOxygenSaturationGraph.destroy();

    //     myOxygenSaturationGraph= new Chart(myOxygenSaturationGraphRef, {
    //         type: "line",
    //         data: {
    //             labels: this.props.time,
    //             datasets: [
    //                 {
    //                     label: "Oxygen Concentration",
    //                     data: this.props.percent,
    //                     fill: false,
    //                     borderColor: "blue"
    //                 }
    //             ]
    //         },
    //         options: {
    //             title : {
    //                 display: true,
    //                 text : "Oxygen Concentration (Indirect Oximetry)",
    //                 fontSize: 18,
    //                 fontFamily: 'Lucida',
    //                 fontColor: '#000'
                    
    //             },
    //             legend: {
    //                 display:true,
    //                 position: 'bottom',
    //                 labels: {
    //                     fontColor: '#000'
    //                 }
    //             },
    //             tooltips: {
    //                 enabled: true,
    //                 displayColors: true,
    //                 mode: 'single',
    //                 callbacks: {
    //                     label: function (tooltipItems, data){
    //                         return tooltipItems.yLabel + "%";
    //                     }
    //                 }
    //             },
    //             scales: {
    //                 xAxes: [{
    //                     gridLines: {
    //                         display : true,
    //                         drawBorder: true,
    //                         drawOnChartArea : false
    //                     },
    //                     scaleLabel: {
    //                         display: true,
    //                         labelString: "Date/Time"
    //                     }
    //                 }],
    //                 yAxes: [{
    //                     gridLines: {
    //                         display : true,
    //                         drawBorder: true,
    //                         drawOnChartArea : true
    //                     },
    //                     scaleLabel: {
    //                         display: true,
    //                         labelString: "Oxygen Concentration / %"
    //                     }
    //                 }]
    //             }
    //         }
    //     });

    // }

    render() {
        return (
            <GeneralLineChart id={"myOxygen"} labels={this.props.time} data={
                [{
                    label: "Oxygen Concentration",
                    data: this.props.percent
                }]
            }
            title={"Oxygen Concentration (Indirect Oximetry)"} xLabel={"Date/Time"} yLabel={"Oxygen Concentration / %"}/>
        )

        // return (
        //     <div className="oxygen">
        //         <canvas
        //             id="myScores"
        //             ref={this.chartRef}
        //         />
        //     </div>
        // )
    }
}

export default OxygenSaturationGraph;