


export const setPatientList = data => {
  return dispatch => {
    dispatch({
      type: 'SET_PATIENTLIST',
      data
    })
  }
}

export const handleCliniSearch = data => {
  return dispatch => dispatch({
    type: 'handleCliniSearch',
    data
  })
}