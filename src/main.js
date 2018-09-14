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
Vue.prototype.$http = axios;
axios.defaults.withCredentials = true;
Vue.config.productionTip = false;
// api地址
// Vue.prototype.ApiUrl = 'http://localhost:8081/'
// Vue.prototype.ApiUrl = 'http://172.16.0.222:8081/'
// Vue.prototype.ApiUrl = 'http://172.16.0.222:2017'
Vue.prototype.ApiUrl = 'http://www.myjy.biz:8081/'





Date.prototype.format = function(fmt) { 
  var o = { 
     "M+" : this.getMonth()+1,                 //月份 
     "d+" : this.getDate(),                    //日 
     "h+" : this.getHours(),                   //小时 
     "m+" : this.getMinutes(),                 //分 
     "s+" : this.getSeconds(),                 //秒 
     "q+" : Math.floor((this.getMonth()+3)/3), //季度 
     "S"  : this.getMilliseconds()             //毫秒 
 }; 
 if(/(y+)/.test(fmt)) {
         fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
 }
  for(var k in o) {
     if(new RegExp("("+ k +")").test(fmt)){
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      }
  }
 return fmt; 
}        







window.eventBus = new Vue();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
