
import React, { PureComponent } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { ssStorage } from 'Util/storage'
import { getRouterData, pushRouter } from 'Common/router'
import { pushMenu, hasInitMenu } from 'Common/menu'
import { divisionMenuList, divisionRouterList, divisionPermissionList } from 'Util/menuHandler'
import conf from '../../public/project.json'

export default class PrivateRoute extends PureComponent {
  render() {
    let tokenId = ssStorage.getItem('tokenId')
    let menuList = ssStorage.getItem('menuList')
    // 主模块菜单是加载所有的  但是路由只加载自身的
    let ownMenuList = menuList && menuList.filter(item => item.path === conf.path)
    if (!hasInitMenu()) {
      // 菜单路由尚未初始化
      let menuData = (menuList && divisionMenuList(menuList)) || []
      let routerConfig = (ownMenuList && divisionRouterList(ownMenuList)) || {}
      // let permissionList = (menuList && divisionPermissionList(menuList)) || []
      console.log(menuData)
      // console.log(routerConfig)
      pushMenu(menuData)
      pushRouter(routerConfig)
      console.log('路由： ', routerConfig)
      // 菜单挂在全局
      this.props.globalStore.allMenuList = menuList
    }
    const { component: Component, ...rest } = this.props
    return (
      <Route
        {...rest}
        render={props => ((tokenId && menuList.length !== 0)
          ? (
            <Component {...props} routerData={getRouterData()} {...rest} />
          )
          : (
            <Redirect
              to={{
                pathname: '/user/login',
                state: { from: props.location }
              }}
            />
          ))
        }
      />
    )
  }
}
