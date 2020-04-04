import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import HeaderMenu from '../components/HeaderMenu';
import NHSContainer from '../components/react-styled-nhs/src/NHSContainer';
import NHSWrapper from '../components/react-styled-nhs/src/NHSWrapper';
import {
  NHSPanelBody,
  NHSPanelTitle,
  NHSPanelWithLabel,
} from '../components/react-styled-nhs/src/NHSPanel';
import RangeEpisodeScoresGraphContainer from '../components/NationalStatistics/RangeEpisodeScoresGraph/RangeEpisodeScoresGraphContainer';
import GenderDistributionGraphContainer from '../components/NationalStatistics/GenderDistributionGraph/GenderDistributionGraphContainer';
import AgeDistributionGraphContainer from '../components/NationalStatistics/AgeDistributionGraph/AgeDistributionGraphContainer';

/**
 * Page showing statistics graphed across all patients
 * @returns {*}
 * @constructor
 */
function NationalStatistics() {
  return (
    <div style={{ backgroundColor: '#f0f4f5' }}>
      <HeaderMenu />
      <NHSContainer>
        <NHSWrapper>
          <NHSPanelWithLabel style={{ backgroundColor: '#fff' }}>
            <NHSPanelTitle className="nhsuk-panel-with-label__label">
              National Statistics
            </NHSPanelTitle>
            <NHSPanelBody>
              <Tab.Container defaultActiveKey="episodeScores">
                <Nav
                  variant="tabs"
                  style={{ marginBottom: '40px' }}
                >
                  <Nav.Item>
                    <Nav.Link
                      eventKey="episodeScores"
                      className="nhsuk-button"
                      style={{ marginRight: '10px' }}
                    >
                      Episode Scores Range
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="admin_gender"
                      className="nhsuk-button"
                      style={{ marginRight: '10px' }}
                    >
                      Gender Distribution
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="averageAge"
                      className="nhsuk-button"
                      style={{ marginRight: '10px' }}
                    >
                      Age Distribution
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content>
                  <Tab.Pane eventKey="episodeScores">
                    <div><RangeEpisodeScoresGraphContainer /></div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="admin_gender">
                    <div><GenderDistributionGraphContainer /></div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="averageAge">
                    <div><AgeDistributionGraphContainer /></div>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </NHSPanelBody>
          </NHSPanelWithLabel>
        </NHSWrapper>
      </NHSContainer>
    </div>
  );
}

export default NationalStatistics;
