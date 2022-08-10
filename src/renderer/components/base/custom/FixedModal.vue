<template>
  <div
    class="fixed-modal c-p"
    :style="`transform: translate(${currentX}px, ${-57 + currentY}px);`"
    @mousedown="mouseDown"
    @mousemove="mouseMove"
    @mouseup="mouseUp"
    v-click-outside="mouseUp"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "fixed-modal",
  props: {
    device: {
      type: Object,
    },
  },
  data() {
    return {
      isMove: false,
      currentX: 0,
      currentY: 0,

      initialX: 0,
      initialY: 0,
    };
  },
  methods: {
    mouseDown,
    mouseMove,
    mouseUp,
  },
  mounted() {
    console.log(this);
    this.currentX = (window.outerWidth - this.$el.clientWidth) / 2;
    this.currentY = (window.outerHeight - this.$el.clientHeight) / 2;
  },
};

function mouseDown(e) {
  console.log("mouseDown", e);
  this.isMove = true;
  this.initialX = e.clientX;
  this.initialY = e.clientY;
}

function mouseMove(e) {
  if (!this.isMove) return;
  console.log("mouseMove", e);
  this.currentX -= this.initialX - e.clientX;
  this.currentY -= this.initialY - e.clientY;
  this.initialX = e.clientX;
  this.initialY = e.clientY;
}

function mouseUp(e) {
  console.log("mouseUp", e);
  this.isMove = false;
}
</script>

<style lang="scss">
.fixed-modal {
  position: fixed;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  
}
</style>
