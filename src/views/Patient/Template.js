import React from 'react';
import CDROptions from "../../components/Queries/CDROptions";

import { Form, Input, RadioGroup } from 'formsy-react-components';
import getWebTemplate from "../../components/GetWebTemplate";
import JsonFormInputToReact from "../../ehr-template-react-generator/view";

function commitComposition(model) {
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

export default class Template extends React.Component {
    constructor(props) {
        super(props);
        this.disableButton = this.disableButton.bind(this);
        this.enableButton = this.enableButton.bind(this);
        this.state = { canSubmit: false };
    }

    componentDidMount() {
        let promise = getWebTemplate();
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
                        return JsonFormInputToReact(jsonInputObject);
                    })}
                    <input style={{ marginLeft: "50%" }} className="btn btn-primary" type="submit"
                           disabled={!this.state.canSubmit} defaultValue="Submit"/>
                </Form>
            </div>
        );
    }
}
