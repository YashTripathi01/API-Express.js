const express = require('express')
const app = express()
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Import routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')

dotenv.config()

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log('Connected to DB!')
})

// Middleware
app.use(express.json())

// Route middleware
app.use('/api/user', authRoute)
app.use('/api', postRoute)
app.listen(3000, () => console.log('Server up and running at http://localhost:3000/'))
