const co = require('co')
const Tool = require('./tool')
const Job = require('../models/job')

class ResetConnectionsStateTool extends Tool {
  runTool() {
    return co(function *(){
      yield Job.remove({})
      console.log('ALL JOBS REMOVED')
    })
  }
}

let tool = new ResetConnectionsStateTool()
tool.run()