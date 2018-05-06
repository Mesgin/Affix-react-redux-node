const express = require('express')
const app = express()
const port = process.env.PORT || 6000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// Routes
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

// MongoDB connection
const db = require('./config/keys').mongoURI
mongoose.connect(db)
  .then(() => console.log('DB connected'))
  .catch(err =>console.log(err))

app.use(bodyParser.json())

app.get('/', (req, res) => res.send('sup?'))

app.use('/api/users',users)
app.use('/api/profile',profile)
app.use('/api/posts',posts)

app.listen(port, () => console.log('Server running'))