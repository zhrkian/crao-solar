const co  = require('co')
const moment = require('moment')
const Sunspot = require('../models/sunspot')

const updateSunspotDate = (sunspot, date) => {
  const { start_at, end_at } = sunspot

  if (!start_at) {
    sunspot.start_at = date
    return sunspot
  }

  if (moment(date).isBefore(moment(start_at))) { //If incoming date is before start date
    if (!sunspot.end_at) {
      sunspot.end_at = sunspot.start_at
    }
    sunspot.start_at = date
  } else if (!sunspot.end_at) { //If no end date
    sunspot.end_at = date
  } else if (moment(end_at).isBefore(moment(date))) { //If end date is before incoming date
    sunspot.end_at = date
  }

  return sunspot
}

const updateSunspotObjectField = (sunspot, date, field, options) => {
  let updatedField = JSON.parse(sunspot[field] || '{}')

  if (!options || (!Object.keys(options).length && typeof options !== 'number')) return JSON.stringify(updatedField)

  updatedField[date] = options

  return JSON.stringify(updatedField)
}

const create = (number, kind) =>
  co(function *(){
    let sunspot = new Sunspot({ number, kind })
    return yield sunspot.save()
  })


const UPDATE_FIELDS = [ 'position', 'hale_class', 'macintosh_class', 'area', 'sunspots_amount', 'flares' ]

const update = (number, kind, date, options) =>
  co(function *(){
    let sunspot = yield Sunspot.findOne({ number, kind })

    if (!sunspot) {
      sunspot = yield create(number, kind)
    }

    if (!date) return null

    sunspot = updateSunspotDate(sunspot, date)

    for (let key in UPDATE_FIELDS) {
      const field = UPDATE_FIELDS[key]
      if (options[field] && Object.keys(options).length) {
        sunspot[field] = updateSunspotObjectField(sunspot, date, field, options[field])
      }
    }

    return yield sunspot.save()
  })

const index = () =>
  co(function *(){
    return yield Sunspot.find({}).sort({ createdAt: -1 })
  })

module.exports = {
  create,
  update,
  index
}
