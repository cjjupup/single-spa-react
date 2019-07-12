
import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { ssStorage } from 'Util/storage'
import { getRouterData, pushRouter } from 'Common/router'
import { pushMenu, hasInitMenu } from 'Common/menu'
import { divisionMenuList, divisionRouterList, divisionPermissionList } from 'Util/menuHandler'
import conf from '../../public/project.json'

export default class PrivateRoute extends Component {
  render () {
    let tokenId = ssStorage.getItem('tokenId')
    let menuList = ssStorage.getItem('menuList')
    // 未接入微服务主模块前  菜单及路由暂由本地模拟

    /**
     *  子模块特有： 截取子模块自己的菜单及路由
     *  因为子模块的菜单及路由是由主模块统一获取  子模块是接收者
     */
    let ownMenuList = menuList && menuList.filter(item => {
      return item.path === conf.path
    })
    // end
    if (!hasInitMenu()) {
      // 菜单路由尚未初始化
      let menuData = (ownMenuList && divisionMenuList(ownMenuList)) || []
      let routerConfig = (ownMenuList && divisionRouterList(ownMenuList)) || {}
      let permissionList = (ownMenuList && divisionPermissionList(ownMenuList)) || []
      pushMenu(menuData)
      pushRouter(routerConfig)
    }
    const { component: Component, ...rest } = this.props
    let ret
    if (process.env.ENV_TYPE !== 'micro') {
      ret = (
        <Route
          {...rest}
          render={props => (
            (tokenId && menuList.length !== 0)
              ? (<Component {...props} routerData={getRouterData()} {...rest} />)
              : (<Redirect to={{ pathname: '/user/login', state: { from: props.location }}} />)
          )}
        />
      )
    } else {
      ret = (
        <Route
          {...rest}
          render={props => <Component {...props} routerData={getRouterData()} {...rest} />}
        />
      )
    }

    return ret
  }
}
