export const setCompositions = (data) => (dispatch) => {
  dispatch({
    type: 'SET_COMPOSITIONS',
    data,
  });
};

export const handleSearch = (data) => (dispatch) => dispatch({
  type: 'handleSearch',
  data,
});
