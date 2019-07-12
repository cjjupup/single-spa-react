import Mock, {
  Random
} from 'mockjs'

import API_PATH from 'Src/common/apiPath'

const proxy = {
  'POST:/api/user/user_name_login': (req, res) => {
    const { passWord, userName } = JSON.parse(req.data)
    let data = Mock.mock({
      code: 0,
      errmsg: null,
      data: {
        status: 'ok',
        currentAuthority: 'admin',
        tokenId: 'askfdjqioweruhj29r38h298r2h23r342'
      }
    })
    if (passWord === '123456' && userName === 'admin') {
      return [200, data]
    }
    return [400, {
      status: 'error',
      currentAuthority: 'guest',
      msg: '登陆失败，账号或密码错误'
    }]
  }
}

export default proxy
