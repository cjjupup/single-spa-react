
import React from 'react'
import { Provider, observer } from 'mobx-react'
import { Route, Router, Switch } from 'react-router-dom'
import PrivateRoute from 'Src/common/privateRoute'

import { LocaleProvider } from 'antd'
import zhCNAnt from 'antd/lib/locale-provider/zh_CN'
import enUSAnt from 'antd/lib/locale-provider/en_US'
import { IntlProvider, addLocaleData, injectIntl } from 'react-intl'
import zhCN from 'Src/locale/zhCN'
import enUS from 'Src/locale/enUS'
import en from 'react-intl/locale-data/en'
import zh from 'react-intl/locale-data/zh'
import BasicLayout from './layouts/BasicLayout'
import UserLayout from './layouts/UserLayout'

addLocaleData([...en, ...zh])
const langMap = {
  zh: zhCN,
  en: enUS
}

@observer
export default class RootComponent extends React.Component {
  componentDidMount() {
    // 挂载供外界调度模块的方法
    window.getSubModuleTest1DynamicComponent = async name => {
      let component = null
      component = await import(`./components/dynamic/${name}`)
      return component[name]
    }
  }
  componentDidCatch(error, info) {
    console.log(error, info)
  }
  render() {
    let ret = <div></div>
    let globalStore = this.props.globalEventDistributor.stores
    // 从全局配置获取主模块的语言
    let locale = globalStore.shineyueProBase
      ? globalStore.shineyueProBase.controlStore.langConfig.locale
      : this.props.store.controlStore.langConfig.locale

    if (this.props.history && this.props.globalEventDistributor) {
      // 独立开发部署 即非接入微服务状态
      if (process.env.ENV_TYPE !== 'micro') {
        ret = (
          <Provider rootStore={this.props.store} globalStore={globalStore}>
            <Router history={this.props.history}>
              <Switch>
                <Route path='/user' render={props => <UserLayout {...props} />} />
                <PrivateRoute
                  path='/'
                  {...this.props}
                  component={BasicLayout}
                  globalEventDistributor={this.props.globalEventDistributor}
                />
              </Switch>
            </Router>
          </Provider>
        )
      } else {
        // 接入微服务
        ret = (
          <Provider rootStore={this.props.store} globalStore={globalStore}>
            <Router history={this.props.history}>
              <Switch>
                <PrivateRoute
                  component={BasicLayout}
                  globalEventDistributor={this.props.globalEventDistributor}
                />
              </Switch>
            </Router>
          </Provider>
        )
      }
    }

    // 国际化组件包裹所有组件
    return <IntlProvider locale={locale} messages={langMap[locale]}><LocaleProvider local={locale === 'zh' ? zhCNAnt : enUSAnt}>{ret}</LocaleProvider></IntlProvider>
  }
}
