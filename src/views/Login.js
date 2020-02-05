import React from 'react';
import Form from 'react-bootstrap/Form';
import $ from  'jquery';
import HeaderMenu from "../components/HeaderMenu";
import qs from "qs";
import Button from 'react-bootstrap/Button';

class Login extends React.Component{
    handleClick() {
        alert('Password reset email has been sent.')
    }
    componentDidMount(){
        var xx = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id;

        $(".login").click(function(){
            if (xx === "1") {
                window.location.href = "/Patient?id="+xx;
            } else if (xx === "2") {
                window.location.href = "/Clinician?id="+xx;
            } else {
                // TODO: error
            }
        })
    }
	render(){
		return(
			<div>
                <HeaderMenu />
                <div style={{display: 'flex', alignSelf:'center', justifyContent: 'center', marginTop: '10%'}}>
                    <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Keep me logged in" />
                    </Form.Group>
                    <Button className="btn btn-primary btn-block login">Log in</Button>
                    <a href="/Register">Register</a><br />
                    <Button variant="link" onClick={this.handleClick}>Forgot your password?</Button>
                    </Form>
                </div>
			</div>

		);
	}
}

export default Login;




