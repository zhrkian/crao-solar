"use strict"

/*
 All tools must extends of this class in order to work with mongoose
 End-up tool must implement method runTool() - it's entry point of any tool
 */

const mongoose = require('../lib/mongoose')

class Tool {

  finish(err) {
    if (err) console.error(err)
    mongoose.disconnect()
  }

  run() {
    this.runTool().then(() => this.finish()).catch(this.finish)
  }

  runTool() {
    console.error('Tool must implement method runTool()')
    process.exit(1)
  }

}

module.exports = Tool