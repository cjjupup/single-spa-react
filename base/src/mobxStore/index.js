
import userStore from './userStore'
import controlStore from './controlStore'
import cacheRouter from './cacheRouter'

class RootStore {
  constructor () {
    this.userStore = userStore
    this.controlStore = controlStore
    this.cacheRouter = cacheRouter
  }
}

export default new RootStore()
