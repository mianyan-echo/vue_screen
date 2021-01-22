<template>
  <div>
    <div v-show="popup"
         class="small_window"
         ref="small_window"
         @mousedown="mouseDownHandleelse"
         @mouseup="mouseUpHandleelse">
      <el-card :body-style="{padding: '0px',background: '#d4dcea'}" shadow="hover">
        <template #header>
          <div class="clearfix">
            <span></span>
            <el-button style="float: right; padding: 3px 3px;"
                       type="danger"
                       icon="el-icon-close"
                       @click="close_popup"
                       size="small"
                       circle
                       autofocus></el-button>
            <el-button style="float: right; padding: 3px 3px;"
                       type="warning"
                       icon="el-icon-minus"
                       @click="minus_popup(dash_url)"
                       size="small"
                       circle
                       autofocus></el-button>
          </div>
        </template>
        <div class="text item">
          <Dash_player v-if="popup"
                       ref="dash_player"
                       :dash_url="dash_url"/>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import Small_window from '@/components/small_window';
import Dash_player from '@/components/dash_player';
import {ref} from 'vue';

export default {
  name: "dash_play_window",
  // mixins: [Small_window],
  extends: Small_window,
  props: {
    cam: Object
  },
  components: {
    Dash_player
  },

  setup() {
    const dash_url = ref(null);

    return {
      dash_url
    }
  },
  mounted() {
    // TODO:根据监视popup的值进行对后端的请求
    this.$rest_api.api_camera_dash_url(this.cam.cam_id)
        .then(res => {
          this.dash_url = res;
        })
        .catch(err => {
          console.log(err);
        })
  }
}
</script>

<style scoped>
.small_window{
  position: fixed;
  background-color: #cad5d7;
  border-radius: 0.25rem;
  /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);*/
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  cursor: pointer;
}
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 0;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  /*为了让el-card的头部可控*/
/deep/ .el-card__header {
  padding: 5px 5px;
  background: #b3cae3;
}
</style>