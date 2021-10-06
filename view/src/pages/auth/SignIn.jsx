import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast'
import { postLogin } from '../../redux/async/Auth'
import { useHistory } from 'react-router'
import { Button, IconButton, Input, InputAdornment, TextField } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Link } from 'react-router-dom'

export default function Login() {

    const history = useHistory()
    const dispatch = useDispatch()
    const { loginErrors, loading, redirect } = useSelector((state) => state.Auth)
    const [input, setInput] = useState({
        email: '',
        password: '',
    })
    const [showPassword, setShowPassword] = useState(false)
    const handleInput = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = () => {
        dispatch(postLogin(input))
    }
    useEffect(() => {
        if (loginErrors.length > 0) {
            loginErrors.map((error) => toast.error(error.message || error.msg))
        }
    }, [loginErrors])
    useEffect(() => {
        if (redirect) {
            history.push('/profile/me')
        }
        // eslint-disable-next-line
    }, [redirect])
    console.log(redirect)
    return (
        <>
            <Toaster
                position='top-right'
                reverseOrder={false}
                toastOptions={{
                    style: {
                        fontSize: '14px',
                    }
                }}
            />

            <div className="authBox">
                <div className="authBox__authHolder login">
                    <h1>Sign In</h1>
                    <div className="p-1 pb-2 mx-auto input"><TextField variant="standard" type="text" onChange={handleInput} placeholder="email" name="email" /></div>
                    <div className="p-1 pb-2 mx-auto input"><Input
                        variant="standard"
                        type={showPassword ? 'text' : 'password'}
                        onChange={handleInput}
                        placeholder="password"
                        name="password"
                        className="pass"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    /></div>
                    <div className="input pb-1">Not a user? <Link to="/sign-up">Sign up</Link></div>
                    <Button variant="contained" className="input btn" onClick={handleSubmit}>{loading ? '...' : 'Sign In'}</Button>
                </div>
            </div>

        </>
    )
}
