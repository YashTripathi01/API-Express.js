const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerVal, loginVal } = require('../models/validation')

// register route
router.post('/register', async (req, res) => {
  // validating the data before inserting into DB

  // const validation = valUser.validate(req.body)
  // res.send(validation)

  const { error } = registerVal(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  // checking if user already exists
  const emailExists = await User.findOne({ email: req.body.email })
  if (emailExists) {
    return res.status(400).send('Email already exists!')
  }

  // hashing the password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)


  // create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  })
  try {
    const savedUser = await user.save()
    res.send({ userID: user._id, name: user.name, email: user.email, date: user.date })
  } catch (err) {
    res.status(400).send(err)
  }
})

// login route
router.post('/login', async (req, res) => {
  // validating the request
  const { error } = loginVal(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  // checking if the user exits
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.status(404).send('User not found!')
  }

  // checking if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) {
    return res.status(400).send('Invalid Password!')
  }

  // creating and assigning JWT
  const token = jwt.sign({ _id: user._id, name: user.name, email: user.email }, process.env.TOKEN_SECRET_KEY)
  res.header('access_token', token).send({ 'access_token': token, 'token_type': 'Bearer' })

  res.send('Successfully logged in!')
})


module.exports = router



// JOI VALIDATION ERRORS
// password

/*{
    "value": {
        "name": "Alien",
        "email": "alien@mars.com",
        "password": "12"
    },
    "error": {
        "_original": {
            "name": "Alien",
            "email": "alien@mars.com",
            "password": "12"
        },
        "details": [
            {
                "message": "\"password\" length must be at least 4 characters long",
                "path": [
                    "password"
                ],
                "type": "string.min",
                "context": {
                    "limit": 4,
                    "value": "12",
                    "label": "password",
                    "key": "password"
                }
            }
        ]
    }
} */

// email

/*{
    "value": {
        "name": "Alien",
        "email": "alien",
        "password": "1234"
    },
    "error": {
        "_original": {
            "name": "Alien",
            "email": "alien",
            "password": "1234"
        },
        "details": [
            {
                "message": "\"email\" must be a valid email",
                "path": [
                    "email"
                ],
                "type": "string.email",
                "context": {
                    "value": "alien",
                    "invalids": [
                        "alien"
                    ],
                    "label": "email",
                    "key": "email"
                }
            }
        ]
    }
} */