import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {
  SET_CURRENT_USER,
} from '../constants';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import environment from '../environment';

export const setCurrentUser = (user, isGoogleLogin) => {
  const obj = {
    type: SET_CURRENT_USER,
    user,
    isGoogleLogin,
  };
  return obj;
};

export const login = (data) => (dispatch) => new Promise((resolve, reject) => {
  axios.post(`${environment.login_url}/api/auth/signin`, data)
    .then((res) => {
      if (res.data.code === 200) {
        const { token } = res.data;
        const isGoogleLogin = false;
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('isGoogleLogin', false);
        setAuthorizationToken(token);
        const user = jwtDecode(token).userJson;
        dispatch(setCurrentUser(user, isGoogleLogin));
        resolve(res.data);
      } else {
        reject(res.data);
      }
    })
    .catch((resError) => {
      reject(resError);
    });
});

export const googleLogin = (data) => (dispatch) => {
  const { token } = data;
  const isGoogleLogin = true;
  localStorage.setItem('jwtToken', token);
  localStorage.setItem('isGoogleLogin', true);
  setAuthorizationToken(token);
  const { user } = data;
  dispatch(setCurrentUser(user, isGoogleLogin));
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('jwtToken'); // Clear the token stored in localStorage
  setAuthorizationToken(false); // Delete the header authentication Authorization, without the
  // header authentication information in the future
  dispatch(setCurrentUser({}, false)); // Pass in an empty object
};
