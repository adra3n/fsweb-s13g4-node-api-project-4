const express = require('express')
// const router = express.router()
const server = express()
server.use(express.json())

const userModel = require('./model')
const middleware = require('./middleware')

server.get('/api/kullanıcılar', (req, res, next) => {
  try {
    const allUsers = userModel.getAllUsers()
    res.json(allUsers)
  } catch (error) {
    next(error)
  }
})

server.post(
  '/api/kayitol',
  middleware.validateUserPayload,
  middleware.validateNewUserName,
  (req, res, next) => {
    try {
      const insertedUser = userModel.insert(req.body)
      res.status(201).json(insertedUser)
    } catch (error) {
      next(error)
    }
  }
)
server.post(
  '/api/giris',
  middleware.validateUserPayload,
  middleware.validateLogin,
  (req, res, next) => {
    try {
      res.json({ message: `Hoşgeldin ${req.findedUser.kullaniciadi}` })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = server
