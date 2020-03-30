export const setPatientList = (data) => (dispatch) => {
  dispatch({
    type: 'SET_PATIENTLIST',
    data,
  });
};

export const handleCliniSearch = (data) => (dispatch) => dispatch({
  type: 'handleCliniSearch',
  data,
});
