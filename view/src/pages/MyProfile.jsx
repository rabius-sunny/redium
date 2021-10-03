import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchPosts } from '../redux/async/Post'
import Pagination from '../utils/Pagination'

export default function MyProfile() {

    const { user: { _id } } = useSelector(state => state.Auth)
    const dispatch = useDispatch()
    const { posts, count, perPage } = useSelector(state => state.FetchPosts)
    let { post } = useParams()
    if (post === undefined) {
        post = 1
    }

    useEffect(() => {
        dispatch(fetchPosts(_id, post))
    }, [_id, post, dispatch])

    return (
        <div>
            <h1>My Profile</h1>
            {
                posts.map(post => <div key={post._id}>
                    <h3>{post.title}</h3> <hr />
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
