<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
      <Dash_play_window v-for="ip_camera in ip_cameras"
                        :cam="ip_camera"/>
  </div>
</template>

<script>
import Dash_play_window from "@/components/dash_play_window";

export default {
  name: 'App',
  components: {
    Dash_play_window,
  },
  data() {
    return {
      ip_cameras: null,
    }
  },
  methods: {
    camera_list(){
      this.$rest_api.api_camera_list()
          .then(data => {
            this.ip_cameras = data;
          })
          .catch(err => {
            console.log(err);
          })
    }
  },
  created() {
    this.camera_list()
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
