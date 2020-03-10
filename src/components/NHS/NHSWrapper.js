import React from "react";

function NHSWrapper(props) {
    return <main className="nhsuk-main-wrapper" id="maincontent" style={props.style}>
        {props.children}</main>;
}

export default NHSWrapper;
