const _             = require('lodash')
const moment        = require('moment')

const getHaleClass = sunspot => {
  if (!sunspot) return null

  const { hale_class = {} } = sunspot
  const dates = Object.keys(hale_class).map(date => date)
  const middle_date = Math.round(dates.length / 2)

  return hale_class[dates[middle_date]] || null
}

const getMacIntoshClass = sunspot => {
  if (!sunspot) return null

  const { macintosh_class = {} } = sunspot
  const dates = Object.keys(macintosh_class).map(date => date)
  const middle_date = Math.round(dates.length / 2)

  return macintosh_class[dates[middle_date]] || null
}

const getMaximumFlareDate = (flareValue, flareClass, flares) => {
  let flareDate = ''

  for (let date in flares) {
    if (flares.hasOwnProperty(date) && flares[date].hasOwnProperty(flareClass)) {
      if (!flareDate && flares[date][flareClass].indexOf(flareValue) > -1) {
        flareDate = date
      }
    }
  }

  return flareDate
}

const getMaxFlareByClass = (flares, flareClass) => _.maxBy(flares.filter(flare => flare['class'] === flareClass), flare => flare.value)

const getMaxFlare = info => {
  if (!info) return null

  let flaresAll = []
  info.map(({ flares, date }) => {
    const dateFlares = flares.map(flare => Object.assign(flare, { date }))
    flaresAll = flaresAll.concat(dateFlares)
  })


  let maximalFlare = getMaxFlareByClass(flaresAll, 'X')

  if (!maximalFlare) {
    maximalFlare = getMaxFlareByClass(flaresAll, 'M')
  }
  if (!maximalFlare) {
    maximalFlare = getMaxFlareByClass(flaresAll, 'C')
  }



  return maximalFlare || null
}

const getDates = dates => {
  if (!dates) return

  let start_at = dates.reduce((a, b) => {
    const aDate = (new Date(a)).getTime()
    const bDate = (new Date(b)).getTime()
    return aDate < bDate ? aDate : bDate;
  })
  let end_at = dates.reduce((a, b) => {
    const aDate = new Date(a)
    const bDate = new Date(b)
    return aDate > bDate ? aDate : bDate;
  })

  start_at = start_at ? moment(start_at).format('YYYY/MM/DD').toString() : null
  end_at = end_at ? moment(end_at).format('YYYY/MM/DD').toString() : null

  return { start_at, end_at }
}

const getFlaresSumByClass = (flares, flareClass) => {
  let result = 0

  flares.filter(flare => flare['class'] === flareClass).forEach(flare => result += flare.value)

  return result
}

const getFlareIndex = (info, days) => {
  if (!info || !days) return 0

  let flaresAll = []
  info.map(({ flares, date }) => {
    const dateFlares = flares.map(flare => Object.assign(flare, { date }))
    flaresAll = flaresAll.concat(dateFlares)
  })

  return (100.0 * getFlaresSumByClass(flaresAll, 'X') + 10.0 * getFlaresSumByClass(flaresAll, 'M') + 1.0 * getFlaresSumByClass(flaresAll, 'C')) / days
}

const getPosition = info => {
  if (!info) return null

  let result = { N: 0, S: 0 }

  info.forEach(date => {
    if (date.position) {
      if (date.position.indexOf('S') < 0 ) {
        result.N += 1
      } else {
        result.S += 1
      }
    }
  })

  if (result.S === result.N) return null

  if (result.S > result.N) return 'S'
  return 'N'
}

module.exports = {
  getHaleClass,
  getMacIntoshClass,
  getMaximumFlareDate,
  getMaxFlareByClass,
  getMaxFlare,
  getDates,
  getFlaresSumByClass,
  getFlareIndex,
  getPosition,
}