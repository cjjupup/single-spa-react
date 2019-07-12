import React, { Component } from 'react'

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props)

      this.state = {
        component: null,
      }
    }

    async componentWillMount() {
      const { default: component } = await importComponent()
      // console.log(this.context)
      this.setState({
        component
      })
    }

    render() {
      const C = this.state.component

      return C
        ? <C {...this.props} />
        : null
    }
  }

  return AsyncComponent
}
