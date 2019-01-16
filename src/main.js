import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Echarts from 'echarts'

Vue.use(Echarts)
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Promise from "promise-polyfill";
import Dropdown from 'hsy-vue-dropdown'
import multiCascader from "multi-cascader";
import cascaderMulti from "cascader-multi";
import './assets/css/weui.min.css'
window.echarts = require('echarts');
Vue.use(iView);
Vue.use(cascaderMulti);
Vue.use(multiCascader);
Vue.use(Dropdown)
Vue.use(ElementUI);
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
Vue.config.productionTip = false
if(!window.Promise){
  window.Promise = Promise;
}
// axios.defaults.baseURL = 'https://weapp.kedou.kedunwl.com/'
new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
Vue.prototype.dataApi = require('./dataApi').default
Vue.prototype.uploadF = require('./assets/js/uploadAliyun').default
Vue.prototype.echarts = Echarts

Vue.prototype.$echarts = echarts