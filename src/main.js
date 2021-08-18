import Vue from 'vue'
import App from './App.vue'
// import Vuex from 'vuex'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import store from './store'
import router from './router'
import http from './http'
import config from './config'
import moment from 'moment'
import i18n from '@/lang/message'
import VueNoty from 'vuejs-noty'
import 'vuejs-noty/dist/vuejs-noty.css'
import HighchartsVue from "highcharts-vue";

Vue.use(HighchartsVue)

Vue.use(VueNoty, {
  timeout: 1500,
  progressBar: true,
  layout: 'topRight',
  theme: 'metroui'
})

Vue.config.productionTip = false

Vue.prototype.$displayDateTime = function (mysqlDateTime, type = "short") {
  let time = moment(mysqlDateTime).format(store.state.options.displayDateFormat)
  if (type == "long") {
    time = moment(mysqlDateTime).format(store.state.options.displayFullDateTimeFormat)
  }
  return time
}

new Vue({
  i18n,
  vuetify,
  store,
  router,
  config,
  http,
  render: h => h(App)
}).$mount('#app')