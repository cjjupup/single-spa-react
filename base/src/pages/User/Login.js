import React, { Component } from 'react'
import { Link, BrowserRouter } from 'react-router-dom'
import { Checkbox, Alert, Icon } from 'antd'
import { observer, inject } from 'mobx-react'
import Login from 'Components/Login'
import userStore from 'Src/mobxStore/userStore'
import controlStore from 'Src/mobxStore/controlStore'
import axios from 'Util/request'
import style from './Login.less'

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login

@observer
export default class LoginPage extends Component {
  handleSubmit = async (err, values) => {
    if (!err) {
      if (userStore.loginType === 'account') await userStore.userNameLogin(values)
      if (userStore.loginType === 'mobile') await userStore.userTelnumLogin(values)
      if (userStore.logined) {
        // 登录成功后请求菜单列表
        await controlStore.getMenuList()
        this.props.history.push('/')
      }
    }
  };
  renderMessage = content => <Alert style={{ marginBottom: 24 }} message={content} type='error' showIcon />;

  render() {
    return (
      <div className={style.mainlogin}>
        <Login
          defaultActiveKey={userStore.loginType}
          onTabChange={userStore.changeLoginType}
          onSubmit={this.handleSubmit}
        >
          <Tab key='account' tab='账户密码登录'>
            {userStore.loginStatus === 'error' &&
              userStore.loginType === 'account' &&
              !userStore.loading &&
              this.renderMessage('账户或密码错误（admin/123456）')}
            <UserName name='userName' placeholder='admin' />
            <Password name='passWord' placeholder='123456' />
          </Tab>
          <Tab key='mobile' tab='手机号登录'>
            {userStore.loginStatus === 'error' &&
              userStore.loginType === 'mobile' &&
              !userStore.loading &&
              this.renderMessage('手机或验证码错误（13411111111/666666）')}
            <Mobile name='telNum' placeholder='13411111111' />
            <Captcha name='msgCode' placeholder='666666' />
          </Tab>
          <div>
            <Checkbox checked={userStore.autoLogin} onChange={userStore.toggleAutoLogin}>
              自动登录
            </Checkbox>
            <a style={{ float: 'right' }} href=''>
              忘记密码
            </a>
          </div>
          <Submit loading={userStore.loading}>登录</Submit>
          <div className={style.other}>
            {/* 其他登录方式
            <Icon className='icon' type='alipay-circle' />
            <Icon className='icon' type='taobao-circle' />
            <Icon className='icon' type='weibo-circle' /> */}
            <Link className={style.register} to='/user/register'>
              注册账户
            </Link>
          </div>
        </Login>
      </div>
    )
  }
}
