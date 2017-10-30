// src/vuex/modules/vertexes/index.js
import * as actions from './actions'
import * as getters from './getters'

import {
  SOCKET_UPDATE_CONNECTION
} from './mutation-types'

// initial state
const initialState = {
  connected: false
}

// mutations
const mutations = {
  [SOCKET_UPDATE_CONNECTION] (state, status) {
    console.log('mutation -> connected')
    state.connected = status
  }
}

export default {
  state: { ...initialState },
  actions,
  getters,
  mutations
}
