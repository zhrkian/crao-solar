const express = require('express')
const router = express.Router()
const wrap = require('co-express')

router.use('/test', require('./api_test'))
router.use('/jobs', require('./api_jobs'))
router.use('/sunspots', require('./api_sunspots'))

router.get('/status', wrap(function *(req, res) {
  return res.json({ success: true })
}))

module.exports = router
