import React from "react";

import getAllCompositionsByEHRId from "../components/Queries/getAllCompositionsByEHRId";
import getEHRByNHSNumber from "../components/Queries/getEHRByNHSNumber";
import getAOFASScoresAgainstTimeByEHRId from "../components/Queries/getAOFASScoresAgainstTimeByEHRId";
import getAOFASScoresAgainstEpisodeByEHRId from "../components/Queries/getAOFASScoresAgainstEpisodeByEHRId";
import getRespirationRateAgainstTimeByEHRId from "../components/Queries/getRespirationRateAgainstTimeByEHRId";
import getBloodPressureByEHRId from "../components/Queries/getBloodPressureByEHRId";
import getIndirectOximetryAgainstTimeByEHRId from "../components/Queries/getIndirectOximetryAgainstTimeByEHRId";
import getHeartRatesAgainstTimeByEHRId from "../components/Queries/getHeartRatesAgainstTimeByEHRId";
import getAllergiesListByEHRId from "../components/Queries/getAllergiesListByEHRId";
import getProceduresListByEHRId from "../components/Queries/getProceduresListByEHRId";
import getLabOrdersListByEHRId from "../components/Queries/getLabOrdersListByEHRId";
import getLabReportsListByEHRId from "../components/Queries/getLabReportsListByEHRId";

import ScoresGraph from "../components/Graphs/ScoresGraph";
import RespirationRateGraph from "../components/Graphs/RespirationRateGraph";
import BloodPressureGraph from "../components/Graphs/BloodPressureGraph";
import OxygenSaturationGraph from "../components/Graphs/OxygenSaturationGraph";
import HeartRateGraph from "../components/Graphs/HeartRateGraph";
import IndividualScoresRange from "../components/Graphs/IndividualScoresRange";
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { DownloadCSV } from "../components/DownloadCSV";

import {
    NHSSummaryList,
    NHSSummaryListKey,
    NHSSummaryListRow,
    NHSSummaryListValue
} from "../components/react-styled-nhs/src/NHSSummaryList";
import {
    NHSTable,
    NHSTableWrapper,
    NHSTBody,
    NHSTd,
    NHSTh,
    NHSTHead,
    NHSTr
} from "../components/react-styled-nhs/src/NHSTableWrapperTest";

import { connect } from "react-redux";
import { setCompositions } from "../actions/appActions";
import getPatientDemographicsByEHRId from "../components/Queries/getPatientDemographicsByEHRId";
import { NHSPanelBody } from "../components/react-styled-nhs/src/NHSPanel";
import * as PropTypes from "prop-types";

export class PatientDemographics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let promise = getPatientDemographicsByEHRId(this.props.ehrId);
        promise.then(e => {
            this.setState({ demographics: e });
        });
    }

    render() {
        if (!this.state.demographics) return <div></div>;
        return <details className="nhsuk-details nhsuk-expander">
            <summary className="nhsuk-details__summary">
                <span className="nhsuk-details__summary-text">Demographic information</span>
            </summary>
            <div className="nhsuk-details__text">
                <h4>Demographic information</h4>
                <h5>Information stored in seperate demographic record</h5>
                <NHSPanelBody>
                    <NHSSummaryList>
                        {this.state.demographics.map((e) => {
                            return <NHSSummaryListRow key={"demographics-" + e[0]}>
                                <NHSSummaryListKey>{e[0]}</NHSSummaryListKey>
                                <NHSSummaryListValue>{e[1]}</NHSSummaryListValue>
                            </NHSSummaryListRow>;
                        })}
                    </NHSSummaryList>
                </NHSPanelBody>
            </div>
        </details>;
    }
}

PatientDemographics.propTypes = {
    ehrId: PropTypes.string
};

export class PatientOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let subjectId = this.props.subjectId;
        let promise = getEHRByNHSNumber(subjectId);
        promise.then(e => {
            this.setState({ ehr: e });
        });
    }

    render() {
        if (!this.state.ehr) return null;
        return <div style={{ display: "flex" }}>
            <div style={{ width: '70%' }}>
                <NHSSummaryList>
                    <NHSSummaryListRow>
                        <NHSSummaryListKey>EHR ID</NHSSummaryListKey>
                        <NHSSummaryListValue>{this.state.ehr.ehrId}</NHSSummaryListValue>
                    </NHSSummaryListRow>
                    <NHSSummaryListRow>
                        <NHSSummaryListKey>NHS Number</NHSSummaryListKey>
                        <NHSSummaryListValue>{this.props.subjectId}</NHSSummaryListValue>
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
                    <NHSSummaryListRow>
                        <NHSSummaryListKey>Vital status</NHSSummaryListKey>
                        <NHSSummaryListValue>{this.state.ehr.vitalStatus}</NHSSummaryListValue>
                    </NHSSummaryListRow>
                </NHSSummaryList>
            </div>
            <div style={{ width: "30%", alignSelf: "center", textAlign: "center" }}>
                <img src="./240px-User_icon_2.svg.png"
                     style={{ width: "40%" }} alt=""/>
            </div>
        </div>;
    }
}

