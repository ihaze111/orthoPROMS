import React from 'react';
import * as PropTypes from 'prop-types';
import Pagination from 'rc-pagination';
import getAllEHRsInCDR from '../../components/Queries/getAllEHRsInCDR';
import {
  NHSTable,
  NHSTBody,
  NHSTd,
  NHSTh,
  NHSTHead,
  NHSTr,
} from '../../components/react-styled-nhs/src/NHSTableWrapperTest';
import PatientListEntry from '../../components/Clinician/PatientListEntry';
import {
  NHSErrorSummary,
  NHSErrorSummaryBodySimple,
  NHSErrorSummaryTitle,
} from '../../components/react-styled-nhs/src/NHSErrorSummary';

function EmptyPatientsListError() {
  return (
    <NHSErrorSummary>
      <NHSErrorSummaryTitle>No patients found</NHSErrorSummaryTitle>
      <NHSErrorSummaryBodySimple>
        No patients were found in the CDR with NHS numbers
      </NHSErrorSummaryBodySimple>
    </NHSErrorSummary>
  );
}

export default class PatientListTableAux extends React.Component {
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
              {/* eslint-disable-next-line react/jsx-no-bind,max-len */}
              <Pagination current={this.state.page} total={patientListFiltered.length} onChange={this.handlePageChange.bind(this)} />
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
