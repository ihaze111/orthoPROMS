import * as _ from 'lodash';

const initialState = {
  patientList: [],
  patientListFiltered: [],
  search: '',
};

/**
 * Search in patient list
 * @param state
 * @param data
 * @returns {{search: string, patientListFiltered: array}}
 */
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
    return {
      ...state,
      patientListFiltered,
      search: data,
    };
  }
  return {
    ...state,
    search: data,
    patientListFiltered: patientList,
  };
}

/**
 * Handle search of patient list
 * @param state
 * @param action
 * @returns {{patientList: array, search, patientListFiltered: array}|{patientList: array, search: string,
 *   patientListFiltered: array}|{search: string, patientListFiltered: array}}
 */
const clinician = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SET_PATIENTLIST':
      return {
        ...state,
        patientList: action.data,
        patientListFiltered: action.data,
      };
    case 'handleCliniSearch':
      return search(state, action.data);
    default:
      return state;
  }
};

export default clinician;
