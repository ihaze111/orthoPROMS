import React from "react";
import HighCharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const RespirationRateGraph = props => {
    // console.log("Graph!");
    // console.log(props.pain);

    const options = {
        chart: {
            type : "line"
        },
        title: {
            text : "Respiration Rate"
        },
        xAxis: {
            title : {
                text : "Time"
            },
            categories: [a,b,c,d,e,f]
        },
        yAxis: {
            title : {
                text : "Rate/min"
            }
        },
        series : [
            {
                name: "Respiration Rate",
                data: [1,2,3,4,5,6]
            }
        ]
    };

    return(
        <div>
            <HighchartsReact
                highcharts={HighCharts}
                constructorType={"chart"}
                options={options}
            />
        </div>
    );
};

export default RespirationRateGraph;