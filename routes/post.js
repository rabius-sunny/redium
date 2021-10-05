const express = require('express')
const router = express.Router()
const { createPost, getPostsForHome, myPosts, fetchPost, updatePost, updateValidations, updateImage } = require('../controllers/post')
const auth = require('../utils/auth')

router.post('/create-post', auth, createPost)
router.get('/home/:page', getPostsForHome)
router.get('/my-posts/:id/:page', auth, myPosts)
router.get('/post/:id', auth, fetchPost)
router.post('/update', [auth, updateValidations], updatePost)
router.post('/update-image', auth, updateImage)

module.exports = router