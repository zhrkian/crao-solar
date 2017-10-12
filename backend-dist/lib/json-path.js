const FILTER_REGEXP = /(.*)\[(.*)=(.*)\](.*)/

const parseFilter = path => {
  const filter = path.match(FILTER_REGEXP)

  if (filter) {
    const field = filter[1]
    const filterField = filter[2]
    const filterValue = filter[3]
    const valueField = filter[4]
    if (!field || !filterField || !filterValue || !valueField) return 'Error in filter field path'
    return { field, filterField, filterValue, valueField }
  }

  return null
}

const getFilteredValue = (object, filter) => {
  const { field, filterField, filterValue, valueField } = filter

  if (!object[field]) return undefined

  const result = object[field].filter(value => {
    if (filterValue[0] === '*') {
      return value[filterField].indexOf(filterValue.substr(1)) > -1
    }
    return value[filterField] === filterValue
  })[0]

  return result ? result[valueField] : undefined
}

const getObject = (object, path) => {
  const filter = parseFilter(path)
  if (filter && typeof filter === 'object') {
    return getFilteredValue(object, filter)
  } else if (filter && typeof filter === 'string') {
    return filter
  }

  return object[path]
}

const getValue = (object, path) => {
  if (!path) return undefined
  const first = path.substr(0, path.indexOf(':')) || path
  const result = getObject(object, first)
  if (typeof result === 'object' && result !== null) {
    const next = path.substr(path.indexOf(':') + 1)
    return getValue(result, next)
  }
  return result
}

module.exports = {
  getValue
}