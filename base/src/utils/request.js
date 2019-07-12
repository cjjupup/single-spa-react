import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import qs from 'qs'
import { proxy } from '../mock'

const $axios = axios.create({
  timeout: 30000, // 30秒
  responseType: 'json'
})

// const codeMessage = {
//   200: '服务器成功返回请求的数据。',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队（异步任务）。',
//   204: '删除数据成功。',
//   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   401: '用户没有权限（令牌、用户名、密码错误）。',
//   403: '用户得到授权，但是访问是被禁止的。',
//   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   406: '请求的格式不可得。',
//   410: '请求的资源被永久删除，且不会再得到的。',
//   422: '当创建一个对象时，发生一个验证错误。',
//   500: '服务器发生错误，请检查服务器。',
//   502: '网关错误。',
//   503: '服务不可用，服务器暂时过载或维护。',
//   504: '网关超时。',
// }
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    console.log(response.data)
  }
  // 根据状态码跳转报错页面或者做些事
  console.warn('---------status--->', response.status)
}
// 请求拦截器
axios.interceptors.request.use(config => {
  // ...统一修改请求头
  // ...Token
  // let tokenId = ssStorage.getItem('tokenId')
  // ...权限
  return config
}, error => {
  // ...网络错误
  Promise.reject(error)
})

// 响应拦截
$axios.interceptors.response.use(response => {
  console.log('response  result-->', response)
  checkStatus(response)
  return response.data
}, e => {
  console.error('response  error-->', e)
  checkStatus(e.response)
  return Promise.reject(e)
})

// if (process.env.MOCK === 'true') {
if (true) {
  let mock = new MockAdapter($axios, { delayResponse: 1 * 1000 })
  Object.keys(proxy).forEach(item => {
    let result = item.split(':')
    let method = result[0].toUpperCase()
    let url = result[1]
    switch (method) {
      case 'GET':
        mock.onGet(url).reply(200, proxy[item].body || proxy[item])
        break
      case 'POST':
        // mock.onPost(url, proxy[item].params).reply(200, proxy[item].body || proxy[item])
        mock.onPost(url, proxy[item].params).reply(proxy[item])
        break
      case 'DELETE':
        mock.onDelete(url, proxy[item].params).reply(200, proxy[item].body || proxy[item])
        break
      default:
        mock.onGet(url).reply(200, proxy[item].body || proxy[item])
        break
    }
  })
}

export const get = (url, params, headers) => new Promise((resolve, reject) => {
  $axios({
    method: 'GET',
    url,
    params,
    paramsSerializer(params) {
      return qs.stringify(params)
    },
    headers: {
      ...headers
    }
  }).then(result => {
    resolve(result)
  }).catch(error => {
    reject(error)
  })
})
export const post = (url, params, headers) => new Promise((resolve, reject) => {
  $axios({
    method: 'POST',
    url,
    data: params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8', // 指定消息格式
      ...headers
    },
  }).then(result => {
    resolve(result)
  }).catch(error => {
    reject(error)
  })
})
export default $axios
export const { put } = $axios
export const del = (url, params) => $axios.delete(url, { params })
