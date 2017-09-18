// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import layer from 'vue-layer'

// layer
Vue.prototype.$layer = layer(Vue);
Vue.prototype.$http = axios
Vue.config.productionTip = false
// api地址
Vue.prototype.ApiUrl = 'http://172.16.0.111:2017'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
