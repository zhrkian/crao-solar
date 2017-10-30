import { observable, action } from 'mobx'
import axios from 'axios'

export default class Sunspot {
  id
  number
  kind
  dates
  info
  @observable selected = false

  constructor (options) {
    this.id = options.id
    this.number = options.number
    this.kind = options.kind
    this.dates = options.dates
    this.info = options.info
  }

  @action
  toggleSelected () {
    this.selected = !this.selected
  }
}
