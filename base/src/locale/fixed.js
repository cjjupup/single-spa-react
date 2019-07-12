import zhCN from './zhCN'
import enUS from './enUS'

const transformChToEn = value => {
  let newValue = ''
  let typeKey = ''
  Object.keys(zhCN).forEach(key => {
    if (zhCN[key] === value) typeKey = key
  })
  if (typeKey !== '') {
    newValue = enUS[typeKey]
    return newValue
  }
  // 没匹配上国际化配置
  return false
}

export default transformChToEn
