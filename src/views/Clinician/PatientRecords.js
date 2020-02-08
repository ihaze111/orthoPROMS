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
import { PatientOverview, PatientProgressTable } from "../PatientComponents";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { loadEhrId } from "../PatientUtils";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


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
                            <Tab.Container defaultActiveKey="information">
                                <Row>
                                    <Col sm={3}>
                                        <Nav variant="pills" className="flex-column">
                                            <Nav.Item>
                                                <Nav.Link eventKey="information">Information</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="patientProgress">Patient Progress</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="report">Report</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </Col>
                                    <Col sm={9}>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="information">
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
                                                                        <Nav.Link eventKey="bloodSugarLevels">Blood
                                                                            Sugar
                                                                            Levels</Nav.Link>
                                                                    </Nav.Item>
                                                                    <Nav.Item>
                                                                        <Nav.Link eventKey="tendonReflexes">Tendon
                                                                            Reflexes</Nav.Link>
                                                                    </Nav.Item>
                                                                    <Nav.Item>
                                                                        <Nav.Link eventKey="basalMetabolicRate">Basal
                                                                            Metabolic
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
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="patientProgress">
                                                <PatientProgressTable ehrId={this.state.ehrId}/>
                                                <div id="container" style={{ width: '700px', height: '500px' }}
                                                     className="PatientRecords"></div>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="report">
                                                <PatientRecordsReport
                                                    content={<div><p>Initial treatment for a broken leg usually begins
                                                        in an
                                                        emergency room or
                                                        urgent care clinic. Here, doctors typically evaluate your injury
                                                        and
                                                        immobilize your leg with a splint. If you have a displaced
                                                        fracture,
                                                        your
                                                        doctor may need to manipulate the pieces back into their proper
                                                        positions
                                                        before applying a splint — a process called reduction. Some
                                                        fractures are
                                                        splinted for a day to allow swelling to subside before they are
                                                        casted.</p>
                                                        <p>After your cast or splint is removed, you'll likely need
                                                            rehabilitation
                                                            exercises or physical therapy to reduce stiffness and
                                                            restore
                                                            movement
                                                            in
                                                            the injured leg. Because you haven't moved your leg for a
                                                            while,
                                                            you may
                                                            even have stiffness and weakened muscles in uninjured areas.
                                                            Rehabilitation
                                                            can help, but it may take up to several months — or even
                                                            longer
                                                            — for
                                                            complete healing of severe injuries.</p>
                                                        <p>For some injuries, your doctor may also recommend an external
                                                            fixation
                                                            device
                                                            — a frame outside your leg attached to the bone with pins.
                                                            This
                                                            device
                                                            provides stability during the healing process and is usually
                                                            removed
                                                            after
                                                            about six to eight weeks. There's a risk of infection around
                                                            the
                                                            surgical
                                                            pins connected to the external fixation device.</p>
                                                        <p>What Can You Do?</p>
                                                        <p>1.Detailed descriptions of the symptoms and the precipitating
                                                            event</p>
                                                        <p>2.Information about past medical problems</p>
                                                        <p>3.All the medications and dietary supplements you or your
                                                            child
                                                            takes</p>
                                                        <p>4.Questions you want to ask the doctor</p></div>}/>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Col>
                                </Row>
                            </Tab.Container>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }
}

export default PatientRecords;

