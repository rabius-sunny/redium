const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const auth_Headers = req.headers.authorization
    const token = auth_Headers.split('Bearer ')[1]
    try {
        jwt.verify(token, process.env.SECRET_KEY)
        next()
    } catch (error) {
        return res.status(401).json({ errors: [{ message: error.message }] })
    }
}