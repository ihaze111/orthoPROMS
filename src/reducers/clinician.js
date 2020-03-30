import * as _ from 'lodash';

const initialState = {
  patientList: [],
  patientListFiltered: [],
  search: '',
};

function search(state, data) {
  const { patientList } = state;
  let patientListFiltered = [];
  const keys = ['nhsNumber', 'gender', 'sex', 'vitalStatus', 'birthYear'];
  let result = [];
  if (data) {
    keys.forEach((key) => {
      const tmp = patientList.filter((e) => e[key] && e[key].includes(data));
      if (tmp.length > 0) {
        result = [...result, ...tmp];
      }
    });
    patientListFiltered = _.uniqWith(result, _.isEqual);
    return { ...state, patientListFiltered, search: data };
  }
  return { ...state, search: data, patientListFiltered: patientList };
}


const clinician = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SET_PATIENTLIST':
      return { ...state, patientList: action.data, patientListFiltered: action.data };
    case 'handleCliniSearch':
      return search(state, action.data);
    default:
      return state;
  }
};

export default clinician;
