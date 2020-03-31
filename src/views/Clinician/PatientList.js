import React from 'react';
import { connect } from 'react-redux';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Pagination from 'rc-pagination';
import * as PropTypes from 'prop-types';
import HeaderMenu from '../../components/HeaderMenu';
import PatientListEntry from '../../components/Clinician/PatientListEntry';
import getAllEHRsInCDR from '../../components/Queries/getAllEHRsInCDR';
import NHSContainer from '../../components/react-styled-nhs/src/NHSContainer';
import NHSWrapper from '../../components/react-styled-nhs/src/NHSWrapper';
import {
  NHSTable, NHSTBody, NHSTd, NHSTh, NHSTHead, NHSTr,
} from '../../components/react-styled-nhs/src/NHSTableWrapperTest';
import { handleCliniSearch, setPatientList } from '../../actions/clinicianActions';
import 'rc-pagination/assets/index.css';
import {
  NHSErrorSummary,
  NHSErrorSummaryBodySimple,
  NHSErrorSummaryTitle,
} from '../../components/react-styled-nhs/src/NHSErrorSummary';

function EmptyPatientsListError() {
  return (
    <NHSErrorSummary>
      <NHSErrorSummaryTitle>No patients found</NHSErrorSummaryTitle>
      <NHSErrorSummaryBodySimple>No patients were found in the CDR with NHS
        numbers</NHSErrorSummaryBodySimple>
    </NHSErrorSummary>
  );
}

class PatientListTableAux extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      patientList: [],
    };
    this.handlePageChange = (e) => {
      const { patientListFiltered } = this.props;
      this.setState({
        page: e,
        patientList: e >= 1 ? patientListFiltered.slice((e - 1) * 10, e * 10)
          : patientListFiltered.slice(0, 10),
      });
    };
  }

  componentDidMount() {
    const promise = getAllEHRsInCDR();
    promise.then((e) => {
      this.props.setPatientList(e);
    });
  }

  componentWillReceiveProps(nextProps) {
    const patientLists = nextProps.patientListFiltered;
    this.setState({
      patientList: (patientLists || []).slice(0, 10),
    });
  }

  render() {
    const { patientListFiltered } = this.props;
    const { patientList } = this.state;
    if (patientListFiltered.length > 0) {
      return (
        <NHSTable>
          <NHSTHead>
            <NHSTr>
              <NHSTh>#</NHSTh>
              <NHSTh>NHS Number</NHSTh>
              <NHSTh>Gender</NHSTh>
              <NHSTh>Sex</NHSTh>
              <NHSTh>Vital Status</NHSTh>
              <NHSTh>Birth Year</NHSTh>
            </NHSTr>
          </NHSTHead>
          <NHSTBody>
            {patientList.map((e, index) => {
              e.id = index + 1;
              return PatientListEntry(e);
            })}
            <NHSTd colSpan={6}>
              <Pagination
                current={this.state.page}
                total={patientListFiltered.length}
                onChange={this.handlePageChange.bind(this)}
              />
            </NHSTd>
          </NHSTBody>
        </NHSTable>
      );
    }
    return (
      <EmptyPatientsListError />
    );
  }
}

PatientListTableAux.propTypes = {
  patientListFiltered: PropTypes.arrayOf(PropTypes.object),
  setPatientList: PropTypes.func,
};

const PatientListTable = connect(
  (state) => ({
    patientListFiltered: state.clinician.patientListFiltered,
  }),
  {
    setPatientList,
  },
)(PatientListTableAux);

class PatientList extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = (e) => {
      this.props.handleCliniSearch(e.target.value);
    };
  }

  render() {
    const { search } = this.props;
    return (
      <div style={{ fontFamily: 'Arial, Sans-serif' }}>
        <HeaderMenu />
        <NHSContainer>
          <NHSWrapper>
            <h1>
              Patient List
              <Form
                inline
                style={{ float: 'right' }}
              >
                <FormControl
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={this.onChange}
                  className="mr-sm-2"
                />
              </Form>
            </h1>
            <PatientListTable />
          </NHSWrapper>
        </NHSContainer>
      </div>
    );
  }
}

PatientList.propTypes = {
  handleCliniSearch: PropTypes.func,
  search: PropTypes.string,
};

export default connect(
  (state) => ({
    search: state.clinician.search,
  }),
  {
    handleCliniSearch,
  },
)(PatientList);
