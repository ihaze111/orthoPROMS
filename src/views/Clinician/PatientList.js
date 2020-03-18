import React from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import HeaderMenu from "../../components/HeaderMenu";
import PatientListEntry from "../../components/Clinician/PatientListEntry";
import getEHRs from "../../components/Queries/GetEHRs";
import NHSHeader from "../../components/nhsuk-frontend-react/NHSHeader";
import NHSContainer from "../../components/nhsuk-frontend-react/NHSContainer";
import NHSWrapper from "../../components/nhsuk-frontend-react/NHSWrapper";
import { NHSTable, NHSTBody, NHSTh, NHSTHead, NHSTr } from "../../components/nhsuk-frontend-react/NHSTableWrapperTest";

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
        return <NHSTable>
            <NHSTHead>
                <NHSTr>
                    <NHSTh>#</NHSTh>
                    <NHSTh>NHS Number</NHSTh>
                    <NHSTh>Gender</NHSTh>
                    <NHSTh>Sex</NHSTh>
                    <NHSTh>Vital Status</NHSTh>
                    <NHSTh>Birth Year</NHSTh>
                    {/* <th>Time created</th> */}
                </NHSTr>
            </NHSTHead>
            <NHSTBody>
                {this.state.ehrs.map((e, index) => {
                    e.id = index + 1;
                    return PatientListEntry(e);
                })}
            </NHSTBody>
        </NHSTable>;
    }
}

function PatientList() {
    return (
        <div style={{ fontFamily: 'Frutiger W01, Arial, Sans-serif' }}>
            <HeaderMenu/>
            <NHSContainer>
                <NHSWrapper>
                    <h1>Patient List</h1>
                    <PatientListTable/>
                </NHSWrapper>
            </NHSContainer>
        </div>
    );
}

export default PatientList;
