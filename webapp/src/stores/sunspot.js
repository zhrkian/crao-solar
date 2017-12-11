import { observable, action } from 'mobx'
import axios from 'axios'

class Sunspot {
  id
  @observable name
  @observable options
  @observable result
  @observable status
  @observable thinking = true

  constructor (id) {
    axios.get(`/api/sunspots/${id}`).then(({ data: { success, sunspot }}) => {
      console.log(success, sunspot)
      this.thinking = false
    })
  }

}

export default Sunspot
