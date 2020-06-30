import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/index.less'

import Antd from 'ant-design-vue'
Vue.use(Antd)
import 'ant-design-vue/dist/antd.css'
import { message } from 'ant-design-vue'
Vue.prototype.$message = message


import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts 

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
