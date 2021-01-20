<template>
  <div class="footer_drawer">
  <el-drawer
      v-model="is_show"
      :modal="false"
      direction="btt"
      size=45%>

    <el-scrollbar>
      <slot>
        <el-empty></el-empty>
      </slot>
    </el-scrollbar>
  </el-drawer>
  </div>
</template>

<script>
export default {
  name: "footer_drawer",
      data() {
      return {
        is_show: false
      }
    },
    methods: {
      close() {
        this.is_show = false
      },
      open(){
        this.is_show = true
      }
    }

}
</script>

<style>
.el-drawer__body {
  overflow: auto;
}
</style>