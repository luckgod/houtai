import Vue from 'vue'
import axios from 'axios'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import Promise from "promise-polyfill";
Vue.use(ElementUI);
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
Vue.config.productionTip = false
if(!window.Promise){
  window.Promise = Promise;
}
axios.defaults.baseURL = 'https://weapp.kedou.kedunwl.com/'
new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
Vue.prototype.dataApi = require('./dataApi').default
Vue.prototype.uploadF = require('./assets/js/uploadAliyun').default
