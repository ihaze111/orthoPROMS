import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import HeaderMenu from "../components/HeaderMenu";
import { connect } from 'react-redux';
import qs from "qs";

import { userSignupRequest, sendCode, checkCode } from '../actions/signupActions'
import NHSHeader from "../components/NHS/NHSHeader";
import NHSContainer from "../components/NHS/NHSContainer";
import NHSWrapper from "../components/NHS/NHSWrapper";
import NHSFooter from "../components/NHS/NHSFooter";
import { NHSButton, NHSFormControl, NHSFormGroup, NHSFormHint, NHSFormLabel } from "../components/NHS/NHSComponents";
import NHSCheckbox from "../components/NHS/NHSCheckbox";
import NHSBackLink from "../components/NHS/NHSBackLink";

class Register extends React.Component {

    constructor(props) {
        super(props)
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
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    goback = () => {
        this.state.history.goBack();
    }

    onSubmit = (e) => {
        e.preventDefault();
        let email = this.state.email
        if (email === '') {
            return alert('Please enter your e-mail.')
        }
        // 验证密码
        if (this.state.password == '' || this.state.passwordConfirmation == '') {
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
                                console.log('注册成功')
                                alert(res.data.message)
                                this.goback()
                            } else {
                                alert(res.data.message)

                            }

                        },
                        (res) => {
                            // 通知错误
                            console.log(res)
                        }
                    )
                } else {
                    alert(res.data.message)
                }
            },
            res => {
                console.log(res.message)
            }
        )

    }

    handleClick = () => {
        let email = this.state.email
        if (email === '') {
            return alert('Please enter your e-mail.')
        }

        // 发送验证码
        this.props.sendCode(this.state).then(
            res => {
                if (res.data.code === 200) {
                    alert(res.data.message)
                    this.count()
                } else {
                    alert(res.data.message)
                }
            },
            res => {
                console.log(res)
            }
        )
    }

    count = () => {
        let timer = this.state.timer
        let siv = setInterval(() => {
            this.setState({ timer: (timer--), btnText: timer, discodeBtn: true }, () => {
                if (timer === 0) {
                    clearInterval(siv);
                    this.setState({ timer: 60, btnText: 'Resend', discodeBtn: false })
                }
            });
        }, 1000);
    }

    componentDidMount() {
        let id = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id;
        let type
        if (id == 1) {
            type = 'Patient'
        } else if (id == 2) {
            type = 'Clinicians'
        } else {
            window.location.href = "/"
        }
        this.setState({ type })
    }

    render() {


        return (
            <div>
                <NHSHeader navigationDisabled searchDisabled/>
                <NHSContainer>
                    <NHSWrapper>
                        <NHSBackLink href={'/Login?id=' + qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id}>Go back</NHSBackLink>
                        <div className="nhsuk-grid-row">
                            <div className="nhsuk-grid-column-two-thirds">
                                <Form onSubmit={this.onSubmit}>
                                    <h1 style={{ fontWeight: 'bold' }}>Register with orthoPROMS</h1><br />
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
