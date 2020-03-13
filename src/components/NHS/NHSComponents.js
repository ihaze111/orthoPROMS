import React from "react";
import 'nhsuk-frontend/packages/nhsuk.scss';

export function NHSButton(props) {
    const className = props.className + " nhsuk-button";
    return <button className={className}  {...props} />;
}

export function NHSButtonLink(props) {
    const className = props.className + " nhsuk-button";
    return <a href="/" role="button" draggable="false" className={className} {...props} />
}

export function NHSButtonSecondary(props) {
    const className = props.className + " nhsuk-button nhsuk-button--secondary";
    return <button className={className}  {...props} />;
}

export function NHSFormLabel(props) {
    return <label class='nhsuk-label' {...props} />;
}

export function NHSFormHint(props) {
    return <span className="nhsuk-hint" id="input-with-hint-text-hint" {...props} />;
}

export function NHSFormControl(props) {
    return <input class='nhsuk-input' {...props} />;
}

export function NHSFormGroup(props) {
    return <div class='nhsuk-form-group' {...props} />;
}
