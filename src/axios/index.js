import Vue from 'vue'
import router from '../router'
import axios  from 'axios' 
import { Loading } from 'element-ui';

// axios.defaults.headers.post['Content-Type'] = 'application/json';
var loading;
axios.interceptors.request.use(
  request => {
    var token = sessionStorage.getItem('access_token');
    if (token) {
        request.headers.Authorization = 'Bearer ' + token;
    }
    loading = Loading.service({
      fullscreen: true,
      text: '拼命加载中...',
      background: 'rgba(0, 0, 0, 0.8)'
    });
    return request;
  },
  err => {
    loading.close();
    return Promise.reject(err)
  },
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    var _this = this;
    setTimeout(function(){
      loading.close();
    },500);
    return response;
  },
  error => {
    loading.close();

    if (error.response) {

    router.push({ path: '/' });
    if (error && error.response) {

      switch (error.response.status) {
        case 401:
          router.push({ path: '/' });
        case 403:
          router.push({ path: '/' });
      }
    }
    return Promise.reject(error.response.data);
    }
  },

)

Vue.prototype.$axios = axios
