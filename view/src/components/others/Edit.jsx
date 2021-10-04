import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from "react-router"
import toast, { Toaster } from 'react-hot-toast'
import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'
import { fetchPost, updateAction } from "../../redux/async/Post"
import { POST_RESET } from '../../redux/constants/Post'


export default function Edit() {

    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()
    const [value, setValue] = useState('')
    const [input, setInput] = useState({
        title: '',
        description: ''
    })
    const { loading, redirect } = useSelector(state => state.Post)
    const { post, postStatus } = useSelector(state => state.FetchPost)
    const { editErrors } = useSelector(state => state.UpdatePost)

    useEffect(() => {
        if (postStatus) {
            setInput({
                title: post.title,
                description: post.description
            })
            setValue(post.body)
            dispatch({ type: POST_RESET })
        } else {
            dispatch(fetchPost(id))
        }
        // eslint-disable-next-line
    }, [post])
    useEffect(() => {
        if (editErrors.length !== 0) {
            editErrors.map(err => toast.error(err.msg))
        }
    }, [editErrors])
    useEffect(() => {
        if (redirect) {
            history.push('/profile/me')
        }
    }, [redirect])

    const handleUpdate = () => {
        dispatch(updateAction({
            title: input.title,
            body: value,
            description: input.description,
            id: post._id
        }))
    }

    return (
        <div>
            <h3>Edit Post</h3>
            <Toaster
                position='top-right'
                reverseOrder={false}
                toastOptions={{
                    style: {
                        fontSize: '14px',
                    },
                }}
            />


            <input type="text" name="title" value={input.title} onChange={e => setInput({ ...input, title: e.target.value })} />
            <ReactQuill
                theme='snow'
                id='body'
                placeholder='Post body...'
                value={value}
                onChange={setValue}
            />
            <textarea
                name='description'
                id='description'
                cols='30'
                rows='10'
                defaultValue={input.description}
                onChange={e => setInput({ ...input, description: e.target.value })}
                className='group__control'
                placeholder='meta description...'
                maxLength='150'></textarea>
            <button onClick={handleUpdate}>Update</button>
        </div>
    )
}
