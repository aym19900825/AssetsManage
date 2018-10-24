import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/login/login'
import user_management from '@/components/user_management' 
import ztree from '@/components/common/ztree' 
Vue.use(Router)

export default new Router({
  routes: [
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
  ]
})
