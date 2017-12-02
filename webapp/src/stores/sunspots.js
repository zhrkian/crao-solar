import { observable, action, computed } from 'mobx'
import axios from 'axios'
import param from 'can-param'

export default class Sunspots {
  @observable filters = { flareClasses: [], position: [], start: '', end: '', flareIndex: false }
  @observable sunspots = []
  @observable selected = []
  @observable thinking = false
  @observable page = 0
  @observable perPage = 20

  constructor () {
    this.getSunspotList().then()
  }

  async getSunspotList (page = 0, perPage = 20, filters = {}) {
    const queryString = `?${param({ page: page + 1, perPage, filters })}`
    this.thinking = true
    try {
      const { data } = await axios.get(`/api/sunspots${queryString}`)
      const { sunspots, total, count  } = data || {}
      this.page = page
      this.perPage = perPage
      this.count = count
      this.total = total
      this.error = null
      this.sunspots = sunspots
    } catch (e) {
      this.error = 'Some error'
    }
    this.thinking = false
  }

  @action
  onPageChange (page, perPage) {
    this.getSunspotList(page, perPage, this.filters).then()
  }

  @action
  async onFilters (filters) {
    if (!filters) {
      this.filters = { flareClasses: [], position: [], start: '', end: '', flareIndex: false }
    } else {
      this.filters = filters
    }
    this.getSunspotList(0, this.perPage, filters || {}).then()
  }

  @action
  onSelect (id) {
    if (!id) {
      this.selected = []
    } else {
      const index = this.selected.indexOf(id)

      if (index > -1) {
        this.selected = this.selected.filter(_id => id !== _id)
      } else {
        this.selected = [...this.selected, id]
      }
    }
  }
}
