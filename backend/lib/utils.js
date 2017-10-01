"use strict";

const serialize = obj => {
  var str = []
  for(let p in obj)
    if (obj.hasOwnProperty(p) && obj[p]) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    }
  return str.join('&')
}

const requiredObjParams = (obj, required) => {
  return (req, res, next) =>{
    // Check if obj present
    if (!req.body[obj]) {
      let err = new Error(`No ${obj} provided`)
      err.status = 403
      return next(err)
    }

    // Check if object has all required params
    if (required && required.length) {
      for (let arg of required) {
        if (!req.body[obj][arg]) {
          let err = new Error(`No ${obj}[${arg}] provided`)
          err.status = 403
          return next(err)
        }
      }
    }

    next()
  }
}

const getIp = req =>{
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
}

const unique = arr => {
  let a = arr.concat()
  for(let i = 0; i < a.length; ++i) {
    for(let j = i + 1; j < a.length; ++j) {
      if(a[i] === a[j])  a.splice(j--, 1)
    }
  }
  return a
}

const getObjectFields = object => Object.getOwnPropertyNames(object).sort()

const getUniqueFields = objects => {
  let result = getObjectFields(objects[0])
  objects.forEach(object => {
    const fields = getObjectFields(object)
    result = unique(result.concat(fields))
  })
  return result
}

const addDays = days => {
  let date = new Date()
  date.setDate(date.getDate() + days)
  return date
}

const getDatesBeforeNow = days => {
  let dates = []
  for (let i = days; i >= 0; i--) {
    dates.push(addDays(-i))
  }
  return dates
}

module.exports = {
  getObjectFields,
  getUniqueFields,
  requiredObjParams,
  unique,
  serialize,
  getIp,
  addDays,
  getDatesBeforeNow
}
