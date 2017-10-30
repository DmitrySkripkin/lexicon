<template>
  <div id="app">
    <el-menu default-active="/" class="el-menu-demo" mode="horizontal" @select="navigate">
      <el-menu-item index="/">List</el-menu-item>
      <el-menu-item index="/profile">Profile</el-menu-item>
    </el-menu>
    <!-- <div class="connection-status">{{general.connected ? 'online' : ''}}</div> -->
    <!-- <img src="./assets/logo.png"> -->
    <el-row>
      <el-col :span="24">
        <router-view class="main"></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TopBar from './components/TopBar'
export default {
  name: 'app',
  components: {
    TopBar
  },
  computed: mapGetters({
    general: 'getGeneral'
  }),
  methods: {
    navigate: function (name) {
      console.log(name)
      this.$router.push(name)
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
body, html {
  min-height: 100vh;
  padding: 0;
  margin: 0;
  position: relative;
}
#app {
  height: 100%;
  min-height: 100vh;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  background-color: #f9faff;
}
.main {
  padding: 40px 0px;
}
section {
  max-width: 740px;
  margin: 0 auto;
  padding: 30px;
  box-sizing: content-box;
  background-color: #fff;
  box-shadow: 0 10px 60px 0 rgba(29,29,31,0.07);
}
.el-menu {
  background-color: #fff;
  box-shadow: 0 10px 60px 0 rgba(29,29,31,0.07);
}
</style>
