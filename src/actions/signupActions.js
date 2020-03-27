import axios from 'axios';
import environment from '../environment';

export const userSignupRequest = userData => {
    return dispatch => {
        return axios.post(environment.login_url + '/api/auth/signup', userData)
    }
};

export const sendCode = (data) => {
    return dispatch => {
        return axios.post(environment.login_url + '/api/auth/code', data)
    }
};

export const checkCode = data => {
    return dispatch => {
        return axios.post(environment.login_url + '/api/auth/checkCode', data)
    }
};

export const reset = data => {
    return dispatch => {
        return axios.post(environment.login_url + '/api/auth/reset', data)
    }
};


