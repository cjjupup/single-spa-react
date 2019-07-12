import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import CacheRoute, { CacheSwitch, dropByCacheKey, getCachingKeys } from 'react-router-cache-route'
import { ContainerQuery } from 'react-container-query'
import DocumentTitle from 'react-document-title'
import classNames from 'classnames'
import SiderMenu from 'Components/SiderMenu/'
import GlobalHeader from 'Components/GlobalHeader'
import TabsBar from 'Components/TabsBar'
import { enquireScreen, unenquireScreen } from 'enquire-js'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'
import logo from '../assets/logo.png'
import WelCome from '../pages/Welcome'
import { getMenuData } from '../common/menu'
import { getRoutes, getRoutesExtension } from '../utils/utils'
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
@inject('globalStore')
@observer
export default class BasicLayout extends Component {
  state = {
    collapsed: false,
    isMobile: false
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
  }
  componentDidUpdate() {
    if (process.env.ENV_TYPE === 'micro') {
      this.checkCacheRouter()
    }
  }
  componentWillUnmount() {
    // 判断是否为手机
    unenquireScreen(this.enquireHandler)
  }
  getPageTitle() {
    const { routerData, location } = this.props
    const { pathname } = location
    let title = '神玥子系统'
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - 神玥子系统`
    }
    return title
  }
  handleMenuCollapse = collapsed => {
    this.setState({
      collapsed: prevState => ({ collapsed: !prevState.collapsed })
    })
  }

  handleMenuClick = ({ key }) => {
    if (key === 'triggerError') {
      this.props.history.push('/exception/trigger')
      return
    }
    if (key === 'logout') {
      ssStorage.removeItem('tokenId')
      ssStorage.removeItem('menuList')
      ssStorage.removeItem('tabItems')
      this.props.history.push('/user/login')
    }
  }
  checkCacheRouter () {
    setTimeout(() => {
      console.log('准备清除： ', this.props.globalStore[conf.name].cacheRouter.waitRemove.slice())
      if (this.props.globalStore[conf.name].cacheRouter.waitRemove.slice().length === 0) {
        console.log('新增缓存路由')
        setTimeout(() => {
          console.log('更新后sub1缓存路由： ', getCachingKeys())
          // 更新全局储存缓存
          this.props.globalStore[conf.name].cacheRouter.updateCacheRouter(getCachingKeys())
        }, 50)
      } else {
        // 删除缓存路由
        console.log('删除缓存路由')
        // 清除缓存
        this.props.globalStore[conf.name].cacheRouter.waitRemove.slice().forEach(item => {
          dropByCacheKey(item)
        })
        // 重置 CacheRouteStore.waitRemove
        // 更新全局储存缓存
        setTimeout(() => {
          this.props.globalStore[conf.name].cacheRouter.resetWaitRemove()
          console.log('清除后sub1缓存路由： ', getCachingKeys())
          this.props.globalStore[conf.name].cacheRouter.updateCacheRouter(getCachingKeys())
        }, 100)
      }
    }, 1000)
  }
  render() {
    const {
      fetchingNotices,
      notices,
      routerData,
      match,
      location,
      history,
    } = this.props
    const currentUser = {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      notifyCount: 12,
    }
    const { collapsed } = this.state

    let RouterSwitch = (
      <CacheSwitch>
        {getRoutes(match.path, routerData).map(item => (
          <CacheRoute key={item.key}
            className={item.path}
            cacheKey={item.path}
            path={item.path}
            render={props => {
              let Item = item.component
              return (
                <Item
                  {...props}
                  routerData={routerData}
                  globalEventDistributor={this.props.globalEventDistributor}
                />
              )
            }}
            exact={item.exact}
            when='always'
          />
        ))}
        {process.env.ENV_TYPE !== 'micro' && <CacheRoute cacheKey='/' component={WelCome} />}
      </CacheSwitch>
    )
    let layout = RouterSwitch
    // 开发模式or独立打包 即非微服务 显示菜单
    if (process.env.ENV_TYPE !== 'micro') {
      layout = (
        <Layout>
          <SiderMenu
            menuData={getMenuData()}
            collapsed={collapsed}
            location={location}
            onCollapse={this.handleMenuCollapse}
          />
          <Layout>
            <Header style={{ padding: 0 }}>
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
            <Content style={{ margin: '16px 16px', padding: 24, minHeight: '100vh', backgroundColor: '#fff' }}>
              {RouterSwitch}
            </Content>
          </Layout>
        </Layout>
      )
    }

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <ContainerQuery query={query}>
          {params => {
            return (
              <div className={classNames(params)}>
                {layout}
              </div>
            )
          }}
        </ContainerQuery>
      </DocumentTitle>
    )
  }
}
