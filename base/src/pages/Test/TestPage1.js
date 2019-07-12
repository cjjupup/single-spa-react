import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
// import './Menu.less'
import userStore from 'Src/mobxStore/userStore'
import controlStore from 'Src/mobxStore/controlStore'

// @inject('rootStore')
@observer
export default class MenuPage extends Component {
  render() {
    return (
      <div className='menu-page'>
        测试页面一
      </div>
    )
  }
}
