const express               = require('express')
const router                = express.Router()
const wrap                  = require('co-express')

router.get('/', wrap(function *(req, res) {
  return res.json({ success: true })
}))

module.exports = router