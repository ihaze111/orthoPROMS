import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Alert from 'react-bootstrap/Alert';
import Nav from 'react-bootstrap/Nav';

import $ from 'jquery';
import HeaderMenu from "../../components/HeaderMenu";
import * as PropTypes from "prop-types";
import { PatientOverview, PatientProgressTable, ScoresArray, EpisodeScoresGraph } from "../PatientComponents";
import { getSubjectId, loadEhrId } from "../PatientUtils";
import Template from "./Template";

function SurveySuccess() {
    return <Alert variant="success" onClose={() => {
        $('#submitSurveyDialog').fadeOut(500)
    }} dismissible id="submitSurveyDialog">
        <Alert.Heading>Thank for submitting</Alert.Heading>
        <p>We will give you feedback and update the survey to your data.</p>
    </Alert>;
}

SurveySuccess.propTypes = { onClose: PropTypes.func };

class PatientSelf extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            painArray: []
        };
    }

    componentDidMount() {
        loadEhrId.call(this);

        $('#submitSurveyDialog').hide();

    }

    render() {
        let subjectId = getSubjectId(this.props.location.search);
        return (
            <div>
                <HeaderMenu/>
                <Container style={{ marginTop: '50px' }}>
                    <PatientOverview subjectId={subjectId}/>
                    <Card>
                        <Card.Header>
                            <Card.Title>Details</Card.Title>
                        </Card.Header>
                        <Card.Body>
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
                                        <PatientProgressTable ehrId={this.state.ehrId}/>
                                    </Tab.Pane>
                                    {/* <Tab.Pane eventKey="test">
                                        <div style={{width: '1000px', height: '400px'}}><EpisodeScoresGraph ehrId={this.state.ehrId}/></div>
                                    </Tab.Pane> */}
                                    <Tab.Pane eventKey="myData">
                                        <div><ScoresArray ehrId={this.state.ehrId}/></div>
                                        <br/><br/><br/>
                                        <div style={{ width: '1000px', height: '400px' }}><EpisodeScoresGraph
                                            ehrId={this.state.ehrId}/></div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="survey">
                                        <Template/>
                                        <SurveySuccess/>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }
}

export default PatientSelf;
