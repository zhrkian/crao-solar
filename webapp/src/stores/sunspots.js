import { observable, action, computed } from 'mobx'
import axios from 'axios'
import param from 'can-param'
import Sunspot from './sunspot'

export default class Sunspots {
  @observable sunspots = []
  @observable thinking = false
  @observable page = 0
  @observable perPage = 20

  constructor () {
    this.getSunspotList()
  }

  async getSunspotList (page = 0, perPage = 20) {
    const queryString = `?${param({ page: page + 1, perPage })}`
    this.thinking = true
    try {
      const { data } = await axios.get(`/api/sunspots${queryString}`)
      const { sunspots, total, count  } = data || {}
      this.page = page
      this.perPage = perPage
      this.count = count
      this.total = total
      this.error = null
      this.sunspots = sunspots.map(sunspot => new Sunspot(sunspot))
    } catch (e) {
      this.error = 'Some error'
    }
    this.thinking = false
  }

  @action
  onPageChange (page, perPage) {
    this.getSunspotList(page, perPage)
  }
}
