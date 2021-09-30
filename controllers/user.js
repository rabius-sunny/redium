const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/user')

require('dotenv').config()

// Get a token from jsonwebtoken
const getToken = user => jwt.sign({ user }, process.env.SECRET_KEY)

// Sign up validations
module.exports.signupValidations = [
    body("name").not().isEmpty().trim().withMessage("Name is required"),
    body("email").not().isEmpty().trim().withMessage("Email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
]

module.exports.signup = async (req, res) => {
    const { name, email, password } = req.body
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const check = await UserModel.findOne({ email })

        if (check) {
            return res.status(400).json({ errors: [{ message: 'Email already taken, try with another valid email address' }] })
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        try {
            const user = await UserModel.create({
                name,
                email,
                password: hash
            })
            const token = getToken(user)

            return res.status(200).json({ message: 'Account creation successful', token })
        } catch (error) {
            return res.status(500).json({ errors: error })
        }

    } catch (error) {
        return res.status(500).json({ errors: error })
    }
}

// Sign in validations
module.exports.signinValidations = [
    body("email").not().isEmpty().trim().withMessage("Email is required"),
    body("password").not().isEmpty().withMessage("Password is required")
]

module.exports.signin = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
        const user = await UserModel.findOne({ email })

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password)

            if (isMatch) {
                const token = getToken(user)
                return res.status(200).json({ message: 'Sign in successfully', token })
            } else {
                return res.status(401).json({ errors: [{ message: 'AnUthenticate' }] })
            }
        } else {
            return res.status(404).json({ errors: [{ message: 'AnUthenticate' }] })
        }

    } catch (error) {
        return res.status(500).json({ errors: error })
    }
}