PatientOverview.propTypes = {
    subjectId: PropTypes.object
};

function PatientProgressTableEntry(props) {
    // TODO: what happens if no NHS number?
    return <NHSTr key={"composition" + props.nhs_number + "no" + props.index}>
        <NHSTd key={"composition" + props.nhs_number + "no" + props.index + "index"}><a
            href={'/Composition?compId=' + props.comp_id}>{props.index + 1}</a></NHSTd>
        <NHSTd key={"composition" + props.nhs_number + "no" + props.index + "nhsNumber"}>{props.nhs_number}</NHSTd>
        <NHSTd
            key={"composition" + props.nhs_number + "no" + props.index + "composerName"}>{props.composer_name}</NHSTd>
        <NHSTd
            key={"composition" + props.nhs_number + "no" + props.index + "episodeIdentifier"}>{props.episode_identifier}</NHSTd>
        <NHSTd
            key={"composition" + props.nhs_number + "no" + props.index + "aofasComment"}>{props.aofas_comment}</NHSTd>
    </NHSTr>;
}

PatientProgressTableEntry.propTypes = {
    nhs_number: PropTypes.string,
    index: PropTypes.number,
    comp_id: PropTypes.string,
    composer_name: PropTypes.string,
    episode_identifier: PropTypes.string,
    aofas_comment: PropTypes.string
};

class Composition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            List: []
        };
    }

    componentDidMount() {
        let promise = getAllCompositionsByEHRId(this.props.ehrId);
        promise.then(e => {
            this.props.setCompositions(e);
            this.setState({ compositions: e });
        });
    }

    componentWillReceiveProps(nextProps) {
        let Lists = nextProps.compositionsFiltered;
        this.setState({
            List: (Lists || []).slice(0, 10)
        })
    }

    handlePageChange(e) {
        let { compositionsFiltered } = this.props;
        this.setState({
            page: e,
            List: e >= 1 ? compositionsFiltered.slice((e - 1) * 10, e * 10) : compositionsFiltered.slice(0, 10)
        });
    }

    render() {
        let { compositionsFiltered } = this.props;
        let List = this.state.List;
        if (!compositionsFiltered) return null;
        if (compositionsFiltered.length > 0) {
            return <React.Fragment>
                {
                    List.map((e, index) => {
                        e.index = index;
                        return PatientProgressTableEntry(e);
                    })
                }
                <NHSTr key="paginationRow">
                    <NHSTd colSpan="5" key="paginationCell">
                        <Pagination current={this.state.page} total={compositionsFiltered.length}
                                    onChange={this.handlePageChange.bind(this)}/>
                    </NHSTd>
                </NHSTr>
            </React.Fragment>;
        } else {
            return <NHSTr key="noCompositionsRow">
                <NHSTd key="noCompositionsData" colSpan="5">No compositions were found</NHSTd>
            </NHSTr>;
        }
    }
}

Composition.propTypes = {
    ehrId: PropTypes.string,
    setCompositions: PropTypes.func,
    compositionsFiltered: PropTypes.object
};

const Compositions = connect(
    state => {
        return {
            compositionsFiltered: state.app.compositionsFiltered
        };
    },
    {
        setCompositions
    }
)(Composition);

export function PatientProgressTable(props) {
    if (props.ehrId) {
        return <NHSTableWrapper>
            <NHSTable>
                <NHSTHead>
                    <NHSTr key={"compositionNHS Numberno" + props.index}>
                        <NHSTh key={"compositionNHS Numberno" + props.index + "index"}>#</NHSTh>
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
            </NHSTable>
        </NHSTableWrapper>;
    } else {
        return null;
    }
}

PatientProgressTable.propTypes = {
    index: PropTypes.number,
    ehrId: PropTypes.string
};

