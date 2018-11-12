import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/login/login'//登录页
import index from '@/components/index'//首页
import all_icons from '@/components/common/all_icons'//所有图标
import maindata from '@/components/maindata'//主数据
import demo from '@/components/demo'//demo
import customer_management from '@/components/customer_management'//客户管理
import products_category from '@/components/products_category'//产品类别
import products from '@/components/products'//产品
import testing_standard from '@/components/testing_standard'//检验/检测标准
import testing_projects from '@/components/testing_projects'//检验/检测项目
import testing_methods from '@/components/testing_methods'//检验/检测方法
import number_settings from '@/components/number_settings'//自动编号设置
import user_management from '@/components/user_management'//用户管理
import dept_management from '@/components/dept_management'//部门管理
import menu_management from '@/components/menu_management'//菜单管理
import data_management from '@/components/data_management'//数据管理
import role_management from '@/components/role_management'//角色管理
import safe_management from '@/components/safe_management'//安全管理
import dictionaries_management from '@/components/dictionaries_management'//字典管理
import personinfo from '@/components/personinfo'//个人资料
import passwordedit from '@/components/passwordedit'//修改密码
import ztree from '@/components/common/ztree' //树菜单 
// import test from '@/components/test'
// 
Vue.use(Router)

  const routes = [
    {//登录页
      path: '/',
      name: 'Login',
      component: Login
    },
    {//首页
      path: '/index',
      name: 'index',
      component: index
    },
    {//Demo
      path: '/demo',
      name: 'demo',
      component: demo
    },
    {//所有图标
      path: '/all_icons',
      name: 'all_icons',
      component: all_icons
    },
    {//主数据
      path: '/maindata',
      name: 'maindata',
      component: maindata
    },
    {//客户管理
      path: '/customer_management',
      name: 'customer_management',
      component: customer_management
    },
    {//产品类别
      path: '/products_category',
      name: 'products_category',
      component: products_category
    },
    {//产品
      path: '/products',
      name: 'products',
      component: products
    },
    {//检验/检测标准
      path: '/testing_standard',
      name: 'testing_standard',
      component: testing_standard
    },
    {//检验/检测项目
      path: '/testing_projects',
      name: 'testing_projects',
      component: testing_projects
    },
    {//检验/检测方法
      path: '/testing_methods',
      name: 'testing_methods',
      component: testing_methods
    },
    {//自动编号设置
      path: '/number_settings',
      name: 'number_settings',
      component: number_settings
    },
    {//用户管理
    	path: '/user_management',
    	name: 'user_management',
    	component: user_management
  	},
    {//安全管理
      path: '/safe_management',
      name: 'safe_management',
      component: safe_management
    },
    {//字典管理
      path: '/dictionaries_management',
      name: 'dictionaries_management',
      component: dictionaries_management
    },
    {//个人资料
      path: '/personinfo',
      name: 'personinfo',
      component: personinfo
    },
    {//修改密码
      path: '/passwordedit',
      name: 'passwordedit',
      component: passwordedit
    },
  	{//树菜单
    	path: '/ztree',
    	name: 'ztree',
    	component:ztree  
  	},
  	{//菜单管理
      path: '/menu_management',
      name: 'menu_management',
      component: menu_management
    },
    {
      path: '/dept_management',
      name: 'dept_management',
      component: dept_management
    },
    {//角色管理
      path: '/role_management',
      name: 'role_management',
      component: role_management
    },
    // {
    //   path: '/test',
    //   name: 'test',
    //   component: test
    // },

  ];


const router = new Router({
  routes: routes
})
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        var token = sessionStorage.getItem('access_token');
        if (token) {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            next({
                path: '/',
            })
        }
    }
    else {
        next();
    }
})

export default  router
