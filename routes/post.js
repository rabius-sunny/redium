const express = require('express')
const router = express.Router()
const { createPost, getPostsForHome } = require('../controllers/post')
const auth = require('../utils/auth')

router.post('/create-post', auth, createPost)
router.get('/home/:page', getPostsForHome)

module.exports = router