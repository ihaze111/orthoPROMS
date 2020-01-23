import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Highcharts from 'highcharts';
import $ from 'jquery';
import HeaderMenu from "../../components/HeaderMenu";
import RadarChart from "../../components/Charts/RadarChart";
import getTemplate from "../../components/GetTemplate";

function PatientProgressTableEntry(props) {
    return <tr>
        <td>{props.doctorsLog}</td>
        <td>{props.date}</td>
        <td>{props.record}</td>
        <td>{props.severity}</td>
    </tr>;
}

function SurveyQuestion(props) {
    const labels = props.labels;
    if (props.inputType === 'radio') {
        return <div className="surveyQuestion">
            <p>{props.name}</p>
            <span style={{ color: 'grey', fontSize: '0.8em' }}>{props.description}</span><br/>
            <Form.Group as={Row} controlId="formHorizontalPassword"
                        style={{ marginLeft: '0px', marginRight: '2px' }}>
                {['radio'].map(type => (
                    <div key={`inline-${type}`} className="mb-3">
                        {labels.map(function (labelName, index) {
                            return (<Form.Check inline label={`${labelName}`} type={type}
                                                id={`inline-${type}-${index}`}/>
                            )
                        })}
                    </div>
                ))}
            </Form.Group>
        </div>;
    } else {
        return <div className="surveyQuestion">
            <p>{props.name}</p>
            <span style={{ color: 'grey', fontSize: '0.8em' }}>{props.description}</span><br/>
            <Form.Group as={Row} controlId="formHorizontalPassword"
                        style={{ marginLeft: '0px', marginRight: '2px' }}>
                <div key={`inline-text`} className="mb-3">
                    <Form.Control type="text"/>
                </div>
            </Form.Group>
        </div>;
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

    render () {
        if (!this.state.template) return null;
        return <Form>
            {this.state.template.map((e) => (SurveyQuestion(e)))}
            {/* <Button variant="primary" className="submit_btn">
                Submit
            </Button> */}
        </Form>;
    }
}

class PatientSelf extends React.Component {
    componentDidMount() {
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
        var chart = Highcharts.chart('container', options);
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
                            <p>Patient Number: 21406</p>
                            <p>Name: Kim</p>
                            <p>Age: 65</p>
                            <p>Sex: M</p>
                            <p>Type: Fracture</p>
                            <p>Your GP: Doctor.Jack</p>
                        </div>
                        <div style={{ width: '40%', alignSelf: 'center', textAlign: 'center' }}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5f/User_with_smile.svg"
                                 style={{ width: '40%' }} alt=""></img>
                        </div>
                    </div>
                    <Card>
                        <Card.Header>Details</Card.Header>
                        <Card.Body>
                            <Card.Title></Card.Title>
                            <a href="javascript:;" className="btn btn-primary btn-lg jindu">My
                                Progress</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <a href="javascript:;" className="btn btn-primary btn-lg shuju">My
                                Data </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <a href="javascript:;" className="btn btn-primary btn-lg form">My Survey</a>
                            <Card.Text>
                                <div style={{ height: '40px' }}></div>
                                <div style={{ display: 'flex' }} className="sjindu">
                                    <div style={{ width: '100%' }}>
                                        <Table striped bordered hover>
                                            <thead>
                                            <PatientProgressTableEntry doctorsLog="Doctor's Logs"
                                                                       date="Date" record="Record"
                                                                       severity="Severity"/>
                                            </thead>
                                            <tbody>
                                            <PatientProgressTableEntry doctorsLog="Outpatient" date="2019-11-20"
                                                                       record="Calf fracture" severity="Serious"/>
                                            <PatientProgressTableEntry doctorsLog="Osteosynthesis" date="2019-11-23"
                                                                       record="Already boned but fragile"
                                                                       severity="Successful operation"/>
                                            <PatientProgressTableEntry doctorsLog="Reinforced Support" date="2019-11-23"
                                                                       record="Bone into 20cm bracket"
                                                                       severity="Successful Access"/>
                                            <PatientProgressTableEntry doctorsLog="Be hospitalized" date="2019-11-23"
                                                                       record="Single VIP sickroom: No.2"
                                                                       severity="No other side effects"/>
                                            <PatientProgressTableEntry doctorsLog="Physiotherapy" date="2019-11-26"
                                                                       record="one hour of rehabilitation training"
                                                                       severity="Calf regained consciouseness"/>
                                            <PatientProgressTableEntry doctorsLog="Physiotherapy" date="To 2019-12-10"
                                                                       record="End of recovery traning"
                                                                       severity="Can walking"/>
                                            <PatientProgressTableEntry doctorsLog="Bracket Surgey" date="2019-12-14"
                                                                       record="Remove the bracket" severity="Get Well"/>
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                                <div className="sshuju">
                                    <div id="container" style={{ width: '900px', height: '500px' }}>
                                    </div>
                                    <RadarChart label={"Metrics"} data={[1, 2, 3, 4]}
                                                labels={["Pain", "Activity limitations and support requirements", "Walking", "Walking surfaces"]} datasets={[
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
                                    <Template />
                                    <Button variant="primary" className="submit_btn">
						submit
					</Button>
                                </div>
                            </Card.Text>
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
