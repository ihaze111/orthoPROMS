import React from 'react';
import HeaderMenu from '../components/HeaderMenu';
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { RangeEpisodeScoresGraph, GenderDistributeGraph, AgeDistributeGraph } from './NationalStatisticsComponents'
import NHSContainer from "../components/react-styled-nhs/src/NHSContainer";
import NHSWrapper from "../components/react-styled-nhs/src/NHSWrapper";
import { NHSPanelWithLabel, NHSPanelBody, NHSPanelTitle } from "../components/react-styled-nhs/src/NHSPanel";

class NationalStatistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            painArray: []
        };
    }

    render() {
        return (
            <div style={{ backgroundColor: '#f0f4f5' }}>
                <HeaderMenu/>
                <NHSContainer>
                    <NHSWrapper>
                    <NHSPanelWithLabel style={{backgroundColor: '#fff'}}>
                        <NHSPanelTitle className="nhsuk-panel-with-label__label">
                            National Statistics
                        </NHSPanelTitle>
                        <NHSPanelBody>
                            <Tab.Container defaultActiveKey="episodeScores">
                                <Nav variant="tabs"
                                    style={{ marginBottom: '40px' }}>
                                    <Nav.Item>
                                        <Nav.Link eventKey="episodeScores">Episode Scores Range</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="admin_gender">Gender Distribution</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="averageAge">Age Distribution</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Tab.Content>
                                    <Tab.Pane eventKey="episodeScores">
                                        <div><RangeEpisodeScoresGraph /></div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="admin_gender">
                                        <div><GenderDistributeGraph/></div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="averageAge">
                                        <div><AgeDistributeGraph/></div>
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
}

export default NationalStatistics;
