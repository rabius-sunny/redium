import { useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'

export default function CreatePost() {

    const [value, setValue] = useState('')
    console.log(value)

    return (
        <div>
            <h1>Create a post</h1>
            <input type="text" placeholder="Post Title" />
            <div style={{ marginTop: '30px' }}></div>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
            />
        </div >
    )
}
