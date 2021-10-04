import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchPosts } from '../redux/async/Post'
import Pagination from '../utils/Pagination'
import toast, { Toaster } from 'react-hot-toast'
import { REDIRECT_FALSE, REMOVE_MESSAGE } from '../redux/constants/Post'

export default function MyProfile() {

    const { user: { _id } } = useSelector(state => state.Auth)
    const dispatch = useDispatch()
    const { posts, count, perPage } = useSelector(state => state.FetchPosts)
    const { redirect, message, loading } = useSelector(
        (state) => state.Post
    )
    let { post } = useParams()
    if (post === undefined) {
        post = 1
    }

    useEffect(() => {
        dispatch(fetchPosts(_id, post))
    }, [_id, post, dispatch])
    useEffect(() => {
        if (redirect) {
            dispatch({ type: REDIRECT_FALSE })
        }
        if (message) {
            toast.success(message)
            dispatch({ type: REMOVE_MESSAGE })
        }
    }, [message, redirect, dispatch])

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
            {
                posts.map(post => <div key={post._id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3>{post.title}</h3>
                    <div>
                        <Link to={`/edit/${post._id}`}>Edit</Link>
                        <Link>Delete</Link>
                    </div>
                </div>)
            }
            <Pagination
                count={count}
                page={post}
                perPage={perPage}
                path="profile/me"
            />
        </div>
    )
}
