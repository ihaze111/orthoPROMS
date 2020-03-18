import React from 'react';
import "../../components/Clinician/PatientRecordsStyle.css";
import {
    PatientOverview, PatientProgressTable, ScoresArray, EpisodeScoresGraph, RespirationGraph, PressureGraph,
    OxygenConcentrationGraph, HeartGraph, PatientAllergiesTable, ProceduresTable, LabOrdersTable, LabReportsTable
}
    from "../PatientComponents";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { getSubjectId, loadEhrId } from "../PatientUtils";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NHSHeader from "../../components/nhsuk-frontend-react/NHSHeader";
import NHSContainer from "../../components/nhsuk-frontend-react/NHSContainer";
import NHSWrapper from "../../components/nhsuk-frontend-react/NHSWrapper";
import NHSBackLink from "../../components/nhsuk-frontend-react/NHSBackLink";
import { NHSPanel, NHSPanelBody, NHSPanelTitle, NHSPanelWithLabel } from "../../components/nhsuk-frontend-react/NHSPanel";
import NHSFooter from "../../components/nhsuk-frontend-react/NHSFooter";
import { NHSFormLabel, NHSButton, NHSTextArea, NHSFormGroup, NHSFormHint } from '../../components/nhsuk-frontend-react/NHSComponents';
import HeaderMenu from "../../components/HeaderMenu";

function PatientRecordsReport(props) {
    return <div style={{ width: "90%" }}>
        <h3>REPORT</h3>
        {props.content}
    </div>;
}

