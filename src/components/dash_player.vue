<template>
<div>
  <video class="player" ref="videoPlayer" controls></video>
</div>
</template>

<script>
import dashjs from 'dashjs';

export default {
  name: "dash_player",
  data() {
    return {
      // url: "https://s3.amazonaws.com/_bc_dml/example-content/sintel_dash/sintel_vod.mpd",
      url: 'http://192.168.3.2:2050/dash/87199a6c-2ad5-4f75-9215-42016882ea72.mpd',
      player: dashjs.MediaPlayer().create()
    }
  },
  methods: {
  },
  mounted() {
    this.player.initialize(this.$refs.videoPlayer, this.url, true);
  },
  updated() {
    this.player.reset();
    this.player.initialize(this.$refs.videoPlayer, this.url, true);
  },
  beforeDestroy() {
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