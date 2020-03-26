import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HeaderMenu from "../components/HeaderMenu";
import { connect } from 'react-redux';
import qs from "qs";

import { userSignupRequest, sendCode, checkCode } from '../actions/signupActions';
import NHSContainer from "../components/react-styled-nhs/src/NHSContainer";
import NHSWrapper from "../components/react-styled-nhs/src/NHSWrapper";
import NHSFooter from "../components/react-styled-nhs/src/NHSFooter";
import {
    NHSButton,
    NHSFormControl,
    NHSFormGroup,
    NHSFormHint,
    NHSFormLabel
} from "../components/react-styled-nhs/src/NHSComponents";
import NHSBackLink from "../components/react-styled-nhs/src/NHSBackLink";
import { CDRHeaders } from "../components/Queries/CDROptions";
import environment from "../environment";
import * as axios from "axios";


class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordConfirmation: '',
            type: '',
            code: '',
            timer: 60,
            discodeBtn: false,
            clearInterval: false,
            btnText: 'Send Code',
            history: require('history').createBrowserHistory()
        };
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    goback = () => {
        this.state.history.goBack();
    };

    onSubmit = (e) => {
        e.preventDefault();
        let email = this.state.email;
        let code = this.state.code;

        if (code === '') {
            return alert('Please enter code')
        }

        if (email === '') {
            return alert('Please enter your e-mail.')
        }
        // 验证密码
        if (this.state.password === '' || this.state.passwordConfirmation === '') {
            return alert('Please enter your password')
        }

        if (this.state.password !== this.state.passwordConfirmation) {
            return alert('Entered passwords differ!')
        }

        // 先验证验证码 再注册
        this.props.checkCode({ code: this.state.code }).then(
            res => {
                if (res.data.code === 200) {
                    // 验证码正确
                    this.props.userSignupRequest(this.state).then(
                        (res) => {
                            // 通知成功
                            if (res.data.code === 200) {
                                alert('registration success');
                                console.log('Registration success');
                                this.goback();
                            } else {
                                alert(res.data.message);
                            }
                        },
                        (res) => {
                            // 通知错误
                            console.log(res);
                        }
                    )
                } else {
                    alert(res.data.message);
                }
            },
            res => {
                console.log(res.message);
            }
        )
    };

    handleClick = (e) => {
        e.preventDefault();
        let email = this.state.email;
        if (email === '') {
            return alert('Please enter your e-mail.')
        }

        // 发送验证码
        this.props.sendCode(this.state).then(
            res => {
                if (res.data.code === 200) {
                    alert(res.data.message);
                    this.count()
                } else {
                    alert(res.data.message);
                }
            },
            res => {
                console.log(res)
            }
        );
    };

    count = () => {
        let timer = this.state.timer;
        let siv = setInterval(() => {
            this.setState({ timer: (timer--), btnText: timer, discodeBtn: true }, () => {
                if (timer === 0) {
                    clearInterval(siv);
                    this.setState({ timer: 60, btnText: 'Resend', discodeBtn: false })
                }
            });
        }, 1000);
    };

    componentDidMount() {
        let id = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id;
        let type;
        if (id === '1') {
            type = 'Patient';
        } else if (id === '2') {
            type = 'Clinicians';
        } else {
            //TODO: better solution than redirect?
            window.location.href = "/";
        }
        this.setState({ type })
    }

    render() {
        return (
            <div>
                <HeaderMenu navigationDisabled searchDisabled/>
                <NHSContainer>
                    <NHSWrapper>
                        <NHSBackLink href={'/'}>Go back</NHSBackLink>
                        <div className="nhsuk-grid-row">
                            <div className="nhsuk-grid-column-two-thirds">
                                <Form onSubmit={this.onSubmit}>
                                    <h1 style={{ fontWeight: 'bold' }}>Register with orthoPROMS</h1><br/>
                                    <Row>
                                        <Col>
                                            <NHSFormGroup controlId="formBasicEmail">
                                                <NHSFormLabel>Email address</NHSFormLabel>
                                                <NHSFormHint>
                                                    We'll never share your email with anyone else.
                                                </NHSFormHint>
                                                <NHSFormControl type="email" placeholder="Enter email" name="email"
                                                                onChange={this.onChange}/>
                                            </NHSFormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <NHSFormGroup controlId="formBasicCode">
                                                <NHSFormLabel>Code</NHSFormLabel>
                                                <NHSFormControl type="text" placeholder="Enter Code" name="code"
                                                                onChange={this.onChange}/>
                                            </NHSFormGroup>
                                        </Col>
                                        <Col>
                                            <NHSButton variant="outline-primary" block style={{ 'margin-top': '32px' }}
                                                       onClick={this.handleClick}
                                                       disabled={this.state.discodeBtn}>{this.state.btnText}</NHSButton>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <NHSFormGroup controlId="formBasicPassword">
                                                <NHSFormLabel>Password</NHSFormLabel>
                                                <NHSFormControl type="password" placeholder="Password" name="password"
                                                                onChange={this.onChange}/>
                                            </NHSFormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <NHSFormGroup controlId="formBasicPassword">
                                                <NHSFormLabel>Confirmation Password</NHSFormLabel>
                                                <NHSFormControl type="password" placeholder="Password"
                                                                name="passwordConfirmation" onChange={this.onChange}/>
                                            </NHSFormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <NHSFormGroup controlId="nhsNumber">
                                                <NHSFormLabel>NHS Number</NHSFormLabel>
                                                <NHSFormControl type="number" placeholder="NHS Number"
                                                                name="nhsNumber" onChange={this.onChange}/>
                                            </NHSFormGroup>
                                        </Col>
                                    </Row>
                                    <NHSButton onClick={this.onSubmit} type="submit">Submit</NHSButton>
                                </Form>
                            </div>
                        </div>
                    </NHSWrapper>
                </NHSContainer>
                <NHSFooter/>
            </div>
        );
    }
}

// export default Register;
export default connect(null, { userSignupRequest, sendCode, checkCode })(Register)
