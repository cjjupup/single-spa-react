import React, { PureComponent, Component, Fragment } from 'react'
import { Select, Pagination, Spin } from 'antd'
import { observer, inject } from 'mobx-react'
import _ from 'lodash'
import Store from './store'
import style from './style.less'

const { Option, OptGroup } = Select
@observer
class SYSelect extends Component {
  // 定义默认props
  static defaultProps={
    limit: 5, // 多选模式选择个数
    // mode: 'multiple',// 多选模式
    filterOption: false,
    defaultActiveFirstOption: false,
    autoClearSearchValue: false,
  }
  componentWillMount() {
    // 创建store
    this.store = new Store()
    this.initStore(this.props)
    // 获取数据
    const { url, params, onError } = this.store
    if (url) {
      this.store.loadData({ url, params, onError })
    }
    this.props.onMount(this.store)
  }
  initStore = props => {
    // 获取用户传入配置
    const {
      url,
      params,
      onError,
      pagination,

      // select组件参数
      style,
      onChange,
      onSearch,
      ...options
    } = props

    // 默认配置
    const styleProps = { width: 250, ...style }
    const paginationProps = {
      onChange: (page, pageSize) => {
        const { pagination, url, params, onError } = this.store
        this.store.setStore({
          pagination: Object.assign({}, pagination, { current: page, pageSize })
        })
        if (url) {
          this.store.loadData({ url, params, onError })
        }
      },
      simple: true,
      pageSize: 10,
      ...pagination,
    }
    // 组件状态变化更新store
    const handleChange = value => {
      const { mode, limit } = this.store
      if (mode === 'multiple' && value.length > limit) return
      this.store.setStore({ value })
      onChange(value)
    }
    const handleSearch = _.throttle(searchValue => {
      const { url, params, onError } = this.store
      if (!url) return
      this.store.setStore({ searchValue, dataSource: [] })
      this.store.loadData({ url, params: Object.assign({}, params, { searchValue }), onError })
      onSearch(searchValue)
    }, 500)

    // 合并传入配置与默认配置
    let config = {
      url,
      params,
      onError,
      onChange: handleChange,
      onSearch: handleSearch,
      style: styleProps,
      pagination: paginationProps,
    }

    // 合并剩余配置
    config = Object.assign({}, config, options)
    this.store.setStore(config)
  }

  render() {
    const { mode, value, page, pagination, dataSource = [], children, ...options } = this.store
    const fomatValue = () => {
      try {
        return value.slice()
      } catch (error) {
        return value
      }
    }
    const dropdownPagination = (
      <Pagination {...pagination} />
    )
    // 从store获取组件状态
    return (
      <div>
        <Select
          mode={mode}
          dropdownClassName={style.SYSelectDropdown}
          value={fomatValue()}
          {...options}
        >
          {page
            ? (
              <OptGroup label={dropdownPagination}>
                {dataSource &&
                  dataSource.map(v => <Option value={v.value} key={v.id}>{v.name}</Option>)}
              </OptGroup>
            )
            : dataSource &&
              dataSource.map(v => <Option value={v.value} key={v.id}>{v.name}</Option>)}
          {children}
        </Select>
      </div>
    )
  }
}
export default SYSelect
