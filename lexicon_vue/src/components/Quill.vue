<template>
  <div class="quill"></div>
</template>

<script>
import Quill from 'quill'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'
var icons = Quill.import('ui/icons')
import Link from '../modules/edgeLink'
Quill.register({
  'ui/icons': icons,
  'formats/link': Link
})
import { mapGetters } from 'vuex'
export default {
  name: 'quill',
  props: ['contents'],
  watch: {
    contents: function () {
      this.quill.setContents(this.contents)
    }
  },
  data () {
    return {
    }
  },
  computed: mapGetters({
    vertexes: 'getVertexes',
    edges: 'getEdges'
  }),
  methods: {
  },
  mounted () {
    let options = {
      placeholder: 'Compose an epic...',
      theme: 'bubble',
      modules: {
        toolbar: ['bold', 'italic', 'strike', 'link']
      }
    }

    this.quill = new Quill('.quill', options)
    this.quill.textChangeDebounce = false
    console.log('Quill', this.contents)
    this.quill.setContents(this.contents)
    this.quill.on('text-change', (delta, oldContents, source) => {
      if (source === 'user') {
        this.$emit('content', {delta, oldContents, source, newContents: oldContents.compose(delta)})
      }
    })
    // this.quill.on('text-change', (delta, oldDelta, source) => {
    //   if (source === 'api') return
    //   if (!delta || !delta.ops[0]) return
    //   // AUTOLINKS
    //   if (this.quill.textChangeDebounce) clearTimeout(this.quill.textChangeDebounce)
    //   this.quill.textChangeDebounce = setTimeout(() => {
    //     // let ops = this.quill.getContents().ops
    //     let retain = delta.ops[0].retain
    //     let leaf = this.quill.getLeaf(retain)[0]
    //     if (!leaf) return
    //     let leafs = [leaf]
    //     if (leaf.next && leaf.next.domNode && ['P', 'OL', 'UL'].indexOf(leaf.next.domNode.nodeName) === -1) leafs.push(leaf.next)
    //     if (leaf.prev && leaf.prev.domNode && ['P', 'OL', 'UL'].indexOf(leaf.prev.domNode.nodeName) === -1) leafs.unshift(leaf.prev)
    //     let startIndex = this.quill.getIndex(leafs[0])
    //     let extendedInsert = leafs.map(leaf => {
    //       return leaf.domNode.textContent
    //     }).join('')

    //     let index = extendedInsert.indexOf('#')
    //     if (index > -1) {
    //       console.log(startIndex, index)
    //       for (let vertex of this.vertexes) {
    //         console.log(vertex.title)
    //       }
    //     }
    //   }, 5)
    // })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .ql-editor {
    padding: 40px 0 0 0;
    font-size: 18px;
    line-height: 28px;
    font-family: serif;
    text-align: justify;
  }
</style>
