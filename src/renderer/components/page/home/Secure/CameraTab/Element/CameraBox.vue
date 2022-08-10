<template>
  <fragment>
    <div class="camera-item">
      <div
        class="camera-view"
        style="background-image: url('static/img/stream_false.png')"
      >
        <div
          v-if="!noControll"
          class="header-info text-overflow-hidden"
          :class="{ 'bg-brigness-darker': fixedCamera }"
        >
          <span>{{ camera.name }}</span>
          <span
            v-if="fixedCamera"
            class="pull-right font-25 c-p"
            @click="closeFixedViewCamera"
            ><i class="mdi mdi-close"></i
          ></span>
        </div>
        <video
          v-if="!isMaximizeView"
          ref="videoPlayer"
          class="w-100 h-100"
          autoplay
        ></video>
        <template v-if="!noControll">
          <div v-if="isHistory" class="controll-box">
            <div class="d-flex align-center w-100 mx-4 justify-between">
              <div>{{ currentTimeText }}</div>
              <vue-slider
                class="camera-history-slider w-100 px-3"
                @drag-end="playAtTime(time, currentTime)"
                :min="time"
                :max="endTime"
                :drag-on-click="true"
                :tooltip-formatter="tooltipFormater"
                v-model="currentTime"
              />
              <div>{{ "24:00" }}</div>
            </div>
            <div class="min-w-maxcontent d-flex align-center">
              <span
                class="min-w-maxcontent c-p pl-2 mr-2"
                @click="playAtTime(0, 0)"
                >{{ $t("secure.online") }}</span
              >
              <i
                class="pull-right c-p mdi mx-2"
                :class="mimimizeIcon ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'"
                @click="maximizeViewToggle"
              ></i>
            </div>
          </div>
          <div v-else class="controll-box">
            <div class="d-flex align-center col-4">
              <div class="online-dot c-p" @click="playAtTime(0, 0)"></div>
              <span class="pl-2 c-p" @click="playAtTime(0, 0)">{{
                $t("secure.online")
              }}</span>
            </div>
            <div class="col-4 text-center">
              <i
                v-if="isStream"
                class="c-p mdi mdi-pause"
                @click="pauseCamera"
              ></i>
              <i v-else class="c-p mdi mdi-play" @click="resumeCamera"></i>
            </div>
            <div class="col-4">
              <i
                v-if="!fixedCamera"
                class="pull-right c-p mdi"
                :class="mimimizeIcon ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'"
                @click="maximizeViewToggle"
              ></i>
            </div>
          </div>
        </template>
      </div>
    </div>
    <modal
      v-if="isMaximizeView"
      :show="true"
      :showClose="false"
      class="bg-blur-lighter"
      modalClasses="modal-camera"
      bodyClasses="p-0"
      @close="maximizeViewToggle"
    >
      <div class="camera-item camera-modal-item">
        <div
          class="camera-view"
          style="background-image: url('static/img/stream_false.png')"
        >
          <div
            v-if="!noControll"
            class="header-info text-overflow-hidden"
            :class="{ 'bg-brigness-darker': fixedCamera }"
          >
            <span>{{ camera.name }}</span>
            <span
              v-if="fixedCamera"
              class="pull-right font-25 c-p"
              @click="closeFixedViewCamera"
              ><i class="mdi mdi-close"></i
            ></span>
          </div>
          <video
            ref="videoPlayer"
            class="w-100 h-100"
            autoplay
          ></video>
          <template v-if="!noControll">
            <div v-if="isHistory" class="controll-box">
              <div class="d-flex align-center w-100 mx-4 justify-between">
                <div>{{ currentTimeText }}</div>
                <vue-slider
                  class="camera-history-slider w-100 px-3"
                  @drag-end="playAtTime(time, currentTime)"
                  :min="time"
                  :max="endTime"
                  :drag-on-click="true"
                  :tooltip-formatter="tooltipFormater"
                  v-model="currentTime"
                />
                <div>{{ "24:00" }}</div>
              </div>
              <div class="min-w-maxcontent d-flex align-center">
                <span
                  class="min-w-maxcontent c-p pl-2 mr-2"
                  @click="playAtTime(0, 0)"
                  >{{ $t("secure.online") }}</span
                >
                <i
                  class="pull-right c-p mdi mx-2"
                  :class="
                    mimimizeIcon ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'
                  "
                  @click="maximizeViewToggle"
                ></i>
              </div>
            </div>
            <div v-else class="controll-box">
              <div class="d-flex align-center col-4">
                <div class="online-dot c-p" @click="playAtTime(0, 0)"></div>
                <span class="pl-2 c-p" @click="playAtTime(0, 0)">{{
                  $t("secure.online")
                }}</span>
              </div>
              <div class="col-4 text-center">
                <i
                  v-if="isStream"
                  class="c-p mdi mdi-pause"
                  @click="pauseCamera"
                ></i>
                <i v-else class="c-p mdi mdi-play" @click="resumeCamera"></i>
              </div>
              <div class="col-4">
                <i
                  v-if="!fixedCamera"
                  class="pull-right c-p mdi"
                  :class="
                    isMaximizeView ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'
                  "
                  @click="maximizeViewToggle"
                ></i>
              </div>
            </div>
          </template>
        </div>
      </div>
    </modal>
  </fragment>
</template>