class Scores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            compIdArray: [],
            painArray: [],
            limitationsArray: [],
            walkingArray: [],
            walking_surfacesArray: [],
            totalArray: [],
            regTimeArray: [],
            label: ["Pain", "Activity limitations and support requirements", "Walking", "Walking surfaces",
                "Total score"],
            isLoading: true
        };
    }

    componentWillMount() {
        let promise = getAOFASScoresAgainstTimeByEHRId(this.props.ehrId);
        promise.then(e => {
            e.forEach(el => {
                this.pushArray(el);
            });
            this.setState({ isLoading: false });
        });
    }

    pushArray(props) {
        this.state.compIdArray.push(props.comp_id);
        this.state.painArray.push(props.pain);
        this.state.limitationsArray.push(props.limitations);
        this.state.walkingArray.push(props.walking);
        this.state.walking_surfacesArray.push(props.walking_surfaces);
        this.state.totalArray.push(props.total);
        this.state.regTimeArray.push(props.reg_time.replace(/T/, ' ').substring(0, props.reg_time.indexOf('.'))
            || props.reg_time.replace(/T/, ' ').substring(0, props.reg_time.indexOf('Z')));
    }

    render() {
        let { isLoading } = this.state;
        if (isLoading) {
            return <p>Loading...</p>;
        } else {
            if (this.state.painArray.length > 0) {
                return <div>
                    <React.Fragment>
                        <ScoresGraph
                            compId={this.state.compIdArray}
                            pain={this.state.painArray}
                            limit={this.state.limitationsArray}
                            walking={this.state.walkingArray}
                            surface={this.state.walking_surfacesArray}
                            total={this.state.totalArray}
                            time={this.state.regTimeArray}/>
                        <br/><br/>
                        <DownloadCSV array={[this.state.label, this.state.painArray, this.state.limitationsArray,
                            this.state.walkingArray, this.state.walking_surfacesArray, this.state.totalArray]}
                                     fileName={"Scores.csv"}/></React.Fragment></div>
            } else {
                return <p>No scores were found</p>;
            }
        }
    }
}

Scores.propTypes = {
    ehrId: PropTypes.string
};

export function ScoresArray(props) {
    if (props.ehrId) {
        return <div><Scores ehrId={props.ehrId}/></div>
    } else {
        return null;
    }
}

ScoresArray.propTypes = {
    ehrId: PropTypes.string
};

class EpisodeScores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preOp: [],
            oneWeekPostOp: [],
            sixWeeksPostOp: [],
            labels: ["Pain", "Activity limitations and support requirements", "Walking", "Walking surfaces"],
            isLoading: true
        };
    }

    componentWillMount() {
        let promise = getAOFASScoresAgainstEpisodeByEHRId(this.props.ehrId);
        promise.then(e => {
            console.log(e);
            this.pushIntoCategory(e);
            this.setState({ episodeScores: e, isLoading: false });
        });
    }

    pushIntoCategory(props) {
        props.forEach((prop) => {
            if (prop.episode_identifier === 'Pre-operative') {
                this.state.preOp.push(prop.pain);
                this.state.preOp.push(prop.limitations);
                this.state.preOp.push(prop.walking);
                this.state.preOp.push(prop.walking_surfaces);
            } else if (prop.episode_identifier === '1 week post-operative') {
                this.state.oneWeekPostOp.push(prop.pain);
                this.state.oneWeekPostOp.push(prop.limitations);
                this.state.oneWeekPostOp.push(prop.walking);
                this.state.oneWeekPostOp.push(prop.walking_surfaces);
            } else if (prop.episode_identifier === '6 weeks post-operative') {
                this.state.sixWeeksPostOp.push(prop.pain);
                this.state.sixWeeksPostOp.push(prop.limitations);
                this.state.sixWeeksPostOp.push(prop.walking);
                this.state.sixWeeksPostOp.push(prop.walking_surfaces);
            }
        });
    }

    render() {
        if (!this.state.episodeScores) return null;
        let { isLoading } = this.state;
        if (isLoading) {
            return <p>Loading...</p>;
        } else {
            if (this.state.episodeScores.length > 0) {
                return <React.Fragment><IndividualScoresRange preOp={this.state.preOp}
                                                              oneWeek={this.state.oneWeekPostOp}
                                                              sixWeeks={this.state.sixWeeksPostOp}
                                                              label={this.state.labels}/><br/><br/>
                    <DownloadCSV
                        array={[this.state.labels, this.state.preOp, this.state.oneWeekPostOp,
                            this.state.sixWeeksPostOp]}
                        fileName={"Episode_Scores.csv"}/>
                </React.Fragment>;
            } else {
                return <p>No scores were found</p>
            }
        }
    }
}

