import React, { createElement } from 'react'
import pathToRegexp from 'path-to-regexp' // 路径参数转正则的标准工具
import { getMenuData } from './menu'
import asyncComponent from './asyncComponent'

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
    !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1)
  })

function getFlatMenuData(menus) {
  let keys = {}
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = { ...item }
      keys = { ...keys, ...getFlatMenuData(item.children) }
    } else {
      keys[item.path] = { ...item }
    }
  })
  return keys
}
let routerConfig = {}

export const pushRouter = config => {
  routerConfig = config
}
export const getRouterData = () => {
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData())
  // console.log('menuList: ', menuData)
  // Route configuration data
  // eg. {name,authority ...routerConfig }
  const routerData = {}
  // The route matches the menu
  Object.keys(routerConfig).forEach(path => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path)
    // 转正则,有参数的url也不会有影响匹配
    const menuKey = Object.keys(menuData).filter(key => pathRegexp.test(`${key}`))
    let menuItem = {}

    if (menuKey) {
      menuItem = menuData[menuKey]
    }
    let router = routerConfig[path]

    router = {
      ...router,
      name: router.name || menuItem.name
    }
    routerData[path] = router
  })
  return routerData
}
