import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/login/login'
import user_management from '@/components/user_management' 
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
    meta:{
        requireAuth: true
    },
    component: user_management
  },
  ]
})
