<template>
  <card bodyClasses="mx-10-percent mt-5">
    <camera-box ref="cameraBox" :camera="camera" :time="cameraStream.time" />
    <template v-if="cameraTypeHashistory.includes(camera.type)">
      <div class="camera-info-box my-3">
        <div class="label">{{ $t("secure.playback") }}</div>
        <div class="info">
          <base-slider
            size="md"
            class="mb-0"
            :value="isShowHistory"
            @submit="isShowHistory = !isShowHistory"
          ></base-slider>
        </div>
      </div>
      <template v-if="isShowHistory">
        <div class="camera-history-input">
          <div class="date">
            <span class="label">{{ $t("secure.chooseDate") }}:</span>
            <date-picker
              class="ml-3"
              v-model="date"
              :placeholder="$t('secure.inputDate')"
              value-type="timestamp"
              format="DD/MM/YYYY"
            ></date-picker>
          </div>
          <div class="time">
            <span class="label">{{ $t("secure.chooseTime") }}:</span>
            <div class="group-input ml-3">
              <masked-input
                type="text"
                class="text-center form-group mb-0 p-1"
                v-model="time"
                :showMask="true"
                :keepCharPositions="true"
                :mask="[/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/]"
                @input="checkTime"
                placeholderChar="-"
                @keyup.native.enter="showVideoHistory"
              ></masked-input>
            </div>
          </div>
        </div>
        <div
          class="camera-info-box bg-gray-2 c-p py-1 text-center justify-center mb-3"
          @click="showVideoHistory"
        >
          <span class="p-2">{{ $t("secure.showVideoHistory") }}</span>
        </div>
      </template>
    </template>
    <template
      v-if="
        camera.serialNumber &&
        camera.active === 1 &&
        cameraDevice &&
        cameraDevice.config
      "
    >
      <div
        class="camera-info-box c-p"
        @click="isShowListConfig = !isShowListConfig"
      >
        <div class="label">{{ $t("secure.cameraConfig") }}</div>
        <div class="info">
          <i
            class="mdi"
            :class="isShowListConfig ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          ></i>
        </div>
      </div>
      <template v-if="isShowListConfig">
        <div
          v-if="
            cameraDevice.config.StreamConfig &&
            cameraDevice.config.StreamConfig.video
          "
          class="camera-info-box mt-3 c-p"
          @click="$emit('updateViewName', 'camera-config-video')"
        >
          <div class="label">{{ $t("secure.cameraConfigVideo") }}</div>
          <div class="info">
            <i class="mdi mdi-chevron-right"></i>
          </div>
        </div>
        <div
          v-if="cameraDevice.config.SecurityConfig"
          class="camera-info-box mt-3 c-p"
          @click="
            $emit(
              'updateViewName',
              cameraDevice.config.SecurityConfig.SceneChangeDetection
                ? 'camera-config-update-view-detect'
                : cameraDevice.config.SecurityConfig.LineDetection
                ? 'camera-config-hurdles-detect'
                : 'camera-config-intrusion-detect'
            )
          "
        >
          <div class="label">{{ $t("secure.cameraConfigSecure") }}</div>
          <div class="info">
            <i class="mdi mdi-chevron-right"></i>
          </div>
        </div>
        <div
          v-if="cameraDevice.config.TriggerConfig"
          class="camera-info-box mt-3 c-p"
          @click="
            $emit(
              'updateViewName',
              cameraDevice.config.TriggerConfig.WhiteLightAlarm
                ? 'camera-config-flash'
                : 'camera-config-alarm'
            )
          "
        >
          <div class="label">{{ $t("secure.cameraConfigOutput") }}</div>
          <div class="info">
            <i class="mdi mdi-chevron-right"></i>
          </div>
        </div>
      </template>
    </template>
    <template
      v-if="
        cameraStatus &&
        cameraStatus.states &&
        cameraStatus.states.CameraSnapshot &&
        cameraStatus.states.CameraSnapshot.time
      "
    >
      <h6 class="mt-3">Snapshot</h6>
      <horizontal-scroll
        v-dragscroll
        class="overflow-x-auto hidden-scroll border-radius-2"
      >
        <img
          @dblclick="currentPicture = index"
          class="max-h-300 ml-2 border-radius-2 c-p"
          v-for="(url, index) in cameraStatus.states.CameraSnapshot.urls"
          :key="index"
          :src="url"
          alt="snapshot"
        />
      </horizontal-scroll>
    </template>
    <div v-if="currentPicture !== false" class="view-modal-snapshot">
      <div class="header text-right">
        <span
          ><i class="mdi mdi-download c-p" @click="downloadPicture"></i
        ></span>
        <span
          ><i class="mdi mdi-close c-p" @click="currentPicture = false"></i
        ></span>
      </div>
      <div class="body h-100">
        <div class="h-90 d-flex justify-center align-center">
          <div
            class="preview-button"
            :class="{ disabled: currentPicture === 0 }"
          >
            <i
              class="mdi mdi-chevron-left"
              @click="currentPicture === 0 ? '' : (currentPicture -= 1)"
            ></i>
          </div>
          <div class="col-6">
            <img
              class="w-100"
              :src="cameraStatus.states.CameraSnapshot.urls[currentPicture]"
              alt="snapshot"
            />
          </div>
          <div
            class="preview-button"
            :class="{
              disabled:
                currentPicture ===
                cameraStatus.states.CameraSnapshot.urls.length - 1,
            }"
          >
            <i
              class="mdi mdi-chevron-right"
              @click="
                currentPicture ===
                cameraStatus.states.CameraSnapshot.urls.length - 1
                  ? ''
                  : (currentPicture += 1)
              "
            ></i>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer" class="text-center">
      <base-button
        class="footer-button"
        @click="$emit('updateViewName', 'camera-form')"
        >{{ $t("edit") }}</base-button
      >
      <base-button class="footer-button" @click="deleteCamera">{{
        $t("delete")
      }}</base-button>
    </div>
  </card>
