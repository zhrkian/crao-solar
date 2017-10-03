const OBJECT_FIELDS = [ 'position', 'hale_class', 'macintosh_class', 'area', 'sunspots_amount', 'flares' ]
exports.sunspotView = sunspot => {
  const { _id, number, kind, start_at, end_at } = sunspot
  let result = {
    id: _id,
    number,
    kind,
    start_at,
    end_at
  }

  OBJECT_FIELDS.forEach(field => {
    result[field] = JSON.parse(sunspot[field] || '{}')
  })

  return result
}