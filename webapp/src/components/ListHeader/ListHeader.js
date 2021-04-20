import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Checkbox,
  TableHead,
  TableRow,
  TableCell
} from '@material-ui/core'
import s from './ListHeader.styles'

const ListHeader = props => {
  const { columns, onSelectAll, selected, total } = props
  const indeterminate = selected > 0 && selected < total
  const allSelected = selected === total && selected > 0
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={indeterminate}
            checked={allSelected}
            onChange={() => onSelectAll(indeterminate ? false : allSelected ? false : true)}
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
            );
          }, this)
        }
      </TableRow>
    </TableHead>
  )
}

export default withStyles(s)(ListHeader)
