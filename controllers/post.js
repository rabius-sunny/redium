const formidable = require('formidable')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const postModel = require('../models/post')
const commentModel = require('../models/comment')
const { body, validationResult } = require('express-validator')
const { htmlToText } = require('html-to-text')

module.exports.createPost = (req, res) => {
    const form = formidable({ multiples: true })
    form.parse(req, async (error, fields, files) => {
        const { title, body, description, slug, id, name } = fields
        const errors = []

        // Form validation
        title === '' && errors.push({ message: 'Title is required' })
        body === '' && errors.push({ message: 'Body is required' })
        description === '' && errors.push({ message: 'Description is required' })
        slug === '' && errors.push({ message: 'Title is required' })
        id === '' && errors.push({ message: 'Title is required' })
        name === '' && errors.push({ message: 'Title is required' })

        // Image validation
        if (!Object.keys(files).length) {
            errors.push({ message: 'Image is required' })
        } else {
            const { type } = files.image
            const split = type.split('/')
            const extension = split[1].toLowerCase()

            if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png') {
                errors.push({ message: `${extension} is not supported` })
            } else {
                files.image.name = uuidv4() + '.' + extension
            }
        }
        const isMatchSlug = await postModel.findOne({ slug })
        if (isMatchSlug) {
            errors.push({ message: 'Please choose a unique slug' })
        }
        if (errors.length) {
            res.status(400).json({ errors })
        } else {
            const newPath = __dirname + `/../view/build/images/${files.image.name}`
            fs.copyFile(files.image.path, newPath, async (error) => {
                if (!error) {
                    try {
                        const response = await postModel.create({
                            title,
                            body,
                            image: files.image.name,
                            description,
                            slug,
                            userName: name,
                            userId: id
                        })
                        return res.status(200).json({ message: 'Post successfully created' })
                    } catch (error) {
                        return res.status(500).json({ errors: error, message: error.message })
                    }
                } else console.log(error)
            })
        }
    })
}

module.exports.getPostsForHome = async (req, res) => {
    const page = req.params.page;
    const perPage = 4;
    const skip = (page - 1) * perPage;
    try {
        const count = await postModel.find({}).countDocuments();
        const posts = await postModel.find({})
            .skip(skip)
            .limit(perPage)
            .sort({ updatedAt: -1 });
        return res.status(200).json({ response: posts, count, perPage });
    } catch (error) {
        return res.status(500).json({ errors: error, msg: error.message });
    }
}

module.exports.myPosts = async (req, res) => {
    const id = req.params.id
    const page = req.params.page;
    const perPage = 4;
    const skip = (page - 1) * perPage;
    try {
        const count = await postModel.find({ userId: id }).countDocuments();
        const response = await postModel.find({ userId: id }).skip(skip).limit(perPage).sort({ updatedAt: -1 })
        return res.status(200).json({ response: response, count, perPage })
    } catch (error) {
        return res.status(500).json({ errors: error, msg: error.message });
    }
}

module.exports.fetchPost = async (req, res) => {
    const id = req.params.id
    try {
        const post = await postModel.find({ _id: id })
        return res.status(200).json({ post })
    } catch (error) {
        return res.status(500).json({ errors: error, msg: error.message });
    }
}

module.exports.updateValidations = [
    body('title').notEmpty().trim().withMessage('Title is required'),
    body('body').notEmpty().trim().custom(value => {
        let bodyValue = value.replace(/\n/g, '')
        if (htmlToText(bodyValue).trim().length === 0) {
            return false
        } else {
            return true
        }
    }).withMessage('Body is required'),
    body('description').notEmpty().trim().withMessage('Description is required')
]

module.exports.updatePost = async (req, res) => {
    const { title, description, body, id } = req.body
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } else {
        try {
            const response = await postModel.findByIdAndUpdate(id, {
                title,
                description,
                body
            })
            return res.status(200).json({ message: 'Post updated updated' })
        } catch (error) {
            return res.status(500).json({ errors: error, message: error.message });

        }
    }
}

module.exports.updateImage = async (req, res) => {
    const form = formidable({ multiples: true })
    form.parse(req, (errors, fields, files) => {
        const { id } = fields
        const imageErrors = []
        if (Object.keys(files).length === 0) {
            imageErrors.push({ message: 'Please select an image' })
        } else {
            const { type } = files.image
            const split = type.split('/')
            const extension = split[1].toLowerCase()
            if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png') {
                imageErrors.push({ message: `${extension} is not a valid extension, please choose among png, jpg and jpeg instead.` })
            } else {
                files.image.name = uuidv4() + '.' + extension
            }

        } if (imageErrors.length !== 0) {
            return res.status(400).json({ errors: imageErrors })
        } else {
            const newPath = __dirname + `/../view/build/images/${files.image.name}`
            fs.copyFile(files.image.path, newPath, async (error) => {
                if (!error) {
                    try {
                        const response = await postModel.findByIdAndUpdate(id, { image: files.image.name })
                        return res.status(200).json({ message: 'Your Image has been updated' })
                    } catch (error) {
                        return res.status(500).json({ errors: error, message: error.message });
                    }
                }
            })
        }
    })
}

module.exports.postDetails = async (req, res) => {
    const id = req.params.id

    try {
        const post = await postModel.findOne({ slug: id })
        const comments = await commentModel.find({ postId: post._id }).sort({ updatedAt: -1 });
        return res.status(200).json({ post, comments })
    } catch (error) {
        return res.status(500).json({ errors: error, message: error.message });
    }

}

module.exports.postComment = async (req, res) => {
    const { id, comment, userName } = req.body

    try {
        const response = await commentModel.create({
            postId: id,
            comment,
            userName
        })
        return res.status(200).json({ message: 'Your comment has been published successfully' })
    } catch (error) {
        return res.status(500).json({ errors: error, message: error.message });
    }
}

module.exports.deletePost = async (req, res) => {
    const id = req.params.id

    try {
        const response = await postModel.findByIdAndRemove(id)
        return res.status(200).json({message: 'Post deleted successfully'})
    } catch (error) {
        return res.status(500).json({ errors: error, message: error.message });
    }
}