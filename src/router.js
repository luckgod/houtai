import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import NavLeft from './components/public/NavLeft.vue'
import NavTop from './components/public/NavTop.vue'
Vue.use(Router)
Vue.component('navleft', NavLeft)
Vue.component('navtop', NavTop)
export default new Router({
  routes: [
    
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/',
      name: 'login',
      component: resolve => require(['./views/login/Login.vue'], resolve),
      hidden: true,
      
      
    },
    {
      path: '/register',
            component: resolve => require(['./views/login/Register.vue'], resolve),
            name:'register',
            hidden: true,
            
    
    },
    {
      path: '/forgetpassword',
            component: resolve => require(['./views/login/ForgetPassword.vue'], resolve),
            name:'forgetpassword',
            hidden: true,
            
    
    },
    {
      path: '/home',
            component: resolve => require(['./views/home/Home.vue'], resolve),
            name:'home',
            hidden: true,
            // meta: { keepAlive: true },
            redirect: {name: 'audit'},
            children:[
              {
                path: '/audit',
                      component: resolve => require(['./views/audit/Audit.vue'], resolve),
                      name:'audit',
                      hidden: true,
                      // meta: { keepAlive: true },
              
              },
              {
                path: '/companydata',
                      component: resolve => require(['./views/company/CompanyData.vue'], resolve),
                      name:'companydata',
                      hidden: true,
                      // meta: { keepAlive: true },
              
              },
              {
                path: '/releasemanagement',
                      component: resolve => require(['./views/releasemanagement/ReleaseManagement.vue'], resolve),
                      name:'ReleaseManagement',
                      hidden: true,
                      // meta: { keepAlive: true },
              
              },
            ]
    
    },
    {
      path: '/404',
      component: resolve => require(['./views/404.vue'], resolve),
      name: '404',
      hidden: true
  },
  ]
})
