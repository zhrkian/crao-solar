const express = require('express')
const router = express.Router()

router.use('/test', require('./api_test'))

module.exports = router
