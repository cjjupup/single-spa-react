import React, { Component } from 'react'
import { Checkbox, Alert, Icon, Button } from 'antd'
import { observer, inject } from 'mobx-react'
import Login from 'Components/Login'
import { injectIntl, FormattedMessage, FormattedDate, FormattedNumber } from 'react-intl'
// import './Menu.less'
import userStore from 'Src/mobxStore/userStore'
import controlStore from 'Src/mobxStore/controlStore'

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login

// @inject('rootStore')
@observer
class WelComePage extends Component {
  testjump = () => {
    this.props.history.jump({
      path: '/abcdefg'
    })
  }
  render() {
    const { intl } = this.props
    let text1 = intl.formatMessage({ id: 'intl.NETWORK_ERROR' })
    let text2 = intl.formatMessage({ id: 'intl.NAME' }, { name: '神钥' })
    return (
      <div className='menu-page'>
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
