"use strict"

const mongoose   = require('../lib/mongoose')
const Schema     = mongoose.Schema
const createdAt  = require('../lib/mongoose-plugins/created-at')

let crawledDataSchema = new Schema({
  kind: { type: String },
  dates: { type: Array }
})

crawledDataSchema.plugin(createdAt)

crawledDataSchema.index({
    kind: 'text'
  },
  { weights: {
    number: 1
  }})

module.exports = mongoose.model('CrawledData', crawledDataSchema)
