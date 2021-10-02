const express = require('express')
const router = express.Router()
const { createPost, getPosts } = require('../controllers/post')
const auth = require('../utils/auth')

router.post('/create-post', auth, createPost)
router.get('/home/:page', getPosts)

module.exports = router