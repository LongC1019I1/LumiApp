<template>
  <div class="po-relative">
    <camera-box
      ref="cameraBox"
      :camera="camera"
      :time="0"
      :noControll="true"
    />
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
  name: "camera-canvas-draw-hurdles",
  props: {
    canvasSize: Object,
    coordinates: [Array, Boolean],
    snapshotUrl: String,
    camid: String,
  },
  data() {
    return {
      canvas: null,
      indexDrag: false,
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
  if (!(this.coordinates && this.coordinates[0] && this.coordinates[1])) return;
  let { width, height } = this.canvas.canvas;
  let lengthAToB = Math.round(height / 10);
  this.canvas.clearRect(0, 0, width, height);
  this.canvas.lineWidth = Math.round(height / 160);

  this.canvas.strokeStyle = "yellow";

  let positionX1 = this.coordinates[0].positionX;
  let positionY1 = this.coordinates[0].positionY;

  let realPx1 = Math.round((width * positionX1) / 1000);
  let realPy1 = height - Math.round((height * positionY1) / 1000);

  let positionX2 = this.coordinates[1].positionX;
  let positionY2 = this.coordinates[1].positionY;

  let realPx2 = Math.round((width * positionX2) / 1000);
  let realPy2 = height - Math.round((height * positionY2) / 1000);

  drawLine.call(this, "yellow", [realPx1, realPy1], [realPx2, realPy2]);

  let midpointX = Math.round((realPx1 + realPx2) / 2);
  let midpointY = Math.round((realPy1 + realPy2) / 2);
  let lengthOfLine = Math.hypot(midpointX - realPx1, midpointY - realPy1);

  let BPointX = Math.round(
    (lengthAToB * (realPx1 - midpointX)) / lengthOfLine + midpointX
  );
  let BPointY = Math.round(
    (lengthAToB * (realPy1 - midpointY)) / lengthOfLine + midpointY
  );
  let APointX = Math.round(
    (lengthAToB * (realPx2 - midpointX)) / lengthOfLine + midpointX
  );
  let APointY = Math.round(
    (lengthAToB * (realPy2 - midpointY)) / lengthOfLine + midpointY
  );

  APointX -= midpointX;
  APointY -= midpointY;
  BPointX -= midpointX;
  BPointY -= midpointY;

  //rotate both points
  let xtemp = APointX;
  let ytemp = APointY;
  APointX = -ytemp;
  APointY = xtemp;

  xtemp = BPointX;
  ytemp = BPointY;
  BPointX = -ytemp;
  BPointY = xtemp;

  //move the center point back to where it was
  APointX += midpointX;
  APointY += midpointY;
  BPointX += midpointX;
  BPointY += midpointY;

  //draw-apoint
  this.canvas.font = this.canvas.font.replace(
    /\d+px/,
    Math.round(height / 30) + "px",
    "red"
  );
  this.canvas.fillStyle = "red";
  this.canvas.textAlign = "end";
  this.canvas.fillText("A", APointX, APointY);
  this.canvas.fillText("B", BPointX, BPointY);
  drawLine.call(this, "red", [APointX, APointY], [BPointX, BPointY]);
}

function drawLine(color, pointA, pointB) {
  this.canvas.strokeStyle = color;
  this.canvas.beginPath();
  this.canvas.moveTo(pointA[0], pointA[1]);
  this.canvas.lineTo(pointB[0], pointB[1]);
  this.canvas.stroke();
  this.canvas.closePath();
}

function mouseDown(e) {
  let { offsetX, offsetY } = e;
  let { offsetHeight, offsetWidth, height } = this.canvas.canvas;

  let realPx = Math.round((offsetX * 1000) / offsetWidth);
  let realPy = Math.round(((offsetHeight - offsetY) * 1000) / offsetHeight);

  let numberError = Math.round(height / 80);

  this.$emit("updateCoordinates", {
    index: 0,
    value: { positionX: realPx, positionY: realPy },
  });

  this.$emit("updateCoordinates", {
    index: 1,
    value: { positionX: realPx, positionY: realPy },
  });

  this.indexDrag = true;
}

function mouseUp(e) {
  this.indexDrag = false;
}

function mouseMove(e) {
  if (!this.indexDrag) return;
  let { offsetX, offsetY } = e;
  let { offsetHeight, offsetWidth } = this.canvas.canvas;

  let realPx = Math.round((offsetX * 1000) / offsetWidth);
  let realPy = Math.round(((offsetHeight - offsetY) * 1000) / offsetHeight);
  this.$emit("updateCoordinates", {
    index: 1,
    value: { positionX: realPx, positionY: realPy },
  });
}
</script>

<style lang="scss">
</style>
