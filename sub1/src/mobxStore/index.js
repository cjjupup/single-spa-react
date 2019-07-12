
import cacheRouter from './cacheRouter'
import controlStore from './controlStore'

class RootStore {
  constructor () {
    this.cacheRouter = cacheRouter
    this.controlStore = controlStore
  }
}

export default new RootStore()
