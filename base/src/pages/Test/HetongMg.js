import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Divider, Button, Icon } from 'antd'
import 'braft-editor/dist/output.css'
import strHTMLData from './strHTML'
import style from './print.less'

const ButtonGroup = Button.Group

@observer
export default class HeTongEditorPage extends Component {
  state = {
    isChecking: false
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.key !== this.props.location.key) {
      console.log('刷新')
    }
  }
  testAdd = () => {
    // 新增逻辑
    this.props.history.jump({
      path: '/baseModule/test/test-editor',
      name: '合同编辑',
      state: {}
    })
  }
  testEditor = () => {
    // 编辑逻辑 带上合同模块id 获取已有模板数据
    this.props.history.jump({
      path: '/baseModule/test/test-editor',
      name: '合同编辑',
      state: {
        id: 9527
      }
    })
  }
  testCheck = () => {
    // 预览逻辑
    this.setState({
      isChecking: true
    })
  }
  testCopy = () => {
    // 打印逻辑
    window.print()
  }
  testBack = () => {
    // 预览返回
    this.setState({
      isChecking: false
    })
  }
  render() {
    const { isChecking } = this.state
    return (
      <div className='hetong-page'>
        <div className={`${isChecking ? style['print-hidden'] : ''} other-ele`}>
          合同模板新增、编辑、预览、打印测试
          <Divider />
          <ButtonGroup>
            <Button type='primary' onClick={this.testAdd}>
              <Icon type='plus' />
            新增
            </Button>
            <Button type='primary' onClick={this.testEditor}>
              <Icon type='edit' />
            编辑
            </Button>
            <Button type='primary' onClick={this.testCheck}>
              <Icon type='eye' />
            预览
            </Button>
            <Button type='primary' onClick={this.testCopy}>
              <Icon type='copy' />
            打印
            </Button>
          </ButtonGroup>
          <Divider />
        </div>
        <div className={isChecking ? style['print-page'] : style['print-hidden']}>
          <div className={`${style.toolbar} other-ele`}>
            <ButtonGroup>
              <Button type='primary' onClick={this.testBack}>
                <Icon type='back' />
                返回
              </Button>
              <Button type='primary' onClick={this.testCopy}>
                <Icon type='copy' />
                打印
              </Button>
            </ButtonGroup>
          </div>
          <div className={style['view-area']}>
            {
              isChecking
                ? <div className='braft-output-content' dangerouslySetInnerHTML={{ __html: strHTMLData }}></div>
                : ''
            }
          </div>
        </div>
      </div>
    )
  }
}
