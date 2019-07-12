import React from 'react'
import Loadable from 'react-loadable'
import { Spin } from 'antd'

export const TestPage3 = Loadable({
  loader: () => import('../../pages/Test/TestPage3'),
  loading: Spin,
})

export default TestPage3
