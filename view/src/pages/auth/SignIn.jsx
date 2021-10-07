import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast'
import { postLogin } from '../../redux/async/Auth'
import { useHistory } from 'react-router'
import { Button, IconButton, Input, InputAdornment, TextField } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'

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

    return (
        <>
            <Helmet>
                    <title>Sign in | Redium</title>
                <meta property="og:title" content="Sign in | Redium" />
                <meta property="og:description" content="Sign in into Redium, The Social Blogging Application with React, Redux, Nodejs" />
                <meta property="og:url" content="https://redium.herokuapp.com/sign-in" />
            </Helmet>
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
                    <div className="p-1 pb-3 mx-auto input"><TextField variant="standard" type="text" onChange={handleInput} placeholder="email" name="email" /></div>
                    <div className="p-1 pb-3 mx-auto input"><Input
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
                                    {showPassword ? <VisibilityOff color="error" /> : <Visibility color="secondary" />}
                                </IconButton>
                            </InputAdornment>
                        }
                    /></div>
                    <div className="input fs-8 pb-1">Not a user? <Link to="/sign-up">Sign up</Link></div>
                    <Button variant="contained" className="input btn fs-8" onClick={handleSubmit}>{loading ? '...' : 'Sign In'}</Button>
                </div>
            </div>

        </>
    )
}
