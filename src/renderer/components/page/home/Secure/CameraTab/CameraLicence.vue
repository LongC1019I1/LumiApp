<template>
  <card bodyClasses="mx-10-percent mt-5">
    <base-dropdown
      class="camera-info-dropdown w-100 mb-3"
      position="right"
      :disabled="isDisabled"
    >
      <template #title>
        <div class="camera-info-box" :class="{ disabled: isDisabled }">
          <div class="label">Model</div>
          <div class="info">
            {{ currentModel }}
            <i class="dropdown-icon mdi mdi-menu-down"></i>
          </div>
        </div>
      </template>
      <div
        v-for="model in modelList"
        :key="model"
        class="dropdown-item"
        @click="currentModel = model"
      >
        {{ model }}
      </div>
    </base-dropdown>
    <div
      class="camera-info-box border-bottom-radius-1 mb-3"
      @click="$refs.serial.focus()"
      :class="{ disabled: isDisabled }"
    >
      <div class="label">{{ $t("secure.serial") }}</div>
      <div class="info">
        <input
          id="serial"
          ref="serial"
          type="text"
          class="text-right"
          :placeholder="$t('secure.enterSerial')"
          v-model="serial"
          :disabled="isDisabled"
          @input="serial = serial.toUpperCase()"
        />
      </div>
    </div>

    <base-button
      class="w-100 border-radius-3 border-none"
      type="secondary"
      :class="{ disabled: isDisabled }"
      @click="isDisabled ? '' : submit()"
      >{{ $t("done") }}</base-button
    >
  </card>
</template>

<script>
export default {
  name: "camera-view-tab",
  props: {
    camid: [String, Boolean],
  },
  data() {
    return {
      modelList: [
        "LM-AC270412-BU2/SL",
        "LM-AC270412-TU2/SL",
        "LM-AC270412-BU4/SL",
        "LM-AC270412-TU4/SL",
        "LM-AC270412-BU5/SLU",
        "LM-AC270412-TU5/SLU",
      ],
      currentModel: "",
      serial: "",
    };
  },
  computed: {
    isDisabled,
    camera,
  },
  watch:{
    camid: resetData
  },
  methods: { submit },
};

function resetData(){
  this.currentModel = ''
  this.serial = ''
}

function isDisabled() {
  return !this.camid || !this.camera.serialNumber || this.camera.active===1 ? true : false;
}

function camera() {
  return $getters["HomeConfig/getCameraByID"](this.camid);
}

function submit() {
  if (!this.currentModel)
    return $alertify.confirm({
      title: this.$t("notify.notifyDefautlTitle"),
      text: this.$t("secure.pleaseEnterModel"),
    });
  if (!this.serial)
    return $alertify.confirm({
      title: this.$t("notify.notifyDefautlTitle"),
      text: this.$t("secure.pleaseEnterSerial"),
    });
  return $dispatch($api.HomeConfig.addCameraLicence, {
    cam_id: this.camid,
    serial_number: this.serial,
    cam_model: this.currentModel,
  }).then((result) => {
    if (!(result && result.success))
      $alertify.error(
        (result && result.message) || this.$t("notify.errorDefault")
      );
  });
}
</script>

<style lang="scss">
</style>
