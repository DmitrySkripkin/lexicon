<template>
  <div class="vertex">
    <section v-if="vertex($route.params.id)">
      <el-input
        class="vertex-title"
        placeholder="Title"
        @change="onTitleChange"
        v-model="title">
      </el-input>
      <quill v-on:content="onContentChange" :contents="vertex($route.params.id).content"></quill>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Quill from './Quill.vue'
export default {
  name: 'Vertex',
  components: {
    Quill
  },
  data () {
    return {
      title: ''
    }
  },
  computed: mapGetters({
    vertexes: 'getVertexes',
    edges: 'getEdges',
    general: 'getGeneral',
    vertex: 'getVertex'
  }),
  methods: {
    ...mapActions([
      'socket_removeVertex',
      'socket_addVertex',
      'socket_editVertex'
    ]),
    remove (vertexId) {
      this.$socket.emit('removeVertex', vertexId)
    },
    add () {
      this.$socket.emit('addVertex', {title: 'hello', content: 'world!'})
    },
    onContentChange (data) {
      this.$socket.emit('editVertex', {changed: {content: data.newContents}, vertex: this.vertex(this.$route.params.id)})
    },
    onTitleChange (data) {
      this.$socket.emit('editVertex', {changed: {title: this.title}, vertex: this.vertex(this.$route.params.id)})
    }
  },
  mounted () {
    console.log('MOUNTED VERTEX')
    this.$store.subscribe((mutation) => {
      console.log(mutation)
      if (mutation.type === 'vertexes/SOCKET_GET_VERTEXES') {
        this.title = this.vertex(this.$route.params.id).title
      } else if (mutation.type === 'vertexes/SOCKET_EDIT_VERTEX' && mutation.payload._id === this.$route.params.id) {
        this.title = this.vertex(this.$route.params.id).title
      }
    })
    if (this.vertex(this.$route.params.id) && this.vertex(this.$route.params.id).title) {
      this.title = this.vertex(this.$route.params.id).title
    }
    // setTimeout(this.add, 3000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.vertex {
  
}
.vertex-title {
  margin-top: 0;
  margin-bottom: 40px;
}
.vertex-title input {
  font-family: serif;
  font-size: 36px;
  border: none;
  padding: 0;
  height: auto;
}
</style>
