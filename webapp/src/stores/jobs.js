import { observable, action, computed } from 'mobx'
import axios from 'axios'
import param from 'can-param'

export default class Jobs {
  @observable filters = {}
  @observable jobs = []
  @observable selected = []
  @observable thinking = false
  @observable page = 0
  @observable perPage = 20

  @observable createThinking = false
  @observable createSuccess = false
  @observable createError = null

  constructor () {
    this.getJobsList().then()
  }

  async getJobsList (page = 0, perPage = 20, filters = {}) {
      const queryString = `?${param({ page: page + 1, perPage, filters })}`
      this.thinking = true
      try {
        const { data } = await axios.get(`/api/jobs${queryString}`)
        const { jobs, total, count  } = data || {}
        this.page = page
        this.perPage = perPage
        this.count = count
        this.total = total
        this.error = null
        this.jobs = jobs
      } catch (e) {
        this.error = 'Some error'
      }
      this.thinking = false
    }

  @action
  async createJob (name, options) {
    this.createError = null
    this.createSuccess = false
    this.createThinking = true

    const createResult = await axios.post(`/api/jobs`, { job: { name, options }})

    const { success, job, message } = createResult.data

    if (success) {
      await axios.put(`/api/jobs/${job.id}/start`, { job: { name, options }})
      await this.getJobsList()
    }

    this.createError = message
    this.createSuccess = success
    this.createThinking = false

  }
}
