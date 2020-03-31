import React from 'react';
import '../../components/Clinician/PatientRecordsStyle.css';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as PropTypes from 'prop-types';
import { getEHRId, getSubjectId } from '../PatientUtils';
import NHSContainer from '../../components/react-styled-nhs/src/NHSContainer';
import NHSWrapper from '../../components/react-styled-nhs/src/NHSWrapper';
import NHSBackLink from '../../components/react-styled-nhs/src/NHSBackLink';
import {
  NHSPanel, NHSPanelBody, NHSPanelTitle, NHSPanelWithLabel,
} from '../../components/react-styled-nhs/src/NHSPanel';
import NHSFooter from '../../components/react-styled-nhs/src/NHSFooter';
import HeaderMenu from '../../components/HeaderMenu';
import PatientDemographics from '../PatientComponents/PatientDemographics';
import PatientOverview from '../PatientComponents/PatientOverview';
import PatientProgressTable from '../PatientComponents/PatientProgressTable';
import ScoresArray from '../PatientComponents/ScoresArray';
import EpisodeScoresGraph from '../PatientComponents/EpisodeScoresGraph';
import RespirationGraph from '../PatientComponents/RespirationGraph';
import PressureGraph from '../PatientComponents/PressureGraph';
import OxygenConcentrationGraph from '../PatientComponents/OxygenConcentrationGraph';
import HeartGraph from '../PatientComponents/HeartGraph';
import PatientAllergiesTable from '../PatientComponents/PatientAllergiesTable';
import ProceduresTable from '../PatientComponents/ProceduresTable';
import LabOrdersTable from '../PatientComponents/LabOrdersTable';
import LabReportsTable from '../PatientComponents/LabReportsTable';

