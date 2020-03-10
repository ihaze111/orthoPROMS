import React from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import HeaderMenu from "../../components/HeaderMenu";
import PatientListEntry from "../../components/Clinician/PatientListEntry";
import getEHRs from "../../components/Queries/GetEHRs";
import NHSHeader from "../../components/NHS/NHSHeader";
import NHSContainer from "../../components/NHS/NHSContainer";
import NHSWrapper from "../../components/NHS/NHSWrapper";

class PatientListTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let promise = getEHRs();
        promise.then((e) => {
            this.setState({ ehrs: e });
        });
    }

    render() {
        if (!this.state.ehrs) return null;
        return <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>NHS Number</th>
                <th>Gender</th>
                <th>Sex</th>
                <th>Vital Status</th>
                <th>Birth Year</th>
                {/* <th>Time created</th> */}
            </tr>
            </thead>
            <tbody>
            {this.state.ehrs.map((e, index) => {
                e.id = index + 1;
                return PatientListEntry(e);
            })}
            </tbody>
        </Table>;
    }
}

function PatientList() {
    return (
        <div style={{ fontFamily: 'Frutiger W01, Arial, Sans-serif' }}>
            <NHSHeader/>
            <NHSContainer>
                <NHSWrapper>
                <div style={{ height: '50px' }}></div>
                <div style={{ display: 'block', textAlign: 'center' }}>
                    <div><h1>Patient List</h1></div>
                    <PatientListTable/>
                </div>
                </NHSWrapper>
            </NHSContainer>
        </div>
    );
}

export default PatientList;
