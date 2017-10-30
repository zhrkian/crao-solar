import _ from 'lodash'

export const getHaleClass = sunspot => {
  if (!sunspot) return null

  const { hale_class = {} } = sunspot
  const dates = Object.keys(hale_class).map(date => date)
  const middle_date = Math.round(dates.length / 2)

  return hale_class[dates[middle_date]] || null
}

export const getMacIntoshClass = sunspot => {
  if (!sunspot) return null

  const { macintosh_class = {} } = sunspot
  const dates = Object.keys(macintosh_class).map(date => date)
  const middle_date = Math.round(dates.length / 2)

  return macintosh_class[dates[middle_date]] || null
}

export const getMaximumFlareDate = (flareValue, flareClass, flares) => {
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

export const getMaxFlareByClass = (flares, flareClass) => _.maxBy(flares.filter(flare => flare['class'] === flareClass), flare => flare.value)

export const getMaxFlare = info => {
  if (!info) return null

  let flaresAll = []
  info.map(({ flares, date }) => {
    const dateFlares = flares.map(flare => ({
      ...flare,
      date
    }))
    flaresAll = [...flaresAll, ...dateFlares]
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

export const getDates = dates => {
  if (!dates) return
  const start_at = dates.reduce((a, b) => {
    const aDate = (new Date(a)).getTime()
    const bDate = (new Date(b)).getTime()
    return aDate < bDate ? aDate : bDate;
  })
  const end_at = dates.reduce((a, b) => {
    const aDate = new Date(a)
    const bDate = new Date(b)
    return aDate > bDate ? aDate : bDate;
  })
  return { start_at, end_at }
}

export const getFlaresSumByClass = (flares, flareClass) => {
  let result = 0

  flares.filter(flare => flare['class'] === flareClass).forEach(flare => result += flare.value)

  return result
}

export const getFlareIndex = (info, days) => {
  if (!info || !days) return 0

  let flaresAll = []
  info.map(({ flares, date }) => {
    const dateFlares = flares.map(flare => ({
      ...flare,
      date
    }))
    flaresAll = [...flaresAll, ...dateFlares]
  })

  return (100.0 * getFlaresSumByClass(flaresAll, 'X') + 10.0 * getFlaresSumByClass(flaresAll, 'M') + 1.0 * getFlaresSumByClass(flaresAll, 'C')) / days
}

export const getPosition = info => {
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
