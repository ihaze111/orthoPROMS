import React from 'react';
import Form from 'react-bootstrap/Form';
import $ from 'jquery';
import HeaderMenu from "../components/HeaderMenu";
import qs from "qs";
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { login, googleLogin } from '../actions/authActions.js'

import GoogleLogin from 'react-google-login';
import NHSHeader from "../components/NHS/NHSHeader";
import { NHSButton, NHSButtonLink, NHSFormControl, NHSFormGroup, NHSFormLabel } from "./NHSComponents";
import NHSWrapper from "../components/NHS/NHSWrapper";
import NHSContainer from "../components/NHS/NHSContainer";
import NHSCheckbox from "../components/NHS/NHSCheckbox";
import NHSFooter from "../components/NHS/NHSFooter";


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            id: 1
        };
    }

    onChange = (e) => {
        console.log('hi');
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state);
    }


    onSignIn = (googleUser) => {
        console.log(googleUser);
        var profile = googleUser.getBasicProfile();
        var id_token = googleUser.getAuthResponse().id_token;
        this.props.googleLogin({ token: id_token, user: profile })
        let xx = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id;
        if (xx === "1") {
            window.location.href = "/Patient?id=" + xx;
        } else if (xx === "2") {
            window.location.href = "/Clinician?id=" + xx;
        }
    }


    onSubmit = (e) => {
        console.log(e);
        e.preventDefault();
        if (this.state.email == '' || this.state.password == '') {
            return alert('Please enter your email or password.')
        }
        let type = this.state.id == 1 ? 'Patient' : 'Clinicians'
        this.props.login({ ...this.state, type }).then(
            res => {
                alert(res.message)
                if (res.code === 200) {
                    let xx = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id;
                    if (xx === "1") {

                        window.location.href = "/Patient?id=" + xx;
                    } else if (xx === "2") {
                        window.location.href = "/Clinician?id=" + xx;
                    }
                }

            }
        )

    }


// import { NHSButton, NHSFormControl, NHSFormGroup, NHSFormLabel, NHSButtonSecondary } from './NHSComponents';
// import NHSHeader from "../components/NHS/NHSHeader";
// import NHSContainer from "../components/NHS/NHSContainer";
// import NHSWrapper from "../components/NHS/NHSWrapper";

// class Login extends React.Component {
//     componentDidMount(){
//         var id = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id;
//         this.setState({id: id})
//     }
    render() {
        return (
            <div>
                <NHSHeader navigationDisabled searchDisabled/>
                <NHSContainer>
                    <NHSWrapper>
                        <div class="nhsuk-grid-row">
                            <div class="nhsuk-grid-column-two-thirds">
                                <Form onSubmit={this.onSubmit}>
                                    <h1 style={{ fontWeight: 'bold' }}>Enter your login details</h1>
                                    <NHSFormGroup controlId="formBasicEmail">
                                        <NHSFormLabel>Email address</NHSFormLabel>
                                        <NHSFormControl type="email" placeholder="Enter email"
                                                        onChange={this.onChange} name='email'/>
                                    </NHSFormGroup>
                                    <NHSFormGroup controlId="formBasicPassword">
                                        <NHSFormLabel>Password</NHSFormLabel>
                                        <NHSFormControl type="password" placeholder="Password" name='password' onChange={
                                            this.onChange}/>
                                    </NHSFormGroup>
                                    <Form.Group controlId="formBasicCheckbox">
                                        <NHSCheckbox type="checkbox" label="Keep me logged in"/>
                                    </Form.Group>
                                    <NHSButton onClick={this.onSubmit} type="submit" style={{ marginRight: '10px' }}>Log
                                        in</NHSButton>
                                    <p><a href={'/Reset'}>Forgot your
                                        password?</a></p>
                                    <p>or</p>
                                    <NHSButtonLink type="button" href={'/Register?id=' + this.state.id}>
                                        Register
                                    </NHSButtonLink><br/>
                                    <p>or</p>
                                    <div>
                                        <GoogleLogin
                                            clientId="1026232614474-9uipnerkha7t6vqo8rsetj2q8ffk5fg4.apps.googleusercontent.com"
                                            buttonText="Login"
                                            onSuccess={this.onSignIn} onFailure={this.onSignIn}
                                            cookiePolicy={'single_host_origin'}
                                            style={{ 'widht': '100%' }}
                                            className="btn  btn-block"> <span> Login with Google  </span>
                                        </GoogleLogin>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </NHSWrapper>
                </NHSContainer>
                <NHSFooter/>
            </div>

        );
    }

    // componentDidMount() {
    //     var xx = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id;

    //     $(".login").click(function () {
    //         if (xx === "1") {
    //             window.location.href = "/Patient?id=" + xx;
    //         } else if (xx === "2") {
    //             window.location.href = "/Clinician?id=" + xx;
    //         } else {
    //             // TODO: error
    //         }
    //     })
    // }

    // render() {
    //     return (
    //         <div>
    //             <NHSHeader navigationDisabled searchDisabled/>
    //             <NHSContainer>
    //                 <NHSWrapper style={{display: 'flex', justifyContent: 'center'}}>
    //                     <Form>
    //                         <NHSFormGroup controlId="formBasicEmail">
    //                             <NHSFormLabel>Email address</NHSFormLabel>
    //                             <NHSFormControl type="email" placeholder="Enter email"/>
    //                         </NHSFormGroup>

    //                         <NHSFormGroup controlId="formBasicPassword">
    //                             <NHSFormLabel>Password</NHSFormLabel>
    //                             <NHSFormControl type="password" placeholder="Password"/>
    //                         </NHSFormGroup>
    //                         <Form.Group controlId="formBasicCheckbox">
    //                             <Form.Check type="checkbox" label="Keep me logged in"/>
    //                         </Form.Group>
    //                         <NHSButton className="login">Log in</NHSButton>&nbsp;&nbsp;&nbsp;&nbsp;
    //                         <a href="/Register">
    //                             <NHSButton>Register</NHSButton>
    //                         </a><br/>
    //                         <Button variant="link" onClick={this.handleClick}>Forgot your password?</Button>
    //                     </Form>
    //                 </NHSWrapper>
    //             </NHSContainer>
    //         </div>

    //     );
    // }
}

export default connect(null, { login, googleLogin })(Login)





