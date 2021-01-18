<template>
  <div id="app">
    <el-container>
      <el-header>远程监控系统</el-header>
      <el-main>
        <img alt="Vue logo" src="./assets/logo.png">
        <Dash_play_window v-for="ip_camera in ip_cameras"
                          :key="ip_camera"
                          :cam="ip_camera"/>
      </el-main>
    </el-container>
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

}
html, body, #app, .el-container {
  padding: 0;
  margin: 0;
  height: 100%;
}
.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-main {
  background-color: #f3f6f8;
  color: #333;
  flex-grow:1;
}
</style>
