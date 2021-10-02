const formidable = require('formidable')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const postModel = require('../models/post')

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
            const newPath = __dirname + `/../view/public/images/${files.image.name}`
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

module.exports.getPosts = async (req, res) => {
    const page = req.params.page;
    const perPage = 6;
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