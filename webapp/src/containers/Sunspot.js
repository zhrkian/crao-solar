import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject((stores, props) => {
    console.log(props)
    return {}
  }
)
@observer
class Sunspot extends Component {
  render () {
    return (<div>SUKO</div>)
  }
}

export default Sunspot
