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
import NHSContainer from "../../components/nhsuk-frontend-react/src/NHSContainer";
import NHSWrapper from "../../components/nhsuk-frontend-react/src/NHSWrapper";
import NHSBackLink from "../../components/nhsuk-frontend-react/src/NHSBackLink";
import { NHSPanel, NHSPanelBody, NHSPanelTitle, NHSPanelWithLabel } from "../../components/nhsuk-frontend-react/src/NHSPanel";
import NHSFooter from "../../components/nhsuk-frontend-react/src/NHSFooter";
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

    // cliniciansLogOnSubmit = (e) => {
    // }

    componentDidMount() {
        loadEhrId.call(this);
    }

    render() {
        let subjectId = getSubjectId(this.props.location.search);
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
                                                    <Nav.Link eventKey="labReport">Lab Report</Nav.Link>
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
                                                <Tab.Pane eventKey="labReport">
                                                    {/*
                                                    <NHSFormGroup>
                                                        <NHSFormLabel>
                                                            <strong>Clinician's Log</strong>
                                                        </NHSFormLabel>
                                                        <NHSFormHint>
                                                            Record any findings and records of this patient here.
                                                        </NHSFormHint>
                                                        <NHSTextArea id="log" name="log" rows="4" aria-describedby="log-hint"></NHSTextArea><br/>
                                                        <NHSButton onClick={this.cliniciansLogOnSubmit} type="submit">Submit</NHSButton>
                                                    </NHSFormGroup> */}
                                                    <NHSPanelWithLabel style={{backgroundColor: '#f0f4f5'}}>
                                                        <NHSPanelTitle class="nhsuk-panel-with-label__label">
                                                            Laboratory Orders and Reports
                                                        </NHSPanelTitle>
                                                        <NHSPanelBody>
                                                        <Tab.Container defaultActiveKey="labOrders">
                                                                <Nav variant="tabs"
                                                                     style={{ marginBottom: '40px' }}>
                                                                         <Nav.Item>
                                                                    <Nav.Link eventKey="labReports">Lab
                                                                            Reports</Nav.Link>
                                                                    </Nav.Item>
                                                                    <Nav.Item>
                                                                        <Nav.Link eventKey="labOrders">Lab
                                                                            Orders</Nav.Link>
                                                                    </Nav.Item>
                                                                </Nav>
                                                                <Tab.Content>
                                                                <Tab.Pane eventKey="labReports">
                                                                    <LabReportsTable ehrId={this.state.ehrId}/>
                                                                    </Tab.Pane>
                                                                    <Tab.Pane eventKey="labOrders">
                                                                        <div><LabOrdersTable
                                                                            ehrId={this.state.ehrId}/></div>
                                                                    </Tab.Pane>
                                                                </Tab.Content>
                                                            </Tab.Container>
                                                        </NHSPanelBody>
                                                    </NHSPanelWithLabel>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="details">
                                                    <h3><strong>Allergy Details</strong></h3>
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

