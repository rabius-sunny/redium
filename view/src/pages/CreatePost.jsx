import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { createAction } from '../redux/async/Post'
import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'

export default function CreatePost(props) {

    const history = useHistory()
    const { createErrors, redirect, loading } = useSelector(
        (state) => state.Post
    )
    const [value, setValue] = useState('')
    const [imagePreview, setImagePreview] = useState('')
    const dispatch = useDispatch()
    const {
        user: { _id, name },
    } = useSelector((state) => state.Auth)
    const [input, setInput] = useState({
        title: '',
        description: '',
        image: '',
    })
    const handleFile = e => {
        if (e.target.files.length !== 0) {
            setInput({
                ...input,
                [e.target.name]: e.target.files[0],
            })
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result)
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }
    const handleDescription = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }
    const [slug, setSlug] = useState('')
    const [slugButton, setSlugButton] = useState(false)
    const handleSlug = e => {
        setSlugButton(true)
        setSlug(e.target.value)
    }
    const handleURL = e => {
        e.preventDefault()
        setSlug(slug.trim().split(' ').join('-'))
    }
    const handleInput = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
        const createSlug = e.target.value.trim().split(' ').join('-')
        setSlug(createSlug)
    }
    const createPost = e => {
        e.preventDefault()
        const { title, description, image } = input
        const formData = new FormData()
        formData.append('title', title)
        formData.append('body', value)
        formData.append('image', image)
        formData.append('description', description)
        formData.append('slug', slug)
        formData.append('name', name)
        formData.append('id', _id)
        dispatch(createAction(formData))
    }
    useEffect(() => {
        if (redirect) {
            history.push('/profile/me')
        }
        if (createErrors.length !== 0) {
            createErrors.map((err) => toast.error(err.message))
        }
    }, [createErrors, redirect])


    return (
        <>
            <h1>Create a post</h1>
            <Toaster
                position='top-right'
                reverseOrder={false}
                toastOptions={{
                    style: {
                        fontSize: '14px',
                    },
                }}
            />

            <input
                type='text'
                name='title'
                id='title'
                value={input.title}
                onChange={handleInput}
                className='group__control'
                placeholder='Post title...'
            />

            <label htmlFor='image' className='image__label'>
                image
            </label>
            <input
                type='file'
                name='image'
                id='image'
                onChange={handleFile}
            />

            <label htmlFor='body'>Post body</label>
            <ReactQuill
                theme='snow'
                id='body'
                placeholder='Post body...'
                value={value}
                onChange={setValue}
            />
            <label htmlFor='description'>Meta Description</label>
            <textarea
                name='description'
                id='description'
                cols='30'
                rows='10'
                defaultValue={input.description}
                onChange={handleDescription}
                className='group__control'
                placeholder='meta description...'
                maxLength='150'></textarea>
            <p className='length'>
                {input.description ? input.description.length : 0}
            </p>
            <label htmlFor='slug'>Post URL</label>
            <input
                type='text'
                name='slug'
                id='slug'
                value={slug}
                onChange={handleSlug}
                className='group__control'
                placeholder='Post URL...'
            />
            {slugButton ? (
                <button class='btn btn-default' onClick={handleURL}>
                    Update Slug
                </button>
            ) : (
                ''
            )}
            {imagePreview ? <img src={imagePreview} alt="preview" /> : ''}

            <button onClick={createPost}>create post</button>
        </>
    )
}
