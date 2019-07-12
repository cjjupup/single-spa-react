import { observable, computed, configure, action, runInAction, extendObservable } from 'mobx'
import { message } from 'antd'
import API_PATH from 'Common/apiPath'
import { get, post } from 'Util/request'

// configure({ enforceActions: 'always', computedRequiresReaction: false })
class Store {
  @observable fileList = []
  @observable uploading = false
  @observable hackUpdataCount = 0

  // 上传文件
  @action.bound uploadFile = ({ url, data }) => {
    this.uploading = true
    const formData = new FormData()
    let hasFiles = false
    this.fileList.forEach((file, index) => {
      if (file.status !== 'done') {
        hasFiles = true
        formData.append(`file${index + 1}`, file.originFileObj)
      }
    })
    Object.keys(data).forEach(key => {
      formData.append(key, data[key])
    })
    if (hasFiles) {
      post(url, formData).then(res => {
        this.uploading = false
        console.log(res)
        if (res.success) {
          let sucFilesName = res.data.filename.split(',')
          let sucFilesUrl = res.data.filepath.split(',')
          sucFilesName.forEach((filename, index) => {
            this.fileList.map(item => {
              if (item.name === filename) {
                delete item.lastModified
                delete item.lastModifiedDate
                delete item.originFileObj
                delete item.percent
                delete item.size
                delete item.type
                item.status = 'done'
                item.url = sucFilesUrl[index]
                return item
              }
            })
          })
          this.hackUpdataCount += 1
          console.log(this.fileList.slice())
        } else {
          // 失败回调
          this.fileList.map(item => {
            if (item.status !== 'done') {
              delete item.lastModified
              delete item.lastModifiedDate
              delete item.originFileObj
              // delete item.percent
              delete item.size
              delete item.type
              item.status = 'error'
              item.url = '/'
              return item
            }
          })
          this.hackUpdataCount += 1
          message.error(res.msg)
          console.log(this.fileList.slice())
        }
      }).catch(err => {
        this.uploading = false
        console.log(err)
      })
    }
  }

  // 删除文件
  @action deleteFile = file => {
    let targetIndex
    this.fileList.forEach((item, index) => {
      if (item.uid === file.uid) {
        targetIndex = index
      }
    })
    this.fileList.splice(targetIndex, 1)
    console.log(this.fileList.slice())
  }

  // 更新文件列表
  @action updataFile= fileList => {
    this.fileList = fileList
  }
  // 追加文件
  @action pushFile= file => {
    this.fileList = [...this.fileList, file]
  }
  // 初始文件列表 default
  @action initFileList = defaultFileList => {
    console.log('初始化文件列表')
    this.fileList = [...defaultFileList]
  }
}

export default new Store()

