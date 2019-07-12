import React from 'react'
import classNames from 'classnames'
import { Icon } from 'antd'
import style from './index.less'

export default function Result({
  className,
  type,
  title,
  description,
  extra,
  actions,
  ...restProps
}) {
  const iconMap = {
    error: <Icon className={style.error} type='close-circle' />,
    success: <Icon className={style.success} type='check-circle' />,
  }
  const clsString = classNames(style.result, className)
  return (
    <div className={clsString} {...restProps}>
      <div className={style.icon}>{iconMap[type]}</div>
      <div className={style.title}>{title}</div>
      {description && <div className={style.description}>{description}</div>}
      {extra && <div className={style.extra}>{extra}</div>}
      {actions && <div className={style.actions}>{actions}</div>}
    </div>
  )
}
