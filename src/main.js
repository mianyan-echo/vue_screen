import Vue from 'vue'
import App from '@/App.vue'
import {axios, API} from "@/rest_api";

Vue.prototype.$axios = axios
Vue.prototype.$rest_api = API // 将API接口包注册到Vue全局
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
