// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import VueSocketio from 'vue-socket.io'
import VueCookie from 'vue-cookie'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(VueSocketio, 'http://localhost:3333', store)
Vue.use(VueCookie)
VueCookie.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QyQGV4YW1wbGUuY29tIiwiaWdub3JlRXhwaXJhdGlvbiI6dHJ1ZSwiaWF0IjoxNTA2ODA1NTY2fQ.NzWykmhW6VwqiWexsyZKeEIEhir27SoOK72fhT7-Wfs')

/* eslint-disable no-new */
new Vue({
  sockets: {
    connect: function () {
      console.log('socket connected')
      this.$message('connected')
    },
    customEmit: function (val) {
      console.log('custom emit', val)
    }
  },
  el: '#app',
  router,
  template: '<App/>',
  store,
  components: { App }
})
