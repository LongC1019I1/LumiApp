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
          class="c-p mr-3"
          @click="$emit('updateViewName', 'camera-config-flash')"
          >{{ $t("secure.flash") }}</span
        >
        <span
          v-if="
            cameraDevice &&
            cameraDevice.config &&
            cameraDevice.config.TriggerConfig.AudioAlarm
          "
          class="active c-p"
          @click="$emit('updateViewName', 'camera-config-alarm')"
          >{{ $t("secure.alarm") }}</span
        >
      </h5>
    </horizontal-scroll>
    <template v-if="alarmTimes">
      <h6>{{ $t("secure.alarmTime") }}</h6>
      <div class="d-flex align-center justify-between mb-3">
        <div class="px-3" style="width: calc(100% - 60px)">
          <vue-slider
            class="camera-slider"
            :drag-on-click="true"
            v-model="alarmTimes.value"
            :min="alarmTimes.min"
            :max="alarmTimes.max"
            tooltip="none"
          ></vue-slider>
        </div>
        <div style="width: 60px">
          <base-input
            class="w-100 mb-0"
            inputClasses="w-100 text-center"
            v-model="alarmTimes.value"
            @input="checkAlarmTimes"
          ></base-input>
        </div>
      </div>
    </template>
    <template v-if="audioVolume">
      <h6>{{ $t("secure.volume") }}</h6>
      <div class="d-flex align-center justify-between mb-3">
        <div class="px-3" style="width: calc(100% - 60px)">
          <vue-slider
            class="camera-slider"
            :drag-on-click="true"
            v-model="audioVolume.value"
            :min="audioVolume.min"
            :max="audioVolume.max"
            tooltip="none"
          ></vue-slider>
        </div>
        <div style="width: 60px">
          <base-input
            class="w-100 mb-0"
            inputClasses="w-100 text-center"
            v-model="audioVolume.value"
            @input="checkAudioVolume"
          ></base-input>
        </div>
      </div>
    </template>
    <base-dropdown
      v-if="audioID"
      menuClasses="w-100 max-h-300 overflow-y-auto"
      class="camera-info-dropdown w-100 mb-3"
      position="right"
    >
      <template #title>
        <div class="camera-info-box">
          <div class="label">{{ $t("secure.sound") }}</div>
          <div class="info">
            {{
              (
                audioID.options.find(
                  (item) => item.audioID === audioID.value
                ) || {}
              ).audioDescription
            }}
            <i class="dropdown-icon mdi mdi-menu-down"></i>
          </div>
        </div>
      </template>
      <div
        v-for="item in audioID.options"
        :key="item.audioID"
        class="dropdown-item w-100"
        @click="audioID.value = item.audioID"
      >
        {{ item.audioDescription }}
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
      alarmTimes: false,
      audioVolume: false,
      audioID: false,
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
    checkAlarmTimes,
    checkAudioVolume,
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

function checkAlarmTimes(value) {
  if (value > this.alarmTimes.max)
    return (this.alarmTimes.value = this.alarmTimes.max);
  if (value < this.alarmTimes.min)
    return (this.alarmTimes.value = this.alarmTimes.min);

  return (this.alarmTimes.value = Number(value || this.alarmTimes.min));
}

function checkAudioVolume(value) {
  if (value > this.audioVolume.max)
    return (this.audioVolume.value = this.audioVolume.max);
  if (value < this.audioVolume.min)
    return (this.audioVolume.value = this.audioVolume.min);
  return (this.audioVolume.value = Number(value || this.audioVolume.min));
}

function resetData() {
  let camera = $getters["HomeConfig/getCameraByID"](this.selectedCamera);
  let cameraDevice = $getters["HomeConfig/getDevice"](
    camera && camera.device && camera.device.devid
  );

  if (!(cameraDevice && cameraDevice.config)) return;

  let { alarmTimes, audioID, audioVolume } = JSON.parse(
    JSON.stringify(cameraDevice.config.TriggerConfig.AudioAlarm)
  );
  this.alarmTimes = alarmTimes;
  this.audioID = audioID;
  this.audioVolume = audioVolume;
}

function UpdateViewDetect() {
  if (!(this.cameraDevice && this.cameraDevice.config)) return;
  let { alarmTimes, audioID, audioVolume } = this;
  let AudioAlarm = {
    ...JSON.parse(
      JSON.stringify(this.cameraDevice.config.TriggerConfig.AudioAlarm)
    ),
  };
  if (alarmTimes) AudioAlarm.alarmTimes = alarmTimes;
  if (audioID) AudioAlarm.audioID = audioID;
  if (audioVolume) AudioAlarm.audioVolume = audioVolume;

  $dispatch($api.HomeConfig.updateDevice, {
    devid: this.cameraDevice.devid,
    updateData: { config: { TriggerConfig: { AudioAlarm } } },
  }).then((result) => {
    $alertify.success(this.$t("updateSuccess"));
  });
}
</script>

<style lang="scss">
</style>
