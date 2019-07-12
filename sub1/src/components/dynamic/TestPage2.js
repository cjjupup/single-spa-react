import React from 'react'
import Loadable from 'react-loadable'
import { Spin } from 'antd'

export const TestPage2 = Loadable({
  loader: () => import('../../pages/Test/TestPage2'),
  loading: Spin,
})

export default TestPage2
