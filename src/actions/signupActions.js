import axios from 'axios';
import environment from '../environment';

export const userSignupRequest = (userData) => (dispatch) => axios.post(`${environment.login_url}/api/auth/signup`, userData, { withCredentials: true });

export const sendCode = (data) => (dispatch) => axios.post(`${environment.login_url}/api/auth/code`, data, { withCredentials: true });

export const checkCode = (data) => (dispatch) => axios.post(`${environment.login_url}/api/auth/checkCode`, data, { withCredentials: true });

export const reset = (data) => (dispatch) => axios.post(`${environment.login_url}/api/auth/reset`, data, { withCredentials: true });
