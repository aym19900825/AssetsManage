// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'
import './assets/css/hxqheam-fonts.css'
import './assets/css/forms.css'
import './assets/css/tablelist.css'
import './assets/css/grid.css'
import $ from 'jquery'
import './axios'
import vueGridLayout from 'vue-grid-layout'
//import './jquery/dist/jquery.min.js'
//import 'bootstrap/dist/css/bootstrap.min.css'
//import 'bootstrap/dist/js/bootstrap.min.js'
//import 'metismenu/dist/metisMenu.js'
//import 'slimscroll/example/ssmaster/jquery.slimscroll.min.js'
//import 'ztree/js/jquery.ztree.all.min.js'
//import 'ztree/js/jquery.ztree.core.js'
//import 'ztree/css/zTreeStyle/zTreeStyle.css'
//import './assets/bootstrap/bootstrap.min.css'
//import './assets/bootstrap/bootstrap.min.js'




Vue.config.productionTip = false
Vue.prototype.$echarts = echarts 
Vue.use(ElementUI)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
