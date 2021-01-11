<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Small_window>
      <Dash_player></Dash_player>
    </Small_window>
    <HelloWorld msg="abc"/>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';
import Small_window from '@/components/small_window';
import Dash_player from "@/components/dash_player";

export default {
  name: 'App',
  data() {
  },
  components: {
    Dash_player,
    HelloWorld,
    Small_window,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
