import React from 'react';
import CDROptions from "../../components/Queries/CDROptions";

import { Form, Input, RadioGroup } from 'formsy-react-components';
import getFlatProcessedTemplate from "../../components/GetFlatProcessedTemplate";
// import JsonFormInputToReact from "../../ehr-template-react-generator/view";
import JsonFormInputToNHSReact from "../../ehr-template-react-generator/viewNHS";
// import JsonFormInputToReact from "../../ehr-template-react-generator/view";
// import NHSFormsyInput from "../../ehr-template-react-generator/NHSFormsyInput";
import ReactDOM from "react-dom";
import {
    NHSPanel,
    NHSPanelBody,
    NHSPanelTitle,
    NHSPanelWithLabel
} from "../../components/nhsuk-frontend-react/NHSPanel";
import getStructuredProcessedTemplate from "../../components/GetStructuredProcessedTemplate";
import * as axios from "axios";
import { NHSButton } from "../../components/nhsuk-frontend-react/NHSComponents";

async function commitComposition(model) {
    let processedResult = [];
    const url = '/rest/v1/composition?ehrId=32a2d984-510b-40f8-8c4d-7e1556082455&templateId=Foot_and_Ankle_PROMs-v0&committerName=Dr nullnull&format=FLAT';
    const data = {
        ...model,
        "ctx/language": "en",
        "ctx/territory": "GB",
        // "ctx/composer_name": "Silvia Blake",
        // "ctx/id_namespace": "HOSPITAL-NS",
        // "ctx/id_scheme": "HOSPITAL-NS",
        // "ctx/health_care_facility|name": "Hospital",
        // "ctx/health_care_facility|id": "9091"
    };
    const options = CDROptions.generatePostAxiosOptions(url, data);
    try {
        const response = await axios(options);
        // const result = response.data;
        if (response.status == 201) {
            processedResult = 'Successfully committed';
            // processedResult = result;
        } else {
            processedResult = 'Error committing';
        }
    } catch (error) {
        processedResult = 'Error committing';
        throw new Error(error);
    }
    return processedResult;
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
        let promise = getStructuredProcessedTemplate(this.props.templateId);
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

    async submit(model) {
        const reply = await commitComposition(model);
        const element = <p>{JSON.stringify(reply)}</p>;
        ReactDOM.render(element, document.getElementById('result'));
    }

    render() {
        if (!this.state.template) return null;
        const sample = this.state.template;
        return (
            <div>
                <Form onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
                    {RecursiveCard({ color: true, ...sample })}
                    <NHSButton type="submit"
                               disabled={!this.state.canSubmit} defaultValue="Submit">Submit</NHSButton>
                </Form>
                <span id='result'></span>
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
    let color = '#f0f4f5';
    if (props.color) {
        color = 'white';
    }
    if ('inputs' in props) {
        inputs = JsonFormInputToNHSReact(props.inputs);
    }
    if ('children' in props) {
        return <NHSPanelWithLabel style={{ backgroundColor: color }}>
            <NHSPanelTitle class="nhsuk-panel-with-label__label">{props.name}</NHSPanelTitle>
            <NHSPanelBody>
                {inputs}
                {children}
            </NHSPanelBody>
        </NHSPanelWithLabel>;
    } else if ('inputs' in props) {
        return JsonFormInputToNHSReact(props.inputs);
    } else {
        return null;
    }
}
