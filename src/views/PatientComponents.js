import React from "react";
import Table from "react-bootstrap/Table";
import getCompositions from "../components/GetCompositions";
import getEHRBySubjectId from "../components/GetEHRBySubjectId";
import getScores from "../components/GetScores";
import { getSubjectId } from "./PatientUtils";
import ScoresGraph from "../components/ScoresGraph";

// export function PatientOverview(props) {
//     return <div style={{ display: "flex" }}>
//         <div style={{ width: "50%" }}>
//             <p>EHR ID: {props.ehrId}</p>
//             <p>Name: Kim</p>
//             <p>Age: 65</p>
//             <p>Sex: M</p>
//             <p>Type: Fracture</p>
//             <p>Your GP: Doctor.Jack</p>
//         </div>
//         <div style={{ width: "40%", alignSelf: "center", textAlign: "center" }}>
//             <img src="./240px-User_icon_2.svg.png"
//                  style={{ width: "40%" }} alt=""/>
//         </div>
//     </div>;
// }


export class PatientOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let subjectId = this.props.subjectId;
        let promise = getEHRBySubjectId(subjectId);
        promise.then((e) => {
            this.setState({ ehr: e });
        });
    }

    render() {
        if (!this.state.ehr) return null;
        return <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}>
                <p>EHR ID: {this.state.ehr.ehrId}</p>
                <p>Birth year: {this.state.ehr.birthYear}</p>
                <p>Administrative Gender: {this.state.ehr.administrativeGender}</p>
                <p>Birth sex: {this.state.ehr.birthSex}</p>
                {/*<p>Your GP:</p>*/}
            </div>
            <div style={{ width: "40%", alignSelf: "center", textAlign: "center" }}>
                <img src="./240px-User_icon_2.svg.png"
                     style={{ width: "40%" }} alt=""/>
            </div>
        </div>;
    }
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

class Scores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            painArray : [],
            limitationsArray : [],
            walkingArray : [],
            walking_surfacesArray : [],
            totalArray : [],
            regTimeArray: []
        };
    }

    componentDidMount() {
        let promise = getScores(this.props.ehrId);
        promise.then((e) => {
            this.setState({ scores: e});
        });
    }


    pushArray(props){
        this.state.painArray.push(props.pain);
        this.state.limitationsArray.push(props.limitations);
        this.state.walkingArray.push(props.walking);
        this.state.walking_surfacesArray.push(props.walking_surfaces);
        this.state.totalArray.push(props.total);
        this.state.regTimeArray.push(props.reg_time);
    }

    render() {
        if (!this.state.scores) return null;
        this.state.scores.map((e) => {
            this.pushArray(e);
        });
        // console.log(this.state.painArray);
        // console.log(this.state.limitationsArray);
        // console.log(this.state.walkingArray);
        // console.log(this.state.walking_surfacesArray);
        // console.log(this.state.totalArray);
        // console.log(this.state.regTimeArray);
        if (this.state.painArray.length > 0) {
            return <div><ScoresGraph pain={this.state.painArray}
                                     limit={this.state.limitationsArray}
                                     walking={this.state.walkingArray}
                                     surface={this.state.walking_surfacesArray}
                                     total={this.state.totalArray}
                                     time={this.state.regTimeArray}
                                     /></div>
        } else {
            return <tr>
                <td colspan="4">No scores were found</td>
            </tr>;
        }
    }
}
export function ScoresArray(props) {
    // const arrayMan = Scores
    // // arrayMan.push(<div><Scores ehrId={props.ehrId}/></div>);
    // // console.log(arrayMan);
    if (props.ehrId) {
        return <div><Scores ehrId={props.ehrId}/></div>
    } else {
        return null;
    }
}
