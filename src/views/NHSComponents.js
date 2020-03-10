import './test.scss';
import React from "react";

export function NHSButton(props) {
    const className = props.className + " nhsuk-button";
    return <button className={className} onClick={props.onClick}>
        {props.children}
    </button>;
}

export function NHSFormLabel(props) {
    return <label class='nhsuk-label'>{props.children}</label>;
}

export function NHSFormControl(props) {
    return <input class='nhsuk-input' type={props.type} placeholder={props.placeholder}>{props.children}</input>;
}

export function NHSFormGroup(props) {
    return <div class='nhsuk-form-group' controlId={props.controlId}>{props.children}</div>;
}
