<template>
<div>
  <video class="player" ref="videoPlayer" controls></video>
</div>
</template>

<script>
import dashjs from 'dashjs';
import {ref, reactive} from 'vue';

export default {
  name: "dash_player",
  props: {
    dash_url: String
  },

  setup(props) {
    const url = ref(props.dash_url);
    // const url = ref("https://s3.amazonaws.com/_bc_dml/example-content/sintel_dash/sintel_vod.mpd");
    const player = reactive(dashjs.MediaPlayer().create())

    return {
      url,
      player
    }
  },

  mounted() {
    this.player.initialize(this.$refs.videoPlayer, this.url, true);
  },
  updated() {
    this.player.reset();
    this.player.initialize(this.$refs.videoPlayer, this.url, true);
  },
  beforeUnmount() {
    this.player.reset();
  },
}
</script>

<style scoped>
.player {
  width: 640px;
  height: 320px
}
</style>