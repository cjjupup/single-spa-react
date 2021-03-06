import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import Result from 'Components/Result'
import style from './RegisterResult.less'

const actions = (
  <div className={style.actions}>
    <a href=''>
      <Button size='large' type='primary'>
        查看邮箱
      </Button>
    </a>
    <Link to='/'>
      <Button size='large'>返回首页</Button>
    </Link>
  </div>
)

export default ({ location }) => (
  <Result
    className={style.registerResult}
    type='success'
    title={(
      <div className={style.title}>
        你的账户：
        {location.state ? location.state.account : 'AntDesign@example.com'}
        注册成功
      </div>
    )}
    description='激活邮件已发送到你的邮箱中，邮件有效期为24小时。请及时登录邮箱，点击邮件中的链接激活帐户。'
    actions={actions}
    style={{ marginTop: 56 }}
  />
)
