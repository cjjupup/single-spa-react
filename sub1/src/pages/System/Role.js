import React, { Component } from 'react'
import { Input, Button, Divider } from 'antd'
import { observer, inject } from 'mobx-react'

@inject('globalStore')
@observer
export default class RolePage extends Component {
  closeJumpFunc = () => {
    let curPath = this.props.location.pathname
    this.props.history.closeJump({
      curPath,
      toPath: '/baseModule/system/role',
      name: '主页',
      state: {}
    })
  }
  closeJumpFunc2 = () => {
    let curPath = this.props.location.pathname
    this.props.history.closeJump({
      curPath,
      toPath: '/subModuleTest1/system/user',
      name: '用户管理',
      state: {}
    })
  }
  jumpFunc3 = () => {
    this.props.history.jump({
      path: '/subModuleTest1/system/user',
      name: '用户管理',
      state: {
        tt: 55,
        yy: 66
      }
    })
  }
  render() {
    // const UserPage = this.props.globalStore.common.UserPage
    return (
      <div className='role-page'>
        子系统 角色管理页面
        <Input placeholder='Basic usage' />
        <Divider />
        <Button type='primary' onClick={this.closeJumpFunc}>
          关闭当前子模块页面 带参返回主模块 角色管理
        </Button>
        <Divider />
        <Button type='primary' onClick={this.closeJumpFunc2}>
          关闭当前子模块页面 跳转子模块 用户管理
        </Button>
        <Divider />
        <Button type='primary' onClick={this.jumpFunc3}>
          带参跳转子模块 用户管理
        </Button>
      </div>
    )
  }
}
