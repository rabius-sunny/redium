import jwt_decode from 'jwt-decode'
import {
	SET_LOADER,
	CLOSE_LOADER,
	SET_TOKEN,
	REGISTER_ERRORS,
	LOGOUT,
	LOGIN_ERRORS,
} from '../constants/User'
const initState = {
	loading: false,
	registerErrors: [],
	loginErrors: [],
	token: '',
	user: '',
}
const decodeToken = (token) => {
	const decodedToken = jwt_decode(token)
	return decodedToken
}
const token = localStorage.getItem('myToken')
if (token) {
	const decoded = decodeToken(token)
	initState.token = token
	const { user } = decoded
	initState.user = user
}

const Auth = (state = initState, action) => {
	if (action.type === SET_LOADER) {
		return { ...state, loading: true }
	} else if (action.type === CLOSE_LOADER) {
		return { ...state, loading: false }
	} else if (action.type === REGISTER_ERRORS) {
		return { ...state, registerErrors: action.payload }
	} else if (action.type === SET_TOKEN) {
		const decoded = decodeToken(action.payload)
		const { user } = decoded
		return {
			...state,
			token: action.payload,
			user: user,
			loginErrors: [],
			registerErrors: [],
		}
	} else if (action.type === LOGOUT) {
		return { ...state, token: '', user: '' }
	} else if (action.type === LOGIN_ERRORS) {
		return {
			...state,
			loginErrors: action.payload,
		}
	} else {
		return state
	}
}
export default Auth
