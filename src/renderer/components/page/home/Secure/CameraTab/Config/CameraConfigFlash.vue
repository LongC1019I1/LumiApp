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
          v-if="
            cameraDevice &&
            cameraDevice.config &&
            cameraDevice.config.TriggerConfig.WhiteLightAlarm
          "
          class="active c-p mr-3"
          @click="$emit('updateViewName', 'camera-config-flash')"
          >{{ $t("secure.flash") }}</span
        >
        <span
          v-if="
            cameraDevice &&
            cameraDevice.config &&
            cameraDevice.config.TriggerConfig.AudioAlarm
          "
          class="c-p"
          @click="$emit('updateViewName', 'camera-config-alarm')"
          >{{ $t("secure.alarm") }}</span
        >
      </h5>
    </horizontal-scroll>
    <template v-if="durationTime">
      <h6>{{ $t("secure.flashTime") }}</h6>
      <div class="d-flex align-center justify-between mb-3">
        <div class="px-3" style="width: calc(100% - 60px)">
          <vue-slider
            class="camera-slider"
            :drag-on-click="true"
            v-model="durationTime.value"
            :min="durationTime.min"
            :max="durationTime.max"
            tooltip="none"
          ></vue-slider>
        </div>
        <div style="width: 60px">
          <base-input
            class="w-100 mb-0"
            inputClasses="w-100 text-center"
            v-model="durationTime.value"
            @input="checkDurationTime"
          ></base-input>
        </div>
      </div>
    </template>
    <template v-if="brightness">
      <h6>{{ $t("secure.lux") }}</h6>
      <div class="d-flex align-center justify-between mb-3">
        <div class="px-3" style="width: calc(100% - 60px)">
          <vue-slider
            class="camera-slider"
            :drag-on-click="true"
            v-model="brightness.value"
            :min="brightness.min"
            :max="brightness.max"
            tooltip="none"
          ></vue-slider>
        </div>
        <div style="width: 60px">
          <base-input
            class="w-100 mb-0"
            inputClasses="w-100 text-center"
            v-model="brightness.value"
            @input="checkBrightness"
          ></base-input>
        </div>
      </div>
    </template>
    <base-dropdown
      v-if="frequency"
      menuClasses="w-100 max-h-300 overflow-y-auto"
      class="camera-info-dropdown w-100 mb-3"
      position="right"
    >
      <template #title>
        <div class="camera-info-box">
          <div class="label">{{ $t("secure.frequency") }}</div>
          <div class="info" style="text-transform: capitalize">
            {{ frequency.value }}
            <i class="dropdown-icon mdi mdi-menu-down"></i>
          </div>
        </div>
      </template>
      <div
        v-for="item in frequency.options"
        :key="item"
        class="dropdown-item w-100"
        style="text-transform: capitalize"
        @click="frequency.value = item"
      >
        {{ item }}
      </div>
    </base-dropdown>

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
  name: "camera-config-hurdles-detect",
  props: {
    selectedCamera: [String, Boolean],
  },
  data() {
    return {
      durationTime: false,
      brightness: false,
      frequency: false,
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
    checkDurationTime,
    checkBrightness,
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

function checkDurationTime(value) {
  if (value > this.durationTime.max)
    return (this.durationTime.value = this.durationTime.max);
  if (value < this.durationTime.min)
    return (this.durationTime.value = this.durationTime.min);

  return (this.durationTime.value = Number(value || this.durationTime.min));
}

function checkBrightness(value) {
  if (value > this.brightness.max)
    return (this.brightness.value = this.brightness.max);
  if (value < this.brightness.min)
    return (this.brightness.value = this.brightness.min);
  return (this.brightness.value = Number(value || this.brightness.min));
}

function resetData() {
  let camera = $getters["HomeConfig/getCameraByID"](this.selectedCamera);
  let cameraDevice = $getters["HomeConfig/getDevice"](
    camera && camera.device && camera.device.devid
  );

  if (!(cameraDevice && cameraDevice.config)) return;

  let { brightness, durationTime, frequency } = JSON.parse(
    JSON.stringify(cameraDevice.config.TriggerConfig.WhiteLightAlarm)
  );
  this.brightness = brightness;
  this.durationTime = durationTime;
  this.frequency = frequency;
}

function UpdateViewDetect() {
  if (!(this.cameraDevice && this.cameraDevice.config)) return;
  let { brightness, durationTime, frequency } = this;
  let WhiteLightAlarm = {
    ...JSON.parse(
      JSON.stringify(this.cameraDevice.config.TriggerConfig.WhiteLightAlarm)
    ),
  };
  if (brightness) WhiteLightAlarm.brightness = brightness;
  if (durationTime) WhiteLightAlarm.durationTime = durationTime;
  if (frequency) WhiteLightAlarm.frequency = frequency;

  $dispatch($api.HomeConfig.updateDevice, {
    devid: this.cameraDevice.devid,
    updateData: { config: { TriggerConfig: { WhiteLightAlarm } } },
  }).then((result) => {
    $alertify.success(this.$t("updateSuccess"));
  });
}
</script>

<style lang="scss">
</style>
