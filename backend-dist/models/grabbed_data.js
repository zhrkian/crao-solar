"use strict"

const mongoose   = require('../lib/mongoose')
const Schema     = mongoose.Schema
const createdAt  = require('../lib/mongoose-plugins/created-at')

let grabbedDataSchema = new Schema({
  kind: { type: String },
  dates: { type: Array }
})

grabbedDataSchema.plugin(createdAt)

grabbedDataSchema.index({
    kind: 'text'
  },
  { weights: {
    number: 1
  }})

module.exports = mongoose.model('GrabbedData', grabbedDataSchema)
