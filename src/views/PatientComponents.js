import React from "react";
import Table from "react-bootstrap/Table";
import getCompositions from "../components/Queries/GetCompositions";
import getEHRBySubjectId from "../components/Queries/GetEHRBySubjectId";
import getScores from "../components/Queries/GetScores";
import ScoresGraph from "../components/Graphs/ScoresGraph";
import RadarGraph from "../components/Graphs/RadarGraph";
import RespirationRateGraph from "../components/Graphs/RespirationRateGraph";
import BloodPressureGraph from "../components/Graphs/BloodPressureGraph";
import getEpisodeScores from "../components/Queries/GetEpisodeScores";
import getRangeEpisodeScores from "../components/Queries/GetRangeEpisodeScores";
import getRespirationRate from "../components/Queries/GetRespirationRate";
import getBloodPressure from "../components/Queries/GetBloodPressure";

import getIndirectOximetry from "../components/Queries/GetIndirectOximetry";
import getHeartRate from "../components/Queries/GetHeartRate";
import getAllergicList from "../components/Queries/GetAllergicList";
import getProcedures from "../components/Queries/GetProcedures";
import getLabOrders from "../components/Queries/GetLabOrders";
import getLabReports from "../components/Queries/GetLabReports";

import OxygenSaturationGraph from "../components/Graphs/OxygenSaturationGraph";
import HeartRateGraph from "../components/Graphs/HeartRateGraph";
import {
    NHSSummaryList,
    NHSSummaryListKey,
    NHSSummaryListRow,
    NHSSummaryListValue
} from "../components/nhsuk-frontend-react/NHSSummaryList";
import {
    NHSTable,
    NHSTableWrapper,
    NHSTBody,
    NHSTd,
    NHSTh,
    NHSTHead,
    NHSTr
} from "../components/nhsuk-frontend-react/NHSTableWrapperTest";

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
            <NHSSummaryList style={{ width: '70%' }}>
                <NHSSummaryListRow>
                    <NHSSummaryListKey>EHR ID</NHSSummaryListKey>
                    <NHSSummaryListValue>{this.state.ehr.ehrId}</NHSSummaryListValue>
                </NHSSummaryListRow>
                <NHSSummaryListRow>
                    <NHSSummaryListKey>Birth year</NHSSummaryListKey>
                    <NHSSummaryListValue>{this.state.ehr.birthYear}</NHSSummaryListValue>
                </NHSSummaryListRow>
                <NHSSummaryListRow>
                    <NHSSummaryListKey>Administrative Gender</NHSSummaryListKey>
                    <NHSSummaryListValue>{this.state.ehr.administrativeGender}</NHSSummaryListValue>
                </NHSSummaryListRow>
                <NHSSummaryListRow>
                    <NHSSummaryListKey>Birth sex</NHSSummaryListKey>
                    <NHSSummaryListValue>{this.state.ehr.birthSex}</NHSSummaryListValue>
                </NHSSummaryListRow>
            </NHSSummaryList>
            <div style={{ width: "30%", alignSelf: "center", textAlign: "center" }}>
                <img src="./240px-User_icon_2.svg.png"
                     style={{ width: "40%" }} alt=""/>
            </div>
        </div>;
    }
}

function PatientProgressTableEntry(props) {
    // TODO: what happens if no NHS number?
    return <NHSTr key={"composition" + props.nhs_number + "no" + props.index}>
        <NHSTd key={"composition" + props.nhs_number + "no" + props.index + "nhsNumber"}>{props.nhs_number}</NHSTd>
        <NHSTd
            key={"composition" + props.nhs_number + "no" + props.index + "composerName"}>{props.composer_name}</NHSTd>
        <NHSTd
            key={"composition" + props.nhs_number + "no" + props.index + "episodeIdentifier"}>{props.episode_identifier}</NHSTd>
        <NHSTd
            key={"composition" + props.nhs_number + "no" + props.index + "aofasComment"}>{props.aofas_comment}</NHSTd>
    </NHSTr>;
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
            return <NHSTr key="noCompositionsRow">
                <NHSTd key="noCompositionsData" colSpan="4">No compositions were found</NHSTd>
            </NHSTr>;
        }
    }
}

