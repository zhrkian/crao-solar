const co = require('co')
const conf = require('../config')
const GoogleSpreadsheet = require('google-spreadsheet')


const setDocumentAuth = (docId, config) => {
  return new Promise((resolve, reject) => {
    const doc = new GoogleSpreadsheet(docId)
    if (!doc) return reject()
    doc.useServiceAccountAuth(config, (err, data) => {
      if (err) return resolve({ error: 'Error to get spread sheet. Share spreadsheet for json2spreadsheet@typhoon-land.iam.gserviceaccount.com e-mail' })
      return resolve(doc)
    })
  })
}  

const getDocumentInfo = doc => {
  return new Promise((resolve, reject) => {
    doc.getInfo((err, info) => {
      if (err) return resolve({ error: 'Error to get spread sheet info. Share spreadsheet for json2spreadsheet@typhoon-land.iam.gserviceaccount.com e-mail' }) & console.log('getDocumentInfo REJECT', err)
      return resolve(info)
    })
  })
}

const clearWorksheet = sheet => {
  return new Promise((resolve, reject) => {
    try {
      sheet.clear((err) => {
        if (err) return reject({ err }) & console.log(err)
        return resolve(sheet)
      })
    } catch (e) {
      return reject({ err: e })
    }    
  })
}
  
const resizeWorksheet = (sheet, colCount, rowCount) => {
  return new Promise((resolve, reject) => {
    sheet.resize({ rowCount, colCount }, (err) => {
      if (err) return reject({ err })
      return resolve(sheet)
    })
  })
}  

const setColumnsHeader = (sheet, headers) => {
  return new Promise((resolve, reject) => {
    sheet.setHeaderRow(headers, (err) => {
      if (err) return reject({ err })
      return resolve(sheet)
    })
  })
}

const getSheetBy = (sheets, by, value) => {
  if (by == 'gid') {
    return sheets.filter(s => {
      let result = false
      for (let key in s['_links']) {
        if (s['_links'].hasOwnProperty(key) && s['_links'][key].indexOf(`?gid=${value}`) > -1 && !result) {
          result = true
        }
      }
      return result
    })[0]
  }
  return sheets.filter(s => s[by] === value)[0]
}
  
const getCellsArray = (sheet, rowStart, rowEnd, cols) => {
  return new Promise((resolve, reject) => {
    sheet.getCells({ 'min-row': rowStart, 'max-row': rowEnd, 'max-col': cols, 'return-empty': true }, (err, cells) => {
      if (err) return reject({ err })
      return resolve(cells)
    })
  })
}

const fillCells = (cells, data) => {
  if (!data || !cells || cells.length !== data.length) return null
  
  return cells.map((item, index) => {
    item.value = data[index]
  })
} 

const updateCells = (sheet, cells) => {
  return new Promise((resolve, reject) => {
    sheet.bulkUpdateCells(cells, (err) => {
      if (err) return reject({ err })      
      return setTimeout(() => resolve(sheet), 1000)
    })
  })
}

const UPDATE_ROW = 1000

const getCellsInRow = (table, bRow, eRow) => {
  let result = []
  for (let i = bRow; i <= eRow; i++) {
    if (table[i]) {
      result = result.concat(table[i])
    }
  }
  return result
}

const writeTable = (docId, gid, table, header) =>
  co(function *(){
     if (!table || !table.length) return { error: 'No table' }
    if (!docId) return { error: 'No document ID' }

    const doc = yield setDocumentAuth(docId, conf)
    if (doc.error) return doc

    const docInfo = yield getDocumentInfo(doc)
    if (docInfo.error) return docInfo

    const rows = table.length
    const cols = table[0].length

    let sheet = getSheetBy(docInfo.worksheets, 'gid', gid || '0')

    sheet = yield resizeWorksheet(sheet, cols, rows + 1)
    sheet = yield setColumnsHeader(sheet, header)

    for ( let i = 2; i < rows + 2; i += UPDATE_ROW) {
      let begin = i
      let end = i + UPDATE_ROW

      if (end > sheet.rowCount) end = sheet.rowCount

      let cells = yield getCellsArray(sheet, begin, end, cols)

      let fillCellsSuccess = fillCells(cells, getCellsInRow(table, begin - 2, end - 2))

      if (fillCellsSuccess) {
        sheet = yield updateCells(sheet, cells)
      } else {
        return { error: 'Something happened while wrote sheet' }
      }
    }

    return { success: true }
  })

module.exports = {
  setDocumentAuth,
  getDocumentInfo,
  clearWorksheet,
  resizeWorksheet,
  setColumnsHeader,
  getSheetBy,
  getCellsArray,
  fillCells,
  updateCells,
  writeTable
}