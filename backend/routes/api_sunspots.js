const express                             = require('express')
const router                              = express.Router()
const wrap                                = require('co-express')
const sunspot                             = require('../modules/sunspot')
const { sunspotListView, sunspotView }    = require('../views/sunspot')

router.get('/', wrap(function *(req, res) {
  const { total, sunspots } = yield sunspot.index(req.query)
  return res.json({ success: true, total, sunspots: sunspots.map(sunspot => sunspotListView(sunspot)) })
}))

router.get('/:id', wrap(function *(req, res) {
  const item = yield sunspot.show(req.params.id)

  return res.json({ success: true, sunspot: sunspotView(item) })
}))

module.exports = router