export function PatientProgressTable(props) {
    if (props.ehrId) {
        return <NHSTableWrapper>
            <NHSTable>
                <NHSTHead>
                    <NHSTr key={"compositionNHS Numberno" + props.index}>
                        <NHSTh key={"compositionNHS Numberno" + props.index + "nhsNumber"}>NHS Number</NHSTh>
                        <NHSTh
                            key={"compositionNHS Numberno" + props.index + "composerName"}>Composer Name</NHSTh>
                        <NHSTh
                            key={"compositionNHS Numberno" + props.index + "episodeIdentifier"}>Episode
                            Identifier</NHSTh>
                        <NHSTh
                            key={"compositionNHS Numberno" + props.index + "aofasComment"}>AOFAS Comment</NHSTh>
                    </NHSTr>
                </NHSTHead>
                <NHSTBody>
                    <Compositions key='compositions' ehrId={props.ehrId}/>
                </NHSTBody>
            </NHSTable></NHSTableWrapper>;
    } else {
        return null;
    }
}

class Scores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            painArray: [],
            limitationsArray: [],
            walkingArray: [],
            walking_surfacesArray: [],
            totalArray: [],
            regTimeArray: []
        };
    }

    componentDidMount() {
        let promise = getScores(this.props.ehrId);
        promise.then((e) => {
            this.setState({ scores: e });
        });
    }


    pushArray(props) {
        this.state.painArray.push(props.pain);
        this.state.limitationsArray.push(props.limitations);
        this.state.walkingArray.push(props.walking);
        this.state.walking_surfacesArray.push(props.walking_surfaces);
        this.state.totalArray.push(props.total);
        this.state.regTimeArray.push(props.reg_time.replace(/T/, ' ').substring(0, props.reg_time.indexOf('.'))
            || props.reg_time.replace(/T/, ' ').substring(0, props.reg_time.indexOf('Z')));
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
            preOp: [],
            oneWeekPostOp: [],
            sixWeeksPostOp: []
        };
    }

    componentDidMount() {
        let promise = getEpisodeScores(this.props.ehrId);
        promise.then((e) => {
            this.setState({ episodeScores: e });
        });
    }

    pushIntoCategory(props) {
        if (props.length > 0) {
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
            respiration_magnitude: [],
            time: []
        };
    }

    componentDidMount() {
        let promise = getRespirationRate(this.props.ehrId);
        promise.then((e) => {
            this.setState({ respirationRate: e });
        });
    }

    pushIntoArrays(props) {
        this.state.respiration_magnitude.push(props.respiration_rate.magnitude);
        this.state.time.push(props.time.replace(/T/, ' ').substring(0, props.time.indexOf('.'))
            || props.time.replace(/T/, ' ').substring(0, props.time.indexOf('Z')));
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
            systolicRate: [],
            diastolicRate: [],
            time: []
        };
    }

    componentDidMount() {
        let promise = getBloodPressure(this.props.ehrId);
        promise.then((e) => {
            this.setState({ bloodPressure: e });
        });
    }

    pushIntoArrays(props) {
        this.state.systolicRate.push(props.systolic.magnitude);
        this.state.diastolicRate.push(props.diastolic.magnitude);
        this.state.time.push(props.time.replace(/T/, ' ').substring(0, props.time.indexOf('.'))
            || props.time.replace(/T/, ' ').substring(0, props.time.indexOf('Z')));
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


class RangeEpisodeScores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preOp: [],
            oneWeekPostOp: [],
            sixWeeksPostOp: []
        };
    }

    componentDidMount() {
        let promise = getRangeEpisodeScores();
        promise.then((e) => {
            this.setState({ rangeEpisodeScores: e });
        });
    }

    render() {
        if (!this.state.rangeEpisodeScores) return null;
        console.log(this.state.rangeEpisodeScores.preOp);
        console.log(this.state.rangeEpisodeScores.oneWeekPostOp);
        console.log(this.state.rangeEpisodeScores.sixWeeksPostOp);
        return <RadarGraph preOp={this.state.rangeEpisodeScores.preOp}
                           oneWeek={this.state.rangeEpisodeScores.oneWeek}
                           sixWeeks={this.state.rangeEpisodeScores.sixWeeks}/>
    }
}

export function RangeEpisodeScoresGraph() {
    return <div><RangeEpisodeScores/></div>
}

