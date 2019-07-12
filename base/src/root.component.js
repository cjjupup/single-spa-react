import React from 'react'
import { Provider, observer } from 'mobx-react'
import { Route, Router, Switch } from 'react-router-dom'
import PrivateRoute from 'Src/common/privateRoute'
import { LocaleProvider } from 'antd'
import zhCNAnt from 'antd/lib/locale-provider/zh_CN'
import enUSAnt from 'antd/lib/locale-provider/en_US'
import { IntlProvider, addLocaleData } from 'react-intl'
import zhCN from 'Src/locale/zhCN'
import enUS from 'Src/locale/enUS'
import en from 'react-intl/locale-data/en'
import zh from 'react-intl/locale-data/zh'
import UserLayout from './layouts/UserLayout'
import BasicLayout from './layouts/BasicLayout'

addLocaleData([...en, ...zh])
const langMap = {
  zh: zhCN,
  en: enUS
}
@observer
export default class RootComponent extends React.Component {
  componentDidCatch(error, info) {
    console.log(error, info)
  }
  render() {
    // 将主模块路由history植入全局  子模块路由拉取
    this.props.globalEventDistributor.history = this.props.history
    window.baseHistory = this.props.history
    // console.log(this.props)
    let globalStore = this.props.globalEventDistributor.stores
    window.baseGlobalStore = globalStore
    // 从全局配置获取主模块的语言
    let locale = globalStore.shineyueProBase
      ? globalStore.shineyueProBase.controlStore.langConfig.locale
      : this.props.store.controlStore.langConfig.locale
    let ret = <div></div>
    if (this.props.globalEventDistributor && this.props.history) {
      ret = (
        <Provider rootStore={this.props.store} globalStore={globalStore}>
          <Router history={this.props.history}>
            <Switch>
              <Route path='/user' render={props => <UserLayout {...props} />} />
              <PrivateRoute path='/' {...this.props} component={BasicLayout} globalEventDistributor={this.props.globalEventDistributor} />
            </Switch>
          </Router>
        </Provider>
      )
    }
    return <IntlProvider locale={locale} messages={langMap[locale]}><LocaleProvider local={locale === 'zh' ? zhCNAnt : enUSAnt}>{ret}</LocaleProvider></IntlProvider>
  }
}
