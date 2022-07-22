const User = require('../models/userModel')
const { createToken } = require('../helpers/createToken')

const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {    
    const user = await User.signin(email, password)

    const token = await createToken(user._id)

    res.status(200).json({ email, token })
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message })
  }
}

const signupUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.signup(email, password)

    const token = await createToken(user._id)

    res.status(200).json({ email, token })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

module.exports = {
  loginUser,
  signupUser
}
