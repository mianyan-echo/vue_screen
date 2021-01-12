<template>
  <div>
    <div class="righttop">
      <a href="javascript:;" @click="show_popup">X</a>
    </div>

    <div v-show="popup">
      <!--这里是要展示的内容层-->
      <div class="small_window" ref="small_window"
           @mousedown="mouseDownHandleelse($event)"
           @mouseup="mouseUpHandleelse($event)">
        <br/>
        <slot v-if="popup">这里填充内容</slot>
        <button class="rule" @click="close_popup">X</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "small_window",

  data(){
    return {
      popup: null,
      moveDataElse: {
        x: null,
        y: null
      }
    }
  },
  methods: {
    show_popup(){
      this.popup = true;
    },
    close_popup(){
      this.popup = false;
    },

    mouseDownHandleelse (event) {
      this.moveDataElse.x = event.pageX - this.$refs.small_window.offsetLeft
      this.moveDataElse.y = event.pageY - this.$refs.small_window.offsetTop
      event.currentTarget.style.cursor = 'move'
      window.onmousemove = this.mouseMoveHandleelse
      window.onselectstart = ()=>false
      window.onselect = ()=>false
    },
    mouseMoveHandleelse (event) {
      let moveLeft = event.pageX - this.moveDataElse.x + 'px'
      let moveTop = event.pageY - this.moveDataElse.y + 'px'
      this.$refs.small_window.style.left = moveLeft
      this.$refs.small_window.style.top = moveTop
    },
    mouseUpHandleelse (event) {
      window.onmousemove = null
      event.currentTarget.style.cursor = 'move'
      window.onselectstart = null
      window.onselect = null
      // console.log('鼠标松开了')
    }

  },
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
.over {
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 0.7;
  filter: alpha(opacity=70);
  top: 0;
  left: 0;
  z-index: 999;
  background-color: #111111;
  }
</style>