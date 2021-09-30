const express = require('express')
const bodyParser = require('body-parser')
const connect = require('./config/dbConnection')
const userRouter = require('./routes/user')
const postRouter = require('./routes/post')
const app = express()

require('dotenv').config()
app.use(bodyParser.json())


// connecting to mongodb database
connect()

const PORT = process.env.PORT || 5000

app.use('/', userRouter)
app.use('/', postRouter)









app.listen(PORT, () => console.log(`server is running on port= ${PORT}`))