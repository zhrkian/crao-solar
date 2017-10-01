const moment      = require('moment')

const toYYYYMMDD = value => {
  return value ? moment(new Date(value)).format('YYYYMMDD') : null
}

const toEmail = value => {
  return value ? ` ${value}` : null
}

module.exports = {
  toYYYYMMDD,
  toEmail
}