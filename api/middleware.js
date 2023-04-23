const userModel = require('./model')

function validateNewUserName(req, res, next) {
  try {
    // const { kullaniciadi, password } = req.body
    // if (!kullaniciadi || !password) {
    //   res.status(400).json({ message: 'Eksik Alan' })
    // } else {
    const { kullaniciadi } = req.body
    const allUsers = userModel.getAllUsers()
    const isUserExists =
      allUsers.filter((x) => x.kullaniciadi == kullaniciadi).length > 0
    if (isUserExists) {
      res.status(400).json({ message: 'Bu kullanıcı zaten var' })
    } else {
      next()
    }
    // }
  } catch (error) {
    next(error)
  }
}

async function validateUserPayload(req, res, next) {
  try {
    const { kullaniciadi, password } = req.body
    if (!kullaniciadi || !password) {
      res.status(400).json({ message: 'Eksik Alan' })
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
}

async function validateLogin(req, res, next) {
  try {
    const user = {
      kullaniciadi: req.body.kullaniciadi,
      password: req.body.password,
    }
    const existingUser = userModel.checkLogin(req.body)
    if (!existingUser) {
      res.status(404).json({ message: 'Login parametreleri hatalı' })
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  validateNewUserName,
  validateUserPayload,
  validateLogin,
}
