<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Dash_play_window/>
  </div>
</template>

<script>
import Dash_play_window from "@/components/dash_play_window";

export default {
  name: 'App',
  components: {
    Dash_play_window,
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
