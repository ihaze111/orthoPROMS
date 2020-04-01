import isEmpty from 'lodash/isEmpty';
import { SET_CURRENT_USER } from '../constants';

const initialState = {
  isAuthenticated: false,
  user: {},
  isGoogleLogin: false,
};

/**
 * Authorise user
 * @param state
 * @param action
 * @returns {{isGoogleLogin: boolean, isAuthenticated: boolean, user: {}}|{isGoogleLogin: *, isAuthenticated: boolean, user: *}}
 */
const auth = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user,
        isGoogleLogin: action.isGoogleLogin,
      };
    default:
      return state;
  }
};

export default auth;
