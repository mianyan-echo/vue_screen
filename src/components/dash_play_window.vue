<template>
  <div>
    <div>
      <a href="javascript:;" @click="show_popup">X</a>
    </div>

    <div v-show="popup">
      <!--这里是要展示的内容层-->
      <div class="small_window" ref="small_window"
           @mousedown="mouseDownHandleelse($event)"
           @mouseup="mouseUpHandleelse($event)">
        <br/>
        <Dash_player v-if="popup"
                     ref="dash_player"
                     :dash_url="dash_url"/>

        <button class="rule" @click='close_popup'>X</button>
      </div>
    </div>
  </div>
</template>

<script>
import Small_window from '@/components/small_window';
import Dash_player from '@/components/dash_player';

export default {
  name: "dash_play_window",
  extends: Small_window,
  data() {
    return {
      dash_url: null
    }
  },
  components: {
    Dash_player
  },

  methods: {
    camera_dash_url(uid){
      this.$rest_api.api_camera_dash_url(uid)
          .then(res => {
            this.dash_url = res;
          })
          .catch(err => {
            console.log(err);
          })
    },
  },
  created() {
    this.camera_dash_url('87199a6c-2ad5-4f75-9215-42016882ea72');
  }
}
</script>

<style scoped>
.rule {
  position: absolute;
  width: 1rem;
  height: 1rem;
  top: 0.08rem;
  right: 0rem;
  background: #111111;
  color: white;
  text-align: center;
}
.small_window{
  position: fixed;
  background-color: gold;
  border-radius: 0.25rem;
  box-shadow: 10px 10px 5px #888888;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  cursor: pointer;
}
</style>