const cheerioTableparser    = require('cheerio-tableparser')

const LINK_REGEX = /region=(\d+)/
const POSITION_REGEX = /([SN]\d{2})([EW]\d{2})\((-?\d+)",(-?\d+)"\)/
const FLARES_REGEX = /([A-Z]\d+\.\d+)/g

const tableGrubber = $ => {
  $('tr[style="display:none"]').remove()
  $('.noaatit').remove()
  cheerioTableparser($)
  const data = $('div.noaat > table').parsetable(true, true, true)
  return parseTable(data)
}

const imageGrubber = $ => {
  const links = $('area[shape]')
  let result = []
  if (links && links.length) {
    links.each(linkIndex => {
      const link = links[linkIndex]

      if (link.hasOwnProperty('attribs')) {
        if (link.attribs.href) {
          const matchedLink = link.attribs.href.match(LINK_REGEX)

          if (matchedLink && matchedLink[1]) {
            result.push(matchedLink[1])
          }
        }
      }
    })
  }
  return result
}

const parsePolarCoordinates = (theta, phi) => {
  let result = {}

  const thetaDirection = theta.match(/[SN]/)[0]
  const thetaDigit = parseFloat(theta.replace(thetaDirection, ''))
  result.theta = thetaDirection === 'N' ? thetaDigit : (-1) * thetaDigit

  const priDirection = phi.match(/[WE]/)[0]
  const phiDigit = parseFloat(phi.replace(priDirection, ''))
  result.phi = priDirection === 'W' ? phiDigit : (-1) * phiDigit

  return result
}

const parseImageCoordinates = (x, y) => {
  return { x: parseFloat(x), y: parseFloat(y)}
}

const parsePosition = (position = ' ') => {
  let result = {}
  const matchedPosition = position.match(POSITION_REGEX)


  if (!matchedPosition) return null

  if (matchedPosition[1] && matchedPosition[2]) {
    result = parsePolarCoordinates(matchedPosition[1], matchedPosition[2])
  }

  if (matchedPosition[3] && matchedPosition[4]) {
    result = Object.assign(result, parseImageCoordinates(matchedPosition[3], matchedPosition[4]))
  }

  return result
}

const parseHaleClass = value => {
  if (!value) return null
  const splitedValue = value.split('/')
  if (!splitedValue || splitedValue.length === 1) return null
  return splitedValue[0]
}

const parseMcIntoshClass = value => {
  if (!value) return null
  const splitedValue = value.split('/')
  if (!splitedValue || splitedValue.length === 1) return null
  return splitedValue[0]
}

const parseArea = value => {
  if (!value) return null
  const splitedValue = value.split('/')
  if (!splitedValue || splitedValue.length === 1) return null

  const result = parseFloat(splitedValue[0])
  return Number.isFinite(result) ? result : null
}

const parseSunspotsAmount = value => {
  if (!value) return null
  const splitedValue = value.split('/')
  if (!splitedValue || splitedValue.length === 1) return null

  const result = parseFloat(splitedValue[0])
  return Number.isFinite(result) ? result : null
}

const parseFlares = value => {
  if (!value) return {}
  const splitedValue = value.split('/')
  if (!splitedValue || splitedValue.length === 1) return {}

  const flares = splitedValue[0].match(FLARES_REGEX)

  if (!flares || !flares.length) return {}

  let result = {}

  flares.forEach(flare => {
    const flareType = flare[0]
    result[flareType] = result[flareType] || []

    const flareValue = parseFloat(flare.slice(1))

    if (Number.isFinite(flareValue)) {
      result[flareType].push(flareValue)
    }
  })

  return result
}

const parseTable = table => {
  let result = {}
  const spots = table[0].length

  for (let spot = 1; spot < spots; spot++) {
    result[table[0][spot]] = {
      position: parsePosition(table[1][spot]),
      hale_class: parseHaleClass(table[2][spot]),
      macintosh_class: parseMcIntoshClass(table[3][spot]),
      area: parseArea(table[4][spot]),
      sunspots_amount: parseSunspotsAmount(table[5][spot]),
      flares: parseFlares(table[6][spot])
    }
  }


  return result
}


module.exports = {
  tableGrubber,
  imageGrubber
}