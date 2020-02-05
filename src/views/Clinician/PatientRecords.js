import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import $ from 'jquery';
import qs from 'qs';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import variablepie from 'highcharts/modules/variable-pie';

import HeaderMenu from "../../components/HeaderMenu";


function PatientRecordsInfo(props) {
  return <div style={{ width: "100%", display: "flex" }} className="sinfo">
    <div style={{ width: "100%" }}>
      <p className="name">Name: {props.name}</p>
      <p className="patientno">Patient Number: {props.patientNumber}</p>
      <p>Age: 65</p>
      <p>Sex: M</p>
      <p>Type: Calf Broken</p>
      <p className="birthday">Date Of Surgery: {props.birthday}</p>
    </div>
    <img src="./240px-User_icon_2.svg.png" style={{ width: "40%" }}
         alt=""></img>
  </div>;
}

function PatientProgressTableEntry(props) {
  return <tr>
    <td>{props.doctorsLog}</td>
    <td>{props.date}</td>
    <td>{props.record}</td>
    <td>{props.severity}</td>
  </tr>;
}

function PatientRecordsReport(props) {
  return <div style={{ width: "90%" }}>
    <p>REPORT</p>
    {props.content}
  </div>;
}


class PatientRecords extends React.Component {
  componentDidMount() {
    $(".sdetail").hide();
    $(".sreport").hide();
    $(".sinfo").show();
    $(".info").click(function () {
      $(".sreport").hide();
      $(".sinfo").show();
      $(".sdetail").hide();
    });

    $(".detail").click(function () {
      $(".sreport").hide();
      $(".sinfo").hide();
      $(".sdetail").show();
    });

    $(".report").click(function () {
      $(".sreport").show();
      $(".sinfo").hide();
      $(".sdetail").hide();
    });

    var tracker = {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Pain-Progress Tracker'
      },
      xAxis: {
        categories: ['2019/11/20', '2019/11/23', '2019/11/26', '2019/12/10', '2019/12/14', '2019/12/20']

      },
      yAxis: {
        title: {
          text: 'Total Score'
        }
      },
      series: [{
        name: 'distance walked',
        data: [0, 3, 3, 4, 6, 9]
      }, {
        name: 'pain level',
        data: [10, 10, 9, 7, 4, 2]
      }, {
        name: 'joint comfortness',
        data: [1, 2, 2, 5, 8, 9.5]
      }]
    };

