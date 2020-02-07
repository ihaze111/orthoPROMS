import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Highcharts from 'highcharts';
import $ from 'jquery';
import HeaderMenu from "../../components/HeaderMenu";
import RadarChart from "../../components/Charts/RadarChart";
import getTemplate from "../../components/GetTemplate";
import getCompositions from "../../components/GetCompositions";
import getEHRId from "../../components/GetEHRId";

import qs from "qs";

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
            <input type="submit"/>
        </Form>;
    }
}

class EHRId extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let promise = getEHRId(this.props.subjectId);
        promise.then((e) => {
            this.setState({ ehrId: e });
        });
    }

    render() {
        if (!this.state.ehrId) return null;
        return <span>{this.state.ehrId}</span>;
    }
}

class PatientSelf extends React.Component {
    componentDidMount() {
        this.subjectId = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).subjectId ? qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).subjectId : "9999999000";
        console.log("Subject ID");
        console.log(this.subjectId);
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
                    'Authorization': '***REMOVED***'
                },
                body: JSON.stringify(compositionSring)
            };
            request(options, function (error, response) {
                if (error) throw new Error(error);
                console.log(response.body);
            });
        }


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
        Highcharts.chart('container', options);
        $(".model").hide();
        $(".sshuju").hide();
        $(".sform").hide();
        $(".model").hide();
        $(".sjindu").show();

        $(".jindu").click(function () {
            $(".sshuju").hide();
            $(".sjindu").show();
            $(".sform").hide();
        });

        $(".form").click(function () {
            $(".sjindu").hide();
            $(".sshuju").hide();
            $(".sform").show();
        });

        $(".shuju").click(function () {
            $(".sshuju").show();
            $(".sjindu").hide();
            $(".sform").hide();
        });

        $(".submit_btn").click(function () {
            $(".model").fadeIn(100);
        });

        $(".close_btn").click(function () {
            $(".model").hide();
        });

        $(".close").click(function () {
            $(".model").hide();
        });
    }

    render() {
        return (
            <div>
                <HeaderMenu/>
                <Container>
                    <div style={{ height: '50px' }}></div>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '50%' }}>
                            <p>EHR ID: <EHRId subjectId={"9999999000"}/></p>
                            <p>Name: Kim</p>
                            <p>Age: 65</p>
                            <p>Sex: M</p>
                            <p>Type: Fracture</p>
                            <p>Your GP: Doctor.Jack</p>
                        </div>
                        <div style={{ width: '40%', alignSelf: 'center', textAlign: 'center' }}>
                            <img src="./240px-User_icon_2.svg.png"
                                 style={{ width: '40%' }} alt=""/>
                        </div>
                    </div>
                    <Card>
                        <Card.Header>Details</Card.Header>
                        <Card.Body>
                            <Card.Title></Card.Title>
                            <Button className="btn btn-primary btn-lg jindu">My
                                Progress</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button className="btn btn-primary btn-lg shuju">My
                                Data </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button className="btn btn-primary btn-lg form">My Survey</Button>
                            <div style={{ height: '40px' }}></div>
                            <div style={{ display: 'flex' }} className="sjindu">
                                <div style={{ width: '100%' }}>
                                    <Table striped bordered hover>
                                        <thead>
                                        <PatientProgressTableEntry nhs_number="NHS Number"
                                                                   composer_name="Composer Name"
                                                                   episode_identifier="Episode Identifier"
                                                                   aofas_comment="AOFAS Comment"/>
                                        </thead>
                                        <tbody>
                                        <Compositions/>

                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                            <div className="sshuju">
                                <div id="container" style={{ width: '900px', height: '500px' }}>
                                </div>
                                <RadarChart label={"Metrics"} data={[1, 2, 3, 4]}
                                            labels={["Pain", "Activity limitations and support requirements", "Walking",
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
                                ]}/></div>
                            <div className="sform">
                                <Template/>
                            </div>
                        </Card.Body>
                    </Card>
                    <div className="model">
                        <div className="modal-dialog"
                             style={{ position: 'absolute', top: '0', left: '0', marginLeft: '39%' }}>
                            <div className="modal-content">
                                <Modal.Header closeButton>
                                    <Modal.Title>Thank for submitting</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    <p>We will give you feedback and update the survey to your data.</p>
                                </Modal.Body>

                                <Modal.Footer>
                                    <Button variant="secondary" className="close_btn" block>Close</Button>
                                </Modal.Footer>
                            </div>
                        </div>
                    </div>
                </Container>

            </div>
        );
    }
}

export default PatientSelf;
