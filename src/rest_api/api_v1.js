/*
* API模块，集中管理一个api版本的api_url与api接口函数
* 只对内rest_api内提供，所以名称前前加_
* */
import {get} from "@/rest_api/request_methods";

const API_VERSION = 'api-v1';
const BASE_URL = 'http://127.0.0.1:8000/'+API_VERSION+'/';

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
    // 获得指定ip摄像头的MPEG DASH直播地址
    api_camera_dash_url(uid) {
        return get(_API_URL.ip_camera_dash(uid).href());
    },
}