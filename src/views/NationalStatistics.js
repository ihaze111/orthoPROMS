import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import HeaderMenu from '../components/HeaderMenu';
import { RangeEpisodeScoresGraph } from './PatientComponents'
import { loadEhrId } from "./PatientUtils";
import $ from "jquery";
import NHSHeader from "../components/nhsuk-frontend-react/NHSHeader";
import NHSContainer from "../components/nhsuk-frontend-react/NHSContainer";
import NHSWrapper from "../components/nhsuk-frontend-react/NHSWrapper";
import { NHSPanel, NHSPanelBody, NHSPanelTitle } from "../components/nhsuk-frontend-react/NHSPanel";

class NationalStatistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            painArray: []
        };
    }

    componentDidMount() {
        loadEhrId.call(this);

        $('#submitSurveyDialog').hide();

    }

    render() {
        return (
            <div style={{ backgroundColor: '#f0f4f5' }}>
                <NHSHeader/>
                <NHSContainer>
                    <NHSWrapper>
                        <NHSPanel>
                            <NHSPanelTitle>
                                What Is IPROMS?
                            </NHSPanelTitle>
                            <NHSPanelBody>
                                <div style={{paddingTop:'10px', width: '850px', height: '650px' }}><RangeEpisodeScoresGraph/></div>
                            </NHSPanelBody>
                        </NHSPanel>
                    </NHSWrapper>
                </NHSContainer>
            </div>
        );
    }
}

export default NationalStatistics;
