const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)

const db = require('./data/db-config.js');

const server = express();
const usersRouter = require('./users/users-router.js')
const credsRouter = require('./credentials/credentials-router.js')
const dbConnection = require('./data/db-config.js');

const corsConfig = {
    origin: 'http://localhost:3000',
    credentials: true
  }

const sessionConfig = {
  name: 'monkey',
  secret: 'keep it secret, keep it safe!', //good option for .env variable
  cookie: {
    maxAge: 1000 * 30,
    secure: false, //true in production
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false, //GDPR laws against saving cookies automatically
  store: new KnexSessionStore({
    knex: dbConnection,
    tablename: 'knexsessions',
    sidfieldname: 'sessionid',
    createtable: true,
    clearInterval: 1000 * 60 * 30, // clean out expired session data
  })
}

server.use(helmet());
server.use(express.json());
server.use(cors(corsConfig))
server.use(session(sessionConfig))



// routes
server.use('/api', credsRouter)
server.use('/api/users', usersRouter)

module.exports = server;