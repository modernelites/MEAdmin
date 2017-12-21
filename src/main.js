// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import layer from 'vue-layer'
import $ from 'jquery'
import ElementUI from 'element-ui'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/lib/ueditor/ueditor.config.js'
import '../static/lib/ueditor/ueditor.all.min.js'
import '../static/lib/ueditor/lang/zh-cn/zh-cn.js'
import '../static/lib/ueditor/ueditor.parse.min.js'
require("es6-promise").polyfill();//ie全系列不识promise 需安装并引用es6-promise

Vue.use(ElementUI)
Vue.use(Element, { size: 'small' })
// layer
Vue.prototype.$layer = layer(Vue);
Vue.prototype.$http = axios
Vue.config.productionTip = false
// api地址
Vue.prototype.ApiUrl = 'http://172.16.0.111:2017'













window.eventBus = new Vue();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
