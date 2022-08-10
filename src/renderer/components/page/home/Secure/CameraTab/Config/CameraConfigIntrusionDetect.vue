<template>
  <card bodyClasses="mx-10-percent" id="inputIntrusionSetting">
    <horizontal-scroll
      ref="scrollHeader"
      slot="header"
      v-dragscroll
      class="overflow-hidden"
    >
      <h5>
        <span
          v-if="cameraDevice.config.SecurityConfig.SceneChangeDetection"
          class="c-p"
          @click="$emit('updateViewName', 'camera-config-update-view-detect')"
          >{{ $t("secure.cameraConfigUpdateViewDetect") }}</span
        >
        <span
          v-if="cameraDevice.config.SecurityConfig.FieldDetection"
          class="active ml-3 c-p"
          @click="$emit('updateViewName', 'camera-config-intrusion-detect')"
          >{{ $t("secure.cameraConfigIntrusionDetect") }}</span
        >
        <span
          v-if="cameraDevice.config.SecurityConfig.LineDetection"
          class="ml-3 c-p"
          @click="$emit('updateViewName', 'camera-config-hurdles-detect')"
          >{{ $t("secure.cameraConfigHurdlesDetect") }}</span
        >
      </h5>
    </horizontal-scroll>
    <h5>{{ $t("secure.introduce") }}</h5>
    <h6>{{ $t("secure.introduceText2") }}</h6>
    <div class="camera-info-box mb-3">
      <div class="label">{{ $t("secure.allowed") }}</div>
      <div class="info">
        <base-slider
          size="md"
          class="mb-0"
          :value="enabled"
          @submit="enabled = !enabled"
        ></base-slider>
      </div>
    </div>
    <template v-if="enabled">
      <template v-if="coordinates">
        <h6>{{ $t("secure.inputIntrusionSetting") }}</h6>
        <canvas-draw-intrusion
          :camid="selectedCamera"
          :snapshotUrl="snapshotUrl"
          :coordinates="coordinates"
          :canvasSize="canvasSize"
          @updateCoordinates="
            ({ index, value }) => {
              Object.assign(coordinates[index], value);
            }
          "
        />
      </template>
      <div v-if="target" class="d-flex align-center justify-between">
        <div>{{ $t("secure.detectObject") }}</div>
        <div class="d-flex">
          <div class="w-150">
            <div class="c-p" @click="updateTarget('human')">
              <span
                ><i
                  class="mdi"
                  :class="
                    target.value.includes('human')
                      ? 'mdi-checkbox-marked'
                      : 'mdi-checkbox-blank-outline'
                  "
                ></i
              ></span>
              <span>{{ $t("secure.human") }}</span>
            </div>
          </div>
          <div class="w-150">
            <div class="c-p" @click="updateTarget('vehicle')">
              <span
                ><i
                  class="mdi"
                  :class="
                    target.value.includes('vehicle')
                      ? 'mdi-checkbox-marked'
                      : 'mdi-checkbox-blank-outline'
                  "
                ></i
              ></span>
              <span>{{ $t("secure.trafic") }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="triggers" class="d-flex align-center justify-between">
        <div>{{ $t("secure.linkOutput") }}</div>
        <div class="d-flex">
          <div class="w-150">
            <div class="c-p" @click="updateTriggers('whiteLight')">
              <span
                ><i
                  class="mdi"
                  :class="
                    triggers.value.includes('whiteLight')
                      ? 'mdi-checkbox-marked'
                      : 'mdi-checkbox-blank-outline'
                  "
                ></i
              ></span>
              <span>{{ $t("secure.lightAlarm") }}</span>
            </div>
          </div>
          <div class="w-150">
            <div class="c-p" @click="updateTriggers('beep')">
              <span
                ><i
                  class="mdi"
                  :class="
                    triggers.value.includes('beep')
                      ? 'mdi-checkbox-marked'
                      : 'mdi-checkbox-blank-outline'
                  "
                ></i
              ></span>
              <span>{{ $t("secure.speakerAlarm") }}</span>
            </div>
          </div>
        </div>
      </div>
      <template v-if="sensitivity">
        <h6>{{ $t("secure.sensitivity") }}</h6>
        <div class="d-flex align-center justify-between">
          <div class="px-3" style="width: calc(100% - 60px)">
            <vue-slider
              class="camera-slider"
              :drag-on-click="true"
              v-model="sensitivity.value"
              :min="sensitivity.min"
              :max="sensitivity.max"
              tooltip="none"
            ></vue-slider>
          </div>
          <div style="width: 60px">
            <base-input
              class="w-100 mb-0"
              inputClasses="w-100 text-center"
              v-model="sensitivity.value"
              @input="checkSensitivity"
            ></base-input>
          </div>
        </div>
      </template>
      <template v-if="threshold">
        <h6>{{ $t("secure.detectDelay") }}</h6>
        <div class="d-flex align-center justify-between">
          <div class="px-3" style="width: calc(100% - 60px)">
            <vue-slider
              class="camera-slider"
              :drag-on-click="true"
              v-model="threshold.value"
              :min="threshold.min"
              :max="threshold.max"
              tooltip="none"
            ></vue-slider>
          </div>
          <div style="width: 60px">
            <base-input
              class="w-100 mb-0"
              inputClasses="w-100 text-center"
              v-model="threshold.value"
              @input="checkThreshold"
            ></base-input>
          </div>
        </div>
      </template>
    </template>
    <div slot="footer" class="text-center">
      <base-button class="footer-button" @click="UpdateViewDetect">{{
        $t("save")
      }}</base-button>
      <base-button
        class="footer-button"
        @click="$emit('updateViewName', 'camera-view')"
        >{{ $t("cancel") }}</base-button
      >
    </div>
  </card>
</template>

<script>
import CanvasDrawIntrusion from "../Element/CanvasDrawIntrusion";

export default {
  name: "camera-form-tab",
  props: {
    selectedCamera: [String, Boolean],
  },
  data() {
    return {
      canvasSize: {
        height: 500,
        width: 200,
      },
      snapshotUrl: "",
      enabled: false,
      sensitivity: false,
      threshold: false,
      target: false,
      triggers: false,
      coordinates: [],
    };
  },
  components: {
    CanvasDrawIntrusion,
  },
  computed: {
    camera,
    cameraDevice,
  },
  watch: {
    selectedCamera: resetData,
    // cameraDevice: {
    //   handler: resetData,
    //   deep: true,
    // },
  },
  methods: {
    checkSensitivity,
    checkThreshold,
    updateTarget,
    updateTriggers,
    UpdateViewDetect,
    resetData,
  },
  mounted: resetData,
};

function camera() {
  return $getters["HomeConfig/getCameraByID"](this.selectedCamera);
}

function cameraDevice() {
  return $getters["HomeConfig/getDevice"](
    this.camera && this.camera.device && this.camera.device.devid
  );
}

function checkSensitivity(value) {
  if (value > this.sensitivity.max)
    return (this.sensitivity.value = this.sensitivity.max);
  if (value < this.sensitivity.min)
    return (this.sensitivity.value = this.sensitivity.min);

  return (this.sensitivity.value = Number(value || this.sensitivity.value));
}

function checkThreshold(value) {
  if (value > this.threshold.max)
    return (this.threshold.value = this.threshold.max);
  if (value < this.threshold.min)
    return (this.threshold.value = this.threshold.min);
  return (this.threshold.value = Number(value || this.threshold.value));
}

function updateTarget(value) {
  let index = this.target.value.findIndex((item) => item === value);
  if (index === -1) {
    this.target.value.push(value);
  } else {
    this.target.value.splice(index, 1);
  }
}

function updateTriggers(value) {
  let index = this.triggers.value.findIndex((item) => item === value);
  if (index === -1) {
    this.triggers.value.push(value);
  } else {
    this.triggers.value.splice(index, 1);
  }
}

function resetData() {
  let camera = $getters["HomeConfig/getCameraByID"](this.selectedCamera);
  let cameraDevice = $getters["HomeConfig/getDevice"](
    camera && camera.device && camera.device.devid
  );
  if (!(cameraDevice && cameraDevice.config)) return;
  let { ip, user, pass } = camera;
  $dispatch($api.CameraManager.getSnapShot, {
    ip,
    username: user,
    password: pass,
  }).then((result) => {
    if (result)
      this.snapshotUrl =
        "data:image/jpeg;base64," + Buffer.from(result).toString("base64");
  });
  let { enabled, id, triggers, item } = JSON.parse(
    JSON.stringify(cameraDevice.config.SecurityConfig.FieldDetection)
  );

  this.canvasSize.height =
    cameraDevice.config.StreamConfig.video.videoResolutionHeight.value;
  this.canvasSize.width =
    cameraDevice.config.StreamConfig.video.videoResolutionWidth.value;
  this.enabled = enabled;

  this.sensitivity = item.sensitivity;
  this.threshold = item.threshold;
  this.target = item.target;
  this.triggers = triggers;
  this.coordinates = item.coordinates;
}

function UpdateViewDetect() {
  if (!(this.cameraDevice && this.cameraDevice.config)) return;
  let { enabled, sensitivity, triggers, threshold, coordinates, target } = this;
  let FieldDetection = JSON.parse(
    JSON.stringify(this.cameraDevice.config.SecurityConfig.FieldDetection)
  );
  FieldDetection.enabled = enabled;
  if (triggers) FieldDetection.triggers = triggers;
  if (!FieldDetection.item) FieldDetection.item = {};

  if (sensitivity) FieldDetection.item.sensitivity = sensitivity;
  if (threshold) FieldDetection.item.threshold = threshold;
  if (coordinates) FieldDetection.item.coordinates = coordinates;
  if (target) FieldDetection.item.target = target;

  $dispatch($api.HomeConfig.updateDevice, {
    devid: this.cameraDevice.devid,
    updateData: { config: { SecurityConfig: { FieldDetection } } },
  }).then((result) => {
    $alertify.success(this.$t("updateSuccess"));
  });
}
</script>

<style lang="scss">
</style>
