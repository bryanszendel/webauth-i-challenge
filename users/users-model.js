const db = require('../data/db-config.js');

module.exports = {
  findUsers,
  add,
}

function findUsers() {
  return db('users')
}

function add(user) {
  return db('users')
    .insert(user)
    .then(ids => {
      const [id] = ids
      return findById(id)
    })
}

function findById(id) {
  return db('users')
    .where({ id })
    .first()
}