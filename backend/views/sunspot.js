exports.sunspotView = sunspot => {
  const { _id, number, kind, createdAt, dates, images, info } = sunspot
  let result = {
    id: _id,
    number, kind, createdAt, dates, images, info
  }

  return result
}