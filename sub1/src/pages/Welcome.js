import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

// @inject('rootStore')
@observer
class WelComePage extends Component {
  render() {
    return (
      <div className='menu-page'>
        <h2>欢迎使用本系统</h2>
      </div>
    )
  }
}
export default WelComePage
