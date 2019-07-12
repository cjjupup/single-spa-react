import React, { createElement } from 'react'
import classNames from 'classnames'
import { Button } from 'antd'
import config from './typeConfig'
import style from './index.less'

export default ({ className, linkElement = 'a', type, title, desc, img, actions, ...rest }) => {
  const pageType = type in config ? type : '404'
  const clsString = classNames(style.exception, className)
  return (
    <div className={clsString} {...rest}>
      <div className={style.imgBlock}>
        <div
          className={style.imgEle}
          style={{ backgroundImage: `url(${img || config[pageType].img})` }}
        />
      </div>
      <div className={style.content}>
        <h1>{title || config[pageType].title}</h1>
        <div className={style.desc}>{desc || config[pageType].desc}</div>
        <div className={style.actions}>
          {actions ||
            createElement(
              linkElement,
              {
                to: '/',
                href: '/',
              },
              <Button type='primary'>返回首页</Button>
            )}
        </div>
      </div>
    </div>
  )
}
