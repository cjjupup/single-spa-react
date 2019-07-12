import { observable, action, runInAction } from 'mobx'
import API_PATH from 'Common/apiPath'
import { get } from 'Util/request'

// configure({ enforceActions: 'always', computedRequiresReaction: false })
class Store {
  @observable menuList = []
  @observable permissionList = []
  @observable langConfig={
    locale: 'zh'
  }

  @action.bound changeLang=(param = '') => {
    this.langConfig.locale = param
  }

  // 获取菜单信息
  @action.bound getMenuList = async (params = {}) => {
    try {
      let res = await get(API_PATH.GET_MENU_LIST, params)
      runInAction(() => {
        sessionStorage.setItem('menuList', JSON.stringify(res.menuList))
        // this.menuList = res.menuList
      })
    } catch (error) {
      console.log(error)
    }
  }

  // 获取细节权限
  // @action.bound getPermissionList = async (params = {}) => {
  //   try {
  //     this.loading = true
  //     let res = await get(API_PATH.GET_PERMISSION_LIST, params)
  //     console.log(res)
  //     runInAction(() => {

  //     })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
}

export default new Store()
