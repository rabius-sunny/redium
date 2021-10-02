const express = require('express')
const router = express.Router()
const { createPost } = require('../controllers/post')
const auth = require('../utils/auth')

router.post('/create-post', auth, createPost)

module.exports = router