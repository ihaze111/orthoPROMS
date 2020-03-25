import { SET_CURRENT_USER } from '../constants'
import isEmpty from 'lodash/isEmpty' 

const initialState = {
    isAuthenticated: false,
    user: {},
    isGoogleLogin: false 
}

const auth = (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                isAuthenticated: !isEmpty(action.user),
                user: action.user,
                isGoogleLogin: action.isGoogleLogin
            }
        default:
            return state;
    }
}

export default auth;
