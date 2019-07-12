import { isUrl } from '../utils/utils'

let menuData = []
let originParentPath = ''
function formatter(data, parentPath = originParentPath) {
  data.sort((a, b) => a.rank - b.rank)
  return data.map(item => {
    let { path } = item
    if (!isUrl(path)) {
      path = parentPath + item.path
    }
    const result = {
      ...item,
      path
    }
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}`)
    }
    return result
  })
}

export const hasInitMenu = () => {
  return menuData.length > 0
}
export const pushMenu = menu => {
  menuData = menu
}
export const getMenuData = () => {
  // console.log(menuData)
  return formatter(menuData)
}
