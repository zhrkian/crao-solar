const JSONPath        = require('./json-path')
const convertors      = require('./convertors')

const getUniqueFields = fields => {
  const result = []
  fields.forEach(field => {
    if (result.indexOf(field.name) < 0) {
      result.push(field.name)
    }
  })
  return result
}

const getTable = (data, fields) => {
  const table = []
  data.forEach(data_row => {
    let row = []
    fields.forEach(field => {
      const value = JSONPath.getValue(data_row, field.path || field.name)
      row.push(field.convert ? convertors[field.convert](value) : value)
    })
    table.push(row)
  })
  return table
}

const getTableHeader = fields => fields.map(field => field.path || field.name)

module.exports = {
  getUniqueFields,
  getTableHeader,
  getTable
}
