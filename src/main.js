import Vue from 'vue';
import App from '@/App.vue';
import {axios, API} from "@/rest_api";

// 导入element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.$axios = axios;
Vue.prototype.$rest_api = API; // 将API接口包注册到Vue全局

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
