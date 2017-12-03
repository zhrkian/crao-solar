import sunspotsStore from './sunspots'
import jobsStore from './jobs'

const stores = {
  sunspotsStore: new sunspotsStore(),
  jobsStore: new jobsStore()
}

window.___ALL_STORES___ = stores

export default stores
