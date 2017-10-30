const cheerioTableparser    = require('cheerio-tableparser')

const LINK_REGEX = /region=(\d+)/
const FLARES_REGEX = /([A-Z]\d+\.\d+)(\(\d+:\d+\))/g
const FLARE_REGEX = /([ABCMX])(\d+.\d+)(\(\d+:\d+\))/

//Парсим таблицу
//Возвращает замапленную таблицу [[...], [...], ..., [...]]
const getTableData = $ => {
  //Удаляем спрятанные строки
  $('tr[style="display:none"]').remove()
  $('.noaatit').remove()
  cheerioTableparser($)
  const data = $('div.noaat > table').parsetable(true, true, true)
  return data
}

//Находим полный диск
//Возвращает url изображения или null
const getImageUrl = $ => {
  const image = $('img[usemap="#fulldiskmap"]')
  const isImage = image && image.length && image[0].hasOwnProperty('attribs') && image[0].attribs.src
  return isImage ? `https://solarmonitor.org/${image[0].attribs.src}` : null
}

//Смотрим АО на изображении по ссылке (в таблице может не быть, а на картинке может быть)
//Возвращает массив с номерами найденных АО
const findActiveRegionsOnImage = $ => {
  const links = $('area[shape]')
  let result = []
  if (links && links.length) {
    links.each(linkIndex => {
      const link = links[linkIndex]
      if (link.hasOwnProperty('attribs') && link.attribs.href) {
        const matchedLink = link.attribs.href.match(LINK_REGEX)
        if (matchedLink && matchedLink[1]) {
          result.push(matchedLink[1])
        }
      }
    })
  }
  return result
}

//Парсер класса АО
const getActiveRegionClass = value => {
  if (!value) return null
  const classValue = value.split('/')
  if (!classValue || classValue.length === 1) return null
  return classValue[0]
}

//Парсер цифрового значения в таблице
const getActiveRegionNumericValue = value => {
  if (!value) return null
  const numericValue = value.split('/')
  if (!numericValue || numericValue.length === 1) return null

  const result = parseFloat(numericValue[0])
  return Number.isFinite(result) ? result : null
}

//Парсер вспышек
const getActiveRegionFlares = value => {
  let result = []
  const flaresString = value.split('/')

  if (!flaresString || flaresString.length === 1) return result

  const flares = flaresString[0].match(FLARES_REGEX)

  flares.forEach(flare => {
    const flareParams = flare.match(FLARE_REGEX)

    if (flareParams && flareParams[2]) {
      result.push({
        'class': flareParams[1],
        'value': parseFloat(flareParams[2]),
        'time': flareParams[3]
      })
    }
  })

  return result
}

const parseTable = table => {
  let result = {}
  const spots = table[0].length

  for (let spot = 1; spot < spots; spot++) {
    result[table[0][spot]] = {
      position: table[1][spot],
      hale_class: getActiveRegionClass(table[2][spot]),
      macintosh_class: getActiveRegionClass(table[3][spot]),
      area: getActiveRegionNumericValue(table[4][spot]),
      sunspots_amount: getActiveRegionNumericValue(table[5][spot]),
      flares: getActiveRegionFlares(table[6][spot])
    }
  }
  return result
}

module.exports = {
  getTableData,
  getImageUrl,
  findActiveRegionsOnImage,
  parseTable
}