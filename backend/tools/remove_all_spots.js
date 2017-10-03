const co = require('co')
const Tool = require('./tool')
const Sunspot = require('../models/sunspot')

class ResetConnectionsStateTool extends Tool {
  runTool() {
    return co(function *(){
      yield Sunspot.remove({})
      console.log('ALL CONNECTIONS REMOVED')
    })
  }
}

let tool = new ResetConnectionsStateTool()
tool.run()