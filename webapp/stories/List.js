import React from 'react'
import { storiesOf } from '@kadira/storybook'
import List from '../src/components/List'
import ListHeader from '../src/components/ListHeader'
import ListToolbar from '../src/components/ListToolbar'

const columns = [
  { id: 'number', disablePadding: true, label: 'NOAA Number' },
  { id: 'first_seen', disablePadding: true, label: 'First seen' },
  { id: 'last_seen', disablePadding: true, label: 'Last seen' },
  { id: 'days', disablePadding: true, label: 'Visible (Days)' },
  { id: 'position', disablePadding: true, label: 'Position info' },
  { id: 'hale_class', disablePadding: true, label: 'Hale Class Info' },
  { id: 'macintosh_class', disablePadding: true, label: 'MacIntosh Class Info' },
  { id: 'area', disablePadding: true, label: 'Area Info' },
  { id: 'sunspots_amount', disablePadding: true, label: 'Spots Amount Info' },
  { id: 'flares', disablePadding: true, label: 'Flares Info' }
]

const items = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
]


storiesOf('List', module)
  .add('ListHeader', () => (
    <ListHeader total={150} columns={columns} />
  ))
  .add('ListToolbar', () => (
    <ListToolbar total={150} title="Sunspots" filters={<div>filters</div>}/>
  ))
  .add('ListToolbar', () => (
    <List items={items}
          total={4}
          toolbar={<ListToolbar total={150} title="Sunspots" filters={<div>filters</div>}/>}
          header={<ListHeader total={150} columns={columns} />}
          renderItem={item => <div key={item.id}>{item.id}</div>}/>
  ))