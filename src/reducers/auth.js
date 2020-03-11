import { SET_CURRENT_USER } from '../constants'
import isEmpty from 'lodash/isEmpty' // lodash工具库 使用里面判断是否为空的方法

const initialState = {
  isAuthenticated: false, // 判断是否登录
  user: {}, // 登录后获取用户信息
  isGoogleLogin: false // 判断是否是第三方登录
}


const auth = (state = initialState, action = {}) => {
  switch(action.type){
    case SET_CURRENT_USER:
      console.log(action)
      return {
        isAuthenticated: !isEmpty(action.user), 
        user: action.user,
        isGoogleLogin: action.isGoogleLogin
      }
    default: return state;
  }
}

export default auth;