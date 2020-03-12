import React from "react";

function NHSCheckbox(props) {
    return <div className="nhsuk-checkboxes__item">
        <input className="nhsuk-checkboxes__input" type="checkbox"/>
            <label className="nhsuk-label nhsuk-checkboxes__label">
                {props.label}
            </label>
    </div>
;
}

export default NHSCheckbox;
