const express = require('express')
const app = express()
const port = process.env.PORT || 6000
const mongoose = require('mongoose')

// MongoDB connection
const db = require('./config/keys').mongoURI
mongoose.connect(db)
  .then(() => console.log('DB connected'))
  .catch(err =>console.log(err))

app.get('/', (req, res) => res.send('sup?'))

app.listen(port, () => console.log('Server running'))