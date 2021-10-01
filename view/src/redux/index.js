import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import Auth from './reducers/Auth'

const rootReducer = combineReducers({
    Auth
})

const middlewares = [thunk]

const Store = createStore(rootReducer, applyMiddleware(...middlewares))

export default Store