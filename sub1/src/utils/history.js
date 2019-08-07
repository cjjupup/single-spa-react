import { createBrowserHistory } from 'history'
import tabsStore from '../mobxStore/tabsItem'

const history = createBrowserHistory()
// 路由跳转
history.jump = ({ path, name, state = {}}) => {
  history.push(path, state)
  tabsStore.openTab({
    path,
    name,
  }, state)
}
// 关闭当前tab 路由跳转
history.closeJump = ({ curPath, toPath, name, state = {}}) => {
  tabsStore.openTab({
    path: toPath,
    name
  }, state)
  tabsStore.closeTab(curPath)
  history.push(toPath)
}

export { history }
