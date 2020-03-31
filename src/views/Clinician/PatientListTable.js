import { connect } from 'react-redux';
import { setPatientList } from '../../actions/clinicianActions';
import { PatientListTableAux } from './PatientListTableAux';

export const PatientListTable = connect(
  (state) => ({
    patientListFiltered: state.clinician.patientListFiltered,
  }),
  {
    setPatientList,
  },
)(PatientListTableAux);
