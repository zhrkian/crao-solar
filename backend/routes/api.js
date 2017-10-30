const express = require('express')
const router = express.Router()

// router.use('/test', require('./api_test'))
router.use('/jobs', require('./api_jobs'))
router.use('/sunspots', require('./api_sunspots'))

module.exports = router
