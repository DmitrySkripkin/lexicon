// src/vuex/modules/vertexes/index.js
import * as actions from './actions'
import * as getters from './getters'

import {
  SOCKET_CUSTOM_EMIT,

  SOCKET_REMOVE_VERTEX,
  SOCKET_ADD_VERTEX,
  SOCKET_GET_VERTEXES,
  SOCKET_GET_VERTEX,
  SOCKET_EDIT_VERTEX,

  SOCKET_REMOVE_EDGE,
  SOCKET_ADD_EDGE,
  SOCKET_GET_EDGES,
  SOCKET_GET_EDGE
} from './mutation-types'

// initial state
const initialState = {
  vertexes: [],
  edges: []
}

// mutations
const mutations = {
  [SOCKET_CUSTOM_EMIT] (state, event) {
    console.log('customEmit mutation')
  },

  [SOCKET_REMOVE_VERTEX] (state, id) {
    state.vertexes = state.vertexes.filter(p => p._id !== id)
  },
  [SOCKET_ADD_VERTEX] (state, vertex) {
    console.log('add vertex')
    state.vertexes = state.vertexes.concat([vertex])
  },
  [SOCKET_GET_VERTEXES] (state, vertexes) {
    console.log('SOCKET_GET_VERTEXES', vertexes)
    state.vertexes = vertexes
  },
  [SOCKET_GET_VERTEX] (state, vertex) {
    console.log('SOCKET_GET_VERTEX', vertex)
    state.vertexes = state.vertexes.concat([vertex])
  },
  [SOCKET_EDIT_VERTEX] (state, vertex) {
    console.log(vertex)
    state.vertexes.map(p => p._id === vertex._id ? Object.assign(p, vertex) : p)
  },

  [SOCKET_REMOVE_EDGE] (state, id) {
    state.edges = state.edges.filter(p => p._id !== id)
  },
  [SOCKET_ADD_EDGE] (state, edge) {
    console.log('add edge')
    state.edges = state.edges.concat([edge])
  },
  [SOCKET_GET_EDGES] (state, edges) {
    console.log('SOCKET_GET_EDGES', edges)
    state.edges = edges
  },
  [SOCKET_GET_EDGE] (state, edge) {
    console.log('SOCKET_GET_EDGE', edge)
    state.edges = state.edges.concat([edge])
  }
}

export default {
  state: { ...initialState },
  actions,
  getters,
  mutations
}
