const express = require('express');
const router = express.Router()
const db = require('../data/db-config.js')
const Users = require('./users-model.js')

// Endpoints
router.get('/', (req, res) => {
  Users.findUsers()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error retrieving the users.'} )
    })
})

router.post('/', (req, res) => {
  const user = req.body
  Users.add(user)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error adding the user.'} )
    })
})

module.exports = router;