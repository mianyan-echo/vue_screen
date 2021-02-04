/*
* 在此文件内再封装axios的 request 请求方法
* 方便后续API调用
* 模块化管理维护代码
* */
import {axios} from '@/rest_api';

// 封装GET方法
export function get(url, params){
    return new Promise((resolve, reject) =>{
       axios.get(url, {
           params: params
       })
           .then(res =>{
               resolve(res.data);
           })
           .catch(err => {
               reject(err.data)
           })
    });
}

// 封装POST方法
export function post(url, data_json){
    return new Promise((resolve, reject) =>{
       axios.post(url, data_json)
           .then(res =>{
               resolve(res.data);
           })
           .catch(err => {
               reject(err.response)
           })
    });
}