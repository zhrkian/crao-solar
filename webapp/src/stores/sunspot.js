import { observable, action } from 'mobx'
import axios from 'axios'

class Sunspot {
  id
  @observable number
  @observable days
  @observable start_at
  @observable end_at
  @observable flareIndex
  @observable info = []
  @observable maxFlare
  @observable position

  @observable thinking = true

  constructor (id) {
    axios.get(`/api/sunspots/${id}`).then(({ data: { success, sunspot }}) => {
      if (success) {
        for (let key in sunspot) {
          if (sunspot.hasOwnProperty(key)) {
            this[key] = sunspot[key]
          }
        }
      }
      this.thinking = false
    })
  }

}

export default Sunspot
