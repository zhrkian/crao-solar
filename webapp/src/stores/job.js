import { observable, action } from 'mobx'
import axios from 'axios'

class Job {
  id
  @observable name
  @observable options
  @observable result
  @observable status
  @observable thinking = true

  constructor (id) {
    axios.get(`/api/jobs/${id}`).then(({ data: { success, job }}) => {
      if (success && job) {
        this.options = job.options
        this.result = job.result
        this.name = job.name
        this.status = job.status
      }

      this.thinking = false
    })
  }

}

export default Job
