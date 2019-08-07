
import cacheRouter from './cacheRouter'
import localeStore from './localeStore'

class RootStore {
  constructor () {
    this.cacheRouter = cacheRouter
    this.localeStore = localeStore
  }
}

export default new RootStore()
