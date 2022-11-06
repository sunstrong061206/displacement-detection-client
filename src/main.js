import Vue from 'vue'
import App from './App.vue'

import './assets/iconfont/iconfont.css'

Vue.config.productionTip = false

// TODO 实际 使用过程中，不涉及请求数据，只有WebSocket连接，可以删除api目录，并修改vue.config.js文件

new Vue({
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  },
}).$mount('#app')