class IndirectOximetry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            concentration: [],
            time: []
        };
    }

    componentDidMount() {
        let promise = getIndirectOximetry(this.props.ehrId);
        promise.then((e) => {
            this.setState({ indirectOximetry: e });
        });
    }

    pushIntoArraysandCalculate(props) {
        var result = (props.numerator / props.denominator) * 100;
        this.state.concentration.push(result);
        this.state.time.push(props.time.replace(/T/, ' ').substring(0, props.time.indexOf('.'))
            || props.time.replace(/T/, ' ').substring(0, props.time.indexOf('Z')));
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
            heartRateReadings: [],
            time: []
        };
    }

    componentDidMount() {
        let promise = getHeartRate(this.props.ehrId);
        promise.then((e) => {
            this.setState({ heartRate: e });
        });
    }

    pushIntoArrays(props) {
        this.state.heartRateReadings.push(props.heart_rate.magnitude);
        this.state.time.push(props.time.replace(/T/, ' ').substring(0, props.time.indexOf('.'))
            || props.time.replace(/T/, ' ').substring(0, props.time.indexOf('Z')));
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
    return <NHSTr key={"allergies" + props.index}>
        <NHSTd key={"allergies" + props.index + "cause"}>{props.cause}</NHSTd>
        <NHSTd key={"allergies" + props.index + "comment"}>{props.comment} {props.exclusion}</NHSTd>
        <NHSTd key={"allergies" + props.index + "reaction"}>{props.reaction}</NHSTd>
        <NHSTd key={"allergies" + props.index + "update_exclusion_date"}>{props.update_exclusion_date} </NHSTd>
        <NHSTd key={"allergies" + props.index + "composer"}>{props.composer}</NHSTd>
    </NHSTr>;
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
            return <NHSTr key="noAllergiesRow">
                <NHSTd key="noAllergiesData" colSpan="6">No allergies records were found</NHSTd>
            </NHSTr>;
        }
    }
}

export function PatientAllergiesTable(props) {
    if (props.ehrId) {
        return <NHSTableWrapper>
        <NHSTable>
            <NHSTHead>
                <NHSTr key={"allergiesno" + props.index}>
                    <NHSTh key={"allergiesno" + props.index + "cause"}>Cause</NHSTh>
                    <NHSTh
                        key={"allergiesno" + props.index + "comment"}>Comment</NHSTh>
                    <NHSTh
                        key={"allergiesno" + props.index + "reaction"}>Reaction</NHSTh>
                    <NHSTh
                        key={"allergiesno" + props.index + "update_Exclusion_date"}>Exclusion Date</NHSTh>
                    <NHSTh
                        key={"allergiesno" + props.index + "composer"}>Composer Name</NHSTh>
                </NHSTr>
            </NHSTHead>
            <NHSTBody>
                <Allergies key='allergies' ehrId={props.ehrId}/>
            </NHSTBody>
        </NHSTable></NHSTableWrapper>;
    } else {
        return null;
    }
}

function ProceduresTableEntry(props) {
    // return <tr key={"procedures" + props.index}>
    //     <td key={"procedures" + props.index + "procedure_name"}>{props.procedure_name}</td>
    //     <td key={"procedures" + props.index + "notes"}>{props.notes}</td>
    //     <td key={"procedures" + props.index + "careflow_step"}>{props.careflow_step}</td>
    //     <td key={"procedures" + props.index + "current_state"}>{props.current_state} </td>
    //     <td key={"procedures" + props.index + "name"}>{props.name}</td>
    //     <td key={"procedures" + props.index + "time"}>{props.time}</td>
    // </tr>;
    return <NHSTr key={"procedures" + props.index}>
        <NHSTd key={"procedures" + props.index + "procedure_name"}>{props.procedure_name}</NHSTd>
        <NHSTd key={"proceduress" + props.index + "notes"}>{props.notes}</NHSTd>
        <NHSTd key={"procedures" + props.index + "careflow_step"}>{props.careflow_step}</NHSTd>
        <NHSTd key={"procedures" + props.index + "time"}>{props.time} </NHSTd>
        <NHSTd key={"procedures" + props.index + "name"}>{props.name}</NHSTd>
    </NHSTr>;
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
            return <NHSTr key="noProceduresRow">
                <NHSTd key="noProceduresData" colSpan="7">No procedures records were found</NHSTd>
            </NHSTr>;
        }
    }
}

