import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Divider, Button, Table, Checkbox, Input } from 'antd'
import { typeList, fwxzList, lpxxList } from './mockData'

// 默认全选
const defaultTypeList = [0, 1, 2, 3]
// @inject('rootStore')
@observer
export default class RolePage extends Component {
  state= {
    columns: [],
    dataSource: [],
    plainOptions: [],
    checkedList: defaultTypeList,
    indeterminate: false,
    checkAll: true
  }
  componentDidMount() {
    this.handleData()
  }
  handleData = () => {
    // 请求 lpxxList fwxzList
    this.initCheckBox(typeList)
    this.initColumns(lpxxList)
    this.initDataSource(lpxxList)
  }
  // 初始化checkboxs
  initCheckBox = typeList => {
    let plainOptions = []
    typeList.map(item => {
      plainOptions.push({
        label: item.display,
        value: item.value - 0,
        id: item.value
      })
    })
    this.setState({ plainOptions })
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
            console.log(record[`hu${i + 1}_${j}`])
            return (
              <span
                style={{
                  background: record[`hu${i + 1}_${j}`].show ? record[`hu${i + 1}_${j}`].bgcolor : '#fff'
                }}
                onClick={() => {
                  chooseThisOne(record[`hu${i + 1}_${j}`])
                }}
              >
                {record[`hu${i + 1}_${j}`].fjh}
              </span>
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
    let bgcolorList = ['#78C64E', '#FEED36', '#FE0000', '#CCCCCC']
    let cengLen = lpxxList[0].ceng.length
    for (let i = 0; i < cengLen; i += 1) {
      let cengData = {}
      cengData.ch = `第${cengLen - i}层`
      let dyLen = lpxxList.length
      for (let z = 0; z < dyLen; z += 1) {
        let huLen = lpxxList[z].ceng[i].hu.length
        for (let j = 0; j < huLen; j += 1) {
          lpxxList[z].ceng[i].hu[j].show = true
          lpxxList[z].ceng[i].hu[j].bgcolor = bgcolorList[lpxxList[z].ceng[i].hu[j].type]
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
  }
  // 单个勾选
  onCheckOneChange = checkedList => {
    console.log(checkedList)
    let { dataSource, plainOptions } = this.state
    dataSource.forEach(item => {
      for (let i in item) {
        if (typeof item[i] !== 'string') {
          if (checkedList.indexOf(item[i].type) > -1) {
            item[i].show = true
          } else {
            item[i].show = false
          }
        }
      }
    })
    this.setState({
      checkedList,
      dataSource,
      indeterminate: checkedList.length !== plainOptions.length
    })
  }
  // 全选
  onCheckAllChange = e => {
    let checkAll = e.target.checked
    let { dataSource } = this.state
    dataSource.forEach(item => {
      for (let i in item) {
        if (typeof item[i] !== 'string') {
          item[i].show = checkAll
        }
      }
    })
    this.setState({
      dataSource,
      checkAll,
      checkedList: checkAll ? defaultTypeList : [],
      indeterminate: !checkAll
    })
  }
  render() {
    const { columns, dataSource, plainOptions, checkedList, checkAll, indeterminate } = this.state
    console.log(checkedList)
    return (
      <div className='role-page'>
        <Checkbox
          onChange={this.onCheckAllChange}
          checked={checkAll}
          indeterminate={indeterminate}
        >
          全选
        </Checkbox>
        <Checkbox.Group
          options={plainOptions}
          value={checkedList}
          onChange={this.onCheckOneChange}
        />
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
