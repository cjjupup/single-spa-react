import React from 'react'
import classNames from 'classnames'
import { Button, Form } from 'antd'
import style from './index.less'

const FormItem = Form.Item

export default ({ className, ...rest }) => {
  const clsString = classNames(style.submit, className)
  return (
    <FormItem>
      <Button size='large' className={clsString} type='primary' htmlType='submit' {...rest} />
    </FormItem>
  )
}
