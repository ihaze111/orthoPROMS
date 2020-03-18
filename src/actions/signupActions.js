import axios from 'axios';

export const userSignupRequest = userData =>{
    return dispatch => {
        return axios.post('/api/auth/signup',userData)
    }
}

export const sendCode = (data) => {
    return dispatch => {
        return axios.post('/api/auth/code', data)
    }
}

export const checkCode = data => {
    return dispatch => {
        return axios.post('/api/auth/checkCode',data)
    }
}

export const reset = data => {
    return dispatch => {
        return axios.post('/api/auth/reset',data)
    }
}





// export const isUserExists = identifier=>{
//     return dispatch =>{
//         return axios.get(`/api/users/${identifier}`,identifier)
//     }
// }