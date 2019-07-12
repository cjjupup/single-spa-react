import React from 'react'
import Loadable from 'react-loadable'
import { Spin } from 'antd'

export const Login = Loadable({
  loader: () => import('../../pages/User/Login'),
  loading: Spin,
})

export default Login
