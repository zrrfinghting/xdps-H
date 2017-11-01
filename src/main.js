// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import routes from './router'
import store from './store'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'font-awesome/css/font-awesome.min.css'
import 'element-ui/lib/theme-default/index.css'
Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(ElementUI)
const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})