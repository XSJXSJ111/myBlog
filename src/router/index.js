import Vue from 'vue'
import VueRouter from 'vue-router'
import routers from './router'
import store from '../store'

Vue.use(VueRouter)

// 路由配置
const RouterConfig = {
  mode: 'history',
  routes: routers
};

const router = new VueRouter(RouterConfig)

router.afterEach((to) => {
  window.scrollTo(0, 0);
});

export default router