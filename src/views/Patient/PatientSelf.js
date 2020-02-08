import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Tab from 'react-bootstrap/Tab';
import Alert from 'react-bootstrap/Alert';
import Nav from 'react-bootstrap/Nav';

import Highcharts from 'highcharts';
import $ from 'jquery';
import HeaderMenu from "../../components/HeaderMenu";
import RadarChart from "../../components/Charts/RadarChart";
import getTemplate from "../../components/GetTemplate";
import getCompositions from "../../components/GetCompositions";

import qs from "qs";
import * as PropTypes from "prop-types";
import { PatientOverview } from "../PatientComponents";
import { getSubjectId } from "../PatientUtils";

function PatientProgressTableEntry(props) {
    return <tr>
        <td>{props.nhs_number}</td>
        <td>{props.composer_name}</td>
        <td>{props.episode_identifier}</td>
        <td>{props.aofas_comment}</td>
    </tr>;
}

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

class Compositions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let promise = getCompositions();
        promise.then((e) => {
            console.log("EEEEEE");
            console.log(e);
            this.setState({ compositions: e });
        });
    }

    render() {
        if (!this.state.compositions) return null;
        return this.state.compositions.map((e) =>
            PatientProgressTableEntry(e)
        )
    }
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

function PatientProgressTable() {
    return <Table striped bordered hover>
        <thead>
        <PatientProgressTableEntry nhs_number="NHS Number"
                                   composer_name="Composer Name"
                                   episode_identifier="Episode Identifier"
                                   aofas_comment="AOFAS Comment"/>
        </thead>
        <tbody>
        <Compositions/>

        </tbody>
    </Table>;
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
    componentDidMount() {

        if (this.props.location.search !== "") {
            const compositionSring = {
                "ctx/language": "en",
                "ctx/territory": "GB",
                "ctx/composer_name": "Silvia Blake",
                "ctx/id_namespace": "HOSPITAL-NS",
                "ctx/id_scheme": "HOSPITAL-NS",
                "ctx/health_care_facility|name": "Hospital",
                "ctx/health_care_facility|id": "9091",
                "uclh_foot_and_ankle_proms/aofas_score/q1_pain|code": "at0032"
            };
            // compositionSring.templateId = "Foot_and_Ankle_PROMs-v0";
            // compositionSring.ehrId = "d9668d3d-85fa-488f-97f3-53c8765c22fb";
            const getVariables = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
            console.log(getVariables);
            for (let x in getVariables) {
                compositionSring["uclh_foot_and_ankle_proms/aofas_score/" + x + "|code"] = getVariables[x];
            }
            var request = require('request');
            var options = {
                'method': 'POST',
                'url': 'https://cdr.code4health.org/rest/v1/composition?ehrId=b80a3a97-be75-41c6-a497-6ed53ce8f8c6&templateId=Foot_and_Ankle_PROMs-v0&committerName=Dr nullnull&format=FLAT',
                'headers': {
                    'Ehr-Session-disabled': '{{Ehr-Session}}',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic YmIyNjRiY2UtYzQwNy00OTgyLTkwMTctOTdkMzcyN2ZjZmE0OiQyYSQxMCQ2MTlraQ=='
                },
                body: JSON.stringify(compositionSring)
            };
            request(options, function (error, response) {
                if (error) throw new Error(error);
                console.log(response.body);
            });
        }

        $('#submitSurveyDialog').hide();

        // 图表配置
        var options = {
            chart: {
                type: 'line'                          //指定图表的类型，默认是折线图（line）
            },
            title: {
                text: '0: Bad | 10: Good'                 // 标题
            },
            xAxis: {
                categories: ['2019/11/20', '2019/11/23', '2019/11/26', '2019/12/10', '2019/12/14', '2019/12/20']   // x
                                                                                                                   // 轴分类
            },
            yAxis: {
                title: {
                    text: 'Total Score'                // y 轴标题
                }
            },
            series: [{                              // 数据列
                name: 'distance walked',                        // 数据列名
                data: [0, 3, 3, 4, 6, 9]                     // 数据
            }, {
                name: 'pain level',
                data: [10, 10, 9, 7, 4, 2]
            }, {
                name: 'joint comfortness',
                data: [1, 2, 2, 5, 8, 9.5]
            }]
        };
        // 图表初始化函数
        Highcharts.chart('highchartsContainer', options);
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
                                        <PatientProgressTable/>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="myData">
                                        <div id="highchartsContainer" style={{ width: '900px', height: '500px' }}>
                                        </div>
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
