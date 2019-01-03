import Vue from 'vue'
import router from '../router'
import axios  from 'axios' 

// axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(
  request => {
    var token = sessionStorage.getItem('access_token');
    //console.log("token："+token);
    if (token) {
        request.headers.Authorization = 'Bearer ' + token;
    }
    return request;
  },
  err => {
    console.log('=======request error==========');
    return Promise.reject(err)
  },
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
      console.log('===========response=========');
      console.log(response);
      return response;
  },
  error => {
    if (error.response) {
      console.log('========  error.response =======');
      console.log(error.response.status);
      switch (error.response.status) {
        case 401:
          router.push({ path: '/' });
        case 403:
          router.push({ path: '/' });
      }
    }
    return Promise.reject(error.response.data);
  },
)

Vue.prototype.$axios = axios
