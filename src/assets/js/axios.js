import axios from 'axios'
import {BASEURL} from './config.js'
import {message} from 'ant-design-vue'
const qs=require("qs");
// axios.defaults.withCredentials = true;
// axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded;charset=utf-8";
axios.interceptors.request.use(
  config => {
  // 判断是否存在token，如果存在的话，则每个http header都加上token
    let token = sessionStorage.getItem('token')
    if (token) {
      config.headers.token = token;
    }    
    return config;
  },
  error => {
    return Promise.reject(error);
  });

export let myAxios = (method, url, params) => {
  let request= method!='get' ?{
    method: method,
    url: BASEURL + url,
    data:params,
  }:{
    methods: method,
    url: BASEURL + url,
    params ,
  };
  console.log('请求',request,);
  return new Promise((resolve, reject) => {
    axios(request)
      .then(function (response) {
        if (response.data.code == '401') {
          sessionStorage.clear();
          location.href = "/#/login"
          return;
        }
        if(response.data.code==200){
          resolve(response.data);
        }else{
          message.open({
            content: response.data.msg,
            type: 'error'
          })
          resolve(response.data)
        }
      })
      .catch(function (err) {
          message.open({
            content: '获取信息失败',
            type: 'error'
          })
          reject(err);
      });
  })
}