const express               = require('express')
const router                = express.Router()
const wrap                  = require('co-express')
const jobs                  = require('../modules/job')

router.get('/', wrap(function *(req, res) {
  const list = yield jobs.index()
  return res.json({ success: true, jobs: list })
}))

module.exports = router