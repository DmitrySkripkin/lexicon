// src/vuex/modules/vertexes/actions.js
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

export function socket_customEmit ({ commit }) {
  commit(SOCKET_CUSTOM_EMIT)
}

export function socket_removeVertex ({ commit }, vertexId) {
  commit(SOCKET_REMOVE_VERTEX, vertexId)
}
export function socket_addVertex ({ commit }, vertex) {
  commit(SOCKET_ADD_VERTEX, vertex)
}
export function socket_getVertexes ({ commit }, vertexes) {
  commit(SOCKET_GET_VERTEXES, vertexes)
}
export function socket_getVertex ({ commit }, vertex) {
  commit(SOCKET_GET_VERTEX, vertex)
}
export function socket_editVertex ({ commit }, vertex) {
  commit(SOCKET_EDIT_VERTEX, vertex)
}

export function socket_removeEdge ({ commit }, vertexId) {
  commit(SOCKET_REMOVE_EDGE, vertexId)
}
export function socket_addEdge ({ commit }, vertex) {
  commit(SOCKET_ADD_EDGE, vertex)
}
export function socket_getEdges ({ commit }, vertexes) {
  commit(SOCKET_GET_EDGES, vertexes)
}
export function socket_getEdge ({ commit }, vertex) {
  commit(SOCKET_GET_EDGE, vertex)
}

