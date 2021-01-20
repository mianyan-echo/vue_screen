<template>
  <div id="app">
    <el-container>
      <el-header>远程监控系统</el-header>
      <el-main>
        <img alt="Vue logo" src="./assets/logo.png">
        <Dash_play_window v-for="ip_camera in ip_cameras" :key="ip_camera"
                          :cam="ip_camera" @onMinusValue="onMinusValue"/>
      </el-main>

      <el-button @click="$refs.footer.open()">打开底部抽屉</el-button>
      <footer_drawer ref="footer">
        <dash_play_card v-for="minus of minus_set" :key="minus"
                        :dash_url="minus" @CloseCard="onCloseCard"></dash_play_card>
      </footer_drawer>

    </el-container>
  </div>
</template>

<script>
import Dash_play_window from "@/components/dash_play_window";
import footer_drawer from "@/components/footer_drawer";
import dash_play_card from "@/components/dash_play_card";

import {ref} from 'vue';

export default {
  name: 'App',
  components: {
    Dash_play_window,
    footer_drawer,
    dash_play_card
  },

  setup() {
    const ip_cameras = ref(null);

    const minus_set = ref(new Set());

    return {
      ip_cameras,
      minus_set,
    }
  },
  methods: {
    onMinusValue(value) {
      this.minus_set.add(value)
    },
    onCloseCard(value) {
      this.minus_set.delete(value)
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
