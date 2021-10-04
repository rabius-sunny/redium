import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import Auth from './reducers/Auth'
import {
    Post,
    FetchPosts,
    FetchMyPosts,
    FetchPost,
    UpdatePost,
    UpdateImage,
} from './reducers/Post'
import UpdateName from './reducers/Profile'

const rootReducer = combineReducers({
    Auth,
    FetchPosts,
    FetchMyPosts,
    FetchPost,
    Post,
    UpdateName,
    UpdatePost,
    UpdateImage
})

const middlewares = [thunk]

const Store = createStore(rootReducer, applyMiddleware(...middlewares))

export default Store