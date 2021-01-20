<template>
<div class="card_inline">
  <el-card :body-style="{padding: '0px',background: '#d4dcea'}" shadow="hover">
    <template #header>
      <div class="clearfix">
        <span></span>
        <el-button style="float: right; padding: 3px 3px;"
                   type="danger"
                   icon="el-icon-close"
                   @click="close_card"
                   size="small"
                   circle
                   autofocus></el-button>
      </div>
    </template>
    <dash_player :dash_url="dash_url"/>
  </el-card>
</div>
</template>

<script>
import dash_player from "@/components/dash_player";

export default {
  name: "dash_play_card",
  components: {
    dash_player
  },
  props: {
    dash_url: String
  },
  methods: {
    close_card() {
      this.$emit('CloseCard', this.dash_url)
    }
  }
}
</script>

<style scoped>
/deep/ .player{
  width: 320px;
  height: 240px;
}
.card_inline {
  display: inline-block;
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