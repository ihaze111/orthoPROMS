import React from "react";
import getEHRId from "../components/GetEHRId";
import qs from "qs";

class EHRId extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let promise = getEHRId(this.props.subjectId);
        promise.then((e) => {
            this.setState({ ehrId: e });
        });
    }

    render() {
        if (!this.state.ehrId) return null;
        return <span>{this.state.ehrId}</span>;
    }
}

export function PatientOverview(props) {
    return <div style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
            <p>EHR ID: <EHRId subjectId={props.subjectId}/></p>
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
