import React, { Component } from 'react'
import { Input, Button, Divider } from 'antd'
import { observer, inject } from 'mobx-react'

@inject('globalStore')
@observer
export default class MenuPage extends Component {
  closeJumpFunc = () => {
    let curPath = this.props.location.pathname
    this.props.history.closeJump({
      curPath,
      toPath: '/',
      name: '主页',
      state: {}
    })
  }
  closeJumpFunc2 = () => {
    let curPath = this.props.location.pathname
    this.props.history.closeJump({
      curPath,
      toPath: '/baseModule/system/menu',
      name: '菜单管理',
      state: {}
    })
  }
  closeJumpFunc3 = () => {
    let curPath = this.props.location.pathname
    this.props.history.closeJump({
      curPath,
      toPath: '/baseModule/system/menu',
      name: '菜单管理',
      state: {
        q: 11,
        w: 22
      }
    })
  }
  closeJumpFunc4 = () => {
    let curPath = this.props.location.pathname
    this.props.history.closeJump({
      curPath,
      toPath: '/subModuleTest1/system/role',
      name: '角色管理',
      state: {}
    })
  }
  closeJumpFunc5 = () => {
    let curPath = this.props.location.pathname
    this.props.history.closeJump({
      curPath,
      toPath: '/subModuleTest1/system/role',
      name: '角色管理',
      state: {
        e: 33,
        r: 44
      }
    })
  }
  render() {
    // const UserPage = this.props.globalStore.common.UserPage
    return (
      <div className='menu-page'>
        子系统 菜单管理页面
        <Input placeholder='Basic usage' />
        <Divider />
        <Button type='primary' onClick={this.closeJumpFunc}>
          关闭当前子模块页面 返回主模块主页
        </Button>
        <Divider />
        <Button type='primary' onClick={this.closeJumpFunc2}>
          关闭当前子模块页面 返回主模块 菜单管理
        </Button>
        <Divider />
        <Button type='primary' onClick={this.closeJumpFunc3}>
          关闭当前子模块页面 带参返回主模块 菜单管理
        </Button>
        <Divider />
        <Button type='primary' onClick={this.closeJumpFunc4}>
          关闭当前子模块页面 跳转子模块 角色管理
        </Button>
        <Divider />
        <Button type='primary' onClick={this.closeJumpFunc5}>
          关闭当前子模块页面 带参跳转子模块 角色管理
        </Button>
      </div>
    )
  }
}
