import React, { Fragment } from 'react'
import { Link, Redirect, Switch, Route } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import { Icon } from 'antd'
import asyncComponent from 'Common/asyncComponent'
import style from './UserLayout.less'

const Login = asyncComponent(() => import('../pages/User/Login'))
const Register = asyncComponent(() => import('../pages/User/Register'))
const RegisterResult = asyncComponent(() => import('../pages/User/RegisterResult'))

const copyright = (
  <Fragment>
    Copyright
    <Icon type='copyright' />
    2019 神玥软件研究院出品
  </Fragment>
)

class UserLayout extends React.PureComponent {
  getPageTitle() {
    const { location } = this.props
    const { pathname } = location
    let title = 'shineyue-base'
    let userList = {
      '/user/login': '登录',
      '/user/register': '注册',
      '/user/register-result': '注册结果'
    }
    if (userList[pathname]) {
      title = `${userList[pathname]} - shineyue-base`
    }
    return title
  }
  render() {
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={`${style.container} ${style['user-layout']}`}>
          <div className={style.content}>
            <div className={style.top}>
              <div className={style.header}>
                <Link to='/'>
                  <span className={style.title}>Shineyue Pro</span>
                </Link>
              </div>
              <div className={style.desc}>Shineyue Pro 具影响力的 Web 设计规范</div>
            </div>
            <Switch>
              <Route exact path='/user/login' render={props => <Login {...props} />} />
              <Route exact path='/user/register' render={props => <Register {...props} />} />
              <Route exact path='/user/register-result' render={props => <RegisterResult {...props} />} />
              <Redirect exact from='/user' to='/user/login' />
            </Switch>
          </div>
          <div className={style.copyright}>{copyright}</div>
        </div>
      </DocumentTitle>
    )
  }
}

export default UserLayout
