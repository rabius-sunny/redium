import { useEffect } from 'react'
import axios from 'axios'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Tooltip from '@mui/material/Tooltip'
import EditIcon from '@mui/icons-material/Edit'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams, useHistory } from 'react-router-dom'
import { fetchPosts } from '../redux/async/Post'
import Pagination from '../utils/Pagination'
import toast, { Toaster } from 'react-hot-toast'
import { REDIRECT_FALSE, REMOVE_MESSAGE, SET_LOADER, CLOSE_LOADER, SET_MESSAGE } from '../redux/constants/Post'
import EditImage from '../components/others/EditImage'
import Spinner from '../components/others/Spinner'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Helmet from 'react-helmet'

export default function MyProfile() {

    const { user: { _id, name }, token } = useSelector(state => state.Auth)
    const dispatch = useDispatch()
    const history = useHistory()
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
        <div className="myProfile">
            <Helmet>
                    <title>Profile | Redium</title>
                <meta property="og:title" content="Profile | Redium" />
                <meta property="og:description" content="Welcome to Redium, The Social Blogging Application with React, Redux, Nodejs" />
                <meta property="og:url" content="https://redium.herokuapp.com/" />
            </Helmet>
            <Toaster
                position='top-center'
                reverseOrder={false}
                toastOptions={{
                    style: {
                        fontSize: '14px',
                    },
                }}
            />
            <div className="profile">
                <div className="profileInfo">
                    <div className="profileAvatar"><span className="profileAvatarText">{name[0]}</span></div>
                </div>
                <p>{name.toUpperCase()}</p> <hr />
                <h3>My Posts</h3>
            </div>

            {loading ? <Spinner /> :
                <div>
                    {
                        myposts.map(post => <div key={post._id} className="myPost">
                            <p><Link to={`/detail-post/${post.slug}`}>{post.title}</Link></p>
                            <div className="actions">
                                <Link to={`/edit/${post._id}`}><Tooltip title="Edit this post"><Button><EditIcon color="secondary" /></Button></Tooltip></Link>
                                <EditImage id={post._id} />
                                <Tooltip title="Delete this post"><Button onClick={() => handleDelete(post._id)}><DeleteForeverIcon color="error" /></Button></Tooltip>
                            </div>
                        </div>)
                    }
                    <div className="create"><Button variant="contained" color="primary" onClick={() => history.push('/create')}><AddIcon /> Create a new post</Button></div>
                </div>
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
