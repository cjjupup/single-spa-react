import { AllModuleMenulList } from './menuList'

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {

  'GET:/api/control/get_menu_list': {
    desc: '获取权限菜单',
    params: {},
    body: {
      status: 'ok',
      menuList: AllModuleMenulList
    },
  },
  'POST:/api/user/user_name_login': config => {
    const { passWord, userName } = JSON.parse(config.data)
    console.log(JSON.parse(config.data))
    if (passWord === '123456' && userName === 'admin') {
      return [200, {
        status: 'ok',
        currentAuthority: 'admin',
        tokenId: 'askfdjqioweruhj29r38h298r2h23r342',
        msg: '登陆成功'
      }]
    }
    return [400, {
      status: 'error',
      currentAuthority: 'guest',
      msg: '登陆失败，账号或密码错误'
    }]
  },

  'POST:/api/user/user_telnum_login': config => {
    const { msgCode, telNum } = JSON.parse(config.data)
    console.log(JSON.parse(config.data))
    if (msgCode === '666666' && telNum === '13411111111') {
      return [200, {
        status: 'ok',
        currentAuthority: 'admin',
        tokenId: 'askfdjqioweruhj29r38h298r2h23r342',
        msg: '登陆成功'
      }]
    }
    return [400, {
      status: 'error',
      currentAuthority: 'guest',
      msg: '登陆失败，验证码不正确'
    }]
  },

  'POST:/sreport/login': config => {
    console.log(config)
    return [200, {
      status: 'ok',
      currentAuthority: 'guest',
      msg: '登陆失败，验证码不正确'
    }]
  },
  'GET:/api/500': {
    timestamp: 1513932555104,
    status: 500,
    error: 'error',
    message: 'error',
    path: '/base/category/list',
  },
  'GET:/api/404': {
    timestamp: 1513932643431,
    status: 404,
    error: 'Not Found',
    message: 'No message available',
    path: '/base/category/list/2121212',
  },
  'GET:/api/403': {
    timestamp: 1513932555104,
    status: 403,
    error: 'Unauthorized',
    message: 'Unauthorized',
    path: '/base/category/list',
  },
  'GET:/api/401': {
    timestamp: 1513932555104,
    status: 401,
    error: 'Unauthorized',
    message: 'Unauthorized',
    path: '/base/category/list',
  },
}

export { proxy }
