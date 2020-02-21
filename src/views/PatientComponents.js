import React from "react";
import Table from "react-bootstrap/Table";

import getCompositions from "../components/Queries/GetCompositions";
import getEHRBySubjectId from "../components/Queries/GetEHRBySubjectId";
import getScores from "../components/Queries/GetScores";
import getEpisodeScores from "../components/Queries/GetEpisodeScores";
import getRespirationRate from "../components/Queries/GetRespirationRate";
import getBloodPressure from "../components/Queries/GetBloodPressure";
import getIndirectOximetry from "../components/Queries/GetIndirectOximetry";
import getHeartRate from "../components/Queries/GetHeartRate";
import getAllergicList from "../components/Queries/GetAllergicList";
import getProcedures from "../components/Queries/GetProcedures";

import ScoresGraph from "../components/Graphs/ScoresGraph";
import RadarGraph from "../components/Graphs/RadarGraph";
import RespirationRateGraph from "../components/Graphs/RespirationRateGraph";
import BloodPressureGraph from "../components/Graphs/BloodPressureGraph";
import OxygenSaturationGraph from "../components/Graphs/OxygenSaturationGraph";
import HeartRateGraph from "../components/Graphs/HeartRateGraph";


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
                <td key="noCompositionsData" colSpan="4">No compositions were found</td>
            </tr>;
        }
    }
}

export function PatientProgressTable(props) {
    if (props.ehrId) {
        return <Table striped bordered hover >
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
        // eslint-disable-next-line array-callback-return
        this.state.scores.map((e) => {
            this.pushArray(e);
        });
        if (this.state.painArray.length > 0) {
            return <div><ScoresGraph pain={this.state.painArray}
                                     limit={this.state.limitationsArray}
                                     walking={this.state.walkingArray}
                                     surface={this.state.walking_surfacesArray}
                                     total={this.state.totalArray}
                                     time={this.state.regTimeArray}
                                     /></div>
        } else {
            return <p>No scores were found</p>;
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
            return <p>No episode scores were found</p>;
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
            respiration_magnitude : [],
            time : []
        };
    }

    componentDidMount() {
        let promise = getRespirationRate(this.props.ehrId);
        promise.then((e) => {
            this.setState({ respirationRate: e});
        });
    }

    pushIntoArrays(props){
        this.state.respiration_magnitude.push(props.respiration_rate.magnitude);
        this.state.time.push(props.time);
    }


    render() {
        if (!this.state.respirationRate) return null;
        // eslint-disable-next-line array-callback-return
        this.state.respirationRate.map((e) => {
            this.pushIntoArrays(e);
        });
        if (this.state.respirationRate.length > 0) {
            return <RespirationRateGraph magnitude={this.state.respiration_magnitude}
                               time={this.state.time}
                               units={this.state.respirationRate[0].respiration_rate.units}/>
        } else {
            return <p>No Respiration Rate were recorded</p>;
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

class BloodPressure extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            systolicRate : [],
            diastolicRate: [],
            time : []
        };
    }

    componentDidMount() {
        let promise = getBloodPressure(this.props.ehrId);
        promise.then((e) => {
            this.setState({ bloodPressure: e});
        });
    }

    pushIntoArrays(props){
        this.state.systolicRate.push(props.systolic.magnitude);
        this.state.diastolicRate.push(props.diastolic.magnitude);
        this.state.time.push(props.time);
    }


    render() {
        if (!this.state.bloodPressure) return null;
        this.state.bloodPressure.map((e) => {
            this.pushIntoArrays(e);
        });
        if (this.state.bloodPressure.length > 0) {
            return <BloodPressureGraph systolic={this.state.systolicRate}
                                       diastolic={this.state.diastolicRate}
                                       time={this.state.time}
                                       units={this.state.bloodPressure[0].systolic.units}/>
        } else {
            return <p>No Blood Pressure were recorded</p>;
        }
    }
}
export function PressureGraph(props) {
    if (props.ehrId) {
        return <div><BloodPressure ehrId={props.ehrId}/></div>
    } else {
        return null;
    }
}

class IndirectOximetry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            concentration : [],
            time : []
        };
    }

    componentDidMount() {
        let promise = getIndirectOximetry(this.props.ehrId);
        promise.then((e) => {
            this.setState({ indirectOximetry: e});
        });
    }

    pushIntoArraysandCalculate(props){
        var result = (props.numerator / props.denominator) * 100;
        this.state.concentration.push(result);
        this.state.time.push(props.time);
    }


    render() {
        if (!this.state.indirectOximetry) return null;
        this.state.indirectOximetry.map((e) => {
            this.pushIntoArraysandCalculate(e);
        });
        if (this.state.indirectOximetry.length > 0) {
            return <OxygenSaturationGraph percent={this.state.concentration}
                                          time={this.state.time}/>
        } else {
            return <p>No oxygen concentration were recorded</p>;
        }
    }
}
export function OxygenConcentrationGraph(props) {
    if (props.ehrId) {
        return <div><IndirectOximetry ehrId={props.ehrId}/></div>
    } else {
        return null;
    }
}

