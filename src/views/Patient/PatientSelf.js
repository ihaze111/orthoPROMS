import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Alert from 'react-bootstrap/Alert';
import Nav from 'react-bootstrap/Nav';

import $ from 'jquery';

import HeaderMenu from "../../components/HeaderMenu";
import * as PropTypes from "prop-types";
import {
    PatientOverview,
    PatientProgressTable,
    ScoresArray,
    EpisodeScoresGraph
} from "../PatientComponents";
import { getEHRId, getSubjectId, loadEhrId } from "../PatientUtils";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";

import { connect } from "react-redux";
import { handleSearch } from "../../actions/appActions";
import { StructuredSurvey } from "./Survey";
import NHSContainer from "../../components/react-styled-nhs/src/NHSContainer";
import NHSWrapper from "../../components/react-styled-nhs/src/NHSWrapper";
import { NHSPanel, NHSPanelBody, NHSPanelTitle } from "../../components/react-styled-nhs/src/NHSPanel";
import NHSFooter from "../../components/react-styled-nhs/src/NHSFooter";
import getAllTemplatesInCDR from "../../components/Queries/getAllTemplatesInCDR";

class PatientSelf extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            painArray: [],
            activeKey: ""
        };
    }

    componentDidMount() {
        let promise = getEHRId(this.props.nhsNumber);
        promise.then((e) => {
            this.setState({ ehrId: e });
        });
        let promise2 = getAllTemplatesInCDR();
        promise2.then((e) => {
            this.setState({ templatesList: e });
        });
    }

    onChange = e => {
        this.props.handleSearch(e.target.value);
    };

    render() {
        // let subjectId = getSubjectId(this.props.location.search);
        let subjectId = this.props.nhsNumber;
        let { search } = this.props;
        return (
            <div style={{ backgroundColor: '#f0f4f5' }}>
                <HeaderMenu/>
                <NHSContainer>
                    <NHSWrapper>
                        <PatientOverview subjectId={subjectId}/>
                        <NHSPanel>
                            <NHSPanelTitle>
                                Details
                                <Form inline style={{ float: "right" }}>
                                    <FormControl
                                        type="text"
                                        placeholder="Search"
                                        value={search}
                                        onChange={this.onChange}
                                        className="mr-sm-2"
                                    />
                                </Form>
                            </NHSPanelTitle>
                            <NHSPanelBody>
                                <Tab.Container defaultActiveKey="myProgress">
                                    <Nav variant="tabs" style={{ marginBottom: '40px' }}>
                                        <Nav.Item>
                                            <Nav.Link eventKey="myProgress">My Progress</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="myData">My Data</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="survey">Survey</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="myProgress">
                                            <PatientProgressTable ehrId={this.state.ehrId}/>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="myData">
                                            <div><ScoresArray ehrId={this.state.ehrId}/></div>
                                            <br/><br/><br/>
                                            <div><EpisodeScoresGraph
                                                ehrId={this.state.ehrId}/></div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="survey">
                                            <div className="nhsuk-form-group">
                                                <label className="nhsuk-label">Template</label> <select className="nhsuk-select" id="select-template"
                                                                          name="select-template">
                                                {/*{this.state.templatesList.map((template) => {*/}
                                                {/*    return <option value={template.templateId}>{template.templateId}</option>*/}
                                                {/*})}*/}
                                            </select>
                                            </div>
                                            <StructuredSurvey templateId={'Foot_and_Ankle_PROMs-v0'}
                                                              ehrId={this.state.ehrId}/>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Tab.Container>
                            </NHSPanelBody>
                        </NHSPanel>
                    </NHSWrapper>
                </NHSContainer>
                <NHSFooter/>
            </div>
        );
    }
}

export default connect(
    state => ({
        search: state.app.search,
        nhsNumber: state.auth.user.userJson.nhsNumber
    }),
    {
        handleSearch
    }
)(PatientSelf);
