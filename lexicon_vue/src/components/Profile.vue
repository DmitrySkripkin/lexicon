<template>
  <div class="profile">
    <h2>profile</h2>
  </div>
</template>

<script>

export default {
  name: 'profile',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      check: true
    }
  },
  mounted () {
    console.log('MOUNTED')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
