import React, { Component } from 'react'
import { Checkbox, Alert, Icon, Button } from 'antd'
import { observer, inject } from 'mobx-react'
import Login from 'Components/Login'
import { injectIntl, FormattedMessage, FormattedDate, FormattedNumber } from 'react-intl'
import CacheRoute, { CacheSwitch, dropByCacheKey, getCachingKeys } from 'react-router-cache-route'
// import './Menu.less'

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login

@inject('globalStore')
@observer
class WelComePage extends Component {
  testjump = () => {
    this.props.history.jump({
      path: '/abcdefg'
    })
  }
  closeAll = () => {
    let { tabsStore } = window.baseHistory
    let allTabs = tabsStore.tabItems.slice().map(item => item.path).slice(1)
    let baseCachingKeys = getCachingKeys()
    if (process.env.ENV_TYPE === 'micro') {
      // 微服务模式下
      allTabs.forEach(pathname => {
        if (baseCachingKeys.indexOf(pathname) > -1) {
          console.log(`清除主模块路由缓存： ${pathname}...`)
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
    tabsStore.closeAllTabs()
  }
  render() {
    console.log('1111.')
    const { intl } = this.props
    let text1 = intl.formatMessage({ id: 'intl.NETWORK_ERROR' })
    let text2 = intl.formatMessage({ id: 'intl.NAME' }, { name: '神钥' })
    return (
      <div className='menu-page'>
        <Button onClick={this.closeAll}>
          关闭全部tab标签，回到主页
        </Button>
        <h2>欢迎使用本系统</h2>
        <p> 以下为国际化组件使用示例,开发中必须使用国际化组件！</p>
        <p>
          <FormattedMessage
            id='intl.NETWORK_ERROR' // 这个id对应的就是zh-CN.js中的配置的键值, 该组件的值就是键值对应的value
          />
        </p>
        <p>
          <FormattedMessage
            id='intl.NAME' // 这个id对应的就是zh-CN.js中的配置的键值, 该组件的值就是键值对应的value, 同时会用下面values提供的name对应的值替换掉zh-CN.js中对应的站位name
            values={{ name: '神钥' }}
          />
        </p>
        <p>{text1}</p>
        <p>{text2}</p>
        <Button type='primary' onClick={this.testjump}>
          <Icon type='right' />
          错误路径页面展示
        </Button>
      </div>
    )
  }
}
export default injectIntl(WelComePage)
