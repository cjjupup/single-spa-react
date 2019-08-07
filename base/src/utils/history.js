import { createBrowserHistory } from 'history'
import tabsStore from '../mobxStore/tabsItem'

const history = createBrowserHistory()
// 路由跳转
history.jump = ({ path, name = '未命名页面', state = {}}) => {
  history.push(path, state)
  tabsStore.openTab({
    path,
    name,
  }, state)
}
// 关闭当前tab 路由跳转
history.closeJump = ({ curPath, toPath, name = '未命名页面', state = {}}) => {
  tabsStore.openTab({
    path: toPath,
    name
  }, state)
  let { tabItems } = tabsStore
  // 若准备关闭的url在tabs栏存在
  tabItems.forEach(item => {
    if (item.path === curPath) tabsStore.closeTab(curPath)
  })
  history.push(toPath)
}

history.tabsStore = tabsStore

export { history }
