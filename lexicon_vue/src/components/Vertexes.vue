<template>
  <div class="vertexes">
    <section>
      <!-- <div v-for="vertex in vertexes" track-by="id" class="vertexes-list col-md-24">
        <router-link v-bind:to="'/vertex/' + vertex._id">{{vertex.title}}</router-link>
      </div> -->
      <el-table
        empty-text="No data"
        :data="vertexes"
        style="width: 100%"
        @row-click="open">
        <el-table-column
          prop="title"
          label="Title">
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Vertexes',
  data () {
    return {
      vertexColumns: [
        {
          title: 'Title',
          key: 'title'
        }
      ]
    }
  },
  computed: mapGetters({
    vertexes: 'getVertexes',
    edges: 'getEdges',
    general: 'getGeneral'
  }),
  methods: {
    ...mapActions([
      'socket_removeVertex',
      'socket_addVertex'
    ]),
    remove (vertexId) {
      this.$socket.emit('removeVertex', vertexId)
    },
    add () {
      this.$socket.emit('addVertex', {title: 'hello', content: 'world!'})
      // this.socket_addArticle({title: 'hello', content: 'world!'})
    },
    open (data) {
      this.$router.push(`/vertex/${data._id}`)
    }
  },
  mounted () {
    console.log('MOUNTED')
    // setTimeout(this.add, 3000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

.vertexes-list {
  list-style-type: none;
  padding: 0;
}
.vertexes-list {

}
/*.vertexes-list>li {
  display: inline-block;
  margin: 0 10px;
}

.vertexes-list>li>a {
  display: block;
  font-size: 1.6em;
}

.vertexes-list>li>a::first-letter {
  color: red;
}*/

a {
  color: inherit;
  text-decoration: none;
}
</style>
