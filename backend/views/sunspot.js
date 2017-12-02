const moment        = require('moment')
const SunspotUtils  = require('../utils/sunspot')

exports.sunspotView = sunspot => {
  // const { start_at, end_at } = SunspotUtils.getDates(sunspot.dates)
  // const days = start_at && end_at ? moment(end_at).diff(moment(start_at), 'days') + 1 : ' - '
  // const maxFlare = SunspotUtils.getMaxFlare(sunspot.info)
  // const flareIndex = SunspotUtils.getFlareIndex(sunspot.info, days)
  // const position = SunspotUtils.getPosition(sunspot.info)

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