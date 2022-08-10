<template>
  <card
    bodyClasses="mx-10-percent"
    :camera="camera"
    :cameraDevice="cameraDevice"
  >
    <h5 slot="header">
      <span class="active">{{ $t("secure.cameraConfigVideo") }}</span>
    </h5>
    <base-dropdown
      v-if="videoResolutionHeight && videoResolutionHeight"
      menuClasses="w-100 max-h-300 overflow-y-auto"
      class="camera-info-dropdown w-100 mb-3"
      position="right"
    >
      <template #title>
        <div class="camera-info-box">
          <div class="label">{{ $t("secure.resolution") }}</div>
          <div class="info">
            {{ videoResolutionWidth.value }} x {{ videoResolutionHeight.value }}
            <i class="dropdown-icon mdi mdi-menu-down"></i>
          </div>
        </div>
      </template>
      <div
        v-for="(heigth, index) in videoResolutionHeight.options"
        :key="index"
        class="dropdown-item w-100"
        @click="
          videoResolutionHeight.value = heigth;
          videoResolutionWidth.value = videoResolutionWidth.options[index];
        "
      >
        {{ videoResolutionWidth.options[index] }} x {{ heigth }}P
      </div>
    </base-dropdown>
    <base-dropdown
      v-if="fixedQuality"
      menuClasses="w-100 max-h-300 overflow-y-auto"
      class="camera-info-dropdown w-100 mb-3"
      position="right"
      :disabled="videoQualityControlType.value === 'CBR'"
    >
      <template #title>
        <div
          class="camera-info-box"
          :class="{ disabled: videoQualityControlType.value === 'CBR' }"
        >
          <div class="label">{{ $t("secure.videoQuality") }}</div>
          <div class="info">
            {{
              listVideoQuality.find((item) => item.value === fixedQuality.value)
                .label
            }}
            <i class="dropdown-icon mdi mdi-menu-down"></i>
          </div>
        </div>
      </template>
      <div
        v-for="item in listVideoQuality"
        :key="item.value"
        class="dropdown-item w-100"
        @click="fixedQuality.value = item.value"
      >
        {{ item.label }}
      </div>
    </base-dropdown>
    <base-dropdown
      v-if="maxFrameRate"
      menuClasses="w-100 max-h-300 overflow-y-auto"
      class="camera-info-dropdown w-100 mb-3"
      position="right"
    >
      <template #title>
        <div class="camera-info-box">
          <div class="label">{{ $t("secure.framePerSecond") }}</div>
          <div class="info">
            {{
              listFramePerSecond.find(
                (item) => item.value === maxFrameRate.value
              ).label
            }}
            fps
            <i class="dropdown-icon mdi mdi-menu-down"></i>
          </div>
        </div>
      </template>
      <div
        v-for="framePerSecond in listFramePerSecond"
        :key="framePerSecond.value"
        class="dropdown-item w-100"
        @click="maxFrameRate.value = framePerSecond.value"
      >
        {{ framePerSecond.label }} fps
      </div>
    </base-dropdown>
    <base-dropdown
      v-if="videoQualityControlType"
      menuClasses="w-100 max-h-300 overflow-y-auto"
      class="camera-info-dropdown w-100 mb-3"
      position="right"
    >
      <template #title>
        <div class="camera-info-box">
          <div class="label">{{ $t("secure.speedTransType") }}</div>
          <div class="info">
            {{ $t("secure." + videoQualityControlType.value) }}
            <i class="dropdown-icon mdi mdi-menu-down"></i>
          </div>
        </div>
      </template>
      <div
        v-for="speedTransType in videoQualityControlType.options"
        :key="speedTransType"
        class="dropdown-item w-100"
        @click="videoQualityControlType.value = speedTransType"
      >
        {{ $t("secure." + speedTransType) }}
      </div>
    </base-dropdown>
    <base-dropdown
      v-if="constantBitRate"
      menuClasses="w-100 max-h-300 overflow-y-auto"
      class="camera-info-dropdown w-100 mb-3"
      position="right"
    >
      <template #title>
        <div class="camera-info-box">
          <div class="label">{{ $t("secure.maxSpeedTrans") }}</div>
          <div class="info">
            {{ constantBitRate.value }} Kbps
            <i class="dropdown-icon mdi mdi-menu-down"></i>
          </div>
        </div>
      </template>
      <template v-for="maxSpeedTrans in listMaxSpeedTrans">
        <div
          v-if="
            maxSpeedTrans <= constantBitRate.max &&
            maxSpeedTrans >= constantBitRate.min
          "
          :key="maxSpeedTrans"
          class="dropdown-item w-100"
          @click="constantBitRate.value = maxSpeedTrans"
        >
          {{ maxSpeedTrans }} Kbps
        </div>
      </template>
    </base-dropdown>
    <base-dropdown
      v-if="videoCodecType"
      menuClasses="w-100 max-h-300 overflow-y-auto"
      class="camera-info-dropdown w-100 mb-3"
      position="right"
    >
      <template #title>
        <div class="camera-info-box">
          <div class="label">{{ $t("secure.encodeVideoType") }}</div>
          <div class="info">
            {{ videoCodecType.value }}
            <i class="dropdown-icon mdi mdi-menu-down"></i>
          </div>
        </div>
      </template>
      <div
        v-for="encodeVideoType in videoCodecType.options"
        :key="encodeVideoType"
        class="dropdown-item w-100"
        @click="videoCodecType.value = encodeVideoType"
      >
        {{ encodeVideoType }}
      </div>
    </base-dropdown>
    <div slot="footer" class="text-center">
      <base-button class="footer-button" @click="submitConfigVideo">{{
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
import { listVideoQuality, listFramePerSecond } from "@/plugins/variableConst";

export default {
  name: "camera-form-tab",
  props: {
    selectedCamera: [String, Boolean],
  },
  data() {
    return {
      videoResolutionHeight: false,
      videoResolutionWidth: false,
      fixedQuality: false,
      maxFrameRate: false,
      videoQualityControlType: false,
      constantBitRate: false,
      videoCodecType: false,
      listVideoQuality,
      listFramePerSecond,
      listMaxSpeedTrans: [32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384],
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
    submitConfigVideo,
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

function resetData() {
  let camera = $getters["HomeConfig/getCameraByID"](this.selectedCamera);
  let cameraDevice = $getters["HomeConfig/getDevice"](
    camera && camera.device && camera.device.devid
  );
  if (
    !(
      cameraDevice &&
      cameraDevice.config &&
      cameraDevice.config.StreamConfig.video
    )
  )
    return;
  let {
    videoResolutionHeight,
    videoResolutionWidth,
    fixedQuality,
    maxFrameRate,
    videoQualityControlType,
    constantBitRate,
    videoCodecType,
  } = JSON.parse(JSON.stringify(cameraDevice.config.StreamConfig.video));
  this.videoResolutionHeight = videoResolutionHeight;
  this.videoResolutionWidth = videoResolutionWidth;
  this.constantBitRate = constantBitRate;
  this.fixedQuality = fixedQuality;
  this.maxFrameRate = maxFrameRate;
  this.videoCodecType = videoCodecType;
  this.videoQualityControlType = videoQualityControlType;
}

function submitConfigVideo() {
  if (
    !(
      this.cameraDevice &&
      this.cameraDevice.config &&
      this.cameraDevice.config.StreamConfig &&
      this.cameraDevice.config.StreamConfig.video
    )
  )
    return;
  let {
    videoResolutionHeight,
    videoResolutionWidth,
    fixedQuality,
    maxFrameRate,
    videoQualityControlType,
    constantBitRate,
    videoCodecType,
  } = this;

  let StreamConfig = JSON.parse(
    JSON.stringify(this.cameraDevice.config.StreamConfig)
  );

  if (videoResolutionHeight)
    StreamConfig.video.videoResolutionHeight = videoResolutionHeight;
  if (videoResolutionWidth)
    StreamConfig.video.videoResolutionWidth = videoResolutionWidth;
  if (fixedQuality) StreamConfig.video.fixedQuality = fixedQuality;
  if (maxFrameRate) StreamConfig.video.maxFrameRate = maxFrameRate;
  if (videoQualityControlType)
    StreamConfig.video.videoQualityControlType = videoQualityControlType;
  if (constantBitRate) StreamConfig.video.constantBitRate = constantBitRate;
  if (videoCodecType) StreamConfig.video.videoCodecType = videoCodecType;

  $dispatch($api.HomeConfig.updateDevice, {
    devid: this.cameraDevice.devid,
    updateData: { config: { StreamConfig } },
  }).then((result) => {
    $alertify.success(this.$t("updateSuccess"));
  });
}
</script>

<style lang="scss">
</style>
