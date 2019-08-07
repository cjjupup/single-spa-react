import React from 'react'
import ReactDOM from 'react-dom'
// import singleSpaReact from 'single-spa-react'
// import './runtime'
import registerServiceWorker from './registerServiceWorker'
import RootComponent from './root.component'
import { RootStore, history } from './Store'
// import { history } from './utils/history'
import './index.less'

console.log(process.env)
if (process.env.ENV_TYPE !== 'micro') {
  // 开发环境 or 独立部署  即非micro应用
  ReactDOM.render(
    <RootComponent
      history={history}
      store={RootStore}
      globalStore={RootStore}
    />, document.getElementById('root')
  )
}
// const reactLifecycles = singleSpaReact({
//   React,
//   ReactDOM,
//   rootComponent: (spa) => {
//     return <RootComponent
//       history={spa.customProps.storeModule.history}
//       store={spa.customProps.storeModule.RootStore}
//       globalEventDistributor={spa.customProps.globalEventDistributor}
//     />
//   },
//   domElementGetter: () => document.getElementById('root')
// })

export function bootstrap(props) {
  return Promise
    .resolve()
    .then(() => {
      ReactDOM.render(
        <RootComponent
          history={props.customProps.globalStore.history}
          store={props.customProps.RootStore}
          globalStore={props.customProps.globalStore}
        />,
        document.getElementById('root')
      )
      console.log('初次挂载主模块')
    })
}

export function mount(props) {
  return Promise
    .resolve()
    .then(() => {
      console.log('激活主模块')
    })
}

export function unmount(props) {
  return Promise
    .resolve()
    .then(() => {
      console.log('卸载主模块')
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
