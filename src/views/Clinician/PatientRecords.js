import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
// import variablepie from 'highcharts/modules/variable-pie';
import back from "../../components/Clinician/back.png";
import "../../components/Clinician/PatientRecordsStyle.css";

import HeaderMenu from "../../components/HeaderMenu";
import { PatientOverview, PatientProgressTable, ScoresArray, EpisodeScoresGraph, RespirationGraph, PressureGraph, OxygenConcentrationGraph, HeartGraph } from "../PatientComponents";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { getSubjectId, loadEhrId } from "../PatientUtils";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function PatientRecordsReport(props) {
    return <div style={{ width: "90%" }}>
        <p>REPORT</p>
        {props.content}
    </div>;
}

class PatientRecords extends React.Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
        this.state = {};
    }

    goBack(){
        this.props.history.goBack();
    }

    componentDidMount() {
        loadEhrId.call(this);


        // var bodyComp = {
        //     chart: {
        //         type: 'variablepie'
        //     },
        //     title: {
        //         text: 'Body Composition'
        //     },
        //     tooltip: {
        //         headerFormat: '',
        //         pointFormat: '<span style="color:{point.color}"></span> <b> {point.name}</b><br/>' +
        //             'Composition: <b>{point.y}</b>%<br/>'
        //     },
        //     series: [{
        //         minPointSize: 10,
        //         innerSize: '20%',
        //         zMin: 0,
        //         name: 'body composition',
        //         data: [{
        //             name: 'Fat Percentage',
        //             y: 10,
        //             z: 3
        //         },
        //             {
        //                 name: 'Hydrogen',
        //                 y: 3,
        //                 z: 3
        //             },
        //             {
        //                 name: 'Carbon',
        //                 y: 10,
        //                 z: 3
        //             },
        //             {
        //                 name: 'Oxygen',
        //                 y: 2,
        //                 z: 3
        //             },
        //             {
        //                 name: 'Water',
        //                 y: 20,
        //                 z: 3
        //             },
        //             {
        //                 name: 'Protein',
        //                 y: 10,
        //                 z: 3
        //             },
        //             {
        //                 name: 'Bone',
        //                 y: 40,
        //                 z: 3
        //             },
        //             {
        //                 name: 'Skeletal Muscle',
        //                 y: 3,
        //                 z: 3
        //             },
        //             {
        //                 name: 'Adipose Tissue',
        //                 y: 2,
        //                 z: 3
        //             }]
        //     }]
        // };

        // var bodyTemp = {
        //     chart: {
        //         type: 'columnrange'
        //     },
        //     title: {
        //         text: 'Body Temperature'
        //     },
        //     xAxis: {
        //         categories: ['2019/11/20', '2019/11/23', '2019/11/26', '2019/12/10', '2019/12/14', '2019/12/20']
        //     },
        //     yAxis: {
        //         title: {
        //             text: 'Temperature ( °C )'
        //         }
        //     },
        //     tooltip: {
        //         valueSuffix: '°C'
        //     },
        //     plotOptions: {
        //         columnrange: {
        //             dataLabels: {
        //                 enabled: true,
        //                 formatter: function () {
        //                     return this.y + '°C';
        //                 },
        //                 y: 0
        //             }
        //         }
        //     },
        //     series: [{
        //         name: 'Temperatures',
        //         data: [[36.5, 36.8], [36.8, 37.1], [37.4, 38.0], [37.5, 37.9], [37.2, 37.9]]
        //     }]
        // };

        // var Highcharts = require('highcharts');
        // require('highcharts/highcharts-more')(Highcharts);
        // require('highcharts/modules/variable-pie')(Highcharts);
    }

    render() {
        let subjectId = getSubjectId(this.props.location.search);
        // console.log(this.state.ehrId);
        return (
            <div>
                <HeaderMenu/>
                <div style={{float: 'left'}}>
                    <img src={back} onClick={this.goBack} onHov alt={"back"}/>
                {/* <Nav className="flex-column">
                    <Nav.Link onClick={this.goBack} style={{color: 'red'}}>Patients List</Nav.Link>
                </Nav> */}
                </div>
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
                                                <PatientOverview subjectId={subjectId}/>
                                                <Card>
                                                    <Card.Header>
                                                        <Card.Title>Patient's History</Card.Title>
                                                    </Card.Header>
                                                    <Card.Body>
                                                        <Tab.Container defaultActiveKey="bloodPressure">
                                                            <Nav variant="tabs" style={{ marginBottom: '40px' }}>
                                                                <Nav.Item>
                                                                    <Nav.Link eventKey="bloodPressure">Blood Pressure</Nav.Link>
                                                                </Nav.Item>
                                                                <Nav.Item>
                                                                    <Nav.Link eventKey="heartRate">Heart Rate</Nav.Link>
                                                                </Nav.Item>
                                                                <Nav.Item>
                                                                    <Nav.Link eventKey="respirationRate">Respiration Rate</Nav.Link>
                                                                </Nav.Item>
                                                                {/* <Nav.Item>
                                                                    <Nav.Link eventKey="bodyComposition">Body
                                                                        Composition</Nav.Link>
                                                                </Nav.Item> */}
                                                                <Nav.Item>
                                                                    <Nav.Link eventKey="indirectOximetry">Oxygen Saturation</Nav.Link>
                                                                </Nav.Item>
                                                            </Nav>
                                                            <Tab.Content>
                                                                <Tab.Pane eventKey="bloodPressure">
                                                                    <div><PressureGraph ehrId={this.state.ehrId}/></div>
                                                                    {/* <div id="bloodPressureContainer"
                                                                         style={{ width: '700px', height: '500px' }}
                                                                         className="sbloodPressure"/> */}
                                                                </Tab.Pane>
                                                                <Tab.Pane eventKey="heartRate">
                                                                    <div><HeartGraph ehrId={this.state.ehrId}/></div>
                                                                    {/* <div id="heartRateContainer"
                                                                         style={{ width: '700px', height: '500px' }}
                                                                         className="sheartRate"/> */}
                                                                </Tab.Pane>
                                                                <Tab.Pane eventKey="respirationRate">
                                                                    <div><RespirationGraph ehrId={this.state.ehrId}/></div>
                                                                    {/* <div id="respirationRateContainer"
                                                                         style={{ width: '700px', height: '500px' }}
                                                                         className="srespirationRate"/> */}
                                                                </Tab.Pane>
                                                                {/* <Tab.Pane eventKey="bodyComposition">
                                                                    <div id="bodyCompContainer"
                                                                         style={{ width: '700px', height: '500px' }}
                                                                         className="sbodyComp"/>
                                                                </Tab.Pane> */}
                                                                <Tab.Pane eventKey="indirectOximetry">
                                                                    <div><OxygenConcentrationGraph ehrId={this.state.ehrId}/></div>
                                                                    {/* <div id="indirectOximetryContainer"
                                                                         style={{ width: '700px', height: '500px' }}
                                                                         className="sindirectOximetry"/> */}
                                                                </Tab.Pane>
                                                            </Tab.Content>
                                                        </Tab.Container>
                                                    </Card.Body>
                                                </Card>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="patientProgress">
                                                <PatientProgressTable ehrId={this.state.ehrId}/>
                                                <div><ScoresArray ehrId={this.state.ehrId}/></div>
                                                <div><EpisodeScoresGraph ehrId={this.state.ehrId}/></div>
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

