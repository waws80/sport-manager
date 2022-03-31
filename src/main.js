import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './plugins/iview.js'
import router from './router'
import Utils from "@/utils/common";

Vue.config.productionTip = false

Vue.prototype.Utils = Utils;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
