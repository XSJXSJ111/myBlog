import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLocalStorage from 'vue-ls'
import { sync } from 'vuex-router-sync'

import Vant from 'vant'
import 'vant/lib/vant-css/index.css'

Vue.use(VueLocalStorage, {
  namespace: 'bolg_'
});
sync(store, router)

Vue.use(Vant)

Vue.config.productionTip = false

//配置Service Worker
if (navigator.serviceWorker) {
  window.addEventListener('DOMContentLoaded', function () {
    // 调用 serviceWorker.register 注册，参数/sw.js 为脚本文件所在的 URL 路径 
    navigator.serviceWorker.register('../sw.js', {
      scope: './'
    })
  })
}

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
