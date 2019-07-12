import { observable, computed, configure, action, runInAction, extendObservable } from 'mobx'
import API_PATH from 'Common/apiPath'
import { get, post } from 'Util/request'

// configure({ enforceActions: 'always', computedRequiresReaction: false })
class Store {
  @observable pagination={ current: 1, pageSize: 10 }
  @observable value=undefined
  // 定义请求id防止加载错数据
  @observable lastFetchId=0
  // 更新store
  @action setStore=(param = {}) => {
    Object.keys(param).map(v => {
      if (v in this) {
        this[v] = param[v]
      } else {
        const temp = {}
        temp[v] = param[v]
        extendObservable(this, temp)
      }
    })
  }

  // 加载远程数据
  @action.bound loadData= async ({ url = '', params = {}, onError = () => {} }) => {
    this.setStore({ loading: true })

    this.lastFetchId += 1
    const fetchId = this.lastFetchId
    try {
      let { current = 1, pageSize = 10 } = this.pagination
      params = Object.assign({}, params, { page: current, size: pageSize })
      let res = await post(url, params)
      runInAction(() => {
        if (fetchId !== this.lastFetchId) {
          // for fetch callback order
          return
        }
        let { results: dataSource, totalcount: total } = res
        let pagination = Object.assign({}, this.pagination, { total, current })
        this.setStore({ dataSource, pagination })
      })
    } catch (error) {
      console.error(error)
      onError(error)
    }
    this.setStore({ loading: false })
  }
}

export default Store

