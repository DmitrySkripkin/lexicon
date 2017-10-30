// src/vuex/store.js
import Vue from 'vue'
import Vuex from 'vuex'

import graph from './modules/graph'
import general from './modules/general'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    graph,
    general
  },
  strict: debug
})
