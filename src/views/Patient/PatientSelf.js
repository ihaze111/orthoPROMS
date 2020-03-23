import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Alert from 'react-bootstrap/Alert';
import Nav from 'react-bootstrap/Nav';

import $ from 'jquery';
import Container from "react-bootstrap/Container";

import HeaderMenu from "../../components/HeaderMenu";
import * as PropTypes from "prop-types";
import {
  PatientOverview,
  PatientProgressTable,
  ScoresArray,
  EpisodeScoresGraph
} from "../PatientComponents";
import { getSubjectId, loadEhrId } from "../PatientUtils";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";

import { connect } from "react-redux";
import { handleSearch } from "../../actions/appActions";
import { StructuredSurvey, FlatSurvey } from "./Survey";
import NHSHeader from "../../components/nhsuk-frontend-react/NHSHeader";
import NHSContainer from "../../components/nhsuk-frontend-react/NHSContainer";
import NHSWrapper from "../../components/nhsuk-frontend-react/NHSWrapper";
import { NHSTableWrapperTest } from "../../components/nhsuk-frontend-react/NHSTableWrapperTest";
import { NHSPanel, NHSPanelBody, NHSPanelTitle } from "../../components/nhsuk-frontend-react/NHSPanel";
import NHSFooter from "../../components/nhsuk-frontend-react/NHSFooter";

// import Chart1 from "../../components/Graphs/Chart1";

function SurveySuccess() {
    return <Alert variant="success" onClose={() => {
        $('#submitSurveyDialog').fadeOut(500)
    }} dismissible id="submitSurveyDialog">
        <Alert.Heading>Thank for submitting</Alert.Heading>
        <p>We will give you feedback and update the survey to your data.</p>
    </Alert>;
}

SurveySuccess.propTypes = { onClose: PropTypes.func };

class PatientSelf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      painArray: [],
      activeKey: ""
    };
  }

  componentDidMount() {
    loadEhrId.call(this);

    // if (this.props.location.search !== "") {
    //     const compositionSring = {
    //         "ctx/language": "en",
    //         "ctx/territory": "GB",
    //         "ctx/composer_name": "Silvia Blake",
    //         "ctx/id_namespace": "HOSPITAL-NS",
    //         "ctx/id_scheme": "HOSPITAL-NS",
    //         "ctx/health_care_facility|name": "Hospital",
    //         "ctx/health_care_facility|id": "9091",
    //         "uclh_foot_and_ankle_proms/aofas_score/q1_pain|code": "at0032"
    //     };
    //     // compositionSring.templateId = "Foot_and_Ankle_PROMs-v0";
    //     // compositionSring.ehrId = "d9668d3d-85fa-488f-97f3-53c8765c22fb";
    //     const getVariables = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    //     console.log(getVariables);
    //     for (let x in getVariables) {
    //         compositionSring["uclh_foot_and_ankle_proms/aofas_score/" + x + "|code"] = getVariables[x];
    //     }
    //     var request = require('request');
    //     var options = {
    //         'method': 'POST',
    //         'url':
    // 'https://cdr.code4health.org/rest/v1/composition?ehrId=b80a3a97-be75-41c6-a497-6ed53ce8f8c6&templateId=Foot_and_Ankle_PROMs-v0&committerName=Dr
    // nullnull&format=FLAT', 'headers': { 'Ehr-Session-disabled': '{{Ehr-Session}}', 'Content-Type':
    // 'application/json', 'Authorization': 'Basic
    // YmIyNjRiY2UtYzQwNy00OTgyLTkwMTctOTdkMzcyN2ZjZmE0OiQyYSQxMCQ2MTlraQ==' }, body:
    // JSON.stringify(compositionSring) }; request(options, function (error, response) { if (error) throw new
    // Error(error); console.log(response.body); }); }

    $("#submitSurveyDialog").hide();
  }

  onChange = e => {
    this.props.handleSearch(e.target.value);
  };

  render() {
    let subjectId = getSubjectId(this.props.location.search);
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
                      {/* <Nav.Item>
                                        <Nav.Link eventKey="test">Test</Nav.Link>
                                    </Nav.Item> */}
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="myProgress">
                        <PatientProgressTable ehrId={this.state.ehrId}/>
                      </Tab.Pane>
                      {/* <Tab.Pane eventKey="test">
                                        <div style={{width: '1000px', height: '400px'}}><EpisodeScoresGraph ehrId={this.state.ehrId}/></div>
                                    </Tab.Pane> */}
                      <Tab.Pane eventKey="myData">
                        <div><ScoresArray ehrId={this.state.ehrId}/></div>
                        <br/><br/><br/>
                        <div><EpisodeScoresGraph
                            ehrId={this.state.ehrId}/></div>
                        {/* <br/><br/><br/>
                                    <div><Chart1 bingbong="bingbong"/></div> */}
                      </Tab.Pane>
                      <Tab.Pane eventKey="survey">
          {/*<StructuredSurvey templateId={'NES-ACP_COVID.v0.0'} />*/}
<StructuredSurvey templateId={'Foot_and_Ankle_PROMs-v0'}/>
                        {/*<StructuredSurvey templateId={'WHO - Suspected Covid-19 assessment.v0'}/>*/}
                        {/*<FlatSurvey templateId={'Foot_and_Ankle_PROMs-v0'}/>*/}
                        <SurveySuccess/>
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
    search: state.app.search
  }),
  {
    handleSearch
  }
)(PatientSelf);
