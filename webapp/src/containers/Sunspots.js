import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import List from '../components/List'
import ListToolbarDefault from '../components/ListToolbar'
import ListHeaderDefault from '../components/ListHeader'
import SunspotListItem from '../components/SunspotListItem'
import SunspotFiltersDefault from '../components/SunspotFilters'

const columns = [
  { id: 'number', disablePadding: true, label: 'NOAA Number' },
  { id: 'first_seen', disablePadding: true, label: 'First seen' },
  { id: 'last_seen', disablePadding: true, label: 'Last seen' },
  { id: 'days', disablePadding: true, label: 'Visible (Days)' },
  { id: 'position', disablePadding: true, label: 'Position' },
  { id: 'hale_class', disablePadding: true, label: 'Hale Class' },
  { id: 'macintosh_class', disablePadding: true, label: 'MacIntosh Class' },
  { id: 'area', disablePadding: true, label: 'Area Info' },
  { id: 'sunspots_amount', disablePadding: true, label: 'Spots Amount Info' },
  { id: 'flares', disablePadding: true, label: 'Max Flare' },
  { id: 'flare_index', disablePadding: true, label: 'Flare Index' }
]
//
// const ListToolbar = inject(stores => ({ selected: stores.sunspotsStore.selected }))(observer(ListToolbarDefault))
//
// const ListHeader = inject(stores => ({
//   selected: stores.sunspotsStore.selected,
//   onSelectAll: (value) => stores.sunspotsStore.selectAll(value)
// }))(observer(ListHeaderDefault))
//
// const SunspotFilters = inject(stores => ({
//   filters: stores.sunspotsStore.filters,
//   onApply: (value) => stores.sunspotsStore.setFilters(value),
//   onReset: () => stores.sunspotsStore.setFilters()
// }))(observer(SunspotFiltersDefault))

@inject(stores => ({
  sunspots: stores.sunspotsStore.sunspots,
  total: stores.sunspotsStore.total,
  perPage: stores.sunspotsStore.perPage,
  page: stores.sunspotsStore.page,
  onPageChange: (page, perPage) => stores.sunspotsStore.onPageChange(page, perPage)
}))
@observer
class Sunspots extends Component {
  render () {
    const { sunspots, total, page, perPage } = this.props
    const { onPageChange } = this.props
    return (
      <List items={sunspots}
            columns={columns}
            total={total}
            page={page}
            perPage={perPage}
            onPageChange={onPageChange}
            header={<ListHeaderDefault columns={columns} />}
            renderItem={item => <SunspotListItem key={item.id} sunspot={item} />}
        // toolbar={<ListToolbar total={total} title="Sunspots" filters={<SunspotFilters />}/>}
        // header={<ListHeader total={total} columns={columns} />}
      />
    )
  }
}

export default Sunspots
