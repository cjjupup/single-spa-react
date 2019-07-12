export const AllModuleMenulList = [
  {
    name: '系统一',
    icon: 'user',
    path: '/baseModule',
    component: null,
    type: 'menu',
    hideInMenu: false,
    permissions: null,
    rank: 1,
    children: [
      {
        name: '系统管理',
        icon: 'check-circle-o',
        path: '/system',
        component: null,
        type: 'menu',
        hideInMenu: false,
        permissions: null,
        rank: 1,
        children: [
          {
            name: '菜单管理',
            path: '/menu',
            component: '/System/Menu',
            type: 'view',
            hideInMenu: false,
            permissions: ['system_menu_list', 'system_menu_add', 'system_menu_detel', 'system_menu_editor']
          },
          {
            name: '用户管理',
            path: '/user',
            component: '/System/User',
            type: 'view',
            hideInMenu: false,
            permissions: ['system_user_list', 'system_user_add', 'system_user_detel', 'system_user_editor']
          },
          {
            name: '角色管理',
            path: '/role',
            component: '/System/Role',
            type: 'view',
            hideInMenu: false,
            permissions: ['system_role_list', 'system_role_add', 'system_role_detel', 'system_role_editor']
          }
        ]
      },
      {
        name: '测试菜单',
        icon: 'check-circle-o',
        path: '/test',
        component: null,
        type: 'menu',
        hideInMenu: false,
        permissions: null,
        rank: 2,
        children: [
          {
            name: '二级-1',
            path: '/test-1',
            component: null,
            type: 'menu',
            hideInMenu: false,
            permissions: null,
            children: [
              {
                name: '三级-1',
                path: '/test-1-1',
                component: '/Test/TestPage1',
                type: 'view',
                hideInMenu: false,
                permissions: null
              },
              {
                name: '三级-2',
                path: '/test-1-2',
                component: '/Test/TestPage2',
                type: 'view',
                hideInMenu: false,
                permissions: null
              }
            ]
          },
          {
            name: '合同模板管理',
            path: '/test-mg',
            component: '/Test/HetongMg',
            type: 'view',
            hideInMenu: false,
            permissions: null
          },
          {
            name: '合同模板编辑',
            path: '/test-editor',
            component: '/Test/HetongEditor',
            type: 'view',
            hideInMenu: false,
            permissions: null
          }
        ]
      },
      {
        name: '一级视图',
        icon: 'check-circle-o',
        path: '/firstview',
        component: '/FirstView/ViewPage1',
        type: 'view',
        hideInMenu: false,
        permissions: null,
        rank: 3,
        children: null
      },
      {
        name: '楼盘表测试',
        icon: 'check-circle-o',
        path: '/loupanbiao',
        component: null,
        type: 'menu',
        hideInMenu: false,
        permissions: null,
        rank: 4,
        children: [
          {
            name: '类型一',
            path: '/type1',
            component: '/LouPanBiao/Type1',
            type: 'view',
            hideInMenu: false,
            permissions: null,
          },
          {
            name: '类型二',
            path: '/type2',
            component: '/LouPanBiao/Type2',
            type: 'view',
            hideInMenu: false,
            permissions: null,
          },
          {
            name: '类型三',
            path: '/type3',
            component: '/LouPanBiao/Type3',
            type: 'view',
            hideInMenu: false,
            permissions: null,
          },
          {
            name: '类型三',
            path: '/type4',
            component: '/LouPanBiao/Type4',
            type: 'view',
            hideInMenu: false,
            permissions: null,
          }
        ],
      },
      {
        name: '异常页',
        icon: 'warning',
        path: '/exception',
        component: null,
        type: 'menu',
        hideInMenu: false,
        permissions: null,
        rank: 5,
        children: [
          {
            name: '403',
            path: '/403',
            component: '/Exception/403',
            type: 'view',
            hideInMenu: false,
            permissions: null,
          },
          {
            name: '404',
            path: '/404',
            component: '/Exception/404',
            type: 'view',
            hideInMenu: false,
            permissions: null,
          },
          {
            name: '500',
            path: '/500',
            component: '/Exception/500',
            type: 'view',
            hideInMenu: false,
            permissions: null,
          },
          {
            name: '触发异常',
            path: '/trigger',
            component: '/Exception/triggerException',
            type: 'view',
            hideInMenu: true,
            permissions: null,
          },
        ],
      },
      {
        name: '账户',
        icon: 'user',
        path: '/user',
        component: null,
        type: 'menu',
        hideInMenu: true,
        permissions: null,
        rank: 6,
        children: [
          {
            name: '登录',
            path: '/login',
            component: '/User/Login',
            type: 'view',
            hideInMenu: false,
            permissions: null,
          },
          {
            name: '注册',
            path: '/register',
            component: '/User/Register',
            type: 'view',
            hideInMenu: false,
            permissions: null,
          },
          {
            name: '注册结果',
            path: '/register-result',
            component: '/User/RegisterResult',
            type: 'view',
            hideInMenu: false,
            permissions: null,
          },
        ],
      }
    ]
  },
  {
    name: '系统二',
    icon: 'user',
    path: '/subModuleTest1',
    component: null,
    type: 'menu',
    hideInMenu: false,
    permissions: null,
    rank: 2,
    children: [
      {
        name: '子系统管理',
        icon: 'check-circle-o',
        path: '/system',
        component: null,
        type: 'menu',
        hideInMenu: false,
        permissions: null,
        rank: 1,
        children: [
          {
            name: '菜单管理',
            path: '/menu',
            component: '/System/Menu',
            type: 'view',
            hideInMenu: false,
            permissions: ['system_menu_list', 'system_menu_add', 'system_menu_detel', 'system_menu_editor']
          },
          {
            name: '用户管理',
            path: '/user',
            component: '/System/User',
            type: 'view',
            hideInMenu: false,
            permissions: ['system_user_list', 'system_user_add', 'system_user_detel', 'system_user_editor']
          },
          {
            name: '角色管理',
            path: '/role',
            component: '/System/Role',
            type: 'view',
            hideInMenu: false,
            permissions: ['system_role_list', 'system_role_add', 'system_role_detel', 'system_role_editor']
          }
        ]
      },
      {
        name: '子系统测试菜单',
        icon: 'check-circle-o',
        path: '/test',
        component: null,
        type: 'menu',
        hideInMenu: false,
        permissions: null,
        rank: 2,
        children: [
          {
            name: '二级-1',
            path: '/test-1',
            component: null,
            type: 'menu',
            hideInMenu: false,
            permissions: null,
            children: [
              {
                name: '三级-1',
                path: '/test-1-1',
                component: '/Test/TestPage1',
                type: 'view',
                hideInMenu: false,
                permissions: null
              },
              {
                name: '三级-2',
                path: '/test-1-2',
                component: '/Test/TestPage2',
                type: 'view',
                hideInMenu: false,
                permissions: null
              }
            ]
          },
          {
            name: '二级-2',
            path: '/test-2',
            component: '/Test/TestPage3',
            type: 'view',
            hideInMenu: false,
            permissions: null
          }
        ]
      },
    ]
  }
]
