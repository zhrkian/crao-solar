const moment        = require('moment')
const SunspotUtils  = require('../utils/sunspot')

exports.sunspotListView = sunspot => {
  const { _id, number, days, start_at, end_at, maxFlare, flareIndex, position } = sunspot

  let result = {
    id: _id,
    number,
    days,
    start_at,
    end_at,
    maxFlare,
    flareIndex,
    position
  }

  return result
}

exports.sunspotView = sunspot => {
  const { _id, number, days, start_at, end_at, maxFlare, flareIndex, position, info } = sunspot

  let result = {
    id: _id,
    number,
    days,
    start_at,
    end_at,
    maxFlare,
    flareIndex,
    position,
    info
  }

  return result
}