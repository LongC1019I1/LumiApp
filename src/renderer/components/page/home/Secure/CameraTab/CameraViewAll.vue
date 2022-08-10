<template>
  <card
    class="camera-view-all"
    bodyClasses="po-relative overflow-hidden mx-3"
    @mousedown.native="mouseDown"
    @mouseup.native="mouseUp"
    @mousemove.native="mouseMove"
    v-click-outside="mouseUp"
  >
    <template v-for="(sliderCameraList, index) in cameraList">
      <div
        v-if="index === currentIndex"
        :key="index"
        class="carousel-custom po-absolute w-100 h-100 d-flex flex-wrap"
        :style="`left: ${transformX}px; transition: left ${isDrag ? 0 : 0.5}s;`"
      >
        <camera-box
          v-for="camera in sliderCameraList"
          :key="camera.camid"
          :camera="camera"
          @clearTransform="clearTransform"
        />
      </div>
    </template>
    <div slot="footer" class="d-flex justify-center">
      <div
        class="pagination-dot"
        v-for="(cameraList, index) in cameraList"
        :key="index"
        :class="{ active: currentIndex === index }"
        @click="currentIndex = index"
      ></div>
    </div>
  </card>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import CameraBox from "./Element/CameraBox";
export default {
  name: "camera-form-tab",
  data() {
    return {
      currentIndex: 0,
      isDrag: false,
      initialX: 0,
      transformX: 0,
    };
  },
  components: {
    // Carousel,
    // Slide,
    CameraBox,
  },
  computed: {
    cameraList,
  },
  methods: {
    clearTransform,
    mouseDown,
    mouseUp,
    mouseMove,
  },
  mounted: clearTransform,
};

function cameraList() {
  return $getters["HomeConfig/getCameraForSlider"];
}

function clearTransform() {
  let VueCarousel = this.$el.getElementsByClassName("VueCarousel-inner")[0];
  if (VueCarousel) VueCarousel.style.removeProperty("transform");
}

function mouseDown(e) {
  this.isDrag = true;
  this.initialX = e.clientX;
}

function mouseUp(e) {
  this.isDrag = false;
  if (this.transformX >= 300) {
    this.currentIndex =
      this.currentIndex === this.cameraList.length - 1 ? 0 : this.currentIndex + 1;
  } else if (this.transformX <= -300) {
    this.currentIndex =
      this.currentIndex === 0 ? this.cameraList.length - 1 : this.currentIndex - 1;
  }
  this.transformX = 0;
}

function mouseMove(e) {
  if (!this.isDrag) return;
  if (this.transformX - this.initialX + e.clientX > 300) this.transformX = 300;
  else if (this.transformX - this.initialX + e.clientX < -300)
    this.transformX = -300;
  else this.transformX -= this.initialX - e.clientX;
  this.initialX = e.clientX;
}
</script>


<style scope lang="scss">
.pagination-dot {
  width: 10px;
  height: 10px;
  margin: 0.5rem;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
  transition: width 0.5s;
  &.active {
    width: 30px;
  }
}
.carousel-custom {
  transition: left 0.5s;
}
</style>
