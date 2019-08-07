import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Divider, Button, Table, Radio } from 'antd'
import { object } from 'prop-types'
import { lpxxList, testlpxxList } from './mockData'

// @inject('rootStore')
@observer
export default class RolePage extends Component {
  state= {
    columns: [],
    dataSource: []
  }
  componentDidMount() {
    this.handleData()
  }
  handleData = () => {
    // 请求 lpxxList
    this.initColumns(testlpxxList)
    this.initDataSource(testlpxxList)
  }
  // 初始化表头
  initColumns = testlpxxList => {
    const { chooseThisOne } = this
    let columns = [{
      title: '1栋',
      children: [
        {
          title: '层号',
          dataIndex: 'ch',
          key: 'ch',
          width: 200,
        }
      ],
    }]
    let active = {
      background: '#1890ff'
    }
    let dyLen = testlpxxList.length
    for (let i = 0; i < dyLen; i += 1) {
      let col = {}
      col.title = testlpxxList[i].dy
      col.children = []
      let huLen = testlpxxList[i].ceng[0].hu.length
      for (let j = 0; j < huLen; j += 1) {
        let huInfo = {
          title: j + 1,
          dataIndex: `h${i + 1}_${j}`,
          key: `h${i + 1}_${j}`,
          width: 200,
          render: (obj, record, index) => {
            const button = (
              <Button
                type={record[`hu${i + 1}_${j}`].active ? 'primary' : ''}
                onClick={() => {
                  chooseThisOne(record[`hu${i + 1}_${j}`])
                }}
              >
                {record[`hu${i + 1}_${j}`].fjh}
              </Button>
            )
            const data = {
              children: button,
              props: {
                colSpan: record[`hu${i + 1}_${j}`].colSpan,
                rowSpan: record[`hu${i + 1}_${j}`].rowSpan
              }
            }
            return data
          }
        }
        col.children.push(huInfo)
      }
      columns.push(col)
    }
    console.log('表头数据结构： ', columns)
    this.setState({ columns })
  }
  // 初始化dataSource
  initDataSource = testlpxxList => {
    let dataSource = []
    let rowlist = []
    let collist = []
    let cengLen = testlpxxList[0].ceng.length
    for (let i = 0; i < cengLen; i += 1) {
      let cengData = {}
      cengData.ch = `第${cengLen - i}层`
      let dyLen = testlpxxList.length
      for (let z = 0; z < dyLen; z += 1) {
        let huLen = testlpxxList[z].ceng[i].hu.length
        for (let j = 0; j < huLen; j += 1) {
          let huInfo = testlpxxList[z].ceng[i].hu[j]
          huInfo.active = false
          cengData[`hu${z + 1}_${j}`] = huInfo
          // 纵向合并
          if (huInfo.rowSpan && huInfo.rowSpan !== 1) {
            rowlist.push({
              index: i,
              key: `hu${z + 1}_${j}`,
              rowSpan: huInfo.rowSpan,
              colSpan: huInfo.colSpan
            })
          }
          // 横向合并
          if (huInfo.colSpan && huInfo.colSpan !== 1) {
            collist.push({
              index: i,
              key: `hu${z + 1}_${j}`,
              rowSpan: huInfo.rowSpan,
              colSpan: huInfo.colSpan
            })
          }
        }
      }
      dataSource.push(cengData)
    }
    console.log('需要纵向合并变更的数据', rowlist)
    rowlist.map(item => {
      let len = item.rowSpan - 1
      dataSource[item.index - len][item.key] = { ...dataSource[item.index][item.key] }
      dataSource[item.index][item.key].rowSpan = 0
      for (let i = len - 1; i > 0; i -= 1) {
        dataSource[item.index - i][item.key].rowSpan = 0
      }
    })
    console.log('需要横向合并变更的数据', collist)
    collist.map(item => {
      let len = item.colSpan - 1
      let keyName = item.key.split('_')[0]
      let keyIndex = item.key.split('_')[1]
      for (let i = len; i > 0; i -= 1) {
        dataSource[item.index][`${keyName}_${keyIndex - 0 + i}`].colSpan = 0
      }
    })
    console.log('数据结构: ', dataSource)
    this.setState({ dataSource })
  }
  chooseThisOne = objInfo => {
    console.log(objInfo)
    let { dataSource } = this.state
    let { fjh } = objInfo
    dataSource.forEach(item => {
      for (let i in item) {
        if (typeof item[i] !== 'string') {
          if (item[i].fjh === fjh) {
            item[i].active = true
          } else {
            item[i].active = false
          }
        }
      }
    })
    this.setState({ dataSource })
  }
  getCurYh = () => {
    let curYh
    const { dataSource } = this.state
    dataSource.forEach(item => {
      for (let i in item) {
        if (typeof item[i] !== 'string') {
          if (item[i].active) {
            curYh = item[i]
          }
        }
      }
    })
    console.log(curYh)
  }
  render() {
    const { columns, dataSource } = this.state
    return (
      <div className='role-page'>
        <Button type='primary' onClick={this.getCurYh}>当前房间信息获取</Button>
        <Divider />
        <Table
          columns={columns}
          dataSource={dataSource}
          bordered
          pagination={false}
          size='middle'
        />
      </div>
    )
  }
}