    var bloodSugarLevels = {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Blood Sugar Levels'
      },
      xAxis: {
        categories: ['2019/11/20', '2019/11/23', '2019/11/26', '2019/12/10', '2019/12/14', '2019/12/20']
      },
      yAxis: {
        title: {
          text: 'Blood Sugar Level mmol/L'
        }
      },
      series: [{
        name: 'Blood Sugar Level',
        data: [100, 120, 97, 130, 150]
      }]
    };

    var tendonReflexes = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Tendon Reflexes'
      },
      xAxis: {
        categories: ['2019/11/20', '2019/11/23', '2019/11/26', '2019/12/10', '2019/12/14', '2019/12/20']
      },
      yAxis: {
        title: {
          text: 'Reflex Score'
        }
      },
      legend: {
        title: {
          text: '0-Absent, 1-Possibly Present, 2-Present but Low Amplitude, 3-Normal, 4-Increased, 5-Markedly Increased'
        }
      },
      series: [{
        name: 'Tendon Reflex Score',
        data: [5, 3, 2, 4, 1]
      }]
    };

    var bodyComp = {
      chart: {
        type: 'variablepie'
      },
      title: {
        text: 'Body Composition'
      },
      tooltip: {
        headerFormat: '',
        pointFormat: '<span style="color:{point.color}"></span> <b> {point.name}</b><br/>' +
          'Composition: <b>{point.y}</b>%<br/>'
      },
      series: [{
        minPointSize: 10,
        innerSize: '20%',
        zMin: 0,
        name: 'body composition',
        data: [{
          name: 'Fat Percentage',
          y: 10,
          z: 3
        },
          {
            name: 'Hydrogen',
            y: 3,
            z: 3
          },
          {
            name: 'Carbon',
            y: 10,
            z: 3
          },
          {
            name: 'Oxygen',
            y: 2,
            z: 3
          },
          {
            name: 'Water',
            y: 20,
            z: 3
          },
          {
            name: 'Protein',
            y: 10,
            z: 3
          },
          {
            name: 'Bone',
            y: 40,
            z: 3
          },
          {
            name: 'Skeletal Muscle',
            y: 3,
            z: 3
          },
          {
            name: 'Adipose Tissue',
            y: 2,
            z: 3
          }]
      }]
    };

    var metaRate = {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Basal Metabolism Rate (BMR)'
      },
      xAxis: {
        categories: ['2019/11/20', '2019/11/23', '2019/11/26', '2019/12/10', '2019/12/14', '2019/12/20']
      },
      yAxis: {
        title: {
          text: 'Calories per Day (kcal/day)'
        }
      },
      series: [{
        name: 'Calories per day',
        data: [1600, 1750, 1800, 1650, 1850]
      }]
    };

    var bodyTemp = {
      chart: {
        type: 'columnrange'
      },
      title: {
        text: 'Body Temperature'
      },
      xAxis: {
        categories: ['2019/11/20', '2019/11/23', '2019/11/26', '2019/12/10', '2019/12/14', '2019/12/20']
      },
      yAxis: {
        title: {
          text: 'Temperature ( °C )'
        }
      },
      tooltip: {
        valueSuffix: '°C'
      },
      plotOptions: {
        columnrange: {
          dataLabels: {
            enabled: true,
            formatter: function () {
              return this.y + '°C';
            },
            y: 0
          }
        }
      },
      series: [{
        name: 'Temperatures',
        data: [[36.5, 36.8], [36.8, 37.1], [37.4, 38.0], [37.5, 37.9], [37.2, 37.9]]
      }]
    };

    var Highcharts = require('highcharts');
    require('highcharts/highcharts-more')(Highcharts);
    require('highcharts/modules/variable-pie')(Highcharts);
    var chart = Highcharts.chart('container', tracker);
    var chart11 = Highcharts.chart('bloodSugarContainer', bloodSugarLevels);
    var tendonReflexes = Highcharts.chart('tendonReflexesContainer', tendonReflexes);
    var bodyComposition = Highcharts.chart('bodyCompContainer', bodyComp);
    var basalMetaRate = Highcharts.chart('metaRateContainer', metaRate);
    var bodyTemperature = Highcharts.chart('bodyTempContainer', bodyTemp)


    $(".stendonReflex").hide();
    // $(".sbmi").hide();
    $(".sbloodSugar").show();
    $(".smetaRate").hide();
    $(".sbodyComposition").hide();
    $(".sbodyTemp").hide();

    $(".bloodSugar").click(function () {
      $(".sbloodSugar").show();
      // $(".sbmi").hide();
      $(".sbodyComposition").hide();
      $(".sbodyTemp").hide();
      $(".smetaRate").hide();
      $(".stendonReflex").hide();
    });

    $(".tendonReflex").click(function () {
      $(".sbloodSugar").hide();
      // $(".sbmi").hide();
      $(".sbodyComposition").hide();
      $(".sbodyTemp").hide();
      $(".smetaRate").hide();
      $(".stendonReflex").show();
    });

    // $(".bmi").click(function () {
    //     $(".sbloodSugar").hide();
    // 	$(".sbmi").show();
    // 	$(".sbodyComposition").hide();
    // 	$(".sbodyTemp").hide();
    // 	$(".smetaRate").hide();
    //     $(".stendonReflex").hide();
    // });

    $(".metaRate").click(function () {
      $(".sbloodSugar").hide();
      // $(".sbmi").hide();
      $(".sbodyComposition").hide();
      $(".sbodyTemp").hide();
      $(".smetaRate").show();
      $(".stendonReflex").hide();
    });

    $(".bodyComposition").click(function () {
      $(".sbloodSugar").hide();
      // $(".sbmi").hide();
      $(".sbodyComposition").show();
      $(".sbodyTemp").hide();
      $(".smetaRate").hide();
      $(".stendonReflex").hide();
    });

    $(".bodyTemp").click(function () {
      $(".sbloodSugar").hide();
      // $(".sbmi").hide();
      $(".sbodyComposition").hide();
      $(".sbodyTemp").show();
      $(".smetaRate").hide();
      $(".stendonReflex").hide();
    });


  }

  render() {
    return (
      <div>
        <HeaderMenu/>
        <Container>
          <Card>
            <Card.Header>Patient Record</Card.Header>
            <Card.Body>
              <div style={{ height: '30px' }}></div>
              <div style={{ display: 'flex' }}>
                <div style={{ width: '36%' }}>
                  <p style={{ marginBottom: '40px' }}><a
                    className="btn btn-primary btn-lg info">Information</a>
                  </p>
                  <p style={{ marginBottom: '40px' }}><a
                    className="btn btn-primary btn-lg detail">Patient
                    Progress</a></p>
                  <p><a className="btn btn-primary btn-lg report">Report</a></p>
                </div>
                <div style={{ width: '100%', display: 'flex' }} className="sinfo">
                  <div style={{ width: '100%' }}>
                    <PatientRecordsInfo
                      patientNumber={qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).patientno}
                      name={qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).name}
                      birthday={qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).birthday}/>
                    <Accordion defaultActiveKey="0">
                      <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                          Patients' History
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>

                            <p
                              style={{ marginBottom: '40px' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <a className="btn btn-secondary btn-lg bloodSugar"
                                 style={{ backgroundColor: 'gray', opacity: '0.8' }}>Blood Sugar Levels</a>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <a className="btn btn-secondary btn-lg tendonReflex"
                                 style={{ backgroundColor: 'gray', opacity: '0.8' }}>Tendon Reflexes</a>
                              {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
														<a className="btn btn-secondary btn-lg bmi" style={{backgroundColor: 'red', opacity: '0.8'}}>Body-Mass Index</a> */}
                            </p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <a className="btn btn-secondary btn-lg metaRate"
                               style={{ backgroundColor: 'gray', opacity: '0.8' }}>Basal Metabolic Rate</a>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <a className="btn btn-secondary btn-lg bodyComposition"
                               style={{ backgroundColor: 'gray', opacity: '0.8' }}>Body Composition</a>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <a className="btn btn-secondary btn-lg bodyTemp"
                               style={{ backgroundColor: 'gray', opacity: '0.8' }}>Body Temperature</a>

                            <Card.Text>

                              <div style={{ height: '40px' }}></div>
                              <div className="sbloodSugar">
                                <div id="bloodSugarContainer" style={{ width: '700px', height: '500px' }}
                                     className="sbloodSugar"></div>
                              </div>
                              <div className="stendonReflex">
                                <div id="tendonReflexesContainer" style={{ width: '700px', height: '500px' }}
                                     className="stendonReflex"></div>
                              </div>
                              <div className="sbodyComposition">
                                <div id="bodyCompContainer" style={{ width: '700px', height: '500px' }}
                                     className="sbodyComposition"></div>
                              </div>
                              <div className="smetaRate">
                                <div id="metaRateContainer" style={{ width: '700px', height: '500px' }}
                                     className="smetaRate"></div>
                              </div>
                              <div className="sbodyTemp">
                                <div id="bodyTempContainer" style={{ width: '700px', height: '500px' }}
                                     className="sbodyTemp"></div>
                              </div>
                            </Card.Text>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  </div>
                </div>
                <div style={{ width: '100%', display: 'flex' }} className="sdetail">
                  <div style={{ width: '100%' }}>

                    <Table striped bordered hover>
                      <thead>
                      <PatientProgressTableEntry doctorsLog="Doctor's Logs"
                                                 date="Date" record="Record"
                                                 severity="Severity"/>
                      </thead>
                      <tbody>
                      <PatientProgressTableEntry doctorsLog="Outpatient"
                                                 date="2019-11-20" record="Calf fracture"
                                                 severity="Serious"/>
                      <PatientProgressTableEntry doctorsLog="Osteosynthesis"
                                                 date="2019-11-23"
                                                 record="Already boned but fragile"
                                                 severity="Successful operation"/>
                      <PatientProgressTableEntry doctorsLog="Reinforced Support"
                                                 date="2019-11-23" record="Bone into 20cm bracket"
                                                 severity="Successful Access"/>
                      <PatientProgressTableEntry doctorsLog="Be hospitalized"
                                                 date="2019-11-23"
                                                 record="Single VIP sickroom: No.2"
                                                 severity="No other side effects"/>
                      <PatientProgressTableEntry doctorsLog="Physiotherapy"
                                                 date="2019-11-26"
                                                 record="one hour of rehabilitation training"
                                                 severity="Calf regained consciouseness"/>
                      <PatientProgressTableEntry doctorsLog="Physiotherapy"
                                                 date="To 2019-12-10"
                                                 record="End of recovery traning"
                                                 severity="Can walking"/>
                      <PatientProgressTableEntry doctorsLog="Bracket Surgey"
                                                 date="2019-12-14" record="Remove the bracket"
                                                 severity="Get Well"/>

                      </tbody>
                    </Table>
                    <div id="container" style={{ width: '700px', height: '500px' }}
                         className="PatientRecords"></div>
                  </div>
                </div>


                <div style={{ width: '90%', display: 'flex' }} className="sreport">
                  <PatientRecordsReport
                    content={<div><p>Initial treatment for a broken leg usually begins in an emergency room or
                      urgent care clinic. Here, doctors typically evaluate your injury and
                      immobilize your leg with a splint. If you have a displaced fracture, your
                      doctor may need to manipulate the pieces back into their proper positions
                      before applying a splint — a process called reduction. Some fractures are
                      splinted for a day to allow swelling to subside before they are casted.</p>
                      <p>After your cast or splint is removed, you'll likely need rehabilitation
                        exercises or physical therapy to reduce stiffness and restore movement in
                        the injured leg. Because you haven't moved your leg for a while, you may
                        even have stiffness and weakened muscles in uninjured areas. Rehabilitation
                        can help, but it may take up to several months — or even longer — for
                        complete healing of severe injuries.</p>
                      <p>For some injuries, your doctor may also recommend an external fixation device
                        — a frame outside your leg attached to the bone with pins. This device
                        provides stability during the healing process and is usually removed after
                        about six to eight weeks. There's a risk of infection around the surgical
                        pins connected to the external fixation device.</p>
                      <p>What Can You Do?</p>
                      <p>1.Detailed descriptions of the symptoms and the precipitating event</p>
                      <p>2.Information about past medical problems</p>
                      <p>3.All the medications and dietary supplements you or your child takes</p>
                      <p>4.Questions you want to ask the doctor</p></div>}/>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}

export default PatientRecords;

