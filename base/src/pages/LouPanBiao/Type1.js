import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Divider, Button, Table, Checkbox, Input } from 'antd'
import { fwxzList, lpxxList } from './mockData'

// 默认不可勾选
const defaultDisableList = []
// @inject('rootStore')
@observer
export default class RolePage extends Component {
  state= {
    columns: [],
    dataSource: [],
    plainOptions: [],
    disableList: defaultDisableList,
    checkAll: true
  }
  componentDidMount() {
    this.handleData()
  }
  handleData = () => {
    // 请求 lpxxList fwxzList
    this.initCheckBox(fwxzList)
    this.initColumns(lpxxList)
    this.initDataSource(lpxxList)
  }
  // 初始化checkboxs
  initCheckBox = fwxzList => {
    let plainOptions = []
    fwxzList.map(item => {
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
    const { checkboxChange } = this
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
            return (
              <Checkbox
                onChange={checkboxChange}
                checked={!record[`hu${i + 1}_${j}`].disabled && record[`hu${i + 1}_${j}`].checked}
                disabled={record[`hu${i + 1}_${j}`].disabled}
                data-fjh={record[`hu${i + 1}_${j}`].fjh}
                data-fwxz={record[`hu${i + 1}_${j}`].fwxz}
              >
                {record[`hu${i + 1}_${j}`].fjh}
              </Checkbox>
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
          lpxxList[z].ceng[i].hu[j].checked = true
          lpxxList[z].ceng[i].hu[j].disabled = false
          cengData[`hu${z + 1}_${j}`] = lpxxList[z].ceng[i].hu[j]
        }
      }
      dataSource.push(cengData)
    }
    console.log(dataSource)
    this.setState({ dataSource })
  }
  checkboxChange = e => {
    let { dataSource } = this.state
    let fjh = e.target['data-fjh']
    dataSource.forEach(item => {
      for (let i in item) {
        if (item[i].fjh === fjh) {
          item[i].checked = !item[i].checked
        }
      }
    })
    this.setState({ dataSource })
  }
  // 单个勾选
  onCheckOneChange = checkedList => {
    let { dataSource } = this.state
    dataSource.forEach(item => {
      for (let i in item) {
        if (typeof item[i] !== 'string') {
          if (checkedList.indexOf(item[i].fwxz) > -1) {
            item[i].checked = false
            item[i].disabled = true
          } else {
            item[i].disabled = false
          }
        }
      }
    })
    this.setState({
      disableList: checkedList,
      dataSource
    })
  }
  // 全选
  onCheckAllChange = e => {
    let checkAll = e.target.checked
    let { dataSource } = this.state
    dataSource.forEach(item => {
      for (let i in item) {
        if (typeof item[i] !== 'string') {
          if (!item[i].disabled) {
            item[i].checked = checkAll
          }
        }
      }
    })
    this.setState({
      dataSource,
      checkAll
    })
  }
  getCurHbh = () => {
    let hbh = []
    const { dataSource } = this.state
    dataSource.forEach(item => {
      for (let i in item) {
        if (typeof item[i] !== 'string') {
          if (item[i].checked) {
            hbh.push(item[i].fjh)
          }
        }
      }
    })
    console.log(hbh)
  }
  render() {
    const { columns, dataSource, plainOptions, disableList, checkAll } = this.state
    return (
      <div className='role-page'>
        <Button type='primary' onClick={this.getCurHbh}>获取当前所选户列表hbh</Button>
        <Divider />
        <Checkbox
          onChange={this.onCheckAllChange}
          checked={checkAll}
        >
          全选
        </Checkbox>
        <Divider />
        禁止项：
        <Checkbox.Group
          options={plainOptions}
          defaultChecked={disableList}
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
