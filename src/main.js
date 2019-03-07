// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'

import echarts from 'echarts'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'
import './assets/css/hxqheam-fonts.css'
import './assets/css/forms.css'
import './assets/css/tablelist.css'
import './assets/css/grid.css'
import $ from 'jquery'
import moment from 'moment'
import vueGridLayout from 'vue-grid-layout'
import vueztree from 'vue-ztree-2.0/dist/vue-ztree-2.0.umd.min.js'
import EasyScroll from 'easyscroll'//自定义滚动条
import common from './assets/js/common.js'
import store from './store.js'
import Validators from './core/util/validators.js'
import './axios'


Vue.config.productionTip = false

Vue.prototype.$echarts = echarts;
Vue.prototype.$moment = moment;//赋值使用
Vue.prototype.common = common;
Vue.prototype.Validators = Validators;
Vue.use(ElementUI);
Vue.use(vueztree);

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App),
})