export function ProceduresTable(props) {
    if (props.ehrId) {
        return <NHSTableWrapper>
        <NHSTable>
            <NHSTHead>
                <NHSTr key={"proceduresno" + props.index}>
                    <NHSTh key={"proceduresno" + props.index + "procedure_name"}>Procedure</NHSTh>
                    <NHSTh
                        key={"proceduresno" + props.index + "notes"}>Notes</NHSTh>
                    <NHSTh
                        key={"proceduresno" + props.index + "careflow_step"}>Careflow Step</NHSTh>
                    <NHSTh
                        key={"proceduresno" + props.index + "time"}>Time</NHSTh>
                    <NHSTh
                        key={"proceduresno" + props.index + "name"}>Composer Name</NHSTh>
                </NHSTr>
            </NHSTHead>
            <NHSTBody>
                <Allergies key='procedures' ehrId={props.ehrId}/>
            </NHSTBody>
        </NHSTable></NHSTableWrapper>;
        // return <Table striped bordered hover>
        //     <thead>
        //     <ProceduresTableEntry procedure_name="Procedure"
        //                           notes="Notes"
        //                           careflow_step="Careflow Step"
        //                           current_state="Current State"
        //                           name="Composer Name"
        //                           time="Time"/>
        //     </thead>
        //     <tbody>
        //     <Procedures key='procedures' ehrId={props.ehrId}/>
        //     </tbody>
        // </Table>;
    } else {
        return null;
    }
}

function LabOrdersTableEntry(props) {
    return <tr key={"orders" + props.index}>
        <td key={"orders" + props.index + "request"}>{props.request}</td>
        <td key={"orders" + props.index + "composer"}>{props.composer}</td>
        <td key={"orders" + props.index + "timing"}>{props.timing}</td>
        <td key={"orders" + props.index + "context_time"}>{props.context_time}</td>
    </tr>;
}

class LabOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let promise = getLabOrders(this.props.ehrId);
        promise.then((e) => {
            this.setState({ orders: e });
        });
    }

    render() {
        if (!this.state.orders) return null;
        if (this.state.orders.length > 0) {
            return this.state.orders.map((e, index) => {
                    e.index = index;
                    return LabOrdersTableEntry(e)
                }
            )
        } else {
            return <tr key="noLabOrders">
                <td key="noLabOrders" colSpan="7">No lab orders records were found</td>
            </tr>;
        }
    }
}

export function LabOrdersTable(props) {
    if (props.ehrId) {
        return <Table striped bordered hover>
            <thead>
            <LabOrdersTableEntry request="Requests"
                                 composer="Composer Name"
                                 timing="Request Timing"
                                 context_time="Time"/>
            </thead>
            <tbody>
            <LabOrders key='orders' ehrId={props.ehrId}/>
            </tbody>
        </Table>;
    } else {
        return null;
    }
}

function LabReportsTableEntry(props) {
    return <tr key={"reports" + props.index}>
        <td key={"reports" + props.index + "test"}>{props.test}</td>
        <td key={"reports" + props.index + "test_status"}>{props.test_status}</td>
        <td key={"reports" + props.index + "comment"}>{props.comment}</td>
        <td key={"reports" + props.index + "conclusion"}>{props.conclusion}</td>
        <td key={"reports" + props.index + "test_timestamp"}>{props.test_timestamp}</td>
        <td key={"reports" + props.index + "composer"}>{props.composer}</td>
    </tr>;
}

class LabReports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let promise = getLabReports(this.props.ehrId);
        promise.then((e) => {
            this.setState({ reports: e });
        });
    }

    render() {
        if (!this.state.reports) return null;
        if (this.state.reports.length > 0) {
            return this.state.reports.map((e, index) => {
                    e.index = index;
                    return LabReportsTableEntry(e)
                }
            )
        } else {
            return <tr key="noLabReports">
                <td key="noLabReports" colSpan="7">No lab reports records were found</td>
            </tr>;
        }
    }
}

export function LabReportsTable(props) {
    if (props.ehrId) {
        return <Table striped bordered hover size="sm">
            <thead>
            <LabReportsTableEntry test="Tests"
                                  test_status="Test Status"
                                  comment="Comment"
                                  conclusion="Conclusion"
                                  test_timestamp="Test Timestamp"
                                  composer="Composer Name"/>
            </thead>
            <tbody>
            <LabReports key='reports' ehrId={props.ehrId}/>
            </tbody>
        </Table>;
    } else {
        return null;
    }
}
