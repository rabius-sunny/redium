import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast'
import { postRegister } from '../../redux/async/Auth'

export default function SignUp() {

    const [input, setInput] = useState({
        name: '',
        email: '',
        password: ''
    })
    const { loading, registerErrors, user } = useSelector(
        (state) => state.Auth
    )
    const dispatch = useDispatch()

    const handleInput = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        dispatch(postRegister(input))
    }

    useEffect(() => {
        if (registerErrors.length > 0) {
            registerErrors.map((error) => toast.error(error.message))
        }
    }, [registerErrors, user])

    return (
        <div>
            <Toaster
                position='top-right'
                reverseOrder={false}
                toastOptions={{
                    style: {
                        fontSize: '14px',
                    },
                }}
            />
            <h1>SignUp</h1>
            <input type="text" onChange={handleInput} name="name" placeholder="name" />
            <input type="text" onChange={handleInput} name="email" placeholder="email" />
            <input type="text" onChange={handleInput} name="password" placeholder="password" />
            <button style={{background: 'white', padding: '20px 40px'}} onClick={handleSubmit}>{loading ? '...' : 'Sign Up'}</button>
        </div>
    )
}
