const { nanoid } = require('nanoid')
const initialUsers = () => {
  return [
    {
      id: 1,
      kullaniciadi: 'sertac',
      password: 'test',
    },
  ]
}

let allUsers = initialUsers()

function getAllUsers() {
  return allUsers
}

function getById(id) {
  allUsers.find((user) => user.id == id)
}

function insert(user) {
  user.id = nanoid()
  allUsers.push(user)
  return user
}

function checkLogin(user) {
  return (
    // allUsers.filter(
    //   (x) => x.kullaniciadi == user.kullaniciadi && x.password == user.password
    // ).length > 0

    Boolean(
      allUsers.find(
        (x) =>
          x.kullaniciadi == user.kullaniciadi && x.password == user.password
      )
    )
  )
}

module.exports = {
  insert,
  checkLogin,
  getById,
  getAllUsers,
}
