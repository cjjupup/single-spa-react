import { observable, action } from 'mobx'

class Store {
  @observable langConfig={
    locale: 'zh'
  }

  @action.bound changeLang = (param = '') => {
    this.langConfig.locale = param
  }
}

export default new Store()
