import React from 'react'
import ReactDOM from 'react-dom'
import singleSpaReact from 'single-spa-react'
import registerServiceWorker from './registerServiceWorker'
import RootComponent from './root.component'
import { RootStore, history } from './Store'
import conf from '../public/project.json'
// import './index.less'

// 开发状态或者独立部署 root组件挂载
console.log(process.env)
if (process.env.ENV_TYPE !== 'micro') {
  ReactDOM.render(
    <RootComponent
      history={history}
      store={RootStore}
      globalEventDistributor={{ stores: { ...RootStore }}}
    />, document.getElementById('root')
  )
}

// 微服务打包 root组件挂载
const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: spa => {
    return (
      <RootComponent
        // 路由history取自主模块
        history={spa.customProps.globalEventDistributor.history}
        store={spa.customProps.storeModule.RootStore}
        globalEventDistributor={spa.customProps.globalEventDistributor}
      />
    )
  },
  domElementGetter
})

function domElementGetter() {
  let el = document.getElementById('sub-module-page')
  if (!el) {
    el = document.createElement('div')
    el.id = `sub-module-${conf.name}`
  }
  let timer = null
  timer = setInterval(() => {
    if (document.querySelector('#childModule')) {
      document.querySelector('#childModule').appendChild(el)
      clearInterval(timer)
    }
  }, 100)

  return el
}

export function bootstrap(props) {
  return Promise
    .resolve()
    .then(() => {
      let domEl = document.createElement('div')
      domEl.id = `sub-module-${conf.name}`
      let timer = null
      timer = setInterval(() => {
        if (document.querySelector('#childModule')) {
          document.querySelector('#childModule').appendChild(domEl)
          clearInterval(timer)
          ReactDOM.render(
            <RootComponent
              history={props.customProps.globalEventDistributor.history}
              store={props.customProps.storeModule.RootStore}
              globalEventDistributor={props.customProps.globalEventDistributor}
            />,
            document.getElementById(`sub-module-${conf.name}`)
          )
        }
      }, 100)
      console.log('初次挂载模块')
    })
}

export function mount(props) {
  return Promise
    .resolve()
    .then(() => {
      let domEl = document.getElementById(`sub-module-${conf.name}`)
      domEl && domEl.classList.contains('hidden') ? domEl.classList.remove('hidden') : () => {}
      console.log('激活模块')
    })
}

export function unmount(props) {
  return Promise
    .resolve()
    .then(() => {
      let domEl = document.getElementById(`sub-module-${conf.name}`)
      domEl && domEl.classList.add('hidden')
      console.log('卸载模块')
    })
}

// export const bootstrap = [
//   reactLifecycles.bootstrap,
// ]

// export const mount = [
//   reactLifecycles.mount,
// ]

// export const unmount = [
//   reactLifecycles.unmount,
// ]

registerServiceWorker()
