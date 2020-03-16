import React from 'react';
import CDROptions from "../../components/Queries/CDROptions";

import { Form, Input, RadioGroup } from 'formsy-react-components';
import getFlatProcessedTemplate from "../../components/GetFlatProcessedTemplate";
// import JsonFormInputToReact from "../../ehr-template-react-generator/view";
import JsonFormInputToNHSReact from "../../ehr-template-react-generator/viewNHS";
import JsonFormInputToReact from "../../ehr-template-react-generator/view";
// import NHSFormsyInput from "../../ehr-template-react-generator/NHSFormsyInput";
import {
    NHSPanel,
    NHSPanelBody,
    NHSPanelTitle,
    NHSPanelWithLabel
} from "../../components/nhsuk-frontend-react/NHSPanel";
import getStructuredProcessedTemplate from "../../components/GetStructuredProcessedTemplate";

function commitComposition(model) {
    console.log(model);
    const compositionSring = {
        "ctx/language": "en",
        "ctx/territory": "GB",
        "ctx/composer_name": "Silvia Blake",
        "ctx/id_namespace": "HOSPITAL-NS",
        "ctx/id_scheme": "HOSPITAL-NS",
        "ctx/health_care_facility|name": "Hospital",
        "ctx/health_care_facility|id": "9091",
    };
    compositionSring.templateId = "Foot_and_Ankle_PROMs-v0";
    compositionSring.ehrId = "d9668d3d-85fa-488f-97f3-53c8765c22fb";
    for (let x in model) {
        compositionSring["uclh_foot_and_ankle_proms/aofas_score/" + x + "|code"] = model[x];
    }
    var request = require('request');
    var options = {
        'method': 'POST',
        'url':
            'https://cdr.code4health.org/rest/v1/composition?ehrId=b80a3a97-be75-41c6-a497-6ed53ce8f8c6&templateId=Foot_and_Ankle_PROMs-v0&committerName=Drnullnull&format=FLAT',
        'headers': {
            'Ehr-Session-disabled': '{{Ehr-Session}}', 'Content-Type':
                'application/json', 'Authorization': CDROptions.CDRHeaders.Authorization
        }, body:
            JSON
                .stringify(compositionSring)
    };
    request(options, function (error, response) {
        if (error) throw new
        Error(error);
        console.log(response.body);
    });
}

export class FlatSurvey extends React.Component {
    constructor(props) {
        super(props);
        this.disableButton = this.disableButton.bind(this);
        this.enableButton = this.enableButton.bind(this);
        this.state = { canSubmit: false };
    }

    componentDidMount() {
        let promise = getFlatProcessedTemplate(this.props.templateId);
        promise.then((e) => {
            this.setState({ canSubmit: this.state.canSubmit, template: e });
        });
    }

    disableButton() {
        this.setState({ canSubmit: false });
    }

    enableButton() {
        this.setState({ canSubmit: true });
    }

    submit(model) {
        commitComposition(model);
    }

    render() {
        if (!this.state.template) return null;
        const sample = this.state.template;
        return (
            <div>
                <Form onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
                    {sample.map((jsonInputObject) => {
                        return JsonFormInputToNHSReact(jsonInputObject)
                    })}
                    <input style={{ marginLeft: "50%" }} className="btn btn-primary" type="submit"
                           disabled={!this.state.canSubmit} defaultValue="Submit"/>
                </Form>
            </div>
        );
    }
}

export class StructuredSurvey extends React.Component {
    constructor(props) {
        super(props);
        this.disableButton = this.disableButton.bind(this);
        this.enableButton = this.enableButton.bind(this);
        this.state = { canSubmit: false };
    }

    componentDidMount() {
        // let promise = getFlatProcessedTemplate('Foot_and_Ankle_PROMs-v0');
        let promise = getStructuredProcessedTemplate(this.props.templateId);
        // let promise = getStructuredProcessedTemplate('WHO - Suspected Covid-19 assessment.v0');
        promise.then((e) => {
            this.setState({ canSubmit: this.state.canSubmit, template: e });
        });
    }

    disableButton() {
        this.setState({ canSubmit: false });
    }

    enableButton() {
        this.setState({ canSubmit: true });
    }

    submit(model) {
        commitComposition(model);
    }

    render() {
        if (!this.state.template) return null;
        const sample = this.state.template;
        return (
            <div>
                <Form onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
                    {/*{sample.map((jsonInputObject) => {*/}
                    {/*    return JsonFormInputToNHSReact(jsonInputObject)*/}
                    {/*})}*/}
                    {RecursiveCard({ color: true, ...sample })}
                    <input style={{ marginLeft: "50%" }} className="btn btn-primary" type="submit"
                           disabled={!this.state.canSubmit} defaultValue="Submit"/>
                </Form>
            </div>
        );
    }
}

function RecursiveCard(props) {
    let children, inputs = null;
    if ('children' in props) {
        children = props.children.map((child) => {
            const newProps = child;
            newProps.color = !props.color;
            return RecursiveCard(newProps);
        });
    }
    if ('inputs' in props) {
        inputs = JsonFormInputToNHSReact(props.inputs);
    }
    let color = '#f0f4f5';
    if (props.color) {
        color = 'white';
    }
    return <NHSPanelWithLabel style={{ backgroundColor: color }}>
        <NHSPanelTitle class="nhsuk-panel-with-label__label">{props.name}</NHSPanelTitle>
        <NHSPanelBody>
            {inputs}
            {children}
        </NHSPanelBody>
    </NHSPanelWithLabel>;
}
