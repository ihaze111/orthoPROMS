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
import { StructuredSurvey } from "./Survey";
import NHSHeader from "../../components/nhsuk-frontend-react/NHSHeader";
import NHSContainer from "../../components/nhsuk-frontend-react/NHSContainer";
import NHSWrapper from "../../components/nhsuk-frontend-react/NHSWrapper";
import { NHSTableWrapperTest } from "../../components/nhsuk-frontend-react/NHSTableWrapperTest";
import { NHSPanel, NHSPanelBody, NHSPanelTitle } from "../../components/nhsuk-frontend-react/NHSPanel";
import NHSFooter from "../../components/nhsuk-frontend-react/NHSFooter";

// import Chart1 from "../../components/Graphs/Chart1";

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
          {/*<StructuredSurvey templateId={'NES-ACP_COVID.v0.0'} />*/}
<StructuredSurvey templateId={'Foot_and_Ankle_PROMs-v0'} ehrId={this.state.ehrId}/>
                        {/*<StructuredSurvey templateId={'WHO - Suspected Covid-19 assessment.v0'}/>*/}
                        {/*<FlatSurvey templateId={'Foot_and_Ankle_PROMs-v0'}/>*/}
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
