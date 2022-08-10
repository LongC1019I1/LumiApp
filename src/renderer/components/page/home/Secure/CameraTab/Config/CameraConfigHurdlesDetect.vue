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
          class="ml-3 c-p"
          @click="$emit('updateViewName', 'camera-config-intrusion-detect')"
          >{{ $t("secure.cameraConfigIntrusionDetect") }}</span
        >
        <span
          v-if="cameraDevice.config.SecurityConfig.LineDetection"
          class="active ml-3 c-p"
          @click="$emit('updateViewName', 'camera-config-hurdles-detect')"
          >{{ $t("secure.cameraConfigHurdlesDetect") }}</span
        >
      </h5>
    </horizontal-scroll>
    <h5>{{ $t("secure.introduce") }}</h5>
    <h6>{{ $t("secure.introduceText3") }}</h6>
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
        <h6>{{ $t("secure.inputHurdlesSetting") }}</h6>
        <canvas-draw-hurdles
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
      <div v-if="target" class="d-flex align-center justify-between mt-3">
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
      <div v-if="triggers" class="d-flex align-center justify-between mb-3">
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
      <template v-if="direction">
        <h6>{{ $t("secure.direction") }}</h6>
        <base-dropdown
          menuClasses="w-100 max-h-300 overflow-y-auto"
          class="camera-info-dropdown w-100 mb-3"
          position="right"
        >
          <template #title>
            <div class="camera-info-box">
              <div class="label">{{ $t("secure." + direction.value) }}</div>
              <div class="info">
                <!-- {{ direction }} -->
                <i class="dropdown-icon mdi mdi-menu-down"></i>
              </div>
            </div>
          </template>
          <div
            v-for="item in direction.options"
            :key="item"
            class="dropdown-item w-100"
            @click="direction.value = item"
          >
            {{ $t("secure." + item) }}
          </div>
        </base-dropdown>
      </template>
      <template v-if="sensitivity">
        <h6>{{ $t("secure.sensitivity") }}</h6>
        <div class="d-flex align-center justify-between mb-3">
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
import CanvasDrawHurdles from "../Element/CanvasDrawHurdles.vue";

export default {
  name: "camera-config-hurdles-detect",
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
      target: false,
      triggers: false,
      direction: false,
      coordinates: [],
    };
  },
  components: {
    CanvasDrawHurdles,
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
    JSON.stringify(cameraDevice.config.SecurityConfig.LineDetection)
  );

  this.canvasSize.height =
    cameraDevice.config.StreamConfig.video.videoResolutionHeight.value;
  this.canvasSize.width =
    cameraDevice.config.StreamConfig.video.videoResolutionWidth.value;
  this.enabled = enabled;

  this.sensitivity = item.sensitivity;
  this.target = item.target;
  this.direction = item.direction;
  this.triggers = triggers;
  this.coordinates = item.coordinates;
}

function UpdateViewDetect() {
  if (!(this.cameraDevice && this.cameraDevice.config)) return;
  let { enabled, sensitivity, triggers, coordinates, target, direction } = this;
  let LineDetection = JSON.parse(
    JSON.stringify(this.cameraDevice.config.SecurityConfig.LineDetection)
  );

  LineDetection.enabled = enabled;
  if (triggers) LineDetection.triggers = triggers;

  if (sensitivity) LineDetection.item.sensitivity = sensitivity;
  if (coordinates) LineDetection.item.coordinates = coordinates;
  if (target) LineDetection.item.target = target;
  if (direction) LineDetection.item.direction = direction;

  $dispatch($api.HomeConfig.updateDevice, {
    devid: this.cameraDevice.devid,
    updateData: { config: { SecurityConfig: { LineDetection } } },
  }).then((result) => {
    $alertify.success(this.$t("updateSuccess"));
  });
}
</script>

<style lang="scss">
</style>