</template>

<script>
import CameraBox from "./Element/CameraBox";
export default {
  name: "camera-view-tab",
  props: {
    camid: [String, Boolean],
  },
  data() {
    return {
      cameraTypeHashistory: ["1", "2"],
      isShowHistory: false,
      isShowCameraHistory: false,
      isShowListConfig: false,
      cameraHistoryTime: 0,
      date: "",
      time: "",
      currentPicture: false,
    };
  },
  computed: {
    camera,
    cameraDevice,
    cameraStream,
    cameraStatus,
  },
  components: {
    CameraBox,
  },
  watch: {
    camid: reloadData,
  },
  methods: {
    deleteCamera,
    showVideoHistory,
    checkTime,
    downloadPicture,
  },
};

function camera() {
  return $getters["HomeConfig/getCameraByID"](this.camid);
}

function cameraDevice() {
  return $getters["HomeConfig/getDevice"](
    this.camera && this.camera.device && this.camera.device.devid
  );
}

function cameraStatus() {
  return $getters["HomeControll/getDeviceStatusByDeviceID"](
    this.camera && this.camera.device && this.camera.device.devid
  );
}

function cameraStream() {
  return $getters["CameraManager/getStreamInfo"](this.camid);
}

function checkTime(value) {
  let time = this.time.split(":");
  if (Number(time[0]) && Number(time[0]) > 23) time[0] = "23";
  if (Number(time[1]) && Number(time[1]) > 59) time[1] = "59";
  this.time = time.join(":");
}

function deleteCamera() {
  $alertify
    .confirm({
      title: this.$t("notify.notifyDefautlTitle"),
      text: this.$t("secure.confirmDeleteCamera"),
      showCancelButton: true,
      confirmButtonText: this.$t("confirm"),
      cancelButtonText: this.$t("cancel"),
    })
    .then((result) => {
      if (result && result.isConfirmed) {
        $dispatch($api.HomeConfig.deleteCamera, { cameraid: this.camid });
        this.$emit("updateSelectedCamera", false);
      }
    });
}

function showVideoHistory() {
  if (!this.date)
    return $alertify.confirm({
      title: this.$t("notify.notifyDefautlTitle"),
      text: this.$t("secure.notifyInputDate"),
    });
  if (!this.time || this.time.includes("-"))
    return $alertify.confirm({
      title: this.$t("notify.notifyDefautlTitle"),
      text: this.$t("secure.notifyInputTime"),
    });
  let time = this.time.split(":").map(Number);
  this.cameraHistoryTime = this.date + (time[0] * 3600 + time[1] * 60) * 1000;
  $dispatch($api.CameraManager.deleteCameraStream, this.camid);
  this.$refs.cameraBox.playCamera(
    this.cameraHistoryTime,
    this.cameraHistoryTime
  );
}

function downloadPicture() {
  let url =
    this.cameraStatus &&
    this.cameraStatus.states &&
    this.cameraStatus.states.CameraSnapshot &&
    this.cameraStatus.states.CameraSnapshot.urls &&
    this.cameraStatus.states.CameraSnapshot.urls[this.currentPicture];
  if (url) {
    let urlParser = url.split('.')
    let name = `snapshot_${this.camid}_${new Date().getTime()}.${urlParser[urlParser.length-1]}`
    $os.downloadFile(url, name).then(result=>{
      $alertify.success('saveSuccess')
    });
  }
}

function reloadData() {
  this.date = "";
  this.time = "";
  this.cameraHistoryTime = 0;
  this.isShowHistory = false;
  this.isShowCameraHistory = false;
  this.isShowListConfig = false;
}
</script>

<style lang="scss">
</style>