class HeartRate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            heartRateReadings : [],
            time : []
        };
    }

    componentDidMount() {
        let promise = getHeartRate(this.props.ehrId);
        promise.then((e) => {
            this.setState({ heartRate: e});
        });
    }

    pushIntoArrays(props){
        this.state.heartRateReadings.push(props.heart_rate.magnitude);
        this.state.time.push(props.time);
    }


    render() {
        if (!this.state.heartRate) return null;
        this.state.heartRate.map((e) => {
            this.pushIntoArrays(e);
        });
        if (this.state.heartRate.length > 0) {
            return <HeartRateGraph heartRates={this.state.heartRateReadings}
                                   time={this.state.time}
                                   units={this.state.heartRate[0].heart_rate.units}/>
        } else {
            return <p>No heart rates were recorded</p>;
        }
    }
}
export function HeartGraph(props) {
    if (props.ehrId) {
        return <div><HeartRate ehrId={props.ehrId}/></div>
    } else {
        return null;
    }
}

function PatientAllergicTableEntry(props) {
    // return <tr key={"allergies" + props.index}>
    // <td key={"allergies" + props.index + "cause"}>{props.cause}</td>
    // <td key={"allergies" + props.index + "comment"}>{props.comment}</td>
    // <td key={"allergies" + props.index + "reaction"}>{props.reaction}</td>
    // <td key={"allergies" + props.index + "exclusion"}>{props.exclusion}</td>
    // <td key={"allergies" + props.index + "update_exclusion_date"}>{props.update_exclusion_date}</td>
    return <tr key={"allergies" + props.index}>
    <td key={"allergies" + props.index + "cause"}>{props.cause}</td>
    <td key={"allergies" + props.index + "comment"}>{props.comment} {props.exclusion}</td>
    <td key={"allergies" + props.index + "reaction"}>{props.reaction}</td>
    <td key={"allergies" + props.index + "update_exclusion_date"}>{props.update_exclusion_date} </td>
    <td key={"allergies" + props.index + "composer"}>{props.composer}</td>
    </tr>;
}

class Allergies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let promise = getAllergicList(this.props.ehrId);
        promise.then((e) => {
            this.setState({ allergies: e });
        });
    }

    render() {
        if (!this.state.allergies) return null;
        if (this.state.allergies.length > 0) {
            return this.state.allergies.map((e, index) => {
                e.index = index;
                return PatientAllergicTableEntry(e)
            }
            )
        } else {
            return <tr key="noAllergiesRow">
                <td key="noAllergiesData" colSpan="6">No allergies records were found</td>
            </tr>;
        }
    }
}

export function PatientAllergiesTable(props) {
    if (props.ehrId) {
        return <Table striped bordered hover>
            <thead>
                <PatientAllergicTableEntry cause="Cause"
                                           comment="Comment"
                                           reaction="Reaction"
                                           update_exclusion_date="Exclusion of Adverse Reaction Date Last Updated"
                                           composer="Composer Name"/>                     
            </thead>   
            <tbody >
            <Allergies key='allergies' ehrId={props.ehrId}/>
            </tbody>
        </Table>;
    } else {
        return null;
    }
}

function ProceduresTableEntry(props) {
    return <tr key={"procedures" + props.index}>
    <td key={"procedures" + props.index + "procedure_name"}>{props.procedure_name}</td>
    <td key={"procedures" + props.index + "notes"}>{props.notes}</td>
    <td key={"procedures" + props.index + "careflow_step"}>{props.careflow_step}</td>
    <td key={"procedures" + props.index + "current_state"}>{props.current_state} </td>
    <td key={"procedures" + props.index + "name"}>{props.name}</td>
    <td key={"procedures" + props.index + "time"}>{props.time}</td>
    </tr>;
}

class Procedures extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let promise = getProcedures(this.props.ehrId);
        promise.then((e) => {
            this.setState({ procedures: e });
        });
    }

    render() {
        if (!this.state.procedures) return null;
        if (this.state.procedures.length > 0) {
            return this.state.procedures.map((e, index) => {
                e.index = index;
                return ProceduresTableEntry(e)
            }
            )
        } else {
            return <tr key="noProceduresRow">
                <td key="noProceduresData" colSpan="7">No procedures records were found</td>
            </tr>;
        }
    }
}

export function ProceduresTable(props) {
    if (props.ehrId) {
        return <Table striped bordered hover>
            <thead>
                <ProceduresTableEntry procedure_name="Procedure"
                                      notes="Notes"
                                      careflow_step="Careflow Step"
                                      current_state="Current State"
                                      name="Composer Name"
                                      time="Time"/>                     
            </thead>   
            <tbody >
            <Procedures key='procedures' ehrId={props.ehrId}/>
            </tbody>
        </Table>;
    } else {
        return null;
    }
}