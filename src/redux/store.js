import { createStore, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducer from './reducer'

const store = createStore(reducer, {isAuthenticated:localStorage.getItem('isAuthenticated')}, applyMiddleware(thunk, logger))
export default store