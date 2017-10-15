// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios'
import Layout from '@/components/Layout'
import Util from '@/plugins/Utility.js'

axios.defaults.baseURL = 'http://localhost:8080'
Vue.use(ElementUI)
Vue.use(Util)
// 这样所有Vue组件中都可以通过this.axios来使用
Vue.prototype.axios = axios

/* eslint-disable no-new */
new Vue({
  // 挂载在index.html中的<div id='app'>中
  el: '#app',
  router,
  template: '<Layout/>',
  components: { Layout }
})

