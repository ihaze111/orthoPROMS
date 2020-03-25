import React from 'react';
import CDROptions from "../../components/Queries/CDROptions";
import { Form } from 'formsy-react-components';
import getFlatProcessedTemplate from "../../components/GetFlatProcessedTemplate";
import JsonFormInputToNHSReact from "../../ehr-template-react-generator/viewNHS";
import ReactDOM from "react-dom";
import {
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
            this.setState({ canSubmit: this.state.canSubmit, template: e, mapping: getMappingOfTemplate(e, []) });
        });
    }

    backToForm() {
        document.getElementById('result').hidden = true;
        document.getElementById('surveyForm').hidden = false;
    }

    async submitModel(model) {
        const reply = await commitComposition(model);
        const element = <p>{JSON.stringify(reply)}</p>;
        ReactDOM.render(element, document.getElementById('result'));
        document.getElementById('result').hidden = false;
        document.getElementById('surveyForm').hidden = true;
    }

    disableButton() {
        this.setState({ canSubmit: false });
    }

    enableButton() {
        this.setState({ canSubmit: true });
    }

    submitMe(model, thisAccess) {
        const element = <div>{Object.keys(model).map((e) => {
            if (thisAccess.state.mapping[e].length == 1) {
                return <p>{thisAccess.state.mapping[e][0]}: {model[e]}</p>;
            } else {
                return <p>{thisAccess.state.mapping[e][0]}: {thisAccess.state.mapping[e][1][model[e]]} </p>
            }
        })}
            <button onClick={this.backToForm}>change</button>
            <button onClick={() => this.submitModel(model)}>submit</button>
        </div>;
        ReactDOM.render(element, document.getElementById('result'));
        document.getElementById('result').hidden = false;
        document.getElementById('surveyForm').hidden = true;
    }

    render() {
        if (!this.state.template) return null;
        let sample = this.state.template;
        return (
            <div>
                <Form onValidSubmit={(model) => this.submitMe(model, this)} onValid={this.enableButton} onInvalid={this.disableButton} id={'surveyForm'}>
                    {RecursiveCard({ color: true, ...sample })}
                    <NHSButton type="submit"
                               disabled={!this.state.canSubmit} defaultValue="Submit">Submit</NHSButton>
                </Form>
                <div id={'result'} hidden>
                </div>
            </div>
        );
    }
}

function getMappingOfTemplate(e) {
    const result = {};
    getMappingOfTemplateAux(e, []).map((keys) => {
        if (keys.type == 'options') {
            const mapping2 = {};
            keys.inputOptions.map((j) => {
                mapping2[j.value] = j.label;
            });
            result[keys.name] = [keys.label, mapping2];
        } else {
            result[keys.name] = [keys.label];
        }
    });
    return result;
}

function getMappingOfTemplateAux(props, result) {
    if ('children' in props) {
        props.children.map((child) => {
            getMappingOfTemplateAux(child, result);
        });
    } else if ('inputs' in props) {
        result.push(props.inputs);
    }
    return result;
}


function RecursiveCard(props) {
    let color = props.color ? '#ffffff' : '#f0f4f5';
    if ('children' in props) {
        return <NHSPanelWithLabel style={{ backgroundColor: color }}>
            <NHSPanelTitle class="nhsuk-panel-with-label__label">{props.name}</NHSPanelTitle>
            <NHSPanelBody>
                {JsonFormInputToNHSReact(props.inputs)}
                {props.children.map((child) => {
                    return RecursiveCard({ ...child, color: !props.color });
                })}
            </NHSPanelBody>
        </NHSPanelWithLabel>;
    } else if ('inputs' in props) {
        return JsonFormInputToNHSReact(props.inputs);
    }
    return null;
}
