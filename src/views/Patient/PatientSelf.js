import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Alert from 'react-bootstrap/Alert';
import Nav from 'react-bootstrap/Nav';

import $ from 'jquery';
import * as PropTypes from "prop-types";
import { PatientOverview, PatientProgressTable, ScoresArray, EpisodeScoresGraph } from "../PatientComponents";
import { getSubjectId, getEHRId } from "../PatientUtils";
import Template from "./Template";
import NHSHeader from "../../components/nhsuk-frontend-react/NHSHeader";
import NHSContainer from "../../components/nhsuk-frontend-react/NHSContainer";
import NHSWrapper from "../../components/nhsuk-frontend-react/NHSWrapper";
import { NHSTableWrapperTest } from "../../components/nhsuk-frontend-react/NHSTableWrapperTest";
import { NHSPanel, NHSPanelBody, NHSPanelTitle } from "../../components/nhsuk-frontend-react/NHSPanel";
import NHSFooter from "../../components/nhsuk-frontend-react/NHSFooter";

// import Chart1 from "../../components/Graphs/Chart1";

function SurveySuccess() {
    return <Alert variant="success" onClose={() => {
        $('#submitSurveyDialog').fadeOut(500)
    }} dismissible id="submitSurveyDialog">
        <Alert.Heading>Thank for submitting</Alert.Heading>
        <p>We will give you feedback and update the survey to your data.</p>
    </Alert>;
}

SurveySuccess.propTypes = { onClose: PropTypes.func };

function PatientSelf(props) {
    let subjectId = getSubjectId(props.location.search);
    const [ehrId, setEhrId] = useState('');
    getEHRId(subjectId).then((e) => {
        setEhrId(e);
    });
    return (
        <div style={{ backgroundColor: '#f0f4f5' }}>
            <NHSHeader/>
            <NHSContainer>
                <NHSWrapper>
                    <PatientOverview subjectId={subjectId}/>
                    <NHSPanel>
                        <NHSPanelTitle>
                            Details
                        </NHSPanelTitle>
                        <NHSPanelBody>
                            <Tab.Container defaultActiveKey="myProgress">
                                <Nav variant="tabs" style={{ marginBottom: '40px' }}>
                                    <Nav.Item>
                                        <Nav.Link eventKey="myProgress">My Progress</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="myData">My Data</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="survey">Survey</Nav.Link>
                                    </Nav.Item>
                                    {/* <Nav.Item>
                                        <Nav.Link eventKey="test">Test</Nav.Link>
                                    </Nav.Item> */}
                                </Nav>
                                <Tab.Content>
                                    <Tab.Pane eventKey="myProgress">
                                        <PatientProgressTable ehrId={ehrId}/>
                                    </Tab.Pane>
                                    {/* <Tab.Pane eventKey="test">
                                        <div style={{width: '1000px', height: '400px'}}><EpisodeScoresGraph ehrId={this.state.ehrId}/></div>
                                    </Tab.Pane> */}
                                    <Tab.Pane eventKey="myData">
                                        <div><ScoresArray ehrId={ehrId}/></div>
                                        <br/><br/><br/>
                                        <div><EpisodeScoresGraph
                                            ehrId={ehrId}/></div>
                                        {/* <br/><br/><br/>
                                    <div><Chart1 bingbong="bingbong"/></div> */}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="survey">
                                        <Template/>
                                        <SurveySuccess/>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </NHSPanelBody>
                    </NHSPanel>

                </NHSWrapper>
            </NHSContainer>
            <NHSFooter/>
        </div>
    );
}

export default PatientSelf;
