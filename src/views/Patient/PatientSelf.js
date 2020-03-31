import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import * as PropTypes from 'prop-types';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import HeaderMenu from '../../components/HeaderMenu';
import { getEHRId } from '../PatientUtils';

import { handleSearch } from '../../actions/appActions';
import StructuredSurvey from './Survey';
import NHSContainer from '../../components/react-styled-nhs/src/NHSContainer';
import NHSWrapper from '../../components/react-styled-nhs/src/NHSWrapper';
import {
  NHSPanel,
  NHSPanelBody,
  NHSPanelTitle,
} from '../../components/react-styled-nhs/src/NHSPanel';
import NHSFooter from '../../components/react-styled-nhs/src/NHSFooter';
import getAllTemplatesInCDR from '../../cdr/getAllTemplatesInCDR';
import { NHSButton } from '../../components/react-styled-nhs/src/NHSComponents';
import PatientDemographics from '../PatientComponents/PatientDemographics';
import PatientOverview from '../PatientComponents/PatientOverview';
import PatientProgressTable from '../PatientComponents/PatientProgressTable';
import ScoresArray from '../PatientComponents/ScoresArray';
import EpisodeScoresGraph from '../PatientComponents/EpisodeScoresGraph';

class PatientSelf extends React.Component {
  // TODO: fix tabs issue
  constructor(props) {
    super(props);
    this.state = {
      templatesList: [],
    };
    this.onTemplateChange = this.onTemplateChange.bind(this);
    this.onChange = (e) => {
      this.props.handleSearch(e.target.value);
    };
  }

  componentDidMount() {
    const promise = getEHRId(this.props.nhsNumber);
    promise.then((e) => {
      this.setState({ ehrId: e });
    })
      .catch((error) => {
        // TODO: find better error system
        console.log(error);
      });
    const promise2 = getAllTemplatesInCDR();
    promise2.then((e) => {
      this.setState({ templatesList: e });
    });
  }

  onTemplateChange() {
    ReactDOM.render(
      <div>
        <NHSButton onClick={this.reloadPage}>Change form</NHSButton>
        <StructuredSurvey
          key="survey"
          id="survey"
          templateId={document.getElementById('select-template').value}
          ehrId={this.state.ehrId}
        />
      </div>,
      document.getElementById('select-survey-form-group'),
    );
  }

  reloadPage = () => {
    window.location.reload();
  };

  render() {
    // TODO: improve display of this error
    if (!this.state.ehrId) return <div>No EHR id found for your NHS number</div>;
    const subjectId = this.props.nhsNumber;
    const { search } = this.props;
    return (
      <div style={{ backgroundColor: '#f0f4f5' }}>
        <HeaderMenu />
        <NHSContainer>
          <NHSWrapper>
            <NHSPanel>
              <NHSPanelTitle>Overview</NHSPanelTitle>
              <NHSPanelBody>
                <PatientOverview subjectId={subjectId} />
                <PatientDemographics ehrId={this.state.ehrId} />
              </NHSPanelBody>
            </NHSPanel>
            <NHSPanel>
              <NHSPanelTitle>
                Details
                <Form
                  inline
                  style={{ float: 'right' }}
                >
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
                  <Nav
                    variant="tabs"
                    style={{ marginBottom: '20px' }}
                  >
                    <Nav.Item>
                      <Nav.Link
                        eventKey="myProgress"
                        className="nhsuk-button"
                        style={{ marginRight: '10px' }}
                      >
                        My Progress
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="myData"
                        className="nhsuk-button"
                        style={{ marginRight: '10px' }}
                      >
                        My Data
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="survey"
                        className="nhsuk-button"
                      >
                        Survey
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content>
                    <Tab.Pane eventKey="myProgress">
                      <PatientProgressTable ehrId={this.state.ehrId} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="myData">
                      <div><ScoresArray ehrId={this.state.ehrId} /></div>
                      <br />
                      <br />
                      <br />
                      <div>
                        <EpisodeScoresGraph
                          ehrId={this.state.ehrId}
                        />
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="survey">
                      <div id="select-survey-form-group">
                        <div className="nhsuk-form-group">
                          <span className="nhsuk-label">Template</span>
                          <select
                            className="nhsuk-select"
                            id="select-template"
                            name="select-template"
                            style={{
                              marginTop: '8px',
                              marginRight: '10px',
                            }}
                          >
                            {this.state.templatesList.map((template) => {
                              if (template.templateId === 'Foot_and_Ankle_PROMs-v0') {
                                return (
                                  <option
                                    key={template.templateId}
                                    value={template.templateId}
                                    selected="selected"
                                  >
                                    {template.templateId}
                                  </option>
                                );
                              }
                              return (
                                <option
                                  key={template.templateId}
                                  value={template.templateId}
                                >
                                  {template.templateId}
                                </option>
                              );
                            })}
                          </select>
                          <NHSButton onClick={this.onTemplateChange}>Show</NHSButton>
                        </div>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
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

PatientSelf.propTypes = {
  handleSearch: PropTypes.func,
  nhsNumber: PropTypes.string,
  search: PropTypes.string,
};

export default connect(
  (state) => {
    const result = {
      search: state.app.search,
    };
    if (state.auth.isAuthenticated) {
      result.nhsNumber = state.auth.isGoogleLogin
        ? '9999999000'
        : state.auth.user.userJson.nhsNumber;
    } else {
      result.nhsNumber = '';
    }
    return result;
  },
  {
    handleSearch,
  },
)(PatientSelf);
