<template>
  <div id="app">
    <user_login v-if="!is_login" @auth_pass="auth"></user_login>

    <el-container v-if="is_login">
      <el-header>
        <div style="display: inline"><b>远程监控系统</b></div>
        <div style="display: inline;float: right;">
          {{username}}
          <el-button
              type="info"
              @click="logout">登出</el-button></div>
      </el-header>
      <el-main>
<!--        <img alt="Vue logo" src="./assets/logo.png">-->
        <beijing_map :all_cameras="ip_cameras" @minus_value="onMinusValue"/>
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
import footer_drawer from "@/components/footer_drawer";
import dash_play_card from "@/components/dash_play_card";
import beijing_map from "@/components/echarts/beijing_map";

import {ref} from 'vue';
import user_login from "@/components/user_login";

export default {
  name: 'App',
  components: {
    user_login,
    footer_drawer,
    dash_play_card,
    beijing_map
  },

  setup() {
    const ip_cameras = ref(null);

    const minus_set = ref(new Set());
    const is_login = ref(false);
    const username = ref(null);

    if (localStorage.getItem('token')){
      username.value = localStorage.getItem('username')
      is_login.value = true
    }

    return {
      ip_cameras,
      minus_set,
      is_login,
      username,
    }
  },
  methods: {
    onMinusValue(value) {
      this.minus_set.add(value)
    },
    onCloseCard(value) {
      this.minus_set.delete(value)
    },
    auth(value) {
      this.is_login = true;
      this.username = value;
    },
    logout() {
      localStorage.clear();
      this.is_login = false;
    }
  },
  watch: {
    is_login(new_value) {
      if (new_value){
        this.$rest_api.api_camera_list()
            .then(data => {
              this.ip_cameras = data;
            })
            .catch(err => {
              console.log(err);
            })
      }
    }
  },
  mounted() {
    if (this.is_login) {
      this.$rest_api.api_camera_list()
          .then(data => {
            this.ip_cameras = data;
          })
          .catch(err => {
            console.log(err);
          })
    }
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
.dv-border-box-1 {
  flex-grow: 1;
}
</style>
