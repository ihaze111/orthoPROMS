import React from 'react';
import CDROptions from "../../components/Queries/CDROptions";
import { Form } from 'formsy-react-components';
import getFlatProcessedTemplate from "../../components/GetFlatProcessedTemplate";
import JsonFormInputToNHSReact from "../../ehr-template-react-generator/src/JsonFormInputToNHSReact";
import ReactDOM from "react-dom";
import {
    NHSPanelBody, NHSPanelConfirmation,
    NHSPanelTitle,
    NHSPanelWithLabel
} from "../../components/react-styled-nhs/src/NHSPanel";
import getStructuredProcessedTemplate from "../../components/GetStructuredProcessedTemplate";
import * as axios from "axios";
import { NHSButton } from "../../components/react-styled-nhs/src/NHSComponents";
import {
    NHSSummaryList, NHSSummaryListChange,
    NHSSummaryListKey,
    NHSSummaryListRow,
    NHSSummaryListValue
} from "../../components/react-styled-nhs/src/NHSSummaryList";

async function commitComposition(model, ehrId, templateId) {
    let processedResult = [];
    const url = '/rest/v1/composition?ehrId=' + ehrId + '&templateId=' + templateId + '&format=FLAT';
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
        const result = response.data;
        if (response.status === 201) {
            processedResult = {
                message: 'Successfully committed',
                commitId: result.compositionUid
            };
            // processedResult = result;
        } else {
            processedResult = { message: 'Error committing' };
        }
    } catch (error) {
        processedResult = { message: 'Error committing' };
        throw new Error(error);
    }
    return processedResult;
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

    reloadPage() {
        window.location.reload();
    }

    async submitModel(model) {
        const reply = await commitComposition(model, this.props.ehrId, this.props.templateId);
        // NHSPanelConfirmation
        let element;
        if ('commitId' in reply) {
             element = <NHSPanelConfirmation>
                <NHSPanelTitle>{reply.message}</NHSPanelTitle>
                <NHSPanelBody>
                    Composition identifier:
                    <strong>{reply.commitId}</strong>
                </NHSPanelBody>
                 <NHSButton style={{float: 'right', marginTop: '10px'}} onClick={this.reloadPage}>Done</NHSButton>
            </NHSPanelConfirmation>;
        } else {
            element = <NHSPanelConfirmation>
                <NHSPanelTitle>{reply.message}</NHSPanelTitle>
                <NHSPanelBody>
                    Please try again later, or contact your admin team.
                </NHSPanelBody>
                <NHSButton style={{float: 'right', marginTop: '10px'}} onClick={this.reloadPage}>Done</NHSButton>
            </NHSPanelConfirmation>;
        }
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
        const element = <div>
            <h2>Review your answers</h2>
            <NHSSummaryList>{Object.keys(model).map((e) => {
                if (thisAccess.state.mapping[e].length === 1) {
                    return <NHSSummaryListRow>
                        <NHSSummaryListKey>{thisAccess.state.mapping[e][0]}</NHSSummaryListKey>
                        <NHSSummaryListValue>{model[e]}</NHSSummaryListValue>
                        <NHSSummaryListChange onClick={this.backToForm}/>
                    </NHSSummaryListRow>;
                } else {
                    return <NHSSummaryListRow>
                        <NHSSummaryListKey>{thisAccess.state.mapping[e][0]}</NHSSummaryListKey>
                        <NHSSummaryListValue>{thisAccess.state.mapping[e][1][model[e]]}</NHSSummaryListValue>
                        <NHSSummaryListChange onClick={this.backToForm}/>
                    </NHSSummaryListRow>;
                }
            })}
            </NHSSummaryList>
            <NHSButton onClick={this.backToForm} style={{ marginRight: '10px' }}>Edit your answers</NHSButton>
            <NHSButton onClick={() => this.submitModel(model)}>Submit</NHSButton>
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
                <Form onValidSubmit={(model) => this.submitMe(model, this)} onValid={this.enableButton}
                      onInvalid={this.disableButton} id={'surveyForm'}>
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
        if (keys.type === 'options') {
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
            <NHSPanelTitle className="nhsuk-panel-with-label__label">{props.name}</NHSPanelTitle>
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
