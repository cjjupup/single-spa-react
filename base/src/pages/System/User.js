import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Button, Divider } from 'antd'

// @inject('rootStore')
@observer
export default class UerPage extends Component {
  jumpfunc = () => {
    let curPath = window.location.pathname
    this.props.history.closeJump({
      curPath,
      toPath: '/baseModule/system/role',
      name: '角色管理'
    })
  }
  jumpfunc2 = () => {
    let curPath = window.location.pathname
    this.props.history.closeJump({
      curPath,
      toPath: '/baseModule/system/role',
      name: '角色管理',
      state: {
        eee: 5,
        fff: 6
      }
    })
  }
  jumpfunc3 = () => {
    let curPath = window.location.pathname
    this.props.history.closeJump({
      curPath,
      toPath: '/baseModule/system/menu',
      name: '角色管理',
      state: {
        ggg: 7,
        hhh: 8
      }
    })
  }
  jumpfunc4 = () => {
    let curPath = window.location.pathname
    this.props.history.closeJump({
      curPath,
      toPath: '/subModuleTest1/system/menu',
      name: '菜单管理',
      state: {
        ggg: 666,
        hhh: 777
      }
    })
  }
  render() {
    return (
      <div className='role-page'>
        用户管理页面
        <Divider />
        <Button onClick={this.jumpfunc}>
          关闭当前tab页 并跳转角色管理页面
        </Button>
        <Divider />
        <Button onClick={this.jumpfunc2}>
          关闭当前tab页 并带参跳转角色管理页面
        </Button>
        <Divider />
        <Button onClick={this.jumpfunc3}>
          关闭当前tab页 并带参跳转菜单管理页面
        </Button>
        <Button onClick={this.jumpfunc4}>
          打开子模块 菜单管理页
        </Button>
      </div>
    )
  }
}
