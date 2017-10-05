const co  = require('co')
const Job = require('../models/job')

const create = (number, kind) =>
  co(function *(){
    let job = new Job({ number, kind })
    return yield job.save()
  })

const update = (id, options) =>
  co(function *(){
    let job = yield Job.findById(id)

    return yield job.save()
  })

const index = () =>
  co(function *(){
    return yield Job.find({}).sort({ createdAt: -1 })
  })

module.exports = {
  create,
  update,
  index
}
