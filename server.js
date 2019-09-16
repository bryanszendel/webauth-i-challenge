const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const db = require('./data/db-config.js');

const server = express();
const usersRouter = require('./users/users-router.js')
const credsRouter = require('./credentials/credentials-router.js')

server.use(helmet());
server.use(express.json());
server.use(cors());

// routes
server.use('/api', credsRouter)
server.use('/api/users', usersRouter)

module.exports = server;