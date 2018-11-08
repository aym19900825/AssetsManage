import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/login/login'
import index from '@/components/index'
import all_icons from '@/components/all_icons'
import maindata from '@/components/maindata' 
import user_management from '@/components/user_management' 
import dept_management from '@/components/dept_management'
import menu_management from '@/components/menu_management'
import data_management from '@/components/data_management'
import role_management from '@/components/role_management'
import safe_management from '@/components/safe_management'
import dictionaries_management from '@/components/dictionaries_management'
// import test from '@/components/test'
import personinfo from '@/components/personinfo'
import passwordedit from '@/components/passwordedit'
import ztree from '@/components/common/ztree' 
Vue.use(Router)

  const routes = [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },{
      path: '/all_icons',
      name: 'all_icons',
      component: all_icons
    },
    {
      path: '/maindata',
      name: 'maindata',
      component: maindata
    },
    {
    	path: '/user_management',
    	name: 'user_management',
    	component: user_management
  	},
    {
      path: '/dept_management',
      name: 'dept_management',
      component: dept_management
    },
    {
      path: '/data_management',
      name: 'data_management',
      component: data_management
    },
    {
      path: '/safe_management',
      name: 'safe_management',
      component: safe_management
    },
    {
      path: '/dictionaries_management',
      name: 'dictionaries_management',
      component: dictionaries_management
    },
    {
      path: '/personinfo',
      name: 'personinfo',
      component: personinfo
    },
    {
      path: '/passwordedit',
      name: 'passwordedit',
      component: passwordedit
    },
  	{
    	path: '/ztree',
    	name: 'ztree',
    	component:ztree  
  	},
  	{
      path: '/menu_management',
      name: 'menu_management',
      component: menu_management
    },
    {
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
