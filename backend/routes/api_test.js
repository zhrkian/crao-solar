const express               = require('express')
const router                = express.Router()
const wrap                  = require('co-express')
const moment                = require('moment')
const Crawler               = require('crawler')

const { writeTable }        = require('../modules/gdoc')
const { sunspotView }       = require('../views/sunspot')
const sunspot               = require('../modules/sunspot')
const SolarMonitor          = require('../modules/solarmonitor')

const SolarMonitorParser    = require('../modules/parsers/solarmonitor')

//bump


var enumerateDaysBetweenDates = function(startDate, endDate) {
  let currDate = moment(startDate).startOf('day')
  let lastDate = moment(endDate).startOf('day')
  let dates = [ currDate.clone().format('YYYY-MM-DD') ]

  while(currDate.diff(lastDate) < 0) {
    currDate.add(1, 'days')
    dates.push(currDate.clone().format('YYYY-MM-DD'))
  }

  return dates
}

const c = new Crawler({
  rateLimit: 1000,
  maxConnections: 1,
  callback: (error, res, done) => {
    if(error) {
      console.log(`Error for ${res.options.date}`)
      done()
    } else {
      const { $ } = res
      const { date, kind } = res.options
      const imgUrl = SolarMonitorParser.getImageUrl($)
      const table = SolarMonitorParser.getTableData($)
      let tableData = SolarMonitorParser.parseTable(table)
      let imageDate = SolarMonitorParser.findActiveRegionsOnImage($)

      imageDate.forEach(spot => {
        if (!tableData.hasOwnProperty(spot)) {
          tableData[spot] = {
            position: null,
            hale_class: null,
            macintosh_class: null,
            area: null,
            sunspots_amount: null,
            flares: []
          }
        }
      })

      const promises = Object.keys(tableData).map((number, index) => {
        return sunspot.update(number, kind, date, imgUrl, tableData[number])
      })

      Promise.all(promises).then(success => {
        console.log(`Done for ${date}`)
        done()
      }, reject => {
        console.log(`Error for ${date}`)
        done()
      })

      // let tableSpotsData = SolarMonitor.tableGrubber(res.$)
      // let imageSportData = SolarMonitor.imageGrubber(res.$)
      //
      // imageSportData.forEach(spot => {
      //   if (!tableSpotsData.hasOwnProperty(spot)) {
      //     tableSpotsData[spot] = {}
      //   }
      // })
      //
      // const promises = Object.keys(tableSpotsData).map((key, index) => {
      //   const { date, kind } = res.options
      //   return sunspot.update(key, kind, date, tableSpotsData[key])
      // })
      //
      // console.log(`Save data for ${res.options.date}`)
      //
      //
    }
  }
})

//BUMP

router.get('/', wrap(function *(req, res) {

  const { begin, end } = req.query
  const parseDates1 = enumerateDaysBetweenDates(begin, end || begin)

  // console.log(parseDates1)

  // До 2010-11-12  smdi_maglc
  // После 2010-12-01 shmi_maglc
  // c 2010 - 11 - 12 по 2010 - 12 - 01 gong_maglc

  // const dates = ['2010-11-11', '2010-11-12', '2010-11-13', '2010-12-01', '2010-12-02']
  const getDataType = date => {
    const current = (new Date(date)).getTime()
    const smdi_maglc = (new Date('2010-11-12').getTime())
    const shmi_maglc = (new Date('2010-12-01').getTime())

    if (current <= smdi_maglc) {
      return 'smdi_maglc'
    }

    if (current >= shmi_maglc) {
      return 'shmi_maglc'
    }

    return 'gong_maglc'
  }

  // dates.forEach(date => {
  //   console.log(getDataType(date), date)
  // })


  c.queue(parseDates1.map(date => {
    const dataType = getDataType(date)
    return {
      uri: `https://solarmonitor.org/full_disk.php?date=${date.replace(/-/g, '')}&type=${dataType}`,
      date,
      type: dataType,
      kind: 'solarmonitor'
    }
  }))

  //
  // const parseDates2 = enumerateDaysBetweenDates('2010-08-12', '2010-08-15')
  //
  // c.queue(parseDates2.map(date => ({
  //   uri: `https://solarmonitor.org/full_disk.php?date=${date.replace(/-/g, '')}&type=smdi_maglc`,
  //   date,
  //   type: 'smdi_maglc',
  //   kind: 'solarmonitor'
  // })))


  return res.json({ success: true })
}))

// router.get('/list', wrap(function *(req, res) {
//   const list = yield sunspot.index()
//   return res.json({ success: true, sunspots: list.map(sunspotView) })
// }))

router.get('/super', wrap(function *(req, res) {
  return res.json({ success: true })
}))

//
// router.get('/doc', wrap(function *(req, res) {
//   const result = yield writeTable('1ax6w66cOvCxgNUcjrCld8DIP3QWiVc0OxDMbEV8YmVg', '0', [['a', 'a', 'a', 'a', 'a', 'a']], ['a', 'a', 'a', 'a', 'a', 'a'])
//   return res.json({ success: result })
// }))

module.exports = router