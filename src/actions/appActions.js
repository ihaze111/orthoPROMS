


export const setCompositions = data => {
  return dispatch => {
    dispatch({
      type: 'SET_COMPOSITIONS',
      data
    })
  }
}

export const handleSearch = data => {
  return dispatch => dispatch({
    type: 'handleSearch',
    data
  })
}