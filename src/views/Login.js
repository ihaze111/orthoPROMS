import React from 'react';
import Form from 'react-bootstrap/Form';
import $ from 'jquery';
import HeaderMenu from "../components/HeaderMenu";
import qs from "qs";
import Button from 'react-bootstrap/Button';
import { NHSButton, NHSFormControl, NHSFormGroup, NHSFormLabel, NHSButtonSecondary } from './NHSComponents';
import NHSHeader from "../components/NHS/NHSHeader";
import NHSContainer from "../components/NHS/NHSContainer";
import NHSWrapper from "../components/NHS/NHSWrapper";

class Login extends React.Component {
    handleClick() {
        alert('Password reset email has been sent.')
    }

    componentDidMount() {
        var xx = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id;

        $(".login").click(function () {
            if (xx === "1") {
                window.location.href = "/Patient?id=" + xx;
            } else if (xx === "2") {
                window.location.href = "/Clinician?id=" + xx;
            } else {
                // TODO: error
            }
        })
    }

    render() {
        return (
            <div>
                <NHSHeader navigationDisabled searchDisabled/>
                <NHSContainer>
                    <NHSWrapper style={{display: 'flex', justifyContent: 'center'}}>
                        <Form>
                            <NHSFormGroup controlId="formBasicEmail">
                                <NHSFormLabel>Email address</NHSFormLabel>
                                <NHSFormControl type="email" placeholder="Enter email"/>
                            </NHSFormGroup>

                            <NHSFormGroup controlId="formBasicPassword">
                                <NHSFormLabel>Password</NHSFormLabel>
                                <NHSFormControl type="password" placeholder="Password"/>
                            </NHSFormGroup>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Keep me logged in"/>
                            </Form.Group>
                            <NHSButton className="login">Log in</NHSButton>&nbsp;&nbsp;&nbsp;&nbsp;
                            <a href="/Register">
                                <NHSButton>Register</NHSButton>
                            </a><br/>
                            <Button variant="link" onClick={this.handleClick}>Forgot your password?</Button>
                        </Form>
                    </NHSWrapper>
                </NHSContainer>
            </div>

        );
    }
}

export default Login;




