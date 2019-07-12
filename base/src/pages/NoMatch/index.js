import React, { Component } from 'react'
import { Divider, Icon, Button } from 'antd'
import { observer, inject } from 'mobx-react'

@observer
class NoMatch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 3
    }
  }
  componentDidMount() {
    console.log(this.props.location)
    console.log(this.props.history)
    this.countDown = setInterval(() => {
      this.setState(prevState => ({ count: prevState.count - 1 }), () => {
        if (this.state.count === 0) {
          clearInterval(this.countDown)
          this.goBack()
        }
      })
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.countDown)
  }
  goBack = () => {
    let curPath = this.props.location.pathname
    console.log(this.props.history)
    this.props.history.closeJump({
      curPath,
      toPath: '/',
      name: '主页',
      state: {}
    })
  }
  render() {
    const { count } = this.state
    return (
      <div className='nomatch-page'>
        页面路径资源不存在，请检查是否引入对应模块资源
        <Divider />
        {count}
        秒回将自动返回 OR
        <Button type='primary' onClick={this.goBack}>
          <Icon type='left' />
          返回主页
        </Button>
      </div>
    )
  }
}
export default NoMatch
