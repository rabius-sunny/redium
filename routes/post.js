const express = require('express')
const router = express.Router()
const { createPost, getPostsForHome, myPosts, fetchPost, updatePost, updateValidations } = require('../controllers/post')
const auth = require('../utils/auth')

router.post('/create-post', auth, createPost)
router.get('/home/:page', getPostsForHome)
router.get('/my-posts/:id/:page', auth, myPosts)
router.get('/post/:id', auth, fetchPost)
router.post('/update', [auth, updateValidations], updatePost)

module.exports = router