const co = require('co')
const moment = require('moment')
const Tool = require('./tool')
const Sunspot = require('../models/sunspot')
const SunspotUtils  = require('../utils/sunspot')

class ResetConnectionsStateTool extends Tool {
  runTool() {
    return co(function *(){
      const sunspots = yield Sunspot.find({})
      const count = yield Sunspot.find({}).count()

      for (let i = 0; i < count; i++) {
        const { start_at, end_at } = SunspotUtils.getDates(sunspots[i].dates)
        const days = start_at && end_at ? moment(new Date(end_at)).diff(moment(new Date(start_at)), 'days') + 1 : null
        const maxFlare = SunspotUtils.getMaxFlare(sunspots[i].info)
        const flareIndex = SunspotUtils.getFlareIndex(sunspots[i].info, days)
        const position = SunspotUtils.getPosition(sunspots[i].info)

        if (start_at) {
          sunspots[i].start_at = new Date(start_at)
        }

        if (end_at) {
          sunspots[i].end_at = new Date(end_at)
        }

        if (days) {
          sunspots[i].days = days
        }

        sunspots[i].maxFlare = maxFlare
        sunspots[i].flareIndex = flareIndex
        sunspots[i].position = position

        console.log(start_at, end_at, days)
        yield sunspots[i].save()
      }
      console.log('ALL SUNSPOTS UPDATED')
    })
  }
}

let tool = new ResetConnectionsStateTool()
tool.run()