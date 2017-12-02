"use strict"

const mongoose   = require('../lib/mongoose')
const Schema     = mongoose.Schema
const createdAt  = require('../lib/mongoose-plugins/created-at')
const Mixed = Schema.Types.Mixed

let sunspotSchema = new Schema({
  number: { type: String, trim: true },
  kind: { type: String },
  images: { type: Mixed },
  dates: { type: Mixed },
  info: { type: Mixed },

  // Cron update
  start_at: { type: Date },
  end_at: { type: Date },
  days: { type: Number },
  maxFlare: { type: Mixed },
  flareIndex: { type: Number },
  position: { type: String },
})

sunspotSchema.plugin(createdAt)

sunspotSchema.index({
    number: 'text'
  },
  { weights: {
    number: 1
  }})

module.exports = mongoose.model('Sunspot', sunspotSchema)
