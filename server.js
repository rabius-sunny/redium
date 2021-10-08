const express = require('express')
const bodyParser = require('body-parser')
const connect = require('./config/dbConnection')
const userRouter = require('./routes/user')
const postRouter = require('./routes/post')
const path = require('path')
const cors = require('cors')
const app = express()

require('dotenv').config()
app.use(bodyParser.json())
app.use(cors())


// connecting to mongodb database
connect()

const PORT = process.env.PORT || 5000

app.use('/', userRouter)
app.use('/', postRouter)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/view/build/')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'view', 'build', 'index.html'));
    });
}









app.listen(PORT, () => console.log(`server is running on port= ${PORT}`))