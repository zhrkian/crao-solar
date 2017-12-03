const co                = require('co')
const Sunspot           = require('../models/sunspot')
const Job               = require('../models/job')
const moment            = require('moment')
const { applyFilters }  = require('./sunspot')


const process = ({ _id, options }) =>
  co(function *(){
    let sunspots = null
    let result = []

    if (options.sunspots) {
      sunspots = yield findByNumbers(options.sunspots)
    } else {
      sunspots = yield findByFilters(options)
    }

    sunspots.forEach(sunspot => {
      const { number, start_at, end_at, days, position, maxFlare, flareIndex } = sunspot
      let row = {}

      row['NOAA'] = `NOAA${number}`
      row['BEGIN'] = start_at ? moment(new Date(start_at)).format('DD MMM YYYY').toString() : '-.-'
      row['END'] = end_at ? moment(new Date(end_at)).format('DD MMM YYYY').toString() : '-.-'
      row['DAYS'] = days || '-.-'
      row['POSITION'] = position || '-.-'
      row['MAX FLARE'] = maxFlare ? `${maxFlare['class']}${maxFlare.value} ${maxFlare.date} (${maxFlare.time})` : '-.-'
      row['FLARE INDEX'] = flareIndex || '-.-'

      result.push(row)
    })

    let job = yield Job.findById(_id)

    job.status = 'processed'
    job.result = result

    return yield job.save()
  })

const findByFilters = filters =>
  co(function *(){
    const conditions = applyFilters(filters)
    const sunspots = yield Sunspot.find(conditions)
    return sunspots
  })

const findByNumbers = numbers =>
  co(function *(){
    const sunspots = yield Sunspot.find({ number: { $in: numbers } })
    return sunspots
  })

module.exports = {
  process
}