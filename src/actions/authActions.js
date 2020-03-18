import axios from 'axios'
import jwtDecode from 'jwt-decode' // 解析token
import {
  SET_CURRENT_USER
} from '../constants'
import setAuthorizationToken from '../utils/setAuthorizationToken';

export const setCurrentUser = (user, isGoogleLogin) => {
  
  let obj = {
    type: SET_CURRENT_USER,
    user,
    isGoogleLogin: isGoogleLogin
  }
  console.log(obj)
  return obj
}


export const login = data => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      axios.post('/api/auth/signin', data).then(res => {
        if (res.data.code === 200) {
          const token = res.data.token
          let isGoogleLogin = false
          localStorage.setItem('jwtToken', token) //将token存到localStorage中
          localStorage.setItem('isGoogleLogin', false)
          setAuthorizationToken(token) // 将token放进请求头
          let user = jwtDecode(token).userJson
          dispatch(setCurrentUser(user, isGoogleLogin))
        }
        resolve(res.data)
      })
    })
  }
}

export const googleLogin = data => {
  return dispatch => {
    let token = data.token
    let isGoogleLogin = true
    localStorage.setItem('jwtToken', token)
    localStorage.setItem('isGoogleLogin', true)
    setAuthorizationToken(token)
    let user = data.user
    dispatch(setCurrentUser(user, isGoogleLogin))
  }
}

export const logout = () => { // 退出登录
  return dispatch => {
    localStorage.removeItem('jwtToken') // 清除在localStorage中存的token
    setAuthorizationToken(false); //这里是将头部的认证信息Authorization删除,以后不带上头部认证信息
    dispatch(setCurrentUser({},false)); //传入一个空对象;
  }

}