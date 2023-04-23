const userModel = require('./model')

async function validateNewUserPayload(req, res, next) {
  try {
    const { kullaniciadi, password } = req.body
    if (!kullaniciadi || !password) {
      res.status(400).json({ message: 'Eksik Alan' })
    } else {
      const allUsers = await userModel.getAllUsers()
      const isUserExists =
        allUsers.filter((x) => x.kullaniciadi == kullaniciadi).length > 0
      if (isUserExists) {
        res.status(400).json({ message: 'Bu kullanıcı zaten var' })
      } else {
        next()
      }
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  validateNewUserPayload,
}
