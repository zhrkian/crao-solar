const co  = require('co')
const moment = require('moment')
const _ = require('lodash')
const Sunspot = require('../models/sunspot')

const skipPerPage = (page, perPage) => {
  page = page || 1
  return (page - 1) * perPage
}

const create = (number, kind) =>
  co(function *(){
    let sunspot = new Sunspot({ number, kind })
    return yield sunspot.save()
  })

const update = (number, kind, date, image, info) =>
  co(function *(){
    let sunspot = yield Sunspot.findOne({ number, kind })

    if (!sunspot) {
      sunspot = yield create(number, kind)
    }

    //update info
    sunspot.info = sunspot.info || []
    const infoIndex = _.findIndex(sunspot.info, { date: date })
    const infoFull = Object.assign(info, { date, image })
    if (infoIndex < 0) {
      sunspot.info.push(infoFull)
    } else {
      sunspot.info[infoIndex] = infoFull
    }
    sunspot.info[date] = info
    sunspot.markModified('info')

    //update dates
    sunspot.dates = sunspot.dates || []
    if (sunspot.dates.indexOf(date) < 0) {
      sunspot.dates.push(date)
    }
    sunspot.markModified('dates')

    sunspot = yield sunspot.save()

    return sunspot
  })

// "info.flares.class": "C"

const index = (query) =>
  co(function *() {
    const perPage = parseInt(query.perPage || 20)
    const page = parseInt(query.page || 1)

    const total = yield Sunspot.count()

    if (!total) return { total: 0, count: 0, sunspots: [] }

    const skip = skipPerPage(page, perPage)

    let scope = Sunspot.find({}).limit(perPage).skip(skip)

    scope = scope.sort('-_id')

    const sunspots = yield scope.exec()
    const count = yield Sunspot.find({}).count()

    return { total, count, sunspots }
  })

module.exports = {
  create,
  update,
  index
}
