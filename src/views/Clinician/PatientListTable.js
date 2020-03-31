import { connect } from 'react-redux';
import { setPatientList } from '../../actions/clinicianActions';
import PatientListTableAux from './PatientListTableAux';

// eslint-disable-next-line import/prefer-default-export
export const PatientListTable = connect(
  (state) => ({
    patientListFiltered: state.clinician.patientListFiltered,
  }),
  {
    setPatientList,
  },
)(PatientListTableAux);