EpisodeScores.propTypes = {
    ehrId: PropTypes.string
};

export function EpisodeScoresGraph(props) {
    if (props.ehrId) {
        return <div><EpisodeScores ehrId={props.ehrId}/></div>
    } else {
        return null;
    }
}

EpisodeScoresGraph.propTypes = {
    ehrId: PropTypes.string
};

class RespirationRate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            compIdArray: [],
            respiration_magnitude: [],
            time: []
        };
    }

    componentDidMount() {
        let promise = getRespirationRateAgainstTimeByEHRId(this.props.ehrId);
        promise.then((e) => {
            e.forEach(el => {
                this.pushIntoArrays(el);
            });
            this.setState({ respirationRate: e });
        });
    }

    pushIntoArrays(props) {
        this.state.compIdArray.push(props.comp_id);
        this.state.respiration_magnitude.push(props.respiration_rate.magnitude);
        this.state.time.push(props.time.replace(/T/, ' ').substring(0, props.time.indexOf('.'))
            || props.time.replace(/T/, ' ').substring(0, props.time.indexOf('Z')));
    }


    render() {
        if (!this.state.respirationRate) return null;
        // eslint-disable-next-line array-callback-return
        if (this.state.respirationRate.length > 0) {
            return <RespirationRateGraph compId={this.state.compIdArray}
                                         magnitude={this.state.respiration_magnitude}
                                         time={this.state.time}
                                         units={this.state.respirationRate[0].respiration_rate.units}/>
        } else {
            return <p>No Respiration Rate were recorded</p>;
        }
    }
}


RespirationRate.propTypes = {
    ehrId: PropTypes.string
};

export function RespirationGraph(props) {
    if (props.ehrId) {
        return <div><RespirationRate ehrId={props.ehrId}/></div>
    } else {
        return null;
    }
}

RespirationGraph.propTypes = {
    ehrId: PropTypes.string
};

class BloodPressure extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            compIdArray: [],
            systolicRate: [],
            diastolicRate: [],
            time: []
        };
    }

    componentDidMount() {
        let promise = getBloodPressureByEHRId(this.props.ehrId);
        promise.then((e) => {
            e.forEach(el => {
                this.pushIntoArrays(el);
            });
            this.setState({ bloodPressure: e });
        });
    }

    pushIntoArrays(props) {
        this.state.compIdArray.push(props.comp_id);
        this.state.systolicRate.push(props.systolic.magnitude);
        this.state.diastolicRate.push(props.diastolic.magnitude);
        this.state.time.push(props.time.replace(/T/, ' ').substring(0, props.time.indexOf('.'))
            || props.time.replace(/T/, ' ').substring(0, props.time.indexOf('Z')));
    }


    render() {
        if (!this.state.bloodPressure) return null;
        if (this.state.bloodPressure.length > 0) {
            return <BloodPressureGraph
                compId={this.state.compIdArray}
                systolic={this.state.systolicRate}
                diastolic={this.state.diastolicRate}
                time={this.state.time}
                units={this.state.bloodPressure[0].systolic.units}/>
        } else {
            return <p>No Blood Pressure were recorded</p>;
        }
    }
}


BloodPressure.propTypes = {
    ehrId: PropTypes.string
};

export function PressureGraph(props) {
    if (props.ehrId) {
        return <div><BloodPressure ehrId={props.ehrId}/></div>
    } else {
        return null;
    }
}

PressureGraph.propTypes = {
    ehrId: PropTypes.string
};

class IndirectOximetry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            compIdArray: [],
            concentration: [],
            time: []
        };
    }

    componentDidMount() {
        let promise = getIndirectOximetryAgainstTimeByEHRId(this.props.ehrId);
        promise.then((e) => {
            e.forEach(el => {
                this.pushIntoArraysandCalculate(el);
            });
            this.setState({ indirectOximetry: e });
        });
    }

    pushIntoArraysandCalculate(props) {
        this.state.compIdArray.push(props.comp_id);
        var result = (props.numerator / props.denominator) * 100;
        this.state.concentration.push(result);
        this.state.time.push(props.time.replace(/T/, ' ').substring(0, props.time.indexOf('.'))
            || props.time.replace(/T/, ' ').substring(0, props.time.indexOf('Z')));
    }


    render() {
        if (!this.state.indirectOximetry) return null;
        if (this.state.indirectOximetry.length > 0) {
            return <OxygenSaturationGraph compId={this.state.compIdArray}
                                          percent={this.state.concentration}
                                          time={this.state.time}/>
        } else {
            return <p>No oxygen concentration were recorded</p>;
        }
    }
}

