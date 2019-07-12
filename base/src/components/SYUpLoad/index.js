import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { message, Upload, Button, Icon } from 'antd'
import classNames from 'classnames'
import { observer } from 'mobx-react'
import upLoadStore from './store'
import style from './style.less'

@observer
class SYUpLoad extends Component {
  // 定义默认props
  static defaultProps = {
    accept: '', // 文件类型 默认为空 不做类型限制
    listType: 'text', // 样式类型 text pic pic-card
    name: 'file', // 后台接收文件名
    multiple: false, // 支持多选
    directory: false, // 支持上传文件夹
    headers: {}, // 额外设置请求头
    numLimit: 0, // 文件数量限制 默认为0 不做限制
    sizeLimit: 0, // 单文件大小限制 默认为0 不做限制
    defaultFiles: [], // 初始文件列表
    onMount: () => {}, // 挂载函数
  }
  static propTypes = {
    accept: PropTypes.string,
    listType: PropTypes.string,
    name: PropTypes.string,
    multiple: PropTypes.bool,
    directory: PropTypes.bool,
    headers: PropTypes.object,
    numLimit: PropTypes.number,
    sizeLimit: PropTypes.number,
    defaultFiles: PropTypes.array,
    onMount: PropTypes.func,
  }
  componentDidMount() {
    const { defaultFiles } = this.props
    upLoadStore.initFileList(defaultFiles)
    this.props.onMount(upLoadStore)
  }
  beforeUpload = file => {
    console.log(file)
    console.log('beforeUpload: ', file)
    return false
  }
  checkSize = file => {
    // 单文件大小校验
    const { sizeLimit } = this.props
    // 为0 不做限制
    if (sizeLimit === 0) return true
    if (file.size > sizeLimit) {
      // 单个文件大小超出限制
      message.error('文件选取失败，单文件大小限制XXX')
      return false
    }
    return true
  }
  checkNum = fileList => {
    // 文件数量校验
    const { numLimit } = this.props
    // 为0 不做限制
    if (numLimit === 0) return true
    if (fileList.length > numLimit) {
      // 数量超过限制 删除新加的文件
      message.error(`文件数量超出限制，上限${numLimit}`)
      return false
    }
    return true
  }
  checkType = file => {
    // 文件类型校验
    const { accept } = this.props
    // 为空 不做限制
    if (accept === '') return true
    let type = file.name.split('.')[1]
    if (accept.indexOf(type) < 0) {
      // 文件类型不符
      message.error(`文件类型错误`)
      return false
    }
    return true
  }
  onChange = ({ file, fileList }) => {
    // 各种校验 大小数量类型等
    if (!this.checkSize(file)) fileList.pop()
    if (!this.checkNum(fileList)) fileList.pop()
    if (!this.checkType(file)) fileList.pop()
    if (file.status !== 'uploading') {
      upLoadStore.updataFile(fileList)
      console.log(upLoadStore.fileList.slice())
    }
  }
  onRemove = file => {
    const { deleteApi, xzqhbm } = this.props
    if (file.percent === 0) {
      upLoadStore.deleteFile(file, deleteApi, xzqhbm)
      return true
    }
    return false
  }
  onPreview= file => {
    console.log('check file:', file)
  }
  render() {
    const { defaultFiles, classname, ...rest } = this.props
    const fileslist = [...upLoadStore.fileList.slice()]
    const { hackUpdataCount } = upLoadStore
    console.log(upLoadStore.fileList.slice())
    console.log(rest)
    return (
      <div className={classNames(classname, style.test)}>
        <Upload
          {...rest}
          beforeUpload={this.beforeUpload}
          onPreview={this.onPreview}
          onChange={this.onChange}
          onRemove={this.onRemove}
          fileList={fileslist}
        >
          <Button>
            <Icon type='upload ' />
            选择文件
          </Button>
        </Upload>
        <div style={{ display: 'none' }}>{hackUpdataCount}</div>
      </div>
    )
  }
}

export default SYUpLoad
