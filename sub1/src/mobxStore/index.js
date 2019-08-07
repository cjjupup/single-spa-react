
import cacheRouter from './cacheRouter'
import localeStore from './localeStore'

class RootStore {
  constructor () {
    // 路由缓存控制
    this.cacheRouter = cacheRouter
    // 国际化控制
    this.localeStore = localeStore
  }
}

export default new RootStore()
