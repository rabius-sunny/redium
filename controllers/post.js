const formidable = require('formidable')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')

module.exports.createPost = (req, res) => {
    const form = formidable({ multiples: true })
    form.parse(req, (error, fields, files) => {
        const { title, body, description, slug, id, user } = fields
        const errors = []

        // Form validation
        title === '' && error.push({ message: 'Title is required' })
        body === '' && error.push({ message: 'Body is required' })
        description === '' && error.push({ message: 'Description is required' })
        slug === '' && error.push({ message: 'Title is required' })
        id === '' && error.push({ message: 'Title is required' })
        user === '' && error.push({ message: 'Title is required' })

        // Image validation
        if (!Object.keys(files).length) {
            error.push({ message: 'Image is required' })
        } else {
            const { type } = files.image
            const split = type.split('/')
            const extension = split[1].toLowerCase()

            if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png') {
                error.push({ message: `${extension} is not supported` })
            } else {
                files.image.name = uuidv4() + '.' + extension
                const newPath = __dirname + `/../client/public/images/${files.image.name}`
                fs.copyFile(files.image.path, newPath, (error) => {
                    if (!error) {
                        console.log('Image Uploaded')
                    } else console.log(error)
                })
            }
        }
        if (error.length) {
            res.status(400).json({ errors })
        }
    })
}