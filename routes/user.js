const app = require('express')
const router = app.Router()
const { signup, signin, signupValidations, signinValidations } = require('../controllers/user')

router.post('/sign-up', signupValidations, signup)
router.post('/sign-in', signinValidations, signin)

module.exports = router