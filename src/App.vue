<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
      <Dash_play_window v-for="ip_camera in ip_cameras"
                        :key="ip_camera"
                        :cam="ip_camera"/>
  </div>
</template>

<script>
import Dash_play_window from "@/components/dash_play_window";
import {ref} from 'vue';

export default {
  name: 'App',
  components: {
    Dash_play_window,
  },

  setup() {
    const ip_cameras = ref(null);

    return {
      ip_cameras,
    }
  },
  mounted() {
    this.$rest_api.api_camera_list()
        .then(data => {
          this.ip_cameras = data;
        })
        .catch(err => {
          console.log(err);
        })
  }
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