IndirectOximetry.propTypes = {
    ehrId: PropTypes.string
};

export function OxygenConcentrationGraph(props) {
    if (props.ehrId) {
        return <div><IndirectOximetry ehrId={props.ehrId}/></div>
    } else {
        return null;
    }
}

OxygenConcentrationGraph.propTypes = {
    ehrId: PropTypes.string
};

class HeartRate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            compIdArray: [],
            heartRateReadings: [],
            time: []
        };
    }

    componentDidMount() {
        let promise = getHeartRatesAgainstTimeByEHRId(this.props.ehrId);
        promise.then((e) => {
            e.forEach(el => {
                this.pushIntoArrays(el);
            });
            this.setState({ heartRate: e });
        });
    }

    pushIntoArrays(props) {
        this.state.compIdArray.push(props.comp_id);
        this.state.heartRateReadings.push(props.heart_rate.magnitude);
        this.state.time.push(props.time.replace(/T/, ' ').substring(0, props.time.indexOf('.'))
            || props.time.replace(/T/, ' ').substring(0, props.time.indexOf('Z')));
    }


    render() {
        if (!this.state.heartRate) return null;
        if (this.state.heartRate.length > 0) {
            return <HeartRateGraph compId={this.state.compIdArray}
                                   heartRates={this.state.heartRateReadings}
                                   time={this.state.time}
                                   units={this.state.heartRate[0].heart_rate.units}/>
        } else {
            return <p>No heart rates were recorded</p>;
        }
    }
}

HeartRate.propTypes = {
    ehrId: PropTypes.string
};


export function HeartGraph(props) {
    if (props.ehrId) {
        return <div><HeartRate ehrId={props.ehrId}/></div>
    } else {
        return null;
    }
}

HeartGraph.propTypes = {
    ehrId: PropTypes.string
};

function PatientAllergicTableEntry(props) {
    return <NHSTr key={"allergies" + props.index}>
        <NHSTd key={"allergies" + props.index + "cause"}>{props.cause}</NHSTd>
        <NHSTd key={"allergies" + props.index + "comment"}>{props.comment} {props.exclusion}</NHSTd>
        <NHSTd key={"allergies" + props.index + "reaction"}>{props.reaction}</NHSTd>
        <NHSTd key={"allergies" + props.index + "update_exclusion_date"}>{props.update_exclusion_date} </NHSTd>
        <NHSTd key={"allergies" + props.index + "composer"}>{props.composer}</NHSTd>
    </NHSTr>;
}

PatientAllergicTableEntry.propTypes = {
    index: PropTypes.number,
    cause: PropTypes.string,
    comment: PropTypes.string,
    exclusion: PropTypes.string,
    reaction: PropTypes.string,
    update_exclusion_date: PropTypes.string,
    composer: PropTypes.string
};

class Allergies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let promise = getAllergiesListByEHRId(this.props.ehrId);
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

Allergies.propTypes = {
    ehrId: PropTypes.string
};

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

PatientAllergiesTable.propTypes = {
    index: PropTypes.number,
    ehrId: PropTypes.string
};

function ProceduresTableEntry(props) {
    return <NHSTr key={"procedures" + props.index}>
        <NHSTd key={"procedures" + props.index + "procedure_name"}>{props.procedure_name}</NHSTd>
        <NHSTd key={"procedures" + props.index + "notes"}>{props.notes}</NHSTd>
        <NHSTd key={"procedures" + props.index + "careflow_step"}>{props.careflow_step}</NHSTd>
        <NHSTd key={"procedures" + props.index + "time"}>{props.time} </NHSTd>
        <NHSTd key={"procedures" + props.index + "name"}>{props.name}</NHSTd>
    </NHSTr>;
}

ProceduresTableEntry.propTypes = {
    index: PropTypes.number,
    procedure_name: PropTypes.string,
    notes: PropTypes.string,
    careflow_step: PropTypes.string,
    time: PropTypes.string,
    name: PropTypes.string
};

class Procedures extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let promise = getProceduresListByEHRId(this.props.ehrId);
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

Procedures.propTypes = {
    ehrId: PropTypes.string
};

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
                    <Procedures key='procedures' ehrId={props.ehrId}/>
                </NHSTBody>
            </NHSTable></NHSTableWrapper>;
    } else {
        return null;
    }
}

