"use strict"

const mongoose = require('mongoose')

const MONGO_CONNECT = process.env.MONGO_CONNECT || "mongodb://localhost:27017/connectors"

mongoose.Promise = global.Promise
mongoose.connect(MONGO_CONNECT)

module.exports = mongoose
