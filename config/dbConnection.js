const mongoose = require('mongoose')
require('dotenv').config()

module.exports = connect = async () => {
    try {
        const response = await mongoose.connect(process.env.URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log('database connected successfully')
    } catch (error) {
        console.log(error)
    }
}