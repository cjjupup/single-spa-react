
let getUserApi = path => (`/api/user/${path}`)

let getControlApi = path => (`/api/control/${path}`)

const apiPath = {
  // 用户API
  USER_NAME_LOGIN: getUserApi('user_name_login'),
  USER_TELNUM_LOGIN: getUserApi('user_telnum_login'),
  USER_REGISTER: getUserApi('register'),

  // 菜单路由权限API
  GET_MENU_LIST: getControlApi('get_menu_list'),
  GET_PERMISSION_LIST: getControlApi('get_permission_list')

}

export default apiPath
