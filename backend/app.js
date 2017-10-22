"use strict"

const express       = require('express')
const logger        = require('morgan')
const bodyParser    = require('body-parser')
const session       = require('express-session')
const RedisStore    = require('connect-redis')(session)

const app           = express()
const api           = require('./routes/api')

const REDIS_PORT = process.env.REDIS_PORT || 6379
const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1'

const YEAR = 365 * 24 * 60 * 60
const sessionOptions = {
  secret: process.env.SESSION_SECRET || 'ssssssecret',
  name: process.env.COOKIE_NAME || 'crao-solar.sid',
  store: new RedisStore({ host: REDIS_HOST, port: REDIS_PORT, ttl: YEAR }),
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    maxAge:  YEAR * 1000 // 1 YEAR for expire
  }
}

app.use(logger('dev'))
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(session(sessionOptions))

app.use('/api', api)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // providing error in development only
  let error = app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.json({
    message: err.message,
    status: error.status,
    stack: error.stack
  })
})

module.exports = app
