import axios from 'axios'
import {
	CREATE_ERRORS,
	REMOVE_ERRORS,
	SET_LOADER,
	CLOSE_LOADER,
	REDIRECT_TRUE,
	// REDIRECT_FALSE,
	SET_MESSAGE,
	// REMOVE_MESSAGE,
	SET_POSTS,
	SET_POSTS2,
	SET_POST,
	POST_REQUEST,
	// EDIT_ERRORS,
	SET_UPDATE_ERRORS,
	UPDATE_IMAGE_ERROR,
	SET_DETAILS,
	COMMENTS,
} from '../constants/Post'

export const createAction = (postData) => {
	return async (dispatch, getState) => {
		const {
			Auth: { token },
		} = getState()
		dispatch({ type: SET_LOADER })
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				// onUploadProgress: (data) => {

				// 	console.log(
				// 		'Your image upload progress: ',
				// 		Math.round((100 * data.loaded) / data.total)
				// 	)
				// },
			}
			const {
				data: { message },
			} = await axios.post('/create-post', postData, config)
			dispatch({ type: CLOSE_LOADER })
			dispatch({ type: REMOVE_ERRORS })
			dispatch({ type: REDIRECT_TRUE })
			dispatch({ type: SET_MESSAGE, payload: message })
		} catch (error) {
			console.log(error.response)
			const { errors } = error.response.data
			dispatch({ type: CLOSE_LOADER })
			dispatch({ type: CREATE_ERRORS, payload: errors })
		}
	}
}
export const fetchPosts = (id, page) => {
	return async (dispatch, getState) => {
		const {
			Auth: { token },
		} = getState()
		dispatch({ type: SET_LOADER })
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
			const {
				data: { response, count, perPage },
			} = await axios.get(`/my-posts/${id}/${page}`, config)
			dispatch({ type: CLOSE_LOADER })
			dispatch({ type: SET_POSTS2, payload: { response, count, perPage } })
		} catch (error) {
			dispatch({ type: CLOSE_LOADER })
			console.log(error)
		}
	}
}
export const fetchPost = (id) => {
	return async (dispatch, getState) => {
		const {
			Auth: { token },
		} = getState()
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
		dispatch({ type: SET_LOADER })
		try {
			const {
				data: { post },
			} = await axios.get(`/post/${id}`, config)
			dispatch({ type: CLOSE_LOADER })
			dispatch({ type: SET_POST, payload: post[0] })
			dispatch({ type: POST_REQUEST })
		} catch (error) {
			dispatch({ type: CLOSE_LOADER })
			console.log(error.message)
		}
	}
}
export const updateAction = (editedData) => {
	return async (dispatch, getState) => {
		const {
			Auth: { token },
		} = getState()
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
		dispatch({ type: SET_LOADER })
		try {
			const { data } = await axios.post('/update', editedData, config)
			dispatch({ type: CLOSE_LOADER })
			dispatch({ type: REDIRECT_TRUE })
			dispatch({ type: SET_MESSAGE, payload: data.message })
		} catch (error) {
			const {
				response: {
					data: { errors },
				},
			} = error
			dispatch({ type: CLOSE_LOADER })
			dispatch({ type: SET_UPDATE_ERRORS, payload: errors })
		}
	}
}

export const updateImageAction = (updateData) => {
	return async (dispatch, getState) => {
		const {
			Auth: { token },
		} = getState()
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
		dispatch({ type: SET_LOADER })
		try {
			const {
				data: { message },
			} = await axios.post('/update-image', updateData, config)
			dispatch({ type: CLOSE_LOADER })
			dispatch({ type: REDIRECT_TRUE })
			dispatch({ type: SET_MESSAGE, payload: message })
		} catch (error) {
			const {
				response: {
					data: { errors },
				},
			} = error
			dispatch({ type: CLOSE_LOADER })
			dispatch({ type: UPDATE_IMAGE_ERROR, payload: errors })
		}
	}
}
export const homePosts = (page) => {
	return async (dispatch) => {
		dispatch({ type: SET_LOADER })
		try {
			const {
				data: { response, count, perPage },
			} = await axios.get(`/home/${page}`)
			dispatch({ type: CLOSE_LOADER })
			dispatch({ type: SET_POSTS, payload: { response, count, perPage } })
		} catch (error) {
			dispatch({ type: CLOSE_LOADER })
			console.log(error)
		}
	}
}
export const postDetails = (id) => {
	return async (dispatch) => {
		dispatch({ type: SET_LOADER })
		try {
			const {
				data: { post, comments },
			} = await axios.get(`/details/${id}`)
			dispatch({ type: CLOSE_LOADER })
			dispatch({ type: SET_DETAILS, payload: post })
			dispatch({ type: COMMENTS, payload: comments })
		} catch (error) {
			dispatch({ type: CLOSE_LOADER })
			console.log(error)
		}
	}
}
export const postComment = (commentData) => {
	return async (dispatch, getState) => {
		const {
			Auth: { token },
		} = getState()
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
		dispatch({ type: SET_LOADER })
		try {
			const { data } = await axios.post('/comment', commentData, config)
			dispatch({ type: CLOSE_LOADER })
			console.log(data)
		} catch (error) {
			dispatch({ type: CLOSE_LOADER })
			console.log(error)
		}
	}
}
