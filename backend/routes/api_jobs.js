const express               = require('express')
const router                = express.Router()
const wrap                  = require('co-express')
const jobsModule            = require('../modules/job')
const {
  jobView,
  jobListView
}                           = require('../views/jobs')

router.get('/', wrap(function *(req, res) {
  const { total, jobs } = yield jobsModule.index()
  return res.json({ success: true, total, jobs: jobs.map(jobListView) })
}))

router.get('/:id', wrap(function *(req, res) {
  const job = yield jobsModule.show(req.params.id)
  return res.json({ success: true, job: jobView(job) })
}))

router.post('/', wrap(function *(req, res) {
  const job = yield jobsModule.create(req.body.job)
  return res.json({ success: true , job: jobView(job) })
}))

module.exports = router