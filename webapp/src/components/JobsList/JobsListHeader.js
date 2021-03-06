import React from 'react'
import { withStyles } from 'material-ui/styles'
import { TableHead, TableRow, TableCell } from 'material-ui/Table'
import Checkbox from 'material-ui/Checkbox'

const s = theme => ({})

const ListHeader = props => {
  const {
    columns,
    onSelect,
    selected
  } = props

  const indeterminate = !!selected.length

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={indeterminate}
            checked={false}
            onChange={() => onSelect(null)}
          />
        </TableCell>
        {
          columns.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={'none'}
              >
                {column.label}
              </TableCell>
            )
          }, this)
        }
      </TableRow>
    </TableHead>
  )
}

export default withStyles(s)(ListHeader)