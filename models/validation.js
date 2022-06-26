// Validation
const Joi = require('@hapi/joi');

// register validation
const registerVal = (data) => {
  const registerValSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().min(2).required().email(),
    password: Joi.string().min(4).required()
  })
  return registerValSchema.validate(data)
}


// login validation
const loginVal = (data) => {
  const loginValSchema = Joi.object({
    email: Joi.string().min(2).required().email(),
    password: Joi.string().min(4).required()
  })
  return loginValSchema.validate(data)
}

module.exports.registerVal = registerVal
module.exports.loginVal = loginVal