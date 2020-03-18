import React from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import HeaderMenu from "../../components/HeaderMenu";
import PatientListEntry from "../../components/Clinician/PatientListEntry";
import getEHRs from "../../components/GetEHRs";
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