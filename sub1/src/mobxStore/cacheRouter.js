import { observable, configure, action, runInAction } from 'mobx'
import { dropByCacheKey } from 'react-router-cache-route'
// configure({ enforceActions: 'always', computedRequiresReaction: false })
class Store {
  @observable cacheRouters = []
  @observable waitRemove = []

  // 新增一个缓存路由
  @action.bound addCacheRouter = pathName => {
    let isNew = this.cacheRouters.indexOf(pathName) > -1
    if (isNew) this.cacheRouters.push(pathName)
  }

  // 清楚某个缓存路由
  @action.bound removeCacheRouter = pathName => {
    let cacheRouters = this.cacheRouters.slice()
    let index = cacheRouters.indexOf(pathName)
    let hasItem = index > -1
    if (!hasItem) return
    // this.setWaitRemove(pathName)
    cacheRouters.splice(index, 1)
    this.cacheRouters = cacheRouters
  }

  // 更新当前所有缓存路由
  @action.bound updateCacheRouter = arr => {
    this.cacheRouters = arr
  }

  // 查看当前所有缓存路由
  @action.bound checkCacheRouter = () => {
    return this.cacheRouters
  }
  // 设置待处理路由
  @action.bound setWaitRemove = pathName => {
    this.waitRemove.push(pathName)
  }
  // 重置待处理路由
  @action.bound resetWaitRemove = () => {
    this.waitRemove = []
  }
}

export default new Store()
