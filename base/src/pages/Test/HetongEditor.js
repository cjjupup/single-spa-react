import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import { Divider, Button, Select, Row, Icon } from 'antd'
import { ssStorage } from 'Util/storage'
import strHTMLData from './strHTML'

const { Option } = Select
const ButtonGroup = Button.Group

@observer
export default class HeTongEditorPage extends Component {
  state = {
    editorState: BraftEditor.createEditorState(null),
    strHTML: '',
    variableList: [
      { id: 1, label: 'aaa', value: 'aaa' },
      { id: 2, label: 'bbb', value: 'bbb' },
      { id: 3, label: 'ccc', value: 'ccc' },
      { id: 4, label: 'ddd', value: 'ddd' },
      { id: 5, label: 'eee', value: 'eee' },
    ]
  }
  componentDidMount() {
    this.initData()
  }
  initData = () => {
    // 初始化
    let curActiveTab = ssStorage.getItem('curActiveTab')
    let { state } = curActiveTab
    let { id } = state
    if (id) {
      // 存在ID 则为编辑 要请求已有数据
      console.log('编辑')
      let strHTML = strHTMLData
      this.setState({
        editorState: BraftEditor.createEditorState(strHTML)
      })
    } else {
      // 新建编辑模板
      console.log('新建')
    }
  }
  handleChange = editorState => {
    this.setState({
      editorState,
      strHTML: editorState.toHTML()
    })
  }
  handleSave = () => {
    // 保存逻辑
    let strHTML = this.state.editorState.toHTML()
    console.log(strHTML)
  }
  handleCancel = () => {
    // 取消逻辑
    let curPath = this.props.location.pathname
    this.props.history.closeJump({
      curPath,
      toPath: '/baseModule/test/test-mg',
      name: '合同模板管理',
      state: { updata: true }
    })
  }
  selOnChange = val => {
    console.log(val)
  }
  selOnFocus = () => {

  }
  selOnBlur = () => {

  }
  selOnSearch = val => {
    console.log(val)
  }
  render() {
    const { editorState, strHTML } = this.state
    const excludeControls = ['text-color', 'emoji', 'media']
    // const extendControls = [
    //   'separator',
    //   {
    //     key: 'my-button', // 控件唯一标识，必传
    //     type: 'button',
    //     title: '这是一个自定义的按钮', // 指定鼠标悬停提示文案
    //     className: 'my-button', // 指定按钮的样式名
    //     html: null, // 指定在按钮中渲染的html字符串
    //     text: 'Hello', // 指定按钮文字，此处可传入jsx，若已指定html，则text不会显示
    //     onClick: () => {
    //       console.log('Hello World!')
    //     },
    //   }
    // ]
    const { variableList } = this.state
    const SelectComponent = () => (
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder='变量集合'
        optionFilterProp='children'
        onChange={this.selOnChange}
        onFocus={this.selOnFocus}
        onBlur={this.selOnBlur}
        onSearch={this.selOnSearch}
        filterOption={
          (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {
          variableList.map(item => {
            return <Option value={item.value} key={item.id}>{item.label}</Option>
          })
        }
      </Select>
    )
    const extendControls = [
      'separator',
      {
        key: 'my-dropdown',
        type: 'dropdown',
        title: '变量集合', // 指定鼠标悬停提示文案
        className: 'my-dropdown', // 指定下拉组件容器的样式名
        html: null, // 指定在按钮中渲染的html字符串
        text: 'Variable', // 指定按钮文字，此处可传入jsx，若已指定html，则text不会显示
        showArrow: true, // 指定是否显示下拉组件顶部的小三角形
        arrowActive: false, // 指定是否高亮下拉组件顶部的小三角形
        autoHide: true, // 指定是否在失去焦点时自动隐藏下拉组件
        component: <SelectComponent />, // 指定在下拉组件中显示的内容组件
      }
    ]
    return (
      <div className='hetong-page'>
        <ButtonGroup>
          <Button type='primary' onClick={this.handleSave}>
            <Icon type='save' />
            保存
          </Button>
          <Button type='primary' onClick={this.handleCancel}>
            <Icon type='close' />
            取消
          </Button>
        </ButtonGroup>
        <Divider />
        <BraftEditor
          excludeControls={excludeControls}
          extendControls={extendControls}
          value={editorState}
          onChange={this.handleChange}
          onSave={this.handleSave}
        />
      </div>
    )
  }
}
