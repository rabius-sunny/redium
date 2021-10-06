import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useDispatch, useSelector } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast'
import { postRegister } from '../../redux/async/Auth'
import { Button, IconButton, Input, InputAdornment } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Link, useHistory } from 'react-router-dom'

export default function SignUp() {

    const [input, setInput] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const { loading, registerErrors, user, redirect } = useSelector(
        (state) => state.Auth
    )
    const dispatch = useDispatch()
    const history = useHistory()

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
            registerErrors.map((error) => toast.error(error.msg || error.message))
        }
    }, [registerErrors, user])
    useEffect(() => {
        if (redirect) {
            history.push('/profile/me')
        }
        // eslint-disable-next-line
    }, [redirect])

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
            <div className="authBox">
                <div className="authBox__authHolder">
                    <h1>Sign Up</h1>
                    <Box
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                    >
                        <div className="p-1 pb-2 mx-auto input"><TextField type="text" onChange={handleInput} variant="standard" name="name" placeholder="name" /></div>
                        <div className="p-1 pb-2 mx-auto input"><TextField type="text" onChange={handleInput} variant="standard" name="email" placeholder="email" /></div>
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
                        <div className="input pb-1">Already has an account? <Link to="/sign-in">Sign in</Link></div>
                        <Button variant="contained" className="input btn" onClick={handleSubmit}>{loading ? '...' : 'Sign Up'}</Button>
                    </Box>
                </div>
            </div>
        </div>
    )
}
