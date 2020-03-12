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
                        <div style={{
                            display: 'flex',
                            alignSelf: 'center',
                            justifyContent: 'center',
                            marginTop: '10%'
                        }}>
                            <Form onSubmit={this.onSubmit}>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control type="email" placeholder="Enter email" name="email"
                                                          onChange={this.onChange}/>
                                            <Form.Text className="text-muted">
                                                We'll never share your email with anyone else.
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="formBasicCode">
                                            <Form.Label>Code</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Code" name="code"
                                                          onChange={this.onChange}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Button variant="outline-primary" block style={{ 'margin-top': '32px' }}
                                                onClick={this.handleClick}
                                                disabled={this.state.discodeBtn}>{this.state.btnText}</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Password" name="password"
                                                          onChange={this.onChange}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Confirmation Password</Form.Label>
                                            <Form.Control type="password" placeholder="Password"
                                                          name="passwordConfirmation" onChange={this.onChange}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Check me out"/>
                                </Form.Group>
                                <button className="btn btn-primary btn-block login">Submit</button>
                            </Form>
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
