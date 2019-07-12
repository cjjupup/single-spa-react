import { observable, computed, configure, action, runInAction, extendObservable } from 'mobx'
import API_PATH from 'Common/apiPath'
import { get, post } from 'Util/request'

// configure({ enforceActions: 'always', computedRequiresReaction: false })
class Store {
  @observable pagination={ current: 1, pageSize: 10 }

  @computed get selectedRows() {
    // 此项为衍生出状态请使用计算属性
    return this.dataSource.filter(v => this.rowSelection.selectedRowKeys.indexOf(v.id) !== -1)
  }

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
    try {
      let { current = 1, pageSize = 10 } = this.pagination
      params = Object.assign({}, params, { page: current, size: pageSize })
      let res = await post(url, params)
      runInAction(() => {
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

