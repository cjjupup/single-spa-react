import React, { Component } from 'react'

export default class DynamicComponent extends Component {
  state = {
    DynamicComponent: null
  }

  static defaultProps = {
    $func: '',
    $name: ''
  }

  async componentWillMount() {
    this.renderComponent()
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps
    this.renderComponent()
  }

  async renderComponent() {
    const { $name } = this.props
    const { $func } = this.props
    try {
      if ($name) {
        const component = await window[$func]($name)
        this.setState({
          DynamicComponent: component
        })
      }
    } catch (error) {
      this.setState({
        DynamicComponent: null
      })
      console.error(error)
    }
  }

  render() {
    const { DynamicComponent } = this.state
    // 继承所有props
    return DynamicComponent && <DynamicComponent />
  }
}
