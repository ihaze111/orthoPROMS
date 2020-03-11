import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import { GoogleLogout  } from 'react-google-login'
 

class HeaderMenu extends React.Component{
    constructor(props){
        super(props)
    }


    handleClick = () => {
        this.props.logout()
        window.location.href = '/';
    }

    handleLogin = () => {
        !this.props.isAuthenticated && (window.location.href = '/');
    }

    handleIPROMS = () => {
        if(window.confirm("离开此页面将会自动退出，你确定要这么做吗？")){
            this.handleClick()
        }
    }

    componentDidMount (){
        console.log(this.props.isGoogleLogin)
    }

      
    render(){
        return (<Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand onClick={this.handleIPROMS}>IPROMS</Navbar.Brand> 
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link onClick={this.handleLogin}>Home</Nav.Link>
                <Nav.Link href="/About">About</Nav.Link>
                <Nav.Link href="#Link">National Statistics</Nav.Link>
                {/* <NavDropdown title="National Statistics" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown> */}
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success" style={{'marginRight': '16px'}}>Search</Button>
                <Button variant="outline-primary" className={((this.props.isAuthenticated) && (!this.props.isGoogleLogin))? 'd-block' : 'd-none'}  onClick={this.handleClick}>logout</Button>
                <GoogleLogout
                    // clientId="435425463824-lso8p4egc7hasvbkrbff4h60g60se5l3.apps.googleusercontent.com"
                    // clientId="1026232614474-aoptfdrk515oa3svfpmol9h6j57gifhn.apps.googleusercontent.com"
                    clientId="1026232614474-9uipnerkha7t6vqo8rsetj2q8ffk5fg4.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={this.handleClick}
                    className={((this.props.isAuthenticated) && (this.props.isGoogleLogin))? 'd-inline-flex' : 'd-none'}
                >
                </GoogleLogout>
            </Form>
            
        </Navbar.Collapse>
    </Navbar>);
    }
}
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isGoogleLogin: state.auth.isGoogleLogin
    }
}

export default connect(mapStateToProps, {logout})(HeaderMenu)

