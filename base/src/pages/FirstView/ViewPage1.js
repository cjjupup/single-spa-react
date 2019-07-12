import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Divider, Button, Modal } from 'antd'
import DynamicComponent from 'Components/DynamicComponent/index'
import SYUpLoad from 'Components/SYUpLoad/index'
import { post } from 'Util/request'
// import './Menu.less'

@inject('globalStore')
@observer
export default class ViewPage extends Component {
  state = {
    visible: false
  }
  showModal = () => {
    this.setState({
      visible: true,
    })
  }
  handleOk = e => {
    this.setState({
      visible: false,
    })
  }
  handleCancel = e => {
    this.setState({
      visible: false,
    })
  }
  deleteFile = () => {
    // 测试删除
    post('/PUBLIC/common/deletefile.service', {
      xzqhbm: '040106',
      filepath: '040106/0101/222/333/111/2019/06/26/任务.txt'
    }).then(res => {

    }).catch(err => {
      console.log(err)
    })
  }
  downFile = () => {
    // 测试下载
    window.location.href = '/PUBLIC/common/downloadfile.service?filepath=040106/0101/10002/2/10232190_1023210980/2019/06/27/平面图_2层.dwg&xzqhbm=040106'
    // axios({
    //   method: 'get',
    //   url: '/PUBLIC/common/downloadfile3.service',
    //   params: {
    //     xzqhbm: '040106',
    //     filepath: '040106/0101/10002/2/10232190_1023210980/2019/06/27/平面图_2层.dwg'
    //   }
    // })
    //   .then(res => {
    //     console.log(res)
    //     let blob = new Blob([res], {
    //       type: 'application/octet-stream'
    //     })
    //     if ('download' in document.createElement('a')) {
    //     // 非IE下载
    //       const elink = document.createElement('a')
    //       elink.style.display = 'none'
    //       elink.href = URL.createObjectURL(blob)
    //       document.body.appendChild(elink)
    //       elink.click()
    //       URL.revokeObjectURL(elink.href)
    //       // 释放URL 对象
    //       document.body.removeChild(elink)
    //     } else { // IE10+下载
    //       navigator.msSaveBlob(blob)
    //     }

    //   // console.log(blob)
    //   // let objectUrl = URL.createObjectURL(blob)
    //   // window.location.href = objectUrl
    //   }).catch(err => {
    //     console.log(err)
    //   })
  }
  startUpload = () => {
    this.SYUpLoadStore.uploadFile({
      url: '/PUBLIC/common/ftp_uploadfiles.service',
      data: {
        xzqhbm: '040106',
        ywlsh: '111',
        jgbm: '0101',
        xmbh: '222',
        zh: '333'
      }
    })
    console.log(this.SYUpLoadStore.fileList.slice())
  }
  render() {
    console.log('测试props: ', this.props)
    const props = {
      accept: '', // 文件类型 默认为空 不做类型限制 txt doc xlsx
      listType: 'text', // 样式类型 text pic pic-card
      name: 'file', // 后台接收文件名
      multiple: true, // 支持多选
      directory: false, // 支持上传文件夹
      numLimit: 5, // 数量限制 默认为0 不做限制
      sizeLimit: 100 * 1024, // 单文件大小限制 默认为0 不做限制
      // 已上传文件回显
      defaultFiles: [
        {
          uid: '999',
          name: '已上传文件测试',
          status: 'done',
          url: 'http://www.baidu.com/xxx.png',
        },
        {
          name: 'aaa.txt',
          status: 'done',
          uid: 'rc-upload-1561618262503-2',
          url: '040106/0101/222/333/111/2019/06/27/aaa.txt'
        }
      ]
    }
    return (
      <div className='menu-page'>
        视图页面一级
        <Button type='primary' onClick={this.showModal}>
          打开子模块的页面
        </Button>
        <Modal
          title='Basic Modal'
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <DynamicComponent $name='Login' $func='getSub1DynamicComponent' />
        </Modal>
        <Divider />

        <SYUpLoad onMount={store => { this.SYUpLoadStore = store }} {...props} />

        <Button type='primary' onClick={this.startUpload}>
          点击上传
        </Button>
        <Button type='primary' onClick={this.deleteFile}>
          删除文件
        </Button>

        <Button type='primary' onClick={this.downFile}>
          下载文件
        </Button>
      </div>
    )
  }
}
