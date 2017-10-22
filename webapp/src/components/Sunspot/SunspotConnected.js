import React from 'react'
import { inject, observer } from 'mobx-react'
import Sunspot from './Sunspot'
// sunspot: stores.sunspotsStore.findById(props.match.params.id)

const injectTo = (stores, props) => {
  console.log(props, stores.sunspotsStore.findById(props.id))
  return {
    sunspot: stores.sunspotsStore.findById(props.id)
  }
}

export default inject(injectTo)(observer(Sunspot))