class PatientRecords extends React.Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {};
  }

  componentDidMount() {
    const promise = getEHRId(getSubjectId(this.props.location.search));
    promise.then((e) => {
      this.setState({ ehrId: e });
    });
  }

  goBack() {
    this.props.history.goBack();
  }

  // cliniciansLogOnSubmit = (e) => {
  // }

  render() {
    if (!this.state.ehrId) return null;
    const subjectId = getSubjectId(this.props.location.search);
    return (
      <div style={{ backgroundColor: '#f0f4f5' }}>
        <HeaderMenu />
        <NHSContainer>
          <NHSWrapper>
            <NHSBackLink onClick={this.goBack}>Go back</NHSBackLink>
            <NHSPanel>
              <NHSPanelTitle>Patient Record</NHSPanelTitle>
              <NHSPanelBody>
                <Tab.Container defaultActiveKey="vitals">
                  <Row>
                    <Col sm={3}>
                      <Nav
                        variant="pills"
                        className="flex-column"
                      >
                        <Nav.Item>
                          <Nav.Link
                            eventKey="vitals"
                            className="nhsuk-button"
                          >
                            Vital
                            Signs
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="details"
                            className="nhsuk-button"
                          >
                            Details
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="patientProgress"
                            className="nhsuk-button"
                          >
                            Patient
                            Progress
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="labReport"
                            className="nhsuk-button"
                          >
                            Lab
                            Report
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Col>
                    <Col sm={9}>
                      <Tab.Content>
                        <Tab.Pane eventKey="vitals">
                          <NHSPanelWithLabel style={{
                            margin: 0,
                            backgroundColor: '#f0f4f5',
                          }}
                          >
                            <NHSPanelTitle
                              className="nhsuk-panel-with-label__label"
                            >
                              Overview
                            </NHSPanelTitle>
                            <NHSPanelBody>
                              <PatientOverview subjectId={subjectId} />
                              <PatientDemographics ehrId={this.state.ehrId} />
                            </NHSPanelBody>
                          </NHSPanelWithLabel>
                          <NHSPanelWithLabel style={{ backgroundColor: '#f0f4f5' }}>
                            <NHSPanelTitle className="nhsuk-panel-with-label__label">
                              Patient&apos;s History
                            </NHSPanelTitle>
                            <NHSPanelBody>
                              <Tab.Container defaultActiveKey="bloodPressure">
                                <Nav
                                  variant="tabs"
                                  style={{ marginBottom: '40px' }}
                                >
                                  <Nav.Item>
                                    <Nav.Link
                                      eventKey="bloodPressure"
                                      className="nhsuk-button"
                                      style={{ marginRight: '10px' }}
                                    >
                                      Blood Pressure
                                    </Nav.Link>
                                  </Nav.Item>
                                  <Nav.Item>
                                    <Nav.Link
                                      eventKey="heartRate"
                                      className="nhsuk-button"
                                      style={{ marginRight: '10px' }}
                                    >
                                      Heart Rate
                                    </Nav.Link>
                                  </Nav.Item>
                                  <Nav.Item>
                                    <Nav.Link
                                      eventKey="respirationRate"
                                      className="nhsuk-button"
                                      style={{ marginRight: '10px' }}
                                    >
                                      Respiration Rate
                                    </Nav.Link>
                                  </Nav.Item>
                                  <Nav.Item>
                                    <Nav.Link
                                      eventKey="indirectOximetry"
                                      className="nhsuk-button"
                                      style={{ marginRight: '10px' }}
                                    >
                                      Oxygen Saturation
                                    </Nav.Link>
                                  </Nav.Item>
                                </Nav>
                                <Tab.Content>
                                  <Tab.Pane eventKey="bloodPressure">
                                    <div>
                                      <PressureGraph
                                        ehrId={this.state.ehrId}
                                      />
                                    </div>
                                  </Tab.Pane>
                                  <Tab.Pane eventKey="heartRate">
                                    <div>
                                      <HeartGraph ehrId={this.state.ehrId} />
                                    </div>
                                  </Tab.Pane>
                                  <Tab.Pane eventKey="respirationRate">
                                    <div>
                                      <RespirationGraph
                                        ehrId={this.state.ehrId}
                                      />
                                    </div>
                                  </Tab.Pane>
                                  <Tab.Pane eventKey="indirectOximetry">
                                    <div>
                                      <OxygenConcentrationGraph
                                        ehrId={this.state.ehrId}
                                      />
                                    </div>
                                  </Tab.Pane>
                                </Tab.Content>
                              </Tab.Container>
                            </NHSPanelBody>
                          </NHSPanelWithLabel>
                        </Tab.Pane>
                        <Tab.Pane eventKey="patientProgress">
                          <PatientProgressTable ehrId={this.state.ehrId} />
                          <div><ScoresArray ehrId={this.state.ehrId} /></div>
                          <div><EpisodeScoresGraph ehrId={this.state.ehrId} /></div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="labReport">
                          {/* <NHSFormGroup> */}
                          {/*  <NHSFormLabel> */}
                          {/*    <strong>Clinician's Log</strong> */}
                          {/*  </NHSFormLabel> */}
                          {/*  <NHSFormHint> */}
                          {/*    Record any findings and records of this patient here. */}
                          {/*  </NHSFormHint> */}
                          {/*  <NHSTextArea id="log" */}
                          {/*               name="log" */}
                          {/*               rows="4" */}
                          {/*               aria-describedby="log-hint"></NHSTextArea> */}
                          {/*  <br /> */}
                          {/*  <NHSButton onClick={this.cliniciansLogOnSubmit} */}
                          {/*             type="submit">Submit</NHSButton> */}
                          {/* </NHSFormGroup> */}
                          <NHSPanelWithLabel style={{ backgroundColor: '#f0f4f5' }}>
                            <NHSPanelTitle className="nhsuk-panel-with-label__label">
                              Laboratory Orders and Reports
                            </NHSPanelTitle>
                            <NHSPanelBody>
                              <Tab.Container defaultActiveKey="labOrders">
                                <Nav
                                  variant="tabs"
                                  style={{ marginBottom: '40px' }}
                                >
                                  <Nav.Item>
                                    <Nav.Link
                                      eventKey="labReports"
                                      className="nhsuk-button"
                                      style={{ marginRight: '10px' }}
                                    >
                                      Lab
                                      Reports
                                    </Nav.Link>
                                  </Nav.Item>
                                  <Nav.Item>
                                    <Nav.Link
                                      eventKey="labOrders"
                                      className="nhsuk-button"
                                      style={{ marginRight: '10px' }}
                                    >
                                      Lab
                                      Orders
                                    </Nav.Link>
                                  </Nav.Item>
                                </Nav>
                                <Tab.Content>
                                  <Tab.Pane eventKey="labReports">
                                    <LabReportsTable ehrId={this.state.ehrId} />
                                  </Tab.Pane>
                                  <Tab.Pane eventKey="labOrders">
                                    <div>
                                      <LabOrdersTable
                                        ehrId={this.state.ehrId}
                                      />
                                    </div>
                                  </Tab.Pane>
                                </Tab.Content>
                              </Tab.Container>
                            </NHSPanelBody>
                          </NHSPanelWithLabel>
                        </Tab.Pane>
                        <Tab.Pane eventKey="details">
                          <h3>
                            <strong>Allergy Details</strong>
                          </h3>
                          <div><PatientAllergiesTable ehrId={this.state.ehrId} /></div>
                          <br />
                          <h3>
                            <strong>Procedures Details</strong>
                          </h3>
                          <div><ProceduresTable ehrId={this.state.ehrId} /></div>
                        </Tab.Pane>
                      </Tab.Content>
                    </Col>
                  </Row>
                </Tab.Container>
              </NHSPanelBody>
            </NHSPanel>
          </NHSWrapper>
        </NHSContainer>
        <NHSFooter />
      </div>
    );
  }
}

PatientRecords.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }),
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
};

export default PatientRecords;
