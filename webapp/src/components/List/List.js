import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Table, {
  TableBody,
  TableFooter,
  TablePagination
} from 'material-ui/Table'

const s = theme => ({
  root: {},
  tableWrapper: {}
})

@withStyles(s)
class ListComponent extends Component {
  handleChangePage = (event, page) => {
    const { perPage, onPageChange } = this.props
    return onPageChange(page, perPage)
  }

  handleChangeRowsPerPage = event => {
    const perPage = event.target.value
    const { page, onPageChange } = this.props
    return onPageChange(page, perPage)
  }

  renderItems = (items) => {
    const { renderItem } = this.props
    return items.map(item => renderItem(item))
  }

  render () {
    const { classes } = this.props
    const { items, total, page, perPage } = this.props

    return (
      <Paper className={classes.root}>
        { this.props.toolbar }
        <div className={classes.tableWrapper}>
          <Table>
            { this.props.header }
            <TableBody>

              { this.renderItems(items) }

            </TableBody>

            <TableFooter>
              <TablePagination
                count={total}
                rowsPerPage={perPage}
                page={page}
                rowsPerPageOptions={[5, 10, 20, 50, 100, 200]}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </TableFooter>

          </Table>
        </div>
      </Paper>
    )
  }
}

export default ListComponent
