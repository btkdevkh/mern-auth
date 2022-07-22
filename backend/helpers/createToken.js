const jwt = require('jsonwebtoken')

const createToken = async (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

module.exports = { createToken }