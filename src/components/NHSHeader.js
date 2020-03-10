import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import 'nhsuk-frontend/dist/nhsuk.min.js';
// import NavDropdown from 'react-bootstrap/NavDropdown';

function NHSNav(props) {
    return <ul className="nhsuk-header__navigation-list" style={{justifyContent: 'left'}}>
        {props.children}
    </ul>;
}

function NHSNavLink(props) {
    if (props.mobile) {
        return <li className="nhsuk-header__navigation-item nhsuk-header__navigation-item--for-mobile">
            <a className="nhsuk-header__navigation-link" href={props.href}>
                {props.children}
                <svg className="nhsuk-icon nhsuk-icon__chevron-right" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24" aria-hidden="true">
                    <path
                        d="M15.5 12a1 1 0 0 1-.29.71l-5 5a1 1 0 0 1-1.42-1.42l4.3-4.29-4.3-4.29a1 1 0 0 1 1.42-1.42l5 5a1 1 0 0 1 .29.71z"></path>
                </svg>
            </a>
        </li>;
    }
    return <li className="nhsuk-header__navigation-item">
        <a className="nhsuk-header__navigation-link" href={props.href}>
            {props.children}
            <svg className="nhsuk-icon nhsuk-icon__chevron-right" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24" aria-hidden="true">
                <path
                    d="M15.5 12a1 1 0 0 1-.29.71l-5 5a1 1 0 0 1-1.42-1.42l4.3-4.29-4.3-4.29a1 1 0 0 1 1.42-1.42l5 5a1 1 0 0 1 .29.71z"></path>
            </svg>
        </a>
    </li>;
}

function NHSAppLogo(props) {
    return <div className="nhsuk-header__logo">
        <h1 className="nhsuk-logo__text nhsuk-heading-xl" style={{ color: "white", marginBottom: 0}}>{props.children}</h1>
    </div>;
}

function NHSSearchSubmit() {
    return <button className="nhsuk-search__submit" type="submit">
        <svg className="nhsuk-icon nhsuk-icon__search" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
                d="M19.71 18.29l-4.11-4.1a7 7 0 1 0-1.41 1.41l4.1 4.11a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 10a5 5 0 1 1 5 5 5 5 0 0 1-5-5z"></path>
        </svg>
        <span className="nhsuk-u-visually-hidden">Search</span>
    </button>;
}

function NHSSearchClose() {
    return <button className="nhsuk-search__close" id="close-search">
        <svg className="nhsuk-icon nhsuk-icon__close" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
                d="M13.41 12l5.3-5.29a1 1 0 1 0-1.42-1.42L12 10.59l-5.29-5.3a1 1 0 0 0-1.42 1.42l5.3 5.29-5.3 5.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l5.29-5.3 5.29 5.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"></path>
        </svg>
        <span className="nhsuk-u-visually-hidden">Close search</span>
    </button>;
}

function NHSSearchInput() {
    return <div className="autocomplete-container" id="autocomplete-container">
        <div className="autocomplete__wrapper">
            <div>
                <div id="search-field__status--A" role="status" aria-atomic="true"
                     aria-live="polite"></div>
                <div id="search-field__status--B" role="status" aria-atomic="true"
                     aria-live="polite"></div>
            </div>
            <input aria-expanded="false" aria-owns="search-field__listbox"
                   aria-autocomplete="list" aria-describedby="search-field__assistiveHint"
                   autoComplete="off"
                   className="autocomplete__input autocomplete__input--default"
                   id="search-field" name="q" placeholder="Search" type="text"
                   role="combobox"/>
            <ul className="autocomplete__menu autocomplete__menu--inline autocomplete__menu--hidden"
                id="search-field__listbox" role="listbox"></ul>
            {/*<span id="search-field__assistiveHint" style="display: none;">When autocomplete results are available use up and down arrows to review and enter to select.  Touch device users, explore by touch or with swipe gestures.</span>*/}
        </div>
    </div>;
}

function NHSHeaderMenu() {
    return <p className="nhsuk-header__navigation-title"><span id="label-navigation">Menu</span>
        <button className="nhsuk-header__navigation-close" id="close-menu">
            <svg className="nhsuk-icon nhsuk-icon__close" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path
                    d="M13.41 12l5.3-5.29a1 1 0 1 0-1.42-1.42L12 10.59l-5.29-5.3a1 1 0 0 0-1.42 1.42l5.3 5.29-5.3 5.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l5.29-5.3 5.29 5.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"></path>
            </svg>
            <span className="nhsuk-u-visually-hidden">Close menu</span>
        </button>
    </p>;
}

function NHSHeader() {
    return (
        <header className="nhsuk-header nhsuk-header--organisation" role="banner"
                style={{ fontFamily: 'Frutiger W01, Arial, Sans-serif' }}>
            <div className="nhsuk-width-container nhsuk-header__container">
                <NHSAppLogo>orthoPROMS</NHSAppLogo>

                <div className="nhsuk-header__content" id="content-header">

                    <div className="nhsuk-header__menu">
                        <button className="nhsuk-header__menu-toggle" id="toggle-menu" aria-controls="header-navigation"
                                aria-label="Open menu">Menu
                        </button>
                    </div>

                    <div className="nhsuk-header__search">
                        <button className="nhsuk-header__search-toggle" id="toggle-search" aria-controls="search"
                                aria-label="Open search">
                            <svg className="nhsuk-icon nhsuk-icon__search" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                                <path
                                    d="M19.71 18.29l-4.11-4.1a7 7 0 1 0-1.41 1.41l4.1 4.11a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 10a5 5 0 1 1 5 5 5 5 0 0 1-5-5z"></path>
                            </svg>
                            <span className="nhsuk-u-visually-hidden">Search</span>
                        </button>
                        <div className="nhsuk-header__search-wrap" id="wrap-search">
                            <form className="nhsuk-header__search-form" id="search" action="https://www.nhs.uk/search/"
                                  method="get" role="search">
                                <label className="nhsuk-u-visually-hidden" htmlFor="search-field">Search the NHS
                                    website</label>
                                <NHSSearchInput/>
                                <NHSSearchSubmit/>
                                <NHSSearchClose/>
                            </form>
                        </div>
                    </div>

                </div>

            </div>
            <nav className="nhsuk-header__navigation" id="header-navigation" role="navigation"
                 aria-label="Primary navigation" aria-labelledby="label-navigation">
                <div className="nhsuk-width-container">
                    <NHSHeaderMenu/>
                    <NHSNav>
                        {/*<NHSNavLink href='/' mobile>Home</NHSNavLink>*/}
                        <NHSNavLink href='/'>Home</NHSNavLink>
                        <NHSNavLink href='/About'>About</NHSNavLink>
                        <NHSNavLink href='/NationalStatistics'>National Statistics</NHSNavLink>
                    </NHSNav>
                </div>
            </nav>
        </header>
    );
}

export default NHSHeader;
