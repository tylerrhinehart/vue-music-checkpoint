// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/mytunes-store.js'
import VueMaterial from 'vue-material'

import 'vue-material/dist/vue-material.css'
Vue.use(VueMaterial)


// import Sortable from 'vue-sortable'

// Vue.use(Sortable)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  store,
  VueMaterial,
  components: {
    App
  }
})
