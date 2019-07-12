import { observable, action } from 'mobx'
import { ssStorage } from 'Util/storage'

// configure({ enforceActions: 'always', computedRequiresReaction: false })
class Store {
  @observable basicItem = {
    name: '主页',
    path: '/',
    isBasic: true,
    actived: true,
  }
  @observable tabItems = []
  @observable isOver = false
  @observable tabsScrollWidth = 0
  @observable curActiveTab = {
    path: '/',
    state: {}
  }
  @observable waitingRemove = {
    state: false,
    pathname: ''
  }

  @action initTabItems = (tabItems = []) => {
    if (tabItems.length === 0) {
      tabItems.push(this.basicItem)
    }
    this.tabItems = tabItems
    this.saveTabItemsSS()
    this.initScrollOver()
  }

  /**
   * 打开tab
   * @param {object} obj {name:'',path:''} tab信息
   */
  @action openTab = (obj, state = {}) => {
    let isExist = false
    let tabItems = this.tabItems.slice()
    let target
    tabItems = ssStorage.getItem('tabItems')
    tabItems.forEach(item => {
      if (item.path === obj.path) {
        isExist = true
        if (JSON.stringify(state) !== '{}') {
          item.state = state
        }
        target = item
      }
    })
    if (!isExist) {
      obj.state = state
      tabItems.push(obj)
    }
    let newobj = target || obj
    this.tabItems = tabItems
    this.activeItem(obj.path)
    this.updateCurActiveTab(newobj.path, newobj.state || state)
    this.initScrollOver()
  }

  /**
   * 关闭tab
   * @param {string} pathname
   */
  @action closeTab = pathName => {
    // let tabItems = this.tabItems.slice()
    let tabItems = ssStorage.getItem('tabItems')
    let targetIndex
    tabItems.forEach((item, index) => {
      if (item.path === pathName) targetIndex = index
    })
    let tabPath = tabItems[targetIndex].path
    let isActive = tabItems[targetIndex].actived
    if (isActive) {
      let preItem = tabItems[targetIndex - 1]
      preItem.actived = true
      this.updateCurActiveTab(preItem.path, preItem.state)
    }
    tabItems.splice(targetIndex, 1)
    console.log('准备清除路由缓存： ', tabPath)
    this.updateWaitingRemove({
      status: true,
      pathname: tabPath
    })
    this.tabItems = tabItems
    this.saveTabItemsSS()
    this.initScrollOver()
  }

  /**
   * 关闭所有tab 未完善
   */
  @action closeAllTabs = () => {
    this.tabItems = []
    this.tabItems.sclice().push(this.basicItem)
    this.saveTabItemsSS()
    this.initScrollOver()
  }

  /**
   * 激活tab
   * @param {string} path 路由path
   */
  @action activeItem = path => {
    this.tabItems.slice().forEach(item => {
      if (item.path === path) {
        item.actived = true
      } else {
        item.actived = false
      }
    })
    this.saveTabItemsSS()
  }
  // 更新当前激活tab
  @action updateCurActiveTab = (path = '', state = {}) => {
    this.curActiveTab = {
      path,
      state
    }
    this.saveCurActiveTab()
  }

  @action saveTabItemsSS = () => {
    ssStorage.setItem('tabItems', this.tabItems.slice())
  }

  @action saveCurActiveTab = () => {
    ssStorage.setItem('curActiveTab', this.curActiveTab)
  }
  @action initScrollOver = () => {
    let tabsBar = document.getElementById('tabsBar')
    let tabsCon = document.getElementById('tabsCon')
    if (tabsBar && tabsCon) {
      this.tabsScrollWidth = tabsBar.offsetWidth - tabsCon.offsetWidth + 100
      if (tabsBar.offsetWidth > tabsCon.offsetWidth) {
        this.isOver = true
      } else {
        this.isOver = false
      }
    }
  }

  // 更新当前待清除任务
  @action updateWaitingRemove = ({ status = false, pathname = '' }) => {
    this.waitingRemove = {
      status,
      pathname
    }
  }
}

export default new Store()
