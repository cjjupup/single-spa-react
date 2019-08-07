import React, { Component } from 'react'
import { Icon } from 'antd'
import { dropByCacheKey, getCachingKeys } from 'react-router-cache-route'
import classNames from 'classnames'
import { observer, inject } from 'mobx-react'
import _ from 'lodash'
import { ssStorage } from 'Util/storage'
// import tabItemStore from 'Src/mobxStore/tabsItem'
import style from './index.less'

let tabItemStore

@inject('globalStore')
@observer
export default class TabsBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }
  componentWillMount () {
    tabItemStore = window.baseHistory.tabsStore
    // 挂载前 初始化tabItems  从session取
    let tabItems = ssStorage.getItem('tabItems') || []
    tabItemStore.initTabItems(tabItems)
    // url直接跳转 激活对应tab
    // let curpath = this.props.location.pathname
    let curActiveTab = ssStorage.getItem('curActiveTab') || tabItemStore.curActiveTab
    tabItemStore.updateCurActiveTab(
      curActiveTab.path,
      curActiveTab.state
    )
    tabItemStore.activeItem(curActiveTab.path)
  }
  componentDidMount () {
    window.addEventListener('resize', _.debounce(() => {
      tabItemStore.initScrollOver()
      if (!tabItemStore.isOver) {
        this.handleScrollBarLeft()
      }
    }, 500))
  }
  componentWillReceiveProps(nextProps) {
    console.log(`to: ${nextProps.location.pathname}, from: ${this.props.location.pathname}`)
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.activeItem(nextProps.location.pathname)
    }
  }

  componentDidUpdate() {
    tabItemStore.initScrollOver()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', _.debounce(
      () => { tabItemStore.initScrollOver() }, 500
    ))
  }
  handleItemClick(e) {
    e = e || event
    e && e.persist()
    let { nodeName } = e.srcElement ? e.srcElement : e.target
    if (nodeName !== 'SPAN') {
      let target
      if (nodeName === 'I') target = e.target.parentNode
      if (nodeName === 'svg') target = e.target.parentNode && e.target.parentNode.parentNode
      if (nodeName === 'path') {
        target = e.target.parentNode &&
          e.target.parentNode.parentNode &&
          e.target.parentNode.parentNode.parentNode
      }
      let index = target.getAttribute('data-index')
      this.itemClose(index)
      return
    }
    let path = e.target.getAttribute('data-path')
    let name = e.target.textContent
    this.props.history.jump({
      path,
      name
    })
  }
  handleScrollBarLeft(e) {
    e && e.persist()
    let tabsBar = document.getElementById('tabsBar')
    if (tabsBar.style.transform !== '') {
      tabsBar.style.transform = ''
    }
  }
  handleScrollBarRight(e) {
    e && e.persist()
    let tabsBar = document.getElementById('tabsBar')
    if (tabsBar.style.transform === '') {
      tabsBar.style.transform = `translateX(-${tabItemStore.tabsScrollWidth}px)`
    }
  }
  // 激活某个tab
  activeItem(path) {
    tabItemStore.activeItem(path)
  }
  // 关闭全部tabs 未启用还没完善
  itemCloseAll() {
    // tabItemStore.closeAllTabs(path)
  }
  // 关闭某个tab
  itemClose(index) {
    /**
     * 由tab栏点击关闭页面 清除路由缓存
     */
    let tabItems = tabItemStore.tabItems.slice()
    let isActive = tabItems[index].actived
    let pathName = tabItems[index].path
    if (isActive) {
      let { path } = tabItems[index - 1]
      this.props.history.push(path)
    }
    tabItemStore.closeTab(pathName)
    // 清除缓存
    let curCacheRouters = getCachingKeys()
    dropByCacheKey(pathName)
    if (process.env.ENV_TYPE === 'micro' && curCacheRouters.indexOf(pathName) < 0) {
      // 非主模块缓存路由
      this.removeChildModuleCacheRouter(pathName)
    }
    // hack 刷新
    this.setState(prevState => ({
      count: prevState.count + 1
    }))
  }
  // 清除子模块路由缓存
  removeChildModuleCacheRouter (pathName) {
    let target = pathName.split('/')[1]
    let { stores } = this.props.globalStore
    if (stores[target] && stores[target].cacheRouter) {
      stores[target].cacheRouter.removeCacheRouter(pathName)
      stores[target].cacheRouter.setWaitRemove(pathName)
    }
  }

  render() {
    let tabItems = window.baseHistory.tabsStore.tabItems.slice()
    const { isOver } = tabItemStore
    let items = []
    tabItems.forEach((item, index) => {
      let a = (
        <span
          className={
            classNames(
              style.tabsItem,
              { [style.basic]: item.isBasic },
              { [style.active]: item.actived }
            )
          }
          key={item.path}
          data-index={index}
          data-path={item.path}
          onClick={this.handleItemClick.bind(this)}
        >
          {item.name}
          <Icon type='close' className={style.itemClose} />
        </span>
      )
      items.push(a)
    })
    const scrollBarLeft = (
      <div className={style.scrollBarLeft}
        onClick={this.handleScrollBarLeft.bind(this)}
      >
        <Icon type='left' />
      </div>
    )
    const scrollBarRight = (
      <div className={style.scrollBarRight}
        onClick={this.handleScrollBarRight.bind(this)}
      >
        <Icon type='right' />
      </div>
    )
    let { count } = this.state
    return (
      <div className={classNames(style.scrollBar, { [style.isOver]: isOver }, 'other-ele')} id='tabsCon'>
        {isOver ? scrollBarLeft : '' }
        <div className={style.tabsBar} id='tabsBar'>
          {items}
        </div>
        {isOver ? scrollBarRight : '' }
        <div style={{ display: 'none' }}>{count}</div>
      </div>
    )
  }
}
