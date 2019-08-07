import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Button, Icon, Input } from 'antd'
import CacheRoute, { CacheSwitch, dropByCacheKey, getCachingKeys } from 'react-router-cache-route'

const { TextArea } = Input

// @inject('rootStore')
@observer
export default class MenuPage extends Component {
  jumpfunc = () => {
    this.props.history.jump({
      path: '/baseModule/system/role',
      name: '角色管理',
      state: {
        aaa: 1,
        bbb: 2
      }
    })
  }
  jumpfunc2 = () => {
    this.props.history.jump({
      path: '/baseModule/system/role',
      name: '角色管理',
      state: {
        ccc: 3,
        ddd: 4
      }
    })
  }
  jumpfunc1 = () => {
    this.props.history.jump({
      path: '/baseModule/nopage',
      name: '无效测试页面'
    })
  }
  forbid = e => {
    console.log(e)
    e.preventDefault()
  }
  // 关闭除主页外的全部标签
  closeAll = () => {
    let { tabsStore } = window.baseHistory
    let allTabs = tabsStore.tabItems.slice().map(item => item.path).slice(1)
    let baseCachingKeys = getCachingKeys()
    if (process.env.ENV_TYPE === 'micro') {
      // 微服务模式下
      allTabs.forEach(pathname => {
        if (baseCachingKeys.indexOf(pathname) > -1) {
          dropByCacheKey(pathname)
        } else {
          let target = pathname.split('/')[1]
          let { stores } = window.baseGlobalStore
          console.log(`清除子模块${target}路由缓存： ${pathname}...`)
          if (stores[target] && stores[target].cacheRouter) {
            stores[target].cacheRouter.removeCacheRouter(pathname)
            stores[target].cacheRouter.setWaitRemove(pathname)
          }
        }
      })
    } else {
      // 独立开发下
      allTabs.forEach(pathname => {
        dropByCacheKey(pathname)
      })
    }
    window.baseHistory.jump({
      path: '/',
      name: '主页'
    })
    tabsStore.closeAllTabs()
  }
  render() {
    return (
      <div className='menu-page'>
        <Button onClick={this.closeAll}>
        关闭全部tab标签，回到主页
        </Button>
        <Button onClick={this.jumpfunc1}>
          <Icon type='upload ' />
          跳转不存在的页面
        </Button>
        <Input placeholder='请输入' />
        <TextArea rows={4} onPressEnter={this.forbid} />
        菜单管理页面
        <Button onClick={this.jumpfunc}>
          <Icon type='upload ' />
          带参A跳转页面
        </Button>
        <Button onClick={this.jumpfunc2}>
          <Icon type='upload ' />
          带参B跳转页面
        </Button>
      </div>
    )
  }
}
