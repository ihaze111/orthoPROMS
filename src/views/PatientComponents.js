import React from "react";
import Table from "react-bootstrap/Table";
import getCompositions from "../components/GetCompositions";

export function PatientOverview(props) {
    return <div style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
            <p>EHR ID: {props.ehrId}</p>
            <p>Name: Kim</p>
            <p>Age: 65</p>
            <p>Sex: M</p>
            <p>Type: Fracture</p>
            <p>Your GP: Doctor.Jack</p>
        </div>
        <div style={{ width: "40%", alignSelf: "center", textAlign: "center" }}>
            <img src="./240px-User_icon_2.svg.png"
                 style={{ width: "40%" }} alt=""/>
        </div>
    </div>;
}

function PatientProgressTableEntry(props) {
    return <tr>
        <td>{props.nhs_number}</td>
        <td>{props.composer_name}</td>
        <td>{props.episode_identifier}</td>
        <td>{props.aofas_comment}</td>
    </tr>;
}

class Compositions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let promise = getCompositions(this.props.ehrId);
        promise.then((e) => {
            this.setState({ compositions: e });
        });
    }

    render() {
        if (!this.state.compositions) return null;
        if (this.state.compositions.length > 0) {
            return this.state.compositions.map((e) =>
                PatientProgressTableEntry(e)
            )
        } else {
            return <tr>
                <td colspan="4">No compositions were found</td>
            </tr>;
        }
    }
}

export function PatientProgressTable(props) {
    if (props.ehrId) {
        return <Table striped bordered hover>
            <thead>
            <PatientProgressTableEntry nhs_number="NHS Number"
                                       composer_name="Composer Name"
                                       episode_identifier="Episode Identifier"
                                       aofas_comment="AOFAS Comment"/>
            </thead>
            <tbody>
            <Compositions ehrId={props.ehrId}/>
            </tbody>
        </Table>;
    } else {
        return null;
    }
}
