import React from 'react';
import 'nhsuk-frontend/dist/nhsuk.min.js';
import { NHSSearch } from "./NHSSearch";
import { NHSVectorChevronRight, NHSVectorClose, NHSVectorSearch } from "./NHSIcons";

function NHSNav(props) {
    return <ul className="nhsuk-header__navigation-list" style={{ justifyContent: 'left' }}>
        {props.children}
    </ul>;
}

function NHSNavLink(props) {
    return <li className="nhsuk-header__navigation-item">
        <a className="nhsuk-header__navigation-link" href={props.href}>
            {props.children}
            <NHSVectorChevronRight/>
        </a>
    </li>;
}

function NHSAppLogo(props) {
    return <div className="nhsuk-header__logo">
        <h1 className="nhsuk-logo__text nhsuk-heading-xl"
            style={{ color: "white", marginBottom: 0 }}>{props.children}</h1>
    </div>;
}

function NHSHeaderMenu() {
    return <p className="nhsuk-header__navigation-title"><span id="label-navigation">Menu</span>
        <button className="nhsuk-header__navigation-close" id="close-menu">
            <NHSVectorClose/>
            <span className="nhsuk-u-visually-hidden">Close menu</span>
        </button>
    </p>;
}

function NHSHeaderMenuToggle() {
    return <div className="nhsuk-header__menu">
        <button className="nhsuk-header__menu-toggle" id="toggle-menu">Menu
        </button>
    </div>;
}



function NHSHeader() {
    return (
        <header className="nhsuk-header"
                style={{ fontFamily: 'Frutiger W01, Arial, Sans-serif' }}>
            <div className="nhsuk-width-container nhsuk-header__container">
                <NHSAppLogo>orthoPROMS</NHSAppLogo>
                <div className="nhsuk-header__content" id="content-header">
                    <NHSHeaderMenuToggle/>
                    <NHSSearch/>
                </div>
            </div>
            <nav className="nhsuk-header__navigation" id="header-navigation">
                <div className="nhsuk-width-container">
                    <NHSHeaderMenu/>
                    <NHSNav>
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
