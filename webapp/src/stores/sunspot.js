import { observable, action } from 'mobx'
import axios from 'axios'

export default class Sunspot {
  id
  number
  days
  start_at
  end_at
  maxFlare
  flareIndex
  position

  constructor (options) {
    this.id = options.id
    this.number = options.number
    this.days = options.days
    this.start_at = options.start_at
    this.end_at = options.end_at
    this.maxFlare = options.maxFlare
    this.flareIndex = options.flareIndex
    this.position = options.position
  }
}
