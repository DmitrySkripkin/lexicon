<template>
  <div class="topBar" v-bind:class="general.connected ? 'online' : ''">
    <div class="menu"><div></div></div>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'topBar',
  data () {
    return {
    }
  },
  computed: mapGetters({
    general: 'getGeneral'
  }),
  methods: {
  },
  mounted () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .topBar {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 50px;
    color: #fff;
    background-color: #d41e2a;
    transition: ease-in-out .2s all;
    align-items: center;
    padding: 0 10px;
    box-shadow: 0 0 15px rgba(0,0,0,.2);
  }
  .topBar.online {
    background-color: #4dcec5;
    transition: ease-in-out .2s all;
  }
  .menu {
    display: block;
    width: 20px;
    height: 2px;
    background: #fff;
    position: relative;
    border-radius: 1px;
    cursor: pointer;
  }

  .menu:hover {
    opacity: 0.7;
  }

  .menu:before, .menu:after {
    display: block;
    content: '';
    height: 2px;
    width: 25px;
    background: #fff;
    border-radius: 1px;
  }
  .menu:before {
    position: absolute;
    top: -8px;
    left: 0;
  }
  .menu:after {
    position: absolute;
    bottom: -9px;
    left: 0;
  }
  .menu>div {
    position: absolute;
    width: 100%;
    height: 24px;
    top: -12px;
    left: 0;
  }
</style>
