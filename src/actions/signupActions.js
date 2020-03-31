import axios from 'axios';
import environment from '../environment';

// eslint-disable-next-line no-unused-vars
export const userSignupRequest = (userData) => (dispatch) => axios.post(`${environment.login_url}/api/auth/signup`, userData, { withCredentials: true });

// eslint-disable-next-line no-unused-vars
export const sendCode = (data) => (dispatch) => axios.post(`${environment.login_url}/api/auth/code`, data, { withCredentials: true });

// eslint-disable-next-line no-unused-vars
export const checkCode = (data) => (dispatch) => axios.post(`${environment.login_url}/api/auth/checkCode`, data, { withCredentials: true });

// eslint-disable-next-line no-unused-vars
export const reset = (data) => (dispatch) => axios.post(`${environment.login_url}/api/auth/reset`, data, { withCredentials: true });
