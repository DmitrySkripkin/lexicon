import Vue from 'vue'
import Router from 'vue-router'
import Vertexes from '@/components/Vertexes'
import Vertex from '@/components/Vertex'
import Profile from '@/components/Profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'vertexes',
      component: Vertexes
    },
    {
      path: '/vertex/:id',
      name: 'vertex',
      component: Vertex
    },

    {
      path: '/profile',
      name: 'profile',
      component: Profile
    }
  ]
})