ProceduresTable.propTypes = {
    index: PropTypes.number,
    ehrId: PropTypes.string
};

function LabOrdersTableEntry(props) {
    return <NHSTr key={"orders" + props.index}>
        <NHSTd key={"orders" + props.index + "request"}>{props.request}</NHSTd>
        <NHSTd key={"orders" + props.index + "timing"}>{props.timing}</NHSTd>
        <NHSTd key={"orders" + props.index + "context_time"}>{props.context_time}</NHSTd>
        <NHSTd key={"orders" + props.index + "composer"}>{props.composer} </NHSTd>
    </NHSTr>
}

LabOrdersTableEntry.propTypes = {
    index: PropTypes.number,
    request: PropTypes.string,
    timing: PropTypes.string,
    context_time: PropTypes.string,
    composer: PropTypes.string
};

class LabOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let promise = getLabOrdersListByEHRId(this.props.ehrId);
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
            return <NHSTr key="noLabOrders">
                <NHSTd key="noLabOrders" colSpan="7">No lab orders records were found</NHSTd>
            </NHSTr>;
        }
    }
}

LabOrders.propTypes = {
    index: PropTypes.number,
    ehrId: PropTypes.string
};

export function LabOrdersTable(props) {
    if (props.ehrId) {
        return <NHSTableWrapper>
            <NHSTable>
                <NHSTHead>
                    <NHSTr key={"ordersno" + props.index}>
                        <NHSTh key={"ordersno" + props.index + "request"} style={{ width: '8px' }}>Requests</NHSTh>
                        <NHSTh
                            key={"ordersno" + props.index + "timing"}>Request Timing</NHSTh>
                        <NHSTh
                            key={"ordersno" + props.index + "context_time"}>Time</NHSTh>
                        <NHSTh
                            key={"ordersno" + props.index + "composer"}>Composer Name</NHSTh>
                    </NHSTr>
                </NHSTHead>
                <NHSTBody>
                    <LabOrders key='orders' ehrId={props.ehrId}/>
                </NHSTBody>
            </NHSTable></NHSTableWrapper>;
    } else {
        return null;
    }
}

LabOrdersTable.propTypes = {
    index: PropTypes.number,
    ehrId: PropTypes.string
};

function LabReportsTableEntry(props) {
    return <NHSTr key={"reports" + props.index}>
        <NHSTd key={"reports" + props.index + "test"}>{props.test}</NHSTd>
        <NHSTd key={"reports" + props.index + "comment"}>{props.comment}</NHSTd>
        <NHSTd key={"reports" + props.index + "conclusion"}>{props.conclusion}</NHSTd>
        <NHSTd key={"reports" + props.index + "test_timestamp"}>{props.test_timestamp} </NHSTd>
        <NHSTd key={"reports" + props.index + "composer"}>{props.composer} </NHSTd>
    </NHSTr>
}

LabReportsTableEntry.propTypes = {
    index: PropTypes.number,
    test: PropTypes.string,
    comment: PropTypes.string,
    conclusion: PropTypes.string,
    test_timestamp: PropTypes.string,
    composer: PropTypes.string
};

class LabReports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let promise = getLabReportsListByEHRId(this.props.ehrId);
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

LabReports.propTypes = {
    ehrId: PropTypes.string
};

export function LabReportsTable(props) {
    if (props.ehrId) {
        return <NHSTableWrapper>
            <NHSTable>
                <NHSTHead>
                    <NHSTr key={"reportsno" + props.index}>
                        <NHSTh key={"reportsno" + props.index + "test"} style={{ width: '8px' }}>Tests</NHSTh>
                        <NHSTh
                            key={"reportsno" + props.index + "comment"}>Comment</NHSTh>
                        <NHSTh
                            key={"reportsno" + props.index + "conclusion"}>Conclusion</NHSTh>
                        <NHSTh
                            key={"reportsno" + props.index + "test_timestamp"}>Time</NHSTh>
                        <NHSTh
                            key={"reportsno" + props.index + "composer"}>Composer Name</NHSTh>
                    </NHSTr>
                </NHSTHead>
                <NHSTBody>
                    <LabReports key='reports' ehrId={props.ehrId}/>
                </NHSTBody>
            </NHSTable></NHSTableWrapper>;
    } else {
        return null;
    }
}

LabReportsTableEntry.propTypes = {
    index: PropTypes.number,
    ehrId: PropTypes.string
};
