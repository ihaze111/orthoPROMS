import React from "react";
import HighCharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

class ScoresGraph extends React.Component {
  constructor(props) {
    super(props);
    const painScore = props.pain;
    const limitationsScore = props.limit;
    const walkingScore = props.walking;
    const walking_surfacesScore = props.surface;
    const totalScore = props.total;
    const regTime = props.time;
    this.state = {
      options: {
        chart: {
          type: "line"
        },
        title: {
          text: "Progress Scores"
        },
        xAxis: {
          title: {
            text: "Date"
          },
          categories: regTime
        },
        yAxis: {
          title: {
            text: "Scores"
          }
        },
        series: [
          {
            name: "Pain Score",
            data: painScore
          },
          {
            name: "Limitations Score",
            data: limitationsScore
          },
          {
            name: "Walking Score",
            data: walkingScore
          },
          {
            name: "Walking Surfaces Score",
            data: walking_surfacesScore
          },
          {
            name: "Total Score",
            data: totalScore
          }
        ]
      }
    };
  }

  render() {
    let { options } = this.state
    return (
      <div>
        <HighchartsReact
          highcharts={HighCharts}
          constructorType={"chart"}
          options={options}
        />
      </div>
    );
  }
}
// const ScoresGraph = props => {
//   // console.log("Graph!");
//   // console.log(props.pain);

//   console.log("props", props);
//   const options = {
//     chart: {
//       type: "line"
//     },
//     title: {
//       text: "Progress Scores"
//     },
//     xAxis: {
//       title: {
//         text: "Date"
//       },
//       categories: regTime
//     },
//     yAxis: {
//       title: {
//         text: "Scores"
//       }
//     },
//     series: [
//       {
//         name: "Pain Score",
//         data: painScore
//       },
//       {
//         name: "Limitations Score",
//         data: limitationsScore
//       },
//       {
//         name: "Walking Score",
//         data: walkingScore
//       },
//       {
//         name: "Walking Surfaces Score",
//         data: walking_surfacesScore
//       },
//       {
//         name: "Total Score",
//         data: totalScore
//       }
//     ]
//   };

//   return (
//     <div>
//       <HighchartsReact
//         highcharts={HighCharts}
//         constructorType={"chart"}
//         options={options}
//       />
//     </div>
//   );
// };

export default ScoresGraph;