<script>
import { parseUrlCamera } from "@/plugins/helper";
import Hls from "hls.js";

export default {
  name: "camera-box",
  props: {
    camera: Object,
    time: Number,
    mimimizeIcon: { type: Boolean, defaule: false },
    fixedCamera: { type: Boolean, defaule: false },
    noControll: { type: Boolean, defaule: false },
  },
  data() {
    return {
      isStream: false,
      isHistory: false,
      isMaximizeView: false,
      currentCamid: this.camera.camid,
      video: this.$refs.videoPlayer,
      trackerTimeout: false,
      hls: false,
      //history
      currentTime: 0,
      tooltipFormater: (value) => timer(value, "HH:mm:ss"),
      trackerCurrentTime: false,
    };
  },
  methods: {
    parseUrlCamera,
    pauseCamera,
    resumeCamera,
    playCamera,
    reloadCamera,
    maximizeViewToggle,
    closeFixedViewCamera,
    playAtTime,
  },
  computed: {
    cameraStream,
    currentTimeText,
    endTime,
  },
  watch: {
    camera() {
      reloadCamera.call(this);
    },
    // time() {
    //   this.currentTime = this.time;
    // },
    cameraStream: {
      handler: watchCameraStream,
      deep: true,
    },
  },
  mounted: mounted,
  beforeDestroy,
};

function mounted() {
  this.hls = new Hls({ enableWorker: false });
  this.hls.on(Hls.Events.ERROR, (event, data) => {
    console.error(event, data);
  });
  this.video = this.$refs.videoPlayer;
  reloadCamera.call(this);
}

function cameraStream() {
  // return $getters["CameraManager/getStreamInfo"](this.currentCamid);
  let cameraStream = $getters["CameraManager/getStreamInfo"](this.currentCamid);
  this.isStream = cameraStream && cameraStream.isStream;
  this.isHistory = cameraStream && cameraStream.time;
  this.currentTime = cameraStream && cameraStream.currentTime;
  if (this.isStream && this.video) this.video.play();
  return cameraStream;
}

function watchCameraStream(cameraStream) {
  // this.isStream = cameraStream && cameraStream.isStream;
  this.isHistory = cameraStream && cameraStream.time;
  // if(this.isStream&&this.video) this.video.play()
  // // this.currentTime = cameraStream && cameraStream.currentTime;
}

function currentTimeText() {
  return timer(this.time, "HH:mm");
}

function endTime() {
  return new Date(this.time || 0).setHours(23, 59, 59, 999);
}

async function reloadCamera() {
  if ($router.currentRoute.name !== "home-secure" || !this.mimimizeIcon) {
    await $dispatch($api.CameraManager.deleteCameraStream, this.currentCamid);
    this.currentCamid = this.camera.camid;
    await playCamera.call(this, 0, 0);
  } else {
    this.currentCamid = this.camera.camid;
    await playCamera.call(this);
  }
}

function pauseCamera() {
  this.video && this.video.pause();
  this.isStream = false;
  $dispatch($api.CameraManager.stopCameraStream, this.currentCamid);
}

async function resumeCamera() {
  await playCamera.call(this);
  this.video && this.video.play();
}

function playCamera(time = this.time, currentTime = this.currentTime) {
  return new Promise((resolve, reject) => {
    this.video = this.$refs.videoPlayer;
    this.video.src = "";
    if (this.trackerTimeout) clearTimeout(this.trackerTimeout);
    if (this.trackerCurrentTime) clearInterval(this.trackerCurrentTime);

    let timeoutTimer = 4000;
    if (this.time && this.currentTime) timeoutTimer = 5000;

    if (this.cameraStream.isStream) timeoutTimer = 200;
    else
      $dispatch($api.CameraManager.addCameraStream, {
        camera: this.camera,
        time: time,
        currentTime,
      });

    this.trackerTimeout = setTimeout(() => {
      if (this.video.canPlayType("application/vnd.apple.mpegurl")) {
        this.video.src = this.cameraStream.staticPath;
      } else if (Hls.isSupported()) {
        this.hls.loadSource(this.cameraStream.staticPath);
        this.hls.attachMedia(this.video);
      }
      if (this.isHistory)
        this.trackerCurrentTime = setInterval(() => {
          this.currentTime += 1000;
        }, 1000);
      resolve();
    }, timeoutTimer);
  });
}

async function playAtTime(time = this.time, currentTime = this.currentTime) {
  await $dispatch($api.CameraManager.deleteCameraStream, this.currentCamid);
  await playCamera.call(this, time, currentTime);
}

function maximizeViewToggle() {
  // $commit("ContentManager/UPDATE_MODAL_STATUS", {
  //   modal: "modalFullCamera",
  //   data: this.mimimizeIcon ? false : this.currentCamid,
  // });
  this.isMaximizeView = !this.isMaximizeView
  // this.$emit('clearTransform')
  this.$nextTick(()=>{
    playCamera.call(this)
  })
}

function closeFixedViewCamera() {
  $commit("ContentManager/UPDATE_MODAL_STATUS", {
    modal: "modalFixedCamera",
    data: false,
  });
}

function beforeDestroy() {
  this.hls.destroy();
  if ($router.currentRoute.name !== "home-secure" || !this.mimimizeIcon)
    return $dispatch($api.CameraManager.deleteCameraStream, this.currentCamid);
}
</script>

<style lang="scss">
</style>
