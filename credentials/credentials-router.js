const express = require('express');
const router = express.Router()
const bcrypt = require('bcryptjs')

const db = require('../data/db-config.js')
const Creds = require('../users/users-model.js')

// Endpoints

router.post('/register', (req, res) => {
  const {username, password} = req.body
  const hash = bcrypt.hashSync(password, 8)

  Creds.add({username, password: hash})
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error adding the user.'} )
    })
})

module.exports = router;