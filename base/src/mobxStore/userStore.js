import { observable, action, runInAction } from 'mobx'
import API_PATH from 'Common/apiPath'
import { post } from 'Util/request'
import { ssStorage } from 'Util/storage'

// import { message } from 'antd'
// configure({ enforceActions: 'always', computedRequiresReaction: false })
class Store {
  @observable loading = false
  @observable autoLogin = false
  @observable loginStatus = 'ok'
  @observable loginType = 'account'
  @observable userNameLoginInfo = { userName: '', passWord: '' }
  @observable telNumLoginInfo = { telNum: '', msgCode: '' }
  @observable registerInfo = { email: '', passWord: '', telNum: '', MsgCode: '' };
  @observable logined = false
  @observable tokenId = ''

  // 账号密码登陆
  @action.bound userNameLogin = async (params = {
    userName: this.userNameLoginInfo.userName,
    passWord: this.userNameLoginInfo.passWord
  }) => {
    try {
      this.loading = true
      /**
       *  此处添加 加密逻辑
       *  包装 params.passWord
       */
      // let res = await post(API_PATH.USER_NAME_LOGIN, params)
      // console.log(res)
      let res = {
        status: 'ok',
        currentAuthority: 'admin',
        tokenId: 'askfdjqioweruhj29r38h298r2h23r342',
        msg: '登陆成功'
      }
      ssStorage.setItem('tokenId', res.tokenId)
      runInAction(() => {
        this.loading = false
        this.logined = true
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.loading = false
      })
    }
  }

  // 手机短信登陆
  @action.bound userTelnumLogin = async (params = {
    telNum: this.telNumLoginInfo.telNum,
    msgCode: this.telNumLoginInfo.msgCode,
    loginType: this.params.loginType
  }) => {
    try {
      this.loading = true
      let res = await post(API_PATH.USER_TELNUM_LOGIN, params)
      console.log(res)
      runInAction(() => {
        this.loading = false
        this.logined = true
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.loading = false
      })
    }
  }

  // 注册
  @action.bound userRegister = async (params = {
    email: this.registerInfo.email,
    passWord: this.registerInfo.passWord,
    telNum: this.registerInfo.telNum,
    MsgCode: this.registerInfo.MsgCode,
  }) => {
    try {
      this.loading = true
      let res = await post(API_PATH.USER_REGISTER, params)
      runInAction(() => {
        this.loading = false
        console.log(res)
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.loading = false
      })
    }
  }

  // 切换自动登陆
  @action toggleAutoLogin = () => {
    this.autoLogin = !this.autoLogin
  }

  // 切换登陆方式
  @action changeLoginType= type => {
    this.loginType = type
  }
}

export default new Store()

