import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import HeaderMenu from '../components/HeaderMenu';
import { RangeEpisodeScoresGraph } from './PatientComponents'
import { loadEhrId } from "./PatientUtils";
import $ from "jquery";

class NationalStatistics extends React.Component{
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

    render(){
        return(
            <div>
                <HeaderMenu/>
                <Container>
                    <Card>
                        <Card.Header>
                            What Is IPROMS?
                        </Card.Header>
                        <Card.Body>
                            <div style={{ width: '1000px', height: '400px' }}><RangeEpisodeScoresGraph /></div>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }
}
export default NationalStatistics;
