// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
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
import moment from 'moment'
import './axios'
import vueGridLayout from 'vue-grid-layout'
//import infiniteScroll from 'vue-infinite-scroll'//滚动加载更多

// import Dropzone from 'dropzone/dist/min/dropzone.min.js'
// import 'dropzone/dist/min/dropzone.min.css'

import vueztree from 'vue-ztree-2.0/dist/vue-ztree-2.0.umd.min.js'
import EasyScroll from 'easyscroll'//自定义滚动条
import common from './assets/js/common.js'
import store from './store.js'

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


Vue.directive('loadmore', {
	bind(el, binding) {
	    const selectWrap = el.querySelector('.el-table__body-wrapper')
	    selectWrap.addEventListener('scroll', function() {
	      let sign = 100
	      const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
	      if (scrollDistance <= sign) {
	        binding.value()
	      }
	    })
	}
})

Vue.config.productionTip = false
let selectedNav={
	css: 'icon-user',
	name: '首页',
	url: '/index'}


var clickedNav=new Array();
clickedNav[0]=selectedNav
//tab 上选中的页面  只能有一个
Vue.prototype.$selectedNav = selectedNav //选中的tab
//所有tab的页面
Vue.prototype.$clickedNav = clickedNav   //点选的tab



Vue.prototype.$echarts = echarts
Vue.prototype.$moment = moment//赋值使用
Vue.prototype.common = common
Vue.use(ElementUI)
Vue.use(vueztree)
Vue.use(EasyScroll)//自定义滚动条
//Vue.use(infiniteScroll)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
 
/*window.Vue.directive('loadmore', {
  	bind(el, binding) {
    	const selectWrap = el.querySelector('.el-table__body-wrapper')
    	selectWrap.addEventListener('scroll', function() {
     	    let sign = 100;
     	    const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
     	    if (scrollDistance <= sign) {
     	      	binding.value();
     	    }
    	})
  	}
})*/

   
