/*
* API模块，集中管理一个api版本的api_url与api接口函数
* 只对内rest_api内提供，所以名称前前加_
* */
import {get} from "@/rest_api/request_methods";

const API_VERSION = 'api-v1';
const BASE_URL = 'http://127.0.0.1:8080/'+API_VERSION+'/';

// API_URL封装，统一返回URL对象
export const _API_URL = {
    api_version: API_VERSION,
    base_url: BASE_URL,
    //ip摄像头列表url
    ip_camera_list() {
        let url = new URL(this.base_url);
        url.pathname += 'ipcameras/';
        return url;
    },
    //ip摄像头详细信息
    ip_camera(uid) {
        let url = this.ip_camera_list();
        url.pathname += uid+'/';
        return url;
    },
    //只返回ip摄像头的具体条目内容
    ip_camera_entry(uid, entry_name) {
        let url = this.ip_camera_list();
        url.pathname += uid+'/';
        url.searchParams.set('entry', entry_name);
        return url;
    },
    //只返回ip摄像头的MPEG DASH源地址
    ip_camera_dash(uid) {
        return this.ip_camera_entry(uid, 'dash_url')
    },
    //以某一geohash为原点，搜寻一定范围内的ip摄像头
    search_ip_camera_by_geohash(geohash, range) {
        let url = this.ip_camera_list();
        url.searchParams.set('geohash', geohash);
        url.searchParams.set('range', range);
        return url
    },
}

// API封装，封装使用axios进行请求的函数
export const _API = {
    // 获得完整的ip摄像头列表
    api_camera_list() {
        let url = _API_URL.ip_camera_list()
        return new Promise((resolve, reject)=>{
            get(url)
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                })
        })
    },

    // 获得指定ip摄像头的MPEG DASH直播地址
    api_camera_dash_url(uid) {
        let url = _API_URL.ip_camera_dash(uid);
        // 这里没有找到合适的办法将数据从promise链中拿出来对外提供，只能再起一个promise链
        return new Promise((resolve, reject)=>{
            get(url)
                .then(data => {
                    resolve(data.dash_url);
                })
                .catch(err => {
                    reject(err);
                })
        })
    },

    // 获得指定ip摄像头的HLS直播地址
    api_camera_hls_url(uid) {
        let url = _API_URL.ip_camera_entry(uid, 'hls_url');
        return new Promise((resolve, reject)=>{
            get(url)
                .then(data => {
                    resolve(data.hls_url);
                })
                .catch(err => {
                    reject(err);
                })
        })
    },

    // 按geohash查询一定范围内的摄像头
    api_search_camera_by_geohash(geohash, range) {
        let url = _API_URL.search_ip_camera_by_geohash(geohash, range);
        return new Promise((resolve, reject)=>{
            get(url)
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                })
        })
    },
}