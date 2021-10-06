import { useEffect } from 'react'
import axios from 'axios'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Tooltip from '@mui/material/Tooltip'
import EditIcon from '@mui/icons-material/Edit'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchPosts } from '../redux/async/Post'
import Pagination from '../utils/Pagination'
import toast, { Toaster } from 'react-hot-toast'
import { REDIRECT_FALSE, REMOVE_MESSAGE, SET_LOADER, CLOSE_LOADER, SET_MESSAGE } from '../redux/constants/Post'
import EditImage from '../components/others/EditImage'
import Spinner from '../components/others/Spinner'
import { Button } from '@mui/material'

export default function MyProfile() {

    const { user: { _id }, token } = useSelector(state => state.Auth)
    const dispatch = useDispatch()
    const { myposts, count, perPage } = useSelector(state => state.FetchMyPosts)
    const { redirect, message, loading } = useSelector(
        (state) => state.Post
    )
    let { post } = useParams()
    if (post === undefined) {
        post = 1
    }
    const handleDelete = async (id) => {
        const confirm = window.confirm("Want to delete this post?")

        if (confirm) {
            dispatch({ type: SET_LOADER })
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
                const { data: { message } } = await axios.get(`/delete/${id}`, config)
                dispatch(fetchPosts(_id, post))
                dispatch({ type: SET_MESSAGE, payload: message })
            } catch (error) {
                dispatch({ type: CLOSE_LOADER })
            }
        }
    }

    useEffect(() => {
        dispatch(fetchPosts(_id, post))
        // eslint-disable-next-line
    }, [_id, post])
    useEffect(() => {
        if (redirect) {
            dispatch({ type: REDIRECT_FALSE })
        }
        if (message) {
            toast.success(message)
            dispatch({ type: REMOVE_MESSAGE })
        }
        // eslint-disable-next-line
    }, [message, redirect])

    return (
        <div>
            <h1>My Profile</h1>
            <Toaster
                position='top-center'
                reverseOrder={false}
                toastOptions={{
                    style: {
                        fontSize: '14px',
                    },
                }}
            />
            {loading ? <Spinner /> :
                myposts.map(post => <div key={post._id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3><Link to={`/detail-post/${post.slug}`}>{post.title}</Link></h3>
                    <div>
                        <Link to={`/edit/${post._id}`}><Tooltip title="Edit this post"><Button><EditIcon color="secondary" /></Button></Tooltip></Link>
                        <EditImage id={post._id} />
                        <Tooltip title="Delete this post"><Button onClick={() => handleDelete(post._id)}><DeleteForeverIcon color="error" /></Button></Tooltip>
                    </div>
                </div>)
            }
            <Pagination
                count={count}
                page={post}
                perPage={perPage}
                path="profile/me"
                loading={loading}
            />
        </div>
    )
}
