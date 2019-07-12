import asyncComponent from 'Common/asyncComponent'

/**
 * 该文件主要做菜单分离出来 具体开发时  根据业务场景  自行修改
 *
 */

// 根据菜单信息 分离出菜单
export const divisionMenuList = menuList => {
  let menuData = []
  // 暂不处理
  menuData = menuList
  return menuData
}

function viewHandler (oripath = '', path, component, routerConfig) {
  routerConfig[oripath + path] = {
    component: asyncComponent(() => import(`../pages${component}`))
    // component: asyncComponent(() => import('' + component))
  }
}

function menuHandler (a, routerConfig) {
  a.children.forEach(b => {
    if (b.type === 'view' && b.component) {
      viewHandler(a.path, b.path, b.component, routerConfig)
    } else if (b.type === 'menu' && b.children.length > 0 && !b.component) {
      let { path, ...rest } = b
      menuHandler({
        path: a.path + path,
        ...rest
      }, routerConfig)
    }
  })
}

// 根据菜单信息 分离出路由
export const divisionRouterList = menuList => {
  let routerConfig = {}
  menuList.forEach(i => {
    if (i.type === 'view' && i.component) {
      viewHandler('', i.path, i.component, routerConfig)
    } else if (i.type === 'menu' && i.children.length > 0 && !i.component) {
      menuHandler(i, routerConfig)
    }
  })
  // routerConfig['/'] = {
  //   component: asyncComponent(() => import(`../pages/Welcome`))
  // }
  return routerConfig
}

function permissionHandler (item, permissionList) {
  item.children.forEach(i => {
    if (i.permissions) {
      permissionList = [...permissionList, ...i.permissions]
    }
    if (i.children) {
      permissionHandler(i, permissionList)
    }
  })
  return permissionList
}

// 根据菜单信息 分离出细节权限
export const divisionPermissionList = menuList => {
  let permissionList = []
  menuList.forEach(item => {
    if (item.permissions) {
      permissionList = [...permissionList, ...item.permissions]
    }
    if (item.children) {
      permissionList = permissionHandler(item, permissionList)
    }
  })
  return permissionList
}

