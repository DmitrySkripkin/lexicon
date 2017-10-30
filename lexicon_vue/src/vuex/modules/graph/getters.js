// src/vuex/modules/vertexes/getters.js
export const getVertexes = state => state.vertexes
export const getVertex = state => id => state.vertexes.find(vetex => vetex._id === id)
export const getEdges = state => state.edges
