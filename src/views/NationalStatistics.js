import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import HeaderMenu from '../components/HeaderMenu';
import { RangeEpisodeScoresGraph } from './PatientComponents'
import { loadEhrId } from "./PatientUtils";
import $ from "jquery";
import NHSHeader from "../components/NHS/NHSHeader";
import NHSContainer from "../components/NHS/NHSContainer";
import NHSWrapper from "../components/NHS/NHSWrapper";
import { NHSPanel, NHSPanelBody, NHSPanelTitle } from "../components/NHS/NHSPanel";

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
                                <div style={{ width: '1000px', height: '400px' }}><RangeEpisodeScoresGraph/></div>
                            </NHSPanelBody>
                        </NHSPanel>
                    </NHSWrapper>
                </NHSContainer>
            </div>
        );
    }
}

export default NationalStatistics;
