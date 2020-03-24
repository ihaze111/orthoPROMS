import { combineReducers } from 'redux'
import auth from './auth'
import app from './app'
import clinician from './clinician'

export default combineReducers({
    auth,
    app,
    clinician
})