class PatientRecords extends React.Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
        this.state = {};
    }

    goBack() {
        this.props.history.goBack();
    }

    onSubmit = (e) => {
        // console.log(e);
        // e.preventDefault();
        // if (this.state.email === '' || this.state.password === '') {
        //     return alert('Please enter your email or password.')
        // }
        // let type = this.state.id === 1 ? 'Patient' : 'Clinicians'
        // this.props.login({ ...this.state, type }).then(
        //     res => {
        //         alert(res.message)
        //         if (res.code === 200) {
        //             let xx = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id;
        //             if (xx === "1") {

        //                 window.location.href = "/Patient?id=" + xx;
        //             } else if (xx === "2") {
        //                 window.location.href = "/Clinician?id=" + xx;
        //             }
        //         }

        //     }
        // )
    }

    componentDidMount() {
        loadEhrId.call(this);

    }

    render() {
        let subjectId = getSubjectId(this.props.location.search);
        // console.log(this.state.ehrId);
        return (
            <div style={{ backgroundColor: '#f0f4f5' }}>
                <HeaderMenu/>
                <NHSContainer>
                    <NHSWrapper>
                        <NHSBackLink onClick={this.goBack}>Go back</NHSBackLink>
                        <NHSPanel>
                            <NHSPanelTitle>Patient Record</NHSPanelTitle>
                            <NHSPanelBody>
                                <Tab.Container defaultActiveKey="vitals">
                                    <Row>
                                        <Col sm={3}>
                                            <Nav variant="pills" className="flex-column">
                                                <Nav.Item>
                                                    <Nav.Link eventKey="vitals">Vital Signs</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="details">Details</Nav.Link>
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
                                                <Tab.Pane eventKey="vitals">
                                                    <PatientOverview subjectId={subjectId}/>
                                                    <NHSPanelWithLabel style={{backgroundColor: '#f0f4f5'}}>
                                                        <NHSPanelTitle class="nhsuk-panel-with-label__label">
                                                            Patient's History
                                                        </NHSPanelTitle>
                                                        <NHSPanelBody>
                                                            <Tab.Container defaultActiveKey="bloodPressure">
                                                                <Nav variant="tabs"
                                                                     style={{ marginBottom: '40px' }}>
                                                                    <Nav.Item>
                                                                        <Nav.Link eventKey="bloodPressure">Blood
                                                                            Pressure</Nav.Link>
                                                                    </Nav.Item>
                                                                    <Nav.Item>
                                                                        <Nav.Link eventKey="heartRate">Heart
                                                                            Rate</Nav.Link>
                                                                    </Nav.Item>
                                                                    <Nav.Item>
                                                                        <Nav.Link eventKey="respirationRate">Respiration
                                                                            Rate</Nav.Link>
                                                                    </Nav.Item>
                                                                    {/* <Nav.Item>
                                                                    <Nav.Link eventKey="bodyComposition">Body
                                                                        Composition</Nav.Link>
                                                                </Nav.Item> */}
                                                                    <Nav.Item>
                                                                        <Nav.Link eventKey="indirectOximetry">Oxygen
                                                                            Saturation</Nav.Link>
                                                                    </Nav.Item>
                                                                </Nav>
                                                                <Tab.Content>
                                                                    <Tab.Pane eventKey="bloodPressure">
                                                                        <div><PressureGraph
                                                                            ehrId={this.state.ehrId}/></div>
                                                                    </Tab.Pane>
                                                                    <Tab.Pane eventKey="heartRate">
                                                                        <div><HeartGraph ehrId={this.state.ehrId}/>
                                                                        </div>
                                                                    </Tab.Pane>
                                                                    <Tab.Pane eventKey="respirationRate">
                                                                        <div><RespirationGraph
                                                                            ehrId={this.state.ehrId}/></div>
                                                                    </Tab.Pane>
                                                                    {/* <Tab.Pane eventKey="bodyComposition">
                                                                    <div id="bodyCompContainer"
                                                                         style={{ width: '700px', height: '500px' }}
                                                                         className="sbodyComp"/>
                                                                </Tab.Pane> */}
                                                                    <Tab.Pane eventKey="indirectOximetry">
                                                                        <div><OxygenConcentrationGraph
                                                                            ehrId={this.state.ehrId}/></div>
                                                                    </Tab.Pane>
                                                                </Tab.Content>
                                                            </Tab.Container>
                                                        </NHSPanelBody>
                                                    </NHSPanelWithLabel>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="patientProgress">
                                                    <PatientProgressTable ehrId={this.state.ehrId}/>
                                                    <div><ScoresArray ehrId={this.state.ehrId}/></div>
                                                    <div><EpisodeScoresGraph ehrId={this.state.ehrId}/></div>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="report">
                                                    <PatientRecordsReport
                                                        content={<div><p>Initial treatment for a broken leg usually
                                                            begins
                                                            in an
                                                            emergency room or
                                                            urgent care clinic. Here, doctors typically evaluate
                                                            your injury
                                                            and
                                                            immobilize your leg with a splint. If you have a
                                                            displaced
                                                            fracture,
                                                            your
                                                            doctor may need to manipulate the pieces back into their
                                                            proper
                                                            positions
                                                            before applying a splint — a process called reduction.
                                                            Some
                                                            fractures are
                                                            splinted for a day to allow swelling to subside before
                                                            they are
                                                            casted.</p>
                                                            <p>After your cast or splint is removed, you'll likely
                                                                need
                                                                rehabilitation
                                                                exercises or physical therapy to reduce stiffness
                                                                and
                                                                restore
                                                                movement
                                                                in
                                                                the injured leg. Because you haven't moved your leg
                                                                for a
                                                                while,
                                                                you may
                                                                even have stiffness and weakened muscles in
                                                                uninjured areas.
                                                                Rehabilitation
                                                                can help, but it may take up to several months — or
                                                                even
                                                                longer
                                                                — for
                                                                complete healing of severe injuries.</p>
                                                            <p>For some injuries, your doctor may also recommend an
                                                                external
                                                                fixation
                                                                device
                                                                — a frame outside your leg attached to the bone with
                                                                pins.
                                                                This
                                                                device
                                                                provides stability during the healing process and is
                                                                usually
                                                                removed
                                                                after
                                                                about six to eight weeks. There's a risk of
                                                                infection around
                                                                the
                                                                surgical
                                                                pins connected to the external fixation device.</p>
                                                            <p>What Can You Do?</p>
                                                            <p>1.Detailed descriptions of the symptoms and the
                                                                precipitating
                                                                event</p>
                                                            <p>2.Information about past medical problems</p>
                                                            <p>3.All the medications and dietary supplements you or
                                                                your
                                                                child
                                                                takes</p>
                                                            <p>4.Questions you want to ask the doctor</p>
                                                        </div>}/><br/>
                                                    <NHSFormGroup>
                                                        <NHSFormLabel>
                                                            <strong>Clinician's Log</strong>
                                                        </NHSFormLabel>
                                                        <NHSFormHint>
                                                            Record any findings and records of this patient here.
                                                        </NHSFormHint>
                                                        <NHSTextArea id="log" name="log" rows="4" aria-describedby="log-hint"></NHSTextArea><br/>
                                                        <NHSButton onClick={this.onSubmit} type="submit">Submit</NHSButton>
                                                    </NHSFormGroup>
                                                    <NHSPanelWithLabel style={{backgroundColor: '#f0f4f5'}}>
                                                        <NHSPanelTitle class="nhsuk-panel-with-label__label">
                                                            Laboratory Orders and Reports
                                                        </NHSPanelTitle>
                                                        <NHSPanelBody>
                                                        <Tab.Container defaultActiveKey="labOrders">
                                                                <Nav variant="tabs"
                                                                     style={{ marginBottom: '40px' }}>
                                                                    <Nav.Item>
                                                                        <Nav.Link eventKey="labOrders">Lab
                                                                            Orders</Nav.Link>
                                                                    </Nav.Item>
                                                                    <Nav.Item>
                                                                        <Nav.Link eventKey="labReports">Lab
                                                                            Reports</Nav.Link>
                                                                    </Nav.Item>
                                                                </Nav>
                                                                <Tab.Content>
                                                                    <Tab.Pane eventKey="labOrders">
                                                                        <div><LabOrdersTable
                                                                            ehrId={this.state.ehrId}/></div>
                                                                    </Tab.Pane>
                                                                    <Tab.Pane eventKey="labReports">
                                                                        <LabReportsTable ehrId={this.state.ehrId}/>
                                                                    </Tab.Pane>
                                                                </Tab.Content>
                                                            </Tab.Container>
                                                        </NHSPanelBody>
                                                    </NHSPanelWithLabel>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="details">
                                                    <h3><strong>Allergic Details</strong></h3>
                                                    <div><PatientAllergiesTable ehrId={this.state.ehrId}/></div>
                                                    <br/>
                                                    <h3><strong>Procedures Details</strong></h3>
                                                    <div><ProceduresTable ehrId={this.state.ehrId}/></div>
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </Col>
                                    </Row>
                                </Tab.Container>
                            </NHSPanelBody>
                        </NHSPanel>
                    </NHSWrapper>
                </NHSContainer>
                <NHSFooter/>
            </div>
        );
    }
}

export default PatientRecords;

