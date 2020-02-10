import React from "react";
import Table from "react-bootstrap/Table";
import getCompositions from "../components/GetCompositions";
import getEHRBySubjectId from "../components/GetEHRBySubjectId";
import getScores from "../components/GetScores";
import ScoresGraph from "../components/ScoresGraph";
import RadarGraph from "../components/RadarGraph";
import getEpisodeScores from "../components/GetEpisodeScores";
import getRespirationRate from "../components/GetRespirationRate";

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
    // TODO: what happens if no NHS number?
    return <tr key={"composition" + props.nhs_number + "no" + props.index}>
        <td key={"composition" + props.nhs_number + "no" + props.index + "nhsNumber"}>{props.nhs_number}</td>
        <td key={"composition" + props.nhs_number + "no" + props.index + "composerName"}>{props.composer_name}</td>
        <td key={"composition" + props.nhs_number + "no" + props.index + "episodeIdentifier"}>{props.episode_identifier}</td>
        <td key={"composition" + props.nhs_number + "no" + props.index + "aofasComment"}>{props.aofas_comment}</td>
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
            return this.state.compositions.map((e, index) => {
                e.index = index;
                return PatientProgressTableEntry(e)
            }
            )
        } else {
            return <tr key="noCompositionsRow">
                <td key="noCompositionsData" colspan="4">No compositions were found</td>
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
            <Compositions key='compositions' ehrId={props.ehrId}/>
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
    if (props.ehrId) {
        return <div><Scores ehrId={props.ehrId}/></div>
    } else {
        return null;
    }
}

class EpisodeScores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preOp:[],
            oneWeekPostOp: [],
            sixWeeksPostOp: []
        };
    }

    componentDidMount() {
        let promise = getEpisodeScores(this.props.ehrId);
        promise.then((e) => {
            this.setState({ episodeScores: e});
        });
    }

    pushIntoCategory(props){
        if (props.length > 0){
            this.state.preOp.push(props[0].pain);
            this.state.preOp.push(props[0].limitations);
            this.state.preOp.push(props[0].walking);
            this.state.preOp.push(props[0].walking_surfaces);
            this.state.oneWeekPostOp.push(props[1].pain);
            this.state.oneWeekPostOp.push(props[1].limitations);
            this.state.oneWeekPostOp.push(props[1].walking);
            this.state.oneWeekPostOp.push(props[1].walking_surfaces);
        }
    }


    render() {
        if (!this.state.episodeScores) return null;
        this.pushIntoCategory(this.state.episodeScores);
        if (this.state.episodeScores.length > 0) {
            return <RadarGraph preOp={this.state.preOp}
                               oneWeek={this.state.oneWeekPostOp}
                               sixWeeks={this.state.sixWeeksPostOp}/>
        } else {
            return <tr>
                <td colspan="4">No episode scores were found</td>
            </tr>;
        }
    }
}
export function EpisodeScoresGraph(props) {
    if (props.ehrId) {
        return <div><EpisodeScores ehrId={props.ehrId}/></div>
    } else {
        return null;
    }
}

class RespirationRate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        let promise = getRespirationRate(this.props.ehrId);
        promise.then((e) => {
            this.setState({ respirationRate: e});
        });
    }

    // pushIntoCategory(props){
    //     if (props.length > 0){
    //     }
    // }


    render() {
        if (!this.state.respirationRate) return null;
        // this.pushIntoCategory(this.state.episodeScores);
        if (this.state.respirationRate.length > 0) {
            return <RadarGraph/>
        } else {
            return <tr>
                <td colspan="4">No Respiration Rate were recorded</td>
            </tr>;
        }
    }
}
export function RespirationGraph(props) {
    if (props.ehrId) {
        return <div><RespirationRate ehrId={props.ehrId}/></div>
    } else {
        return null;
    }
}
