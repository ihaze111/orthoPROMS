import React from 'react';
import Form from 'react-bootstrap/Form';
import qs from "qs";
import { connect } from 'react-redux';
import { googleLogin, login } from '../actions/authActions.js'

import GoogleLogin from 'react-google-login';
import NHSHeader from "../components/nhsuk-frontend-react/NHSHeader";
import { NHSButton, NHSButtonLink, NHSFormControl, NHSFormGroup, NHSFormLabel } from "../components/nhsuk-frontend-react/NHSComponents";
import NHSWrapper from "../components/nhsuk-frontend-react/NHSWrapper";
import NHSContainer from "../components/nhsuk-frontend-react/NHSContainer";
import NHSCheckbox from "../components/nhsuk-frontend-react/NHSCheckbox";
import NHSFooter from "../components/nhsuk-frontend-react/NHSFooter";
import { NHSPanelBody, NHSPanelTitle, NHSPanelWithLabel } from "../components/nhsuk-frontend-react/NHSPanel";
import { NHSVectorArrowRightCircle } from "../components/nhsuk-frontend-react/NHSIcons";


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
            <div style={{ backgroundColor: '#f0f4f5' }}>
                <NHSHeader navigationDisabled searchDisabled/>
                <NHSContainer>
                    <NHSWrapper>
                        <div class="nhsuk-grid-row">
                            <div class="nhsuk-grid-column-two-thirds">
                                <Form onSubmit={this.onSubmit}>
                                    <h1 style={{ fontWeight: 'bold' }}>Choose an option to login</h1>
                                    <NHSPanelWithLabel>
                                        <NHSPanelTitle class="nhsuk-panel-with-label__label">Login with
                                            orthoPROMS</NHSPanelTitle>
                                        <NHSPanelBody>
                                            <NHSFormGroup controlId="formBasicEmail">
                                                <NHSFormLabel>Email address</NHSFormLabel>
                                                <NHSFormControl type="email" placeholder="Enter email"
                                                                onChange={this.onChange} name='email'/>
                                            </NHSFormGroup>
                                            <NHSFormGroup controlId="formBasicPassword">
                                                <NHSFormLabel>Password</NHSFormLabel>
                                                <NHSFormControl type="password" placeholder="Password" name='password'
                                                                onChange={
                                                                    this.onChange}/>
                                            </NHSFormGroup>
                                            <NHSCheckbox style={{ float: 'left' }} type="checkbox"
                                                         label="Keep me logged in"/>
                                            <p style={{
                                                textDecoration: "underline",
                                                display: "inline",
                                                float: "right"
                                            }}><a href={'/Reset'}>Forgot your
                                                password?</a></p>
                                            <br/><br/><br/>
                                            <NHSButton onClick={this.onSubmit} type="submit">Continue</NHSButton>
                                            <p>Not got an account yet?</p>
                                            <div className="nhsuk-action-link">
                                                <a className="nhsuk-action-link__link"
                                                   href={'/Register?id=' + this.state.id}>
                                                    <NHSVectorArrowRightCircle/>
                                                    <span
                                                        className="nhsuk-action-link__text">Register with orthoPROMS</span>
                                                </a>
                                            </div>
                                        </NHSPanelBody>
                                    </NHSPanelWithLabel>
                                    <NHSPanelWithLabel>
                                        <NHSPanelTitle class="nhsuk-panel-with-label__label">Login with
                                            Google</NHSPanelTitle>
                                        <NHSPanelBody>
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
                                        </NHSPanelBody>
                                    </NHSPanelWithLabel>
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





