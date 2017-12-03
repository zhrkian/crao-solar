"use strict"

const mongoose   = require('../lib/mongoose')
const Schema     = mongoose.Schema
const createdAt  = require('../lib/mongoose-plugins/created-at')

let jobSchema = new Schema({
  name: { type: String },
  spots: { type: String },
  status: { type: String },
  options: { type: Schema.Types.Mixed  }
})

jobSchema.plugin(createdAt)

module.exports = mongoose.model('Job', jobSchema)
