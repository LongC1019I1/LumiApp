<template>
  <card bodyClasses="mx-10-percent">
    <horizontal-scroll
      ref="scrollHeader"
      slot="header"
      v-dragscroll
      class="overflow-hidden"
    >
      <h5>
        <span
          v-if="cameraDevice.config.SecurityConfig.SceneChangeDetection"
          class="active c-p"
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
          class="ml-3 c-p"
          @click="$emit('updateViewName', 'camera-config-hurdles-detect')"
          >{{ $t("secure.cameraConfigHurdlesDetect") }}</span
        >
      </h5>
    </horizontal-scroll>
    <h5>{{ $t("secure.introduce") }}</h5>
    <h6>{{ $t("secure.introduceText") }}</h6>
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
    <template v-if="sensitivity && enabled">
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
export default {
  name: "camera-form-tab",
  props: {
    selectedCamera: [String, Boolean],
  },
  data() {
    return {
      enabled: false,
      sensitivity: false,
    };
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
    UpdateViewDetect,
    resetData,
  },
  mounted: resetData,
};

function camera() {
  return $getters["HomeConfig/getCameraByID"](this.selectedCamera);
}

function checkSensitivity(value) {
  if (value > this.sensitivity.max)
    return (this.sensitivity.value = this.sensitivity.max);
  if (value < this.sensitivity.min)
    return (this.sensitivity.value = this.sensitivity.min);
  return (this.sensitivity.value = Number(value || this.sensitivity.min));
}

function cameraDevice() {
  return $getters["HomeConfig/getDevice"](
    this.camera && this.camera.device && this.camera.device.devid
  );
}

function resetData() {
  let camera = $getters["HomeConfig/getCameraByID"](this.selectedCamera);
  let cameraDevice = $getters["HomeConfig/getDevice"](
    camera && camera.device && camera.device.devid
  );
  if (!(cameraDevice && cameraDevice.config)) return;
  let { enabled, sensitivity } = JSON.parse(
    JSON.stringify(cameraDevice.config.SecurityConfig.SceneChangeDetection)
  );
  this.enabled = enabled;
  this.sensitivity = sensitivity;
}

function UpdateViewDetect() {
  if (
    !(
      this.cameraDevice &&
      this.cameraDevice.config &&
      this.cameraDevice.config.SecurityConfig &&
      this.cameraDevice.config.SecurityConfig.SceneChangeDetection
    )
  )
    return;
  let { enabled, sensitivity } = this;
  let SceneChangeDetection = JSON.parse(
    JSON.stringify(this.cameraDevice.config.SecurityConfig.SceneChangeDetection)
  );
  SceneChangeDetection.enabled = enabled;
  if (sensitivity)
    SceneChangeDetection.sensitivity = sensitivity;

  $dispatch($api.HomeConfig.updateDevice, {
    devid: this.cameraDevice.devid,
    updateData: { config: { SecurityConfig: { SceneChangeDetection } } },
  }).then((result) => {
    $alertify.success(this.$t("updateSuccess"));
  });
}
</script>

<style lang="scss">
</style>
