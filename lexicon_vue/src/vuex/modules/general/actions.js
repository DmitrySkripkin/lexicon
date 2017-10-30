// src/vuex/modules/vertexes/actions.js
import {
  SOCKET_UPDATE_CONNECTION
} from './mutation-types'

export function socket_updateConnection ({ commit }, status) {
  console.log('socket action')
  commit(SOCKET_UPDATE_CONNECTION, true)
}
