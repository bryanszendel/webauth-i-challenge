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

router.post('/login', (req, res) => {
  const { username, password } = req.body
  Creds.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome to being logged in, ${user.username}` })
      } else {
        res.status(401).json({ message: 'Invalid credentials.'} )
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Error logging in.' })
    })
})

module.exports = router;