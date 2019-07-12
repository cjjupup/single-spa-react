import React from 'react'
import { Avatar, List } from 'antd'
import classNames from 'classnames'
import style from './NoticeList.less'

export default function NoticeList({
  data = [],
  onClick,
  onClear,
  title,
  locale,
  emptyText,
  emptyImage,
}) {
  if (data.length === 0) {
    return (
      <div className={style.notFound}>
        {emptyImage ? <img src={emptyImage} alt='not found' /> : null}
        <div>{emptyText || locale.emptyText}</div>
      </div>
    )
  }
  return (
    <div>
      <List className={style.list}>
        {data.map((item, i) => {
          const itemCls = classNames(style.item, {
            read: item.read,
          })
          return (
            <List.Item className={itemCls} key={item.key || i} onClick={() => onClick(item)}>
              <List.Item.Meta
                className={style.meta}
                avatar={item.avatar ? <Avatar className={style.avatar} src={item.avatar} /> : null}
                title={(
                  <div className={style.title}>
                    {item.title}
                    <div className={style.extra}>{item.extra}</div>
                  </div>
                )}
                description={(
                  <div>
                    <div className={style.description} title={item.description}>
                      {item.description}
                    </div>
                    <div className={style.datetime}>{item.datetime}</div>
                  </div>
                )}
              />
            </List.Item>
          )
        })}
      </List>
      <div className={style.clear} onClick={onClear}>
        {locale.clear}
        {title}
      </div>
    </div>
  )
}
