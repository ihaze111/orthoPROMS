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
import { PatientOverview } from "../PatientComponents";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { loadEhrId } from "../PatientUtils";


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
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        loadEhrId.call(this);
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
        var bodyTemperature = Highcharts.chart('bodyTempContainer', bodyTemp);
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
                                        <PatientOverview ehrId={this.state.ehrId}/>
                                        <Accordion defaultActiveKey="0">
                                            <Card>
                                                <Card.Header>
                                                    <Card.Title>Patient's History</Card.Title>
                                                </Card.Header>
                                                <Card.Body>
                                                    <Tab.Container defaultActiveKey="bloodSugarLevels">
                                                        <Nav variant="tabs" style={{ marginBottom: '40px' }}>
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="bloodSugarLevels">Blood Sugar
                                                                    Levels</Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="tendonReflexes">Tendon
                                                                    Reflexes</Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="basalMetabolicRate">Basal Metabolic
                                                                    Rate</Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="bodyComposition">Body
                                                                    Composition</Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="bodyTemperature">Body
                                                                    Temperature</Nav.Link>
                                                            </Nav.Item>
                                                        </Nav>
                                                        <Tab.Content>
                                                            <Tab.Pane eventKey="bloodSugarLevels">
                                                                <div id="bloodSugarContainer"
                                                                     style={{ width: '700px', height: '500px' }}
                                                                     className="sbloodSugar"/>
                                                            </Tab.Pane>
                                                            <Tab.Pane eventKey="tendonReflexes">
                                                                <div id="tendonReflexesContainer"
                                                                     style={{ width: '700px', height: '500px' }}
                                                                     className="stendonReflex"/>
                                                            </Tab.Pane>
                                                            <Tab.Pane eventKey="basalMetabolicRate">
                                                                <div id="bodyCompContainer"
                                                                     style={{ width: '700px', height: '500px' }}
                                                                     className="sbodyComposition"/>
                                                            </Tab.Pane>
                                                            <Tab.Pane eventKey="bodyComposition">
                                                                <div id="metaRateContainer"
                                                                     style={{ width: '700px', height: '500px' }}
                                                                     className="smetaRate"/>
                                                            </Tab.Pane>
                                                            <Tab.Pane eventKey="bodyTemperature">
                                                                <div id="bodyTempContainer"
                                                                     style={{ width: '700px', height: '500px' }}
                                                                     className="sbodyTemp"/>
                                                            </Tab.Pane>
                                                        </Tab.Content>
                                                    </Tab.Container>
                                                </Card.Body>
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
                                        content={<div><p>Initial treatment for a broken leg usually begins in an
                                            emergency room or
                                            urgent care clinic. Here, doctors typically evaluate your injury and
                                            immobilize your leg with a splint. If you have a displaced fracture, your
                                            doctor may need to manipulate the pieces back into their proper positions
                                            before applying a splint — a process called reduction. Some fractures are
                                            splinted for a day to allow swelling to subside before they are casted.</p>
                                            <p>After your cast or splint is removed, you'll likely need rehabilitation
                                                exercises or physical therapy to reduce stiffness and restore movement
                                                in
                                                the injured leg. Because you haven't moved your leg for a while, you may
                                                even have stiffness and weakened muscles in uninjured areas.
                                                Rehabilitation
                                                can help, but it may take up to several months — or even longer — for
                                                complete healing of severe injuries.</p>
                                            <p>For some injuries, your doctor may also recommend an external fixation
                                                device
                                                — a frame outside your leg attached to the bone with pins. This device
                                                provides stability during the healing process and is usually removed
                                                after
                                                about six to eight weeks. There's a risk of infection around the
                                                surgical
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

