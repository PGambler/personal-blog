// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import elementUI from "element-ui"
import "../static/css/elementui/theme/index.css"
import "../static/css/index.css"
import router from "@/router"
import highlight from "@/plugins/customHighlight.js"
import { VueAxios } from './common/request'
import moment from 'moment'

Vue.config.productionTip = false
Vue.use(elementUI)
Vue.use(VueAxios)
Vue.use(highlight)
Vue.prototype.$moment = moment;

Vue.prototype.BASE_URL = process.env.BASE_URL;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router
})
