<template>
  <div class="po-relative">
    <camera-box ref="cameraBox" :camera="camera" :time="0" :noControll="true" />
    <canvas
      :coordinates="coordinates"
      @mousedown="mouseDown"
      @mouseup="mouseUp"
      @mousemove="mouseMove"
      v-click-outside="mouseUp"
      ref="intrusionCamera"
      id="intrusionCamera"
      class="image-box w-100 c-p bg-transparent po-absolute"
      style="top:0"
    ></canvas>
    <!-- <canvas
      :coordinates="coordinates"
      @mousedown="mouseDown"
      @mouseup="mouseUp"
      @mousemove="mouseMove"
      v-click-outside="mouseUp"
      ref="intrusionCamera"
      id="intrusionCamera"
      class="image-box w-100 c-p"
      :style="
        snapshotUrl
          ? `background-image: url('${snapshotUrl}');`
          : '' + `height: 500px`
      "
    ></canvas> -->
  </div>
</template>

<script>
import CameraBox from "./CameraBox";

export default {
  name: "camera-canvas-draw-intrusion",
  props: {
    canvasSize: Object,
    coordinates: [Array, Boolean],
    snapshotUrl: String,
    camid: String,
  },
  data() {
    return {
      canvas: null,
      indexDrag: -1,
    };
  },
  watch: {
    coordinates: {
      handler: draw,
      deep: true,
    },
    canvasSize: {
      handler: updateCanvasSize,
      deep: true,
    },
  },
  components:{
    CameraBox
  },
  computed: {
    camera,
    cameraStream,
  },
  methods: {
    mouseDown,
    mouseUp,
    mouseMove,
  },
  mounted,
};

function mounted() {
  this.canvas = this.$refs.intrusionCamera.getContext("2d");
  this.canvas.canvas.height = this.canvasSize.height;
  this.canvas.canvas.width = this.canvasSize.width;
  draw.call(this);
}

function camera() {
  return $getters["HomeConfig/getCameraByID"](this.camid);
}

function cameraStream() {
  return $getters["CameraManager/getStreamInfo"](this.camid);
}

function updateCanvasSize(canvasSize) {
  this.canvas.canvas.height = canvasSize.height;
  this.canvas.canvas.width = canvasSize.width;
  draw.call(this);
}

function draw() {
  if (!(this.coordinates && this.coordinates.length)) return;
  let { width, height } = this.canvas.canvas;
  this.canvas.clearRect(0, 0, width, height);

  this.canvas.strokeStyle = "yellow";
  this.canvas.lineWidth = Math.round(height / 160);
  this.canvas.fillStyle = "rgba(255, 0, 0, .3)";

  let { positionX, positionY } = this.coordinates[0] || {};
  let realPx = Math.round((width * positionX) / 1000);
  let realPy = height - Math.round((height * positionY) / 1000);

  //draw-line
  this.canvas.beginPath();
  this.canvas.moveTo(realPx, realPy);
  this.coordinates.forEach((coordinate, index) => {
    let { positionX, positionY } = coordinate;
    let realPx = Math.round((width * positionX) / 1000);
    let realPy = height - Math.round((height * positionY) / 1000);
    if (index) this.canvas.lineTo(realPx, realPy);
  });
  this.canvas.lineTo(realPx, realPy);
  this.canvas.stroke();
  this.canvas.closePath();
  this.canvas.fill();

  //draw point
  this.coordinates.forEach((coordinate) => {
    drawCircle(this.canvas, coordinate);
  });
}

function drawCircle(canvas, coordinate) {
  let { positionX, positionY } = coordinate;
  let { width, height } = canvas.canvas;
  let realPx = Math.round((width * positionX) / 1000);
  let realPy = height - Math.round((height * positionY) / 1000);
  canvas.fillStyle = "yellow";
  canvas.beginPath();
  canvas.arc(realPx, realPy, Math.round(height / 80), 0, 2 * Math.PI);
  canvas.fill();
}

function mouseDown(e) {
  let { offsetX, offsetY } = e;
  let { offsetHeight, offsetWidth, height } = this.canvas.canvas;

  let realPx = Math.round((offsetX * 1000) / offsetWidth);
  let realPy = Math.round(((offsetHeight - offsetY) * 1000) / offsetHeight);

  let numberError = Math.round(height / 80);

  this.indexDrag = this.coordinates.findIndex(
    (item) =>
      realPx - numberError < item.positionX &&
      realPx + numberError > item.positionX &&
      realPy - numberError < item.positionY &&
      realPy + numberError > item.positionY
  );
}

function mouseUp(e) {
  this.indexDrag = -1;
}

function mouseMove(e) {
  if (this.indexDrag === -1) return;
  let { offsetX, offsetY } = e;
  let { offsetHeight, offsetWidth } = this.canvas.canvas;

  let realPx = Math.round((offsetX * 1000) / offsetWidth);
  let realPy = Math.round(((offsetHeight - offsetY) * 1000) / offsetHeight);
  this.$emit("updateCoordinates", {
    index: this.indexDrag,
    value: { positionX: realPx, positionY: realPy },
  });
}
</script>

<style lang="scss">
</style>
