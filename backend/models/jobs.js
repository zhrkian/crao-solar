"use strict"

const mongoose   = require('../lib/mongoose')
const Schema     = mongoose.Schema
const createdAt  = require('../lib/mongoose-plugins/created-at')

let jobSchema = new Schema({
  kind: { type: String },
  finished_at: { type: Date },
  dates: { type: Array }
})

jobSchema.plugin(createdAt)

jobSchema.index({
    kind: 'text'
  },
  { weights: {
    number: 1
  }})

module.exports = mongoose.model('Job', jobSchema)
