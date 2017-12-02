import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import List from '../List'
import ListToolbar from '../ListToolbar'
import { ListItem, ListHeader, Filters } from './index'


import param from 'can-param'

const columns = [
  { id: 'number', disablePadding: true, label: 'NOAA Number' },
  { id: 'first_seen', disablePadding: true, label: 'First seen' },
  { id: 'last_seen', disablePadding: true, label: 'Last seen' },
  { id: 'days', disablePadding: true, label: 'Visible (Days)' },
  { id: 'position', disablePadding: true, label: 'Position' },
  // { id: 'hale_class', disablePadding: true, label: 'Hale Class' },
  // { id: 'macintosh_class', disablePadding: true, label: 'MacIntosh Class' },
  // { id: 'area', disablePadding: true, label: 'Area Info' },
  // { id: 'sunspots_amount', disablePadding: true, label: 'Spots Amount Info' },
  { id: 'flares', disablePadding: true, label: 'Max Flare' },
  { id: 'flare_index', disablePadding: true, label: 'Flare Index' }
]

@inject(stores => ({
  sunspots: stores.sunspotsStore.sunspots,
  selected: stores.sunspotsStore.selected,
  filters: stores.sunspotsStore.filters,
  total: stores.sunspotsStore.total,
  perPage: stores.sunspotsStore.perPage,
  page: stores.sunspotsStore.page,
  onFilters: filters => stores.sunspotsStore.onFilters(filters),
  onSelect: id => stores.sunspotsStore.onSelect(id),
  onPageChange: (page, perPage) => stores.sunspotsStore.onPageChange(page, perPage)
}))
@observer
export default class Sunspots extends Component {
  render () {
    const {
      sunspots,
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
      <List items={sunspots}
            columns={columns}
            total={total}
            page={page}
            perPage={perPage}
            onPageChange={onPageChange}
            toolbar={<ListToolbar title={'Sunspots'} selected={selected.length} filters={<Filters filters={filters} onApply={onFilters} onReset={onFilters} />}/>}
            header={<ListHeader columns={columns} selected={selected} onSelect={onSelect} />}
            renderItem={item => <ListItem key={item.id} selected={ selected.indexOf(item.id) > -1 } sunspot={item} onSelect={onSelect} />}
      />
    )
  }
}