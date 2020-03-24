import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux'
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

class HeaderMenu extends React.Component {

    handleClick = (e) => {
        this.props.logout();
        window.location.href = '/';
    };

    handleLogin = (e) => {
        e.preventDefault();

        if(window.localStorage.getItem('id') == 1){
            window.location.href = '/Patient';
        }

        if(window.localStorage.getItem('id') == 2){
            window.location.href = '/Clinician';
        }

    };

    constructor(props) {
        super(props)
        this.state={
            color: '#fff',
            color1: '#fff',
            color2: '#000'
        }
    }

    onChange = e => {
        // this.setState({[e.target.name]: e.target.value})
        this.props.handleSearch(e.target.value)
    }

    handleIPROMS = () => {
        if (window.confirm("Exiting to the home page will log you out, are you sure you want to leave？")) {
            this.handleClick();
        }
    };

    componentDidMount() {
        // console.log(this.props.isGoogleLogin)
    };


    render() {
        const navigation = this.props.navigationDisabled ? null :
            <NHSHeaderNavigation>
                <NHSWidthContainer>
                    <NHSHeaderMenu/>
                    <NHSNav>
                        <li className="nhsuk-header__navigation-item" onClick={this.handleLogin}>
                            <a className="nhsuk-header__navigation-link" >
                                Home
                                <NHSVectorChevronRight/>
                            </a>
                        </li>
                        <NHSNavLink href='/About' >About</NHSNavLink>
                        <NHSNavLink href='/NationalStatistics'>National Statistics</NHSNavLink>
                    </NHSNav>
                </NHSWidthContainer>
            </NHSHeaderNavigation>;
        const search = this.props.searchDisabled ? null : <NHSSearch/>;
        const headerContent = this.props.searchDisabled && this.props.navigationDisabled ? null :
            <NHSHeaderContent>
                <NHSHeaderMenuToggle/>
                {/*{search}*/}
            </NHSHeaderContent>;
        return (
            <NHSHeader>
                <NHSHeaderContainer>
                    <NHSAppLogo
                        smaller={this.props.navigationDisabled}>orthoPROMS</NHSAppLogo>
                    {headerContent}
                    <Form inline style={{float: 'right'}}>
                        {/*<FormControl type="text" placeholder="Search" className="mr-sm-2"/>*/}
                        {/*<Button variant="outline-success" style={{ 'marginRight': '16px' }}>Search</Button>*/}
                        <Button variant="outline-primary"
                                className={((this.props.isAuthenticated) && (!this.props.isGoogleLogin)) ? 'd-block' :
                                    'd-none'} onClick={()=> this.handleClick}>logout</Button>
                        <GoogleLogout
                            // clientId="435425463824-lso8p4egc7hasvbkrbff4h60g60se5l3.apps.googleusercontent.com"
                            // clientId="1026232614474-aoptfdrk515oa3svfpmol9h6j57gifhn.apps.googleusercontent.com"
                            clientId="1026232614474-9uipnerkha7t6vqo8rsetj2q8ffk5fg4.apps.googleusercontent.com"
                            buttonText="Logout"
                            onLogoutSuccess={this.handleClick}
                            className={((this.props.isAuthenticated) && (this.props.isGoogleLogin)) ? 'd-inline-flex' :
                                'd-none'}
                        >
                        </GoogleLogout>
                    </Form>
                </NHSHeaderContainer>
                {navigation}
            </NHSHeader>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isGoogleLogin: state.auth.isGoogleLogin
    }
};

export default connect(mapStateToProps, { logout })(HeaderMenu)
