import Vue from 'vue'
import App from './App.vue'
//引入ElementUI
import ElementUI from 'element-ui';
//引入ElementUI样式
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from "vue-router";
import router from './router/index'
Vue.config.productionTip = false
//使用ElementUI
Vue.use(ElementUI);
Vue.use(VueRouter);

new Vue({
  render: h => h(App),
  router:router
}).$mount('#app')
