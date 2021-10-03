import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast'
import { postLogin } from '../../redux/async/Auth'
import { useHistory } from 'react-router'

export default function Login() {

    const history = useHistory()
    const dispatch = useDispatch()
    const { loginErrors, loading } = useSelector((state) => state.Auth)
    const [input, setInput] = useState({
        email: '',
        password: '',
    })
    const handleInput = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = () => {
        dispatch(postLogin(input))
        localStorage.getItem('myToken') && history.push('/profile/me')
    }

    useEffect(() => {
        if (loginErrors.length > 0) {
            loginErrors.map((error) => toast.error(error.message || error.msg))
        }
    }, [loginErrors])

    return (
        <>
            <h1>User Login</h1>
            <Toaster
                position='top-right'
                reverseOrder={false}
                toastOptions={{
                    style: {
                        fontSize: '14px',
                    }
                }}
            />

            <input type="text" onChange={handleInput} placeholder="email" name="email" />
            <input type="text" onChange={handleInput} placeholder="password" name="password" />

            <button style={{background: 'white', padding: '20px 40px'}} onClick={handleSubmit}>{loading ? '...' : 'Login'}</button>

        </>
    )
}
