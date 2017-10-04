const express = require('express')
const router = express.Router()

router.use('/test', require('./api_test'))
// router.use('/test', require('./api_tesos'))

module.exports = router
