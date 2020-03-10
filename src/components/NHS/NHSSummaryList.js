import React from 'react';
import 'nhsuk-frontend/dist/nhsuk.min.js';

export function NHSSummaryListKey(props) {
    return <dt className="nhsuk-summary-list__key">
        {props.children}
    </dt>;
}

// Note: HTML elements can be used inside NHSSummaryListValue e.g. <p>, <br/>
export function NHSSummaryListValue(props) {
    return <dd className="nhsuk-summary-list__value">
        {props.children}
    </dd>;
}

export function NHSSummaryListRow(props) {
    return <div className="nhsuk-summary-list__row">
        {props.children}
    </div>;
}

export function NHSSummaryList(props) {
    return <dl className="nhsuk-summary-list" style={props.style}>
        {props.children}
    </dl>;
}

