import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Layout, Icon, message, Menu } from 'antd'
import { Route, Switch, Redirect, Link } from 'react-router-dom'
import CacheRoute, { CacheSwitch, dropByCacheKey, getCachingKeys } from 'react-router-cache-route'
import { ContainerQuery } from 'react-container-query'
import DocumentTitle from 'react-document-title'
import classNames from 'classnames'
import SiderMenu from 'Components/SiderMenu/'
import GlobalHeader from 'Components/GlobalHeader'
import TabsBar from 'Components/TabsBar'
import { enquireScreen, unenquireScreen } from 'enquire-js'
import { divisionRouterList } from 'Util/menuHandler'
import NoMatch from '../pages/NoMatch/index'
import Welcome from '../pages/Welcome'
import { getRoutes } from '../utils/utils'
import { getMenuData } from '../common/menu'
import logo from '../assets/logo.png'
import { ssStorage } from '../utils/storage'
import conf from '../../public/project.json'

const { Header, Sider, Content } = Layout
const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
  },
}

export default class BasicLayout extends React.PureComponent {
    state = {
      collapsed: false,
      isMobile: false,
      allPath: []
    }
    static childContextTypes = {
      location: PropTypes.object
    }
    getChildContext() {
      const { location, routerData } = this.props
      return {
        location
      }
    }
    componentDidMount() {
      this.enquireHandler = enquireScreen(mobile => {
        this.setState({
          isMobile: mobile,
        })
      })
      this.getAllPath()
    }
    componentWillUnmount() {
      // 判断是否为手机
      unenquireScreen(this.enquireHandler)
    }
    getAllPath = () => {
      let menuList = ssStorage.getItem('menuList')
      let routerConfig = (menuList && divisionRouterList(menuList)) || {}
      let allPath = []
      Object.keys(routerConfig).forEach(key => {
        allPath.push(key)
      })
      this.setState({
        allPath
      })
    }
    getPageTitle() {
      const { routerData, location } = this.props
      const { pathname } = location
      let title = conf.moduleInfo.name
      if (routerData[pathname] && routerData[pathname].name) {
        title = `${routerData[pathname].name} - ${conf.moduleInfo.name}`
      }
      return title
    }

    handleMenuCollapse = () => {
      this.setState(prevState => ({ collapsed: !prevState.collapsed }))
    }
    handleNoticeClear = type => {
      message.success(`清空了${type}`)
    }
    handleMenuClick = ({ key }) => {
      if (key === 'triggerError') {
        this.props.history.push('/exception/trigger')
        return
      }
      if (key === 'logout') {
        ssStorage.clearAll()
        this.props.history.push('/user/login')
      }
    }
    handleNoticeVisibleChange = visible => {
    }
    toggle = () => {
      this.setState(prevState => ({ collapsed: !prevState.collapsed }))
    }
    checkRouterCache = () => {
      /**
       * 不经过tab栏点击关闭
       * 而是通过页面内跳转关闭页面
       * 的情况时 做路由缓存清除
       */
      // console.log('主模块缓存路由： ', getCachingKeys())
      let { waitingRemove } = window.baseHistory.tabsStore
      if (waitingRemove && waitingRemove.status) {
        let { pathname } = waitingRemove
        if (process.env.ENV_TYPE === 'micro' && getCachingKeys().indexOf(pathname) < 0) {
          let target = pathname.split('/')[1]
          let { stores } = window.baseGlobalStore
          console.log(`清除子模块${target}路由缓存： ${pathname}...`)
          if (stores[target] && stores[target].cacheRouter) {
            stores[target].cacheRouter.removeCacheRouter(pathname)
            stores[target].cacheRouter.setWaitRemove(pathname)
          }
        } else {
          // console.log(`清除主模块缓存路由： ${pathname}...`)
          dropByCacheKey(pathname)
          // console.log('清除后-主模块缓存路由： ', getCachingKeys())
        }
        window.baseHistory.tabsStore.updateWaitingRemove({})
      }
    }
    render() {
      setTimeout(() => {
        this.checkRouterCache()
      }, 1000)
      const {
        fetchingNotices,
        notices,
        routerData,
        match,
        location,
        history
      } = this.props
      const currentUser = {
        name: 'admin',
        avatar: 'https://www.shineyue.com',
        userid: '001',
        notifyCount: 12,
      }
      const { collapsed } = this.state
      const menus = getMenuData()
      const whiteUrl = [
        '/template'
      ]
      let curPath = this.props.location.pathname
      let hasPath = this.state.allPath.indexOf(curPath) > -1 || whiteUrl.indexOf(curPath) > -1
      console.log(`当前打开路径: ${curPath}, 是否存在: ${hasPath}`)
      const layout = (
        <Layout>
          <SiderMenu
            menuData={menus}
            collapsed={collapsed}
            location={location}
            onCollapse={this.handleMenuCollapse}
          />
          <Layout>
            <Header className='other-ele' style={{ padding: 0 }}>
              <GlobalHeader
                {...this.props}
                logo={logo}
                currentUser={currentUser}
                fetchingNotices={fetchingNotices}
                notices={notices}
                collapsed={collapsed}
                isMobile={this.state.isMobile}
                onNoticeClear={this.handleNoticeClear}
                onCollapse={this.handleMenuCollapse}
                onMenuClick={this.handleMenuClick}
                onNoticeVisibleChange={this.handleNoticeVisibleChange}
              />
            </Header>
            <TabsBar
              history={history}
              location={location}
            />
            <Content id='childModule' style={{ margin: '16px 16px', padding: 24, background: '#fff', minHeight: '100vh' }}>
              <CacheSwitch>
                {getRoutes(match.path, routerData).map(item => (
                  <CacheRoute key={item.key}
                    className={item.path}
                    cacheKey={item.path}
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                    when='always'
                  />
                ))}
                <Route exact path='/' component={Welcome} />
                {
                  !hasPath ? <Route history component={NoMatch} /> : ''
                }
              </CacheSwitch>
            </Content>
          </Layout>
        </Layout>
      )
      return (
        <DocumentTitle title={this.getPageTitle()}>
          <ContainerQuery query={query}>
            {params => <div className={classNames(params)}>{layout}</div>}
          </ContainerQuery>
        </DocumentTitle>
      )
    }
}
