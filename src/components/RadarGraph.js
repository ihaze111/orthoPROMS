import React from "react";
import HighCharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
// eslint-disable-next-line no-unused-vars
import HighChartsMore from 'highcharts/highcharts-more';

const RadarGraph = props => {
    const preOperation = props.preOp;
    const oneWeekPostOperation = props.oneWeek;
    const sixWeeksPostOperation = props.sixWeeks;
    
    const radarOptions = {
        chart: {
            polar: true,
            type: 'line'
        },

        title: {
            text: 'Progress Comparison'
        },

        pane: {
            size: '100%'
        },

        xAxis: {
            categories: ["Pain","Activity limitations and support requirements", "Walking","Walking surfaces"],
            tickmarkPlacement: 'on',
            lineWidth: 0
        },

        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
        },

        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
        },

        legend: {
            align: 'center',
            verticalAlign: 'top'
        },

        series: [{
            name: 'Pre-Operation',
            color: 'red',
            data: preOperation,
            pointPlacement: 'on'
        }, {
            name: 'One Week Post-Operation',
            color: 'navy',
            data: oneWeekPostOperation,
            pointPlacement: 'on'
        },{
            name: 'Six Week Post-Operation',
            color: 'green',
            data: sixWeeksPostOperation,
            pointPlacement: 'on'
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 1000
                },
                chartOptions: {
                    legend: {
                        align: 'center',
                        verticalAlign: 'top'
                    },
                    pane: {
                        size: '90%'
                    }
                }
            }]
        }
    };
    HighChartsMore(HighCharts)
    // require('highcharts/highcharts-more')(HighCharts);
    return(
        
            <HighchartsReact
                highcharts={HighCharts}
                options={radarOptions}
            />
    );
};

export default RadarGraph;
