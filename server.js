const express = require('express')
const app = express()
const port = process.env.PORT || 6000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

const db = require('./config/keys').mongoURI
mongoose.connect(db)
  .then(() => console.log('DB connected'))
  .catch(err => console.log(err))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use(passport.initialize())
require('./config/passport')(passport)

app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

app.listen(port, () => console.log(`Server running ${port}`))