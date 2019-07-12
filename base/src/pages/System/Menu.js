import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Button, Icon, Input } from 'antd'

// @inject('rootStore')
@observer
export default class MenuPage extends Component {
  jumpfunc = () => {
    this.props.history.jump({
      path: '/baseModule/system/role',
      name: '角色管理',
      state: {
        aaa: 1,
        bbb: 2
      }
    })
  }
  jumpfunc2 = () => {
    this.props.history.jump({
      path: '/baseModule/system/role',
      name: '角色管理',
      state: {
        ccc: 3,
        ddd: 4
      }
    })
  }
  render() {
    return (
      <div className='menu-page'>
        <Input placeholder='Basic usage' placeholder='请输入' />
        菜单管理页面
        <Button onClick={this.jumpfunc}>
          <Icon type='upload ' />
          带参A跳转页面
        </Button>
        <Button onClick={this.jumpfunc2}>
          <Icon type='upload ' />
          带参B跳转页面
        </Button>
      </div>
    )
  }
}
