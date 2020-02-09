import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Alert from 'react-bootstrap/Alert';
import Nav from 'react-bootstrap/Nav';

import $ from 'jquery';
import HeaderMenu from "../../components/HeaderMenu";
import RadarChart from "../../components/Charts/RadarChart";
import getTemplate from "../../components/GetTemplate";
import * as PropTypes from "prop-types";
import { PatientOverview, PatientProgressTable, ScoresArray} from "../PatientComponents";
import { getSubjectId, loadEhrId } from "../PatientUtils";

function SurveyQuestionInput(props) {
    const inputs = props.inputs;
    if (props.inputType === 'radio') {
        return <div key={`inline-radio`} className="mb-3">
            {/*<input type="hidden" name={`${props.nodeId}-aqlPath`} value={props.aqlPath}/>*/}
            {inputs[0].list.map(function (input, index) {
                return (<Form.Check label={`${input.label}`} value={`${input.value}`} type="radio"
                                    key={`${props.name}-${input.label}-${index}`}
                                    id={`${props.id}-${input.label}-${index}`} name={`${props.id}`}/>
                )
            })}
        </div>;
    } else {
        return <div key={`inline-text`} className="mb-3">
            <Form.Control type="text"/>
        </div>;
    }
}

function SurveyQuestion(props) {
    return <Form.Group controlId={`${props.name}`}
                       style={{ marginLeft: '0px', marginRight: '2px' }} className="surveyQuestion">
        <p>{props.name}</p>
        <span style={{ color: 'grey', fontSize: '0.8em' }}>{props.description}</span><br/>
        {SurveyQuestionInput(props)}
    </Form.Group>;
}


class Template extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let promise = getTemplate();
        promise.then((e) => {
            this.setState({ template: e });
        });
    }

    // handleSubmit(event) {
    //     event.preventDefault();
    //     // this.setState({ template: this.state.template, submitted: "YES" });
    //     alert("hi");
    // }

    render() {
        if (!this.state.template) return null;
        return <Form method="GET">
            {this.state.template.map((e) => (
                SurveyQuestion(e)))}
            {/*<input type="submit"/>*/}
            <Button id="submit" onClick={() => {
                $('#submitSurveyDialog').fadeIn(500)
            }}>Submit</Button>
        </Form>;
    }
}

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
            painArray : []
        };
    }

    componentDidMount() {
        loadEhrId.call(this);

        // if (this.props.location.search !== "") {
        //     const compositionSring = {
        //         "ctx/language": "en",
        //         "ctx/territory": "GB",
        //         "ctx/composer_name": "Silvia Blake",
        //         "ctx/id_namespace": "HOSPITAL-NS",
        //         "ctx/id_scheme": "HOSPITAL-NS",
        //         "ctx/health_care_facility|name": "Hospital",
        //         "ctx/health_care_facility|id": "9091",
        //         "uclh_foot_and_ankle_proms/aofas_score/q1_pain|code": "at0032"
        //     };
        //     // compositionSring.templateId = "Foot_and_Ankle_PROMs-v0";
        //     // compositionSring.ehrId = "d9668d3d-85fa-488f-97f3-53c8765c22fb";
        //     const getVariables = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
        //     console.log(getVariables);
        //     for (let x in getVariables) {
        //         compositionSring["uclh_foot_and_ankle_proms/aofas_score/" + x + "|code"] = getVariables[x];
        //     }
        //     var request = require('request');
        //     var options = {
        //         'method': 'POST',
        //         'url': 'https://cdr.code4health.org/rest/v1/composition?ehrId=b80a3a97-be75-41c6-a497-6ed53ce8f8c6&templateId=Foot_and_Ankle_PROMs-v0&committerName=Dr nullnull&format=FLAT',
        //         'headers': {
        //             'Ehr-Session-disabled': '{{Ehr-Session}}',
        //             'Content-Type': 'application/json',
        //             'Authorization': 'Basic YmIyNjRiY2UtYzQwNy00OTgyLTkwMTctOTdkMzcyN2ZjZmE0OiQyYSQxMCQ2MTlraQ=='
        //         },
        //         body: JSON.stringify(compositionSring)
        //     };
        //     request(options, function (error, response) {
        //         if (error) throw new Error(error);
        //         console.log(response.body);
        //     });
        // }

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
                                </Nav>
                                <Tab.Content>
                                    <Tab.Pane eventKey="myProgress">
                                        <PatientProgressTable ehrId={this.state.ehrId}/>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="myData">
                                        {/* <div style={{ width: '900px', height: '500px' }}> */}    
                                        {/* </div> */}
                                        <div><ScoresArray ehrId={this.state.ehrId}/></div>
                                        <RadarChart label={"Metrics"} data={[1, 2, 3, 4]}
                                                    labels={["Pain",
                                                        "Activity limitations and support requirements", "Walking",
                                                        "Walking surfaces"]} datasets={[
                                            {
                                                label: "Before surgery",
                                                data: [1, 2, 3, 4],
                                                backgroundColor: [
                                                    "red",
                                                    "orange",
                                                    "yellow",
                                                    "green",
                                                    "blue",
                                                    "indigo",
                                                    "violet",
                                                ]
                                            },
                                            {
                                                label: "After surgery",
                                                data: [8, 5, 6, 2],
                                                backgroundColor: [
                                                    "red",
                                                    "orange",
                                                    "yellow",
                                                    "green",
                                                    "blue",
                                                    "indigo",
                                                    "violet",
                                                ],
                                            },
                                        ]}/>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="survey">
                                        <Template/>
                                        <br/>
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
