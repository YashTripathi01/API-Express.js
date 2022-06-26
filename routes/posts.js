const router = require('express').Router()
const User = require('../models/User')
const verifyingToken = require('../utils/verifyToken')


router.get('/posts', verifyingToken, (req, res) => {
  // res.json({ 'post': { 'title': 'checking if the route is private', 'description': 'checking...' } })
  res.send(req.user)

  // find user based on the token
  // User.findOne({ '_id': req.user })
})

module.exports = router