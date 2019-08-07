
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
import BasicLayout from './layouts/BasicLayout'
import UserLayout from './layouts/UserLayout'
import conf from '../public/project.json'

addLocaleData([...en, ...zh])
const langMap = {
  zh: zhCN,
  en: enUS
}

@observer
export default class RootComponent extends React.Component {
  componentDidMount() {
    // 挂载
  }
  componentDidCatch(error, info) {
    console.log(error, info)
  }
  render() {
    let ret
    let { history, store, globalStore } = this.props
    // 从全局配置获取主模块的语言
    let locale = globalStore.stores
      ? globalStore.stores.baseModule.localeStore.langConfig.locale
      : this.props.store.localeStore.langConfig.locale
    let waitRemove = globalStore.stores[conf.name]
      ? globalStore.stores[conf.name].cacheRouter.waitRemove.slice()
      : globalStore.cacheRouter.waitRemove.slice()
    if (this.props.history && this.props.globalStore) {
      // 独立开发部署 即非接入微服务状态
      if (process.env.ENV_TYPE !== 'micro') {
        ret = (
          <Switch>
            <Route path='/user' render={props => <UserLayout {...props} />} />
            <PrivateRoute
              path='/'
              {...this.props}
              component={BasicLayout}
            />
          </Switch>
        )
      } else {
        // 接入微服务
        ret = (
          <Switch>
            <PrivateRoute
              component={BasicLayout}
            />
          </Switch>
        )
      }
    }

    // 国际化组件包裹所有组件
    return (
      <IntlProvider
        locale={locale}
        messages={langMap[locale]}
      >
        <LocaleProvider
          local={locale === 'zh' ? zhCNAnt : enUSAnt}
        >
          <Provider rootStore={store} globalStore={globalStore}>
            <Router history={history}>
              {ret}
            </Router>
          </Provider>
        </LocaleProvider>
      </IntlProvider>
    )
  }
}
