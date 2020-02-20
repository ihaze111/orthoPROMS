import React from 'react';
import { Form, Input, RadioGroup } from 'formsy-react-components';
import getTemplate from "../../components/Queries/GetTemplate";

export default class Template extends React.Component {
    constructor(props) {
        super(props);
        this.disableButton = this.disableButton.bind(this);
        this.enableButton = this.enableButton.bind(this);
        this.state = { canSubmit: false };
    }

    componentDidMount() {
        let promise = getTemplate();
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
        console.log(JSON.stringify(model));
    }

    render() {
        if (!this.state.template) return null;
        return (
            <Form onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
                {this.state.template.map((e) => {
                        if (e.inputType === 'radio') {
                            const radioOptions = e.inputs[0].list.map((input) => ({
                                value: input.value,
                                label: input.label
                            }));
                            return <RadioGroup
                                name={e.id}
                                key={e.id}
                                label={e.name}
                                help={e.description}
                                options={radioOptions}
                                required
                            />
                        } else {
                            return <Input name={e.id} key={e.id} label={e.name} help={e.description}/>
                        }
                    }
                )}

                <input style={{ marginLeft: "50%" }} className="btn btn-primary" type="submit"
                       disabled={!this.state.canSubmit} defaultValue="Submit"/>
            </Form>
        );
    }
}
