import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import List from '../List'
import { ListItem, ListHeader, ListToolbar } from './index'

const columns = [
  { id: 'name', disablePadding: true, label: 'Name' },
  { id: 'spots', disablePadding: true, label: 'Spots amount' },
  { id: 'create_at', disablePadding: true, label: 'Create at' },
  { id: 'status', disablePadding: true, label: 'Status' }
]

@inject(stores => ({
  jobs: stores.jobsStore.jobs,
  selected: stores.jobsStore.selected,
  filters: stores.jobsStore.filters,
  total: stores.jobsStore.total,
  perPage: stores.jobsStore.perPage,
  page: stores.jobsStore.page,
  onPageChange: (page, perPage) => stores.sunspotsStore.onPageChange(page, perPage)
}))
@observer
export default class JobsList extends Component {
  render () {
    const {
      jobs,
      selected,
      filters,
      total,
      page,
      perPage,
      onFilters,
      onPageChange,
      onSelect
    } = this.props

    return (
      <List items={jobs}
            columns={columns}
            total={total}
            page={page}
            perPage={perPage}
            onPageChange={onPageChange}
            toolbar={<ListToolbar />}
            header={<ListHeader columns={columns} selected={selected} onSelect={onSelect} />}
            renderItem={item => <ListItem key={item.id} selected={ selected.indexOf(item.id) > -1 } job={item} onSelect={onSelect} />}
      />
    )
  }
}