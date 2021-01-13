import _axios from 'axios';
import {_API_URL, _API} from "@/rest_api/api_v1"; // 在这里指定使用的api版本
// import Qs from 'qs'; // 用来处理参数，可不使用，若要使用，npm安装： npm install qs

_axios.defaults.baseURL = _API_URL.base_url; // 请求的默认域名
_axios.defaults.timeout = 3000; // 三秒超时

// 添加一个请求拦截器
_axios.interceptors.request.use(config => {
    config.headers.languagetype = 'CN'; // 举例，加上一个公共头部
    // config.data = Qs.stringify(config.data); // 处理数据，可不写
    return config;
  },
  err => {
    return Promise.reject(err);
  });

//添加一个响应拦截器
_axios.interceptors.response.use(res => {
  //在这里对返回的数据进行处理
  console.log(res.data, '网络正常');
  return res.data;
}, err => {
  console.log('网络开了小差！请重试...');
  return Promise.reject(err);
})

/*
* rest_api
* axios: 对外提供axios基础包
* API_URL: 生成每个rest_api的URL
* API: 最终封装好的对外提供的rest API接口函数集合,每一个接口函数都会对后端发起请求
*/
export const axios = _axios
export const API_URL = _API_URL
export const API = _API