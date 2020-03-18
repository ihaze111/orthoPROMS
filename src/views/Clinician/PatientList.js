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
            return <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>NHS Number</th>
                <th>Gender</th>
                <th>Sex</th>
                <th>Vital Status</th>
                <th>Birth Year</th>
                <th>Time created</th>
            </tr>
            </thead>
            <tbody>
            {patientListFiltered.map((e, index) => {
                e.id = index + 1;
                return PatientListEntry(e);
            })}
            </tbody>
        </Table>;
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
    //NEWER NHS
//    render() {
//         if (!this.state.ehrs) return null;
//         return <NHSTable>
//             <NHSTHead>
//                 <NHSTr>
//                     <NHSTh>#</NHSTh>
//                     <NHSTh>NHS Number</NHSTh>
//                     <NHSTh>Gender</NHSTh>
//                     <NHSTh>Sex</NHSTh>
//                     <NHSTh>Vital Status</NHSTh>
//                     <NHSTh>Birth Year</NHSTh>
//                     {/* <th>Time created</th> */}
//                 </NHSTr>
//             </NHSTHead>
//             <NHSTBody>
//                 {this.state.ehrs.map((e, index) => {
//                     e.id = index + 1;
//                     return PatientListEntry(e);
//                 })}
//             </NHSTBody>
//         </NHSTable>;
//     }

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

// function PatientList() {
//     return (
//         <div style={{ fontFamily: 'Frutiger W01, Arial, Sans-serif' }}>
//             <HeaderMenu/>
//             <NHSContainer>
//                 <NHSWrapper>
//                     <h1>Patient List</h1>
//                     <PatientListTable/>
//                 </NHSWrapper>
//             </NHSContainer>
//         </div>
//     );
// }

class PatientList extends React.Component {
    constructor(props) {
        super(props);
    }

    onChange = e => {
        this.props.handleCliniSearch(e.target.value)
    }

    render() {
        let { search } = this.props
        return (
            <div>
            <HeaderMenu/>
            <Container>
            <div style={{ height: '50px' }}></div>
        <div style={{ display: 'block', textAlign: 'center' }}>
    <div><h1>Patient List<Form inline style={{'float': 'right'}}>
    <FormControl type="text" placeholder="Search"  value={search} onChange={ this.onChange } className="mr-sm-2" />
            </Form></h1></div>
        <PatientListTable/>
        </div>
        </Container>

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
