
// MIT License
//
// Copyright (c) 2013-present, Facebook, Inc.
//
//     Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import jwtDecode from 'jwt-decode';//接到server端传过来的token之后前段进行解码
import {setCurrentUser} from './actions/authActions'
import setAuthorizationToken from './utils/setAuthorizationToken';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk,logger)
  )
)

if(localStorage.jwtToken){//如果localStorage中存在这个jwtToken
  setAuthorizationToken(localStorage.jwtToken);//将浏览器的localStorage中的jwtToken取出来;在开始页面加载的时候调用这个方法将jwtToken放置到请求头里面,防止刷新的时候没有
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken),JSON.parse(localStorage.getItem('isGoogleLogin'))));//这里需要用store见loginAction中;这里的作用是当页面刷新时候,如果本地存储有token即用户已经处于一个登录的状态的时候,保持reducer中的值即保持登录状态
  
}

ReactDOM.render(
  <Provider store={ store }>
  <App />
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
