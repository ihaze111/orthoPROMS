import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux'
// import NavDropdown from 'react-bootstrap/NavDropdown';

import { handleSearch } from '../actions/appActions'

class HeaderMenu extends React.Component {
    constructor(props){
        super(props)
    } //不一样

    onChange = e => {
        // this.setState({[e.target.name]: e.target.value})
        this.props.handleSearch(e.target.value)
    }  //不一样

    render(){
        let { search } = this.props  //不一样
        return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">IPROMS</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
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
                {/* <Form inline>
                    <FormControl type="text" placeholder="Search" value={search} onChange={ this.onChange }  className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form> */}
            </Navbar.Collapse>
        </Navbar>);
    }


}

export default connect(  //下面都不一样
    state => ({
        search: state.app.search
    }),
    {
        handleSearch
    }
)(HeaderMenu);
