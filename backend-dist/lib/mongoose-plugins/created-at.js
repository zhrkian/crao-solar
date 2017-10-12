"use strict"

function createdAt(schema){
  schema.add({ createdAt: Date })

  schema.pre('save', function(next) {
    if (!this.createdAt) this.createdAt = new Date()
    next()
  })
}

module.exports = createdAt