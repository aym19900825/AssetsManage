import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/login/login'
import user_management from '@/components/user_management' 
import ztree from '@/components/common/ztree' 
Vue.use(Router)


  const routes = [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
    	path: '/user_management',
    	name: 'user_management',
    	component: user_management
  	},
  	{
    	path: '/ztree',
    	name: 'ztree',
    	component:ztree
    
   
  	},
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
