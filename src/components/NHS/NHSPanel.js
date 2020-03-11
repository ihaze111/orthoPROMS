import React from "react";

export function NHSPanelTitle(props) {
    return <h3 {...props} />
}

export function NHSPanelBody(props) {
    return <div {...props} />;
}

export function NHSPanel(props) {
    return <div className="nhsuk-panel" {...props} />;
}

export function NHSPanelWithLabel(props) {
    return <div className="nhsuk-panel-with-label" {...props} />;
}
