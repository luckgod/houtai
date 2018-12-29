import Vue from 'vue'
import axios from 'axios'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'

Vue.use(ElementUI);
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
Vue.prototype.dataApi = require('./dataApi').default