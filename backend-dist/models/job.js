"use strict"

const mongoose   = require('../lib/mongoose')
const Schema     = mongoose.Schema
const createdAt  = require('../lib/mongoose-plugins/created-at')

let jobSchema = new Schema({
  name: { type: String },
  kind: { type: String },
  options: { type: Schema.Types.Mixed  },
  sheet_url: { type: String },
  status: { type: String },
  finished_at: { type: Date },
  header: { type: Schema.Types.Mixed },
  result_table: { type: Schema.Types.Mixed  }
})

jobSchema.plugin(createdAt)

module.exports = mongoose.model('Job', jobSchema)
