import Mock, {
  Random
} from 'mockjs'

import API_PATH from 'Src/common/apiPath'

const proxy = {
  'POST:/api/user/user_telnum_login': (req, res) => {
    const { msgCode, telNum } = JSON.parse(req.data)
    let data = Mock.mock({
      code: 0,
      errmsg: null,
      data: {
        status: 'ok',
        currentAuthority: 'admin',
        tokenId: 'askfdjqioweruhj29r38h298r2h23r342'
      }
    })
    if (msgCode === '666666' && telNum === '13411111111') {
      return [200, data]
    }
    return [400, {
      status: 'error',
      currentAuthority: 'guest',
      msg: '登陆失败，验证码不正确'
    }]
  }
}

export default proxy
