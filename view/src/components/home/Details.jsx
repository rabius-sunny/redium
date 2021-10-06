import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router"
import { postComment, postDetails } from "../../redux/async/Post"
import Spinner from "../others/Spinner"
import Comments from "./Comments"
import SinglePost from "./SinglePost"

export default function Details() {

    const dispatch = useDispatch()
    const { postSlug } = useParams()
    const { loading, details, comments } = useSelector(state => state.Post)
    const { user } = useSelector(state => state.Auth)
    const [comment, setComment] = useState('')

    const handleComment = e => {
        e.preventDefault()
        dispatch(postComment({ id: details._id, comment, userName: user.name }))
        setComment('')
    }

    useEffect(() => {
        dispatch(postDetails(postSlug))
        // eslint-disable-next-line
    }, [postSlug])

    return (
        <div>
            {
                loading ? <Spinner /> : <div className="">
                    <SinglePost post={details} />
                    <Comments comments={comments} />
                    {
                        user && <div>
                            <form onSubmit={handleComment}><input value={comment} onChange={e => setComment(e.target.value)} type="text" placeholder="type a comment and hit enter" /></form>
                        </div>
                    }
                </div>
            }
        </div>
    )
}
