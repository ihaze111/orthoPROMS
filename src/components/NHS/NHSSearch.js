import React from "react";
import { NHSVectorClose, NHSVectorSearch } from "./NHSIcons";

function NHSSearchClose() {
    return <button className="nhsuk-search__close" id="close-search">
        <NHSVectorClose/>
        <span className="nhsuk-u-visually-hidden">Close search</span>
    </button>;
}

function NHSSearchSubmit() {
    return <button className="nhsuk-search__submit" type="submit">
        <NHSVectorSearch/>
        <span className="nhsuk-u-visually-hidden">Search</span>
    </button>;
}

function NHSSearchInput() {
    return <input className="nhsuk-search__input" id="search-field" name="q" type="search" placeholder="Search"
                  autoComplete="off"/>;
}

function NHSSearchToggle() {
    return <button className="nhsuk-header__search-toggle" id="toggle-search" aria-controls="search"
                   aria-label="Open search">
        <NHSVectorSearch/>
        <span className="nhsuk-u-visually-hidden">Search</span>
    </button>;
}

export function NHSSearch() {
    return <div className="nhsuk-header__search">
        <NHSSearchToggle/>
        <div className="nhsuk-header__search-wrap" id="wrap-search">
            <form className="nhsuk-header__search-form" id="search"
                  role="search">
                <NHSSearchInput/>
                <NHSSearchSubmit/>
                <NHSSearchClose/>
            </form>
        </div>
    </div>;
}
