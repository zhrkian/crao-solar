"use strict"

const mongoose   = require('../lib/mongoose')
const Schema     = mongoose.Schema
const createdAt  = require('../lib/mongoose-plugins/created-at')

let sunspotSchema = new Schema({
  number: { type: String, trim: true },
  kind: { type: String },
  start_at: { type: Date },
  end_at: { type: Date },
  position: { type: String },
  hale_class: { type: String },
  macintosh_class: { type: String },
  area: { type: String },
  sunspots_amount: { type: String },
  flares: { type: String }
})

sunspotSchema.plugin(createdAt)

sunspotSchema.index({
    number: 'text'
  },
  { weights: {
    number: 1
  }})

module.exports = mongoose.model('Sunspot', sunspotSchema)
