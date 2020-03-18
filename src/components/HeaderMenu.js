import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux'
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { logout } from '../actions/authActions';
import { GoogleLogout } from 'react-google-login'
import { NHSSearch } from "./nhsuk-frontend-react/NHSSearch";
import {
    NHSAppLogo, NHSHeader, NHSHeaderContainer,
    NHSHeaderContent,
    NHSHeaderMenu, NHSHeaderMenuToggle,
    NHSHeaderNavigation,
    NHSNav,
    NHSNavLink,
    NHSWidthContainer
} from "./nhsuk-frontend-react/NHSHeader";
import { NHSVectorChevronRight } from "./nhsuk-frontend-react/NHSIcons";
import { handleSearch } from '../actions/appActions'

class HeaderMenu extends React.Component {

    handleClick = () => {
        this.props.logout();
        window.location.href = '/';
    };

    handleLogin = () => {
        // !this.props.isAuthenticated && (window.location.href = '/');
        window.location.href = '/';
    };

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

// NEWER:
//class HeaderMenu extends React.Component {
//
//     handleClick = () => {
//         this.props.logout();
//         window.location.href = '/';
//     };
//
//     handleLogin = () => {
//         // !this.props.isAuthenticated && (window.location.href = '/');
//         window.location.href = '/';
//     };
//
//     handleIPROMS = () => {
//         if (window.confirm("Exiting to the home page will log you out, are you sure you want to leave？")) {
//             this.handleClick();
//         }
//     };
//
//     componentDidMount() {
//         console.log(this.props.isGoogleLogin);
//     };
//
//     render() {
//         const navigation = this.props.navigationDisabled ? null :
//             <NHSHeaderNavigation>
//                 <NHSWidthContainer>
//                     <NHSHeaderMenu/>
//                     <NHSNav>
//                         <li className="nhsuk-header__navigation-item" onClick={this.handleLogin}>
//                             <a className="nhsuk-header__navigation-link">
//                                 Home
//                                 <NHSVectorChevronRight/>
//                             </a>
//                         </li>
//                         <NHSNavLink href='/About'>About</NHSNavLink>
//                         <NHSNavLink href='/NationalStatistics'>National Statistics</NHSNavLink>
//                     </NHSNav>
//                 </NHSWidthContainer>
//             </NHSHeaderNavigation>;
//         const search = this.props.searchDisabled ? null : <NHSSearch/>;
//         const headerContent = this.props.searchDisabled && this.props.navigationDisabled ? null :
//             <NHSHeaderContent>
//                 <NHSHeaderMenuToggle/>
//                 {search}
//             </NHSHeaderContent>;
//         return (
//             <NHSHeader>
//                 <NHSHeaderContainer>
//                     <a onClick={this.handleIPROMS}><NHSAppLogo
//                         smaller={this.props.navigationDisabled}>orthoPROMS</NHSAppLogo></a>
//                     {headerContent}
//                     <Form inline>
//                         <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
//                         <Button variant="outline-success" style={{ 'marginRight': '16px' }}>Search</Button>
//                         <Button variant="outline-primary"
//                                 className={((this.props.isAuthenticated) && (!this.props.isGoogleLogin)) ? 'd-block' :
//                                     'd-none'} onClick={this.handleClick}>logout</Button>
//                         <GoogleLogout
//                             // clientId="435425463824-lso8p4egc7hasvbkrbff4h60g60se5l3.apps.googleusercontent.com"
//                             // clientId="1026232614474-aoptfdrk515oa3svfpmol9h6j57gifhn.apps.googleusercontent.com"
//                             clientId="1026232614474-9uipnerkha7t6vqo8rsetj2q8ffk5fg4.apps.googleusercontent.com"
//                             buttonText="Logout"
//                             onLogoutSuccess={this.handleClick}
//                             className={((this.props.isAuthenticated) && (this.props.isGoogleLogin)) ? 'd-inline-flex' :
//                                 'd-none'}
//                         >
//                         </GoogleLogout>
//                     </Form>
//                 </NHSHeaderContainer>
//                 {navigation}
//             </NHSHeader>
//         );
//     }
// }
//
//
// const mapStateToProps = (state) => {
//     return {
//         isAuthenticated: state.auth.isAuthenticated,
//         isGoogleLogin: state.auth.isGoogleLogin
//     }
// };
//
// export default connect(mapStateToProps, { logout })(HeaderMenu)
