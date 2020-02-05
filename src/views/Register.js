import React from 'react';
import Form from 'react-bootstrap/Form';
import $ from  'jquery';
import HeaderMenu from "../components/HeaderMenu";

class Register extends React.Component{

    componentDidMount(){
        $(".login").click(function(){
            window.location.href = "/Patient?id=1";
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
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Confirmation Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <button className="btn btn-primary btn-block login">Submit</button>
                    </Form>
                </div>
			</div>

		);
	}
}

export default Register;
