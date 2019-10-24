import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VDistpicker from 'v-distpicker'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'
import Mock from './mock'
// Mock.bootstrap();
import VueResource from 'vue-resource'
import 'font-awesome/css/font-awesome.min.css'
import myCharts from "./common/js/myCharts";
import axios from 'axios'
import globalvariable from './global'
import htmlToPdf from "./common/js/htmlToPdf";

Vue.use(htmlToPdf)
Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(myCharts)
Vue.use(VueResource);
Vue.component('v-distpicker', VDistpicker)

//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login' && to.path!='/register') {
    next({ path: '/login' })
  }
  else {
    next()
  }
})

//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')

