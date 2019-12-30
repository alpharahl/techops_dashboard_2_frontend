import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false;

import {VueMasonryPlugin} from "vue-masonry";
Vue.use(VueMasonryPlugin);

Vue.prototype.$bus = new Vue();

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
