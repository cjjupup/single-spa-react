import React, { PureComponent, Component, Fragment } from 'react'
import { Table, Modal } from 'antd'
import { observer, inject } from 'mobx-react'
import Store from './store'

@observer
class SYTable extends Component {
  // 定义默认props
  static defaultProps={
    checkBox: true,
    autoLoad: true,
    rowSelection: {},
  }
  componentWillMount() {
    // 创建store
    this.store = new Store()
    this.initStore(this.props)
    // 获取数据
    const { url, autoLoad, params, onError } = this.store
    if (url && autoLoad) {
      this.store.loadData({ url, params, onError })
    }
    this.props.onMount(this.store)
  }
  initStore = props => {
    // 获取用户传入配置
    // 只取出下面用到的
    const {
      pagination,
      rowSelection: {
        onChange: rowSelChange,
        ...otherRowSelection
      },
      onChange: tableChange,
      onRow,
      onDbClick,
      formatAfter,
      url,
      params,
      onError,
      onMount,
      // ...options 这里的options会获取props里除上面的属性以外的所有属性
      ...options } = props

    // 默认配置
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 10,
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      ...pagination,
    }

    // 组件状态变化更新store
    const handleTableChange = (pagination, filters, sorter, extra) => {
      const { url, params, onError } = this.store
      this.store.setStore({ pagination })
      this.store.loadData({ url, params, onError })
      tableChange(pagination, filters, sorter, extra)
    }
    const handleRowSelectChange = (selectedRowKeys, selectedRows) => {
      this.store.setStore({ rowSelection: { ...this.store.rowSelection, selectedRowKeys }})
      rowSelChange(selectedRowKeys, selectedRows)
    }
    const rowSelectionProps = {
      selectedRowKeys: [],
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
      onChange: handleRowSelectChange,
      ...otherRowSelection,
    }
    const onRowProps = record => {
      const onDoubleClick = event => {
        onDbClick({ event, record })
      }
      return Object.assign({}, { onDoubleClick }, onRow && onRow(record))
    }
    // 合并传入配置与默认配置
    let config = {
      rowKey: record => record.id,
      rowSelection: rowSelectionProps,
      onChange: handleTableChange,
      onRow: onRowProps,
      pagination: paginationProps,

      url,
      params,
      onError,
    }

    // 合并剩余配置
    config = Object.assign({}, config, options)
    this.store.setStore(config)
  }
  render() {
    // 从store获取组件状态
    const {
      dataSource = [],
      pagination: { pageSizeOptions = [], ...otherPagination },
      rowKey,
      loading,
      columns = [],
      rowSelection,
      checkBox,
      ...options
    } = this.store
    return (
      <div>
        <Table
          loading={loading}
          rowKey={rowKey}
          rowSelection={checkBox ? rowSelection : undefined}
          dataSource={dataSource.slice()}
          columns={columns.slice()}
          pagination={{
            pageSizeOptions: pageSizeOptions.slice(),
            ...otherPagination
          }}
          {...options}
        />
      </div>
    )
  }
}

export default SYTable
