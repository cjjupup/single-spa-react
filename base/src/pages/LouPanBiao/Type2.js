import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Divider, Button, Table, Radio } from 'antd'
import { lpxxList } from './mockData'

// @inject('rootStore')
@observer
export default class RolePage extends Component {
  state= {
    columns: [],
    dataSource: [],
  }
  componentDidMount() {
    this.handleData()
  }
  handleData = () => {
    // 请求 lpxxList
    this.initColumns(lpxxList)
    this.initDataSource(lpxxList)
  }
  // 初始化表头
  initColumns = lpxxList => {
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
    let dyLen = lpxxList.length
    for (let i = 0; i < dyLen; i += 1) {
      let col = {}
      col.title = lpxxList[i].dy
      col.children = []
      let huLen = lpxxList[i].ceng[0].hu.length
      for (let j = 0; j < huLen; j += 1) {
        let huInfo = {
          title: j + 1,
          dataIndex: `h${i + 1}_${j}`,
          key: `h${i + 1}_${j}`,
          width: 200,
          render: (obj, record) => {
            return (
              <Button
                type={record[`hu${i + 1}_${j}`].active ? 'primary' : ''}
                onClick={() => {
                  chooseThisOne(record[`hu${i + 1}_${j}`])
                }}
              >
                {record[`hu${i + 1}_${j}`].fjh}
              </Button>
              // <span
              //   style={record[`hu${i + 1}_${j}`].active ? active : {}}
              //   onClick={chooseThisOne}
              // >
              //   {record[`hu${i + 1}_${j}`].fjh}
              // </span>
            )
          }
        }
        col.children.push(huInfo)
      }
      columns.push(col)
    }
    this.setState({ columns })
  }
  // 初始化dataSource
  initDataSource = lpxxList => {
    let dataSource = []
    let cengLen = lpxxList[0].ceng.length
    for (let i = 0; i < cengLen; i += 1) {
      let cengData = {}
      cengData.ch = `第${cengLen - i}层`
      let dyLen = lpxxList.length
      for (let z = 0; z < dyLen; z += 1) {
        let huLen = lpxxList[z].ceng[i].hu.length
        for (let j = 0; j < huLen; j += 1) {
          lpxxList[z].ceng[i].hu[j].active = false
          cengData[`hu${z + 1}_${j}`] = lpxxList[z].ceng[i].hu[j]
        }
      }
      dataSource.push(cengData)
    }
    console.log(dataSource)
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
