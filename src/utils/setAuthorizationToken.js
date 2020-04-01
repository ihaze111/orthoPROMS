import axios from 'axios';

/**
 * This method is to implement the header with this token every time you request with axios
 * @param token
 */
const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`; // Note that Bearer is
    // required; single quotes cannot be used here, this is the symbol to the left of 1; so that
    // the content of the token can be read
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};
export default setAuthorizationToken;
