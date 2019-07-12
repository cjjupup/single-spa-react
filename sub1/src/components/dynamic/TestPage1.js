import React from 'react'
import Loadable from 'react-loadable'
import { Spin } from 'antd'

export const TestPage1 = Loadable({
  loader: () => import('../../pages/Test/TestPage1'),
  loading: Spin,
})

export default TestPage1
