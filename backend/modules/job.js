const co  = require('co')
const Job = require('../models/job')

const skipPerPage = (page, perPage) => {
  page = page || 1
  return (page - 1) * perPage
}

const show = (jobId) =>
  co(function *(){
    return yield Job.findById(jobId)
  })

const create = ({ name, options }) =>
  co(function *(){
    let job = new Job({ name, options })
    return yield job.save()
  })

const update = (id, options) =>
  co(function *(){
    let job = yield Job.findById(id)
    return yield job.save()
  })

const index = (query = {}) =>
  co(function *(){
    const perPage = parseInt(query.perPage || 20)
    const page = parseInt(query.page || 1)

    let total = yield Job.find({}).count()

    if (!total) return { total: 0, jobs: [] }

    let scope = Job.find({})

    scope = scope.sort('-_id')

    const skip = skipPerPage(page, perPage)

    scope = scope.limit(perPage).skip(skip)

    const jobs = yield scope.exec()

    return { total, jobs }
  })

module.exports = {
  create,
  update,
  index,
  show
}
