import Mock, {
  Random
} from 'mockjs'
import API_PATH from 'Src/common/apiPath'
import { AllModuleMenulList } from '../mockData/menulist'

const proxy = {
  'GET:/api/control/get_menu_list': (req, res) => {
    let data = Mock.mock({
      code: 0,
      errmsg: null,
      data: {
        status: 'ok',
        menuList: AllModuleMenulList,
      }
    })
    return [200, data]
  }
}

export default proxy
