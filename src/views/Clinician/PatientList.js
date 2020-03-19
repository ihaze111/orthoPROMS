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
import { connect } from 'react-redux'
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { handleCliniSearch,setPatientList } from '../../actions/clinicianActions'


class PatientListtable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let promise = getEHRs();
        promise.then((e) => {
            this.props.setPatientList(e)
            this.setState({ ehrs: e });
        });
    }

    render() {
        let { patientListFiltered } = this.props
        if(patientListFiltered.length > 0){
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
                    {patientListFiltered.map((e, index) => {
                        e.id = index + 1;
                        return PatientListEntry(e);
                    })}
                </NHSTBody>
            </NHSTable>;
        } else {
            return (
                <div>
                    <Alert key="warning" variant="warning" className="text-left">
                        No patients were found
                    </Alert>
                </div>
            )
        }



    }

}

const PatientListTable = connect(
    state => {
        return {
            patientListFiltered: state.clinician.patientListFiltered,

        }
    },
    {
        setPatientList
    }
)(PatientListtable)

class PatientList extends React.Component {
    constructor(props) {
        super(props);
    }

    onChange = e => {
        this.props.handleCliniSearch(e.target.value)
    }

    render() {
        let { search } = this.props;
        return (
            <div style={{ fontFamily: 'Arial, Sans-serif' }}>
                <HeaderMenu/>
                <NHSContainer>
                    <NHSWrapper>
                        <h1>Patient List<Form inline style={{'float': 'right'}}>
                            <FormControl type="text" placeholder="Search"  value={search} onChange={ this.onChange } className="mr-sm-2" />
                        </Form></h1>
                        <PatientListTable/>
                    </NHSWrapper>
                </NHSContainer>
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            search: state.clinician.search
        }
    },
    {
        handleCliniSearch
    }
)(PatientList)
