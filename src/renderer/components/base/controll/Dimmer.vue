<template>
  <modal
    v-if="modalControllDimmer"
    :show="true"
    :showClose="false"
    :animationDuration="0"
    @close="closeModal"
    :backdropClick="false"
    modalClasses="modal-controll controll-dimmer-modal modal-full-height"
    headerClasses="text-center"
  >
    <div slot="header" class="w-100 text-center">
      <span>{{ device.name }}</span>
      <i
        class="pull-right c-p mdi mdi-window-close pull-right"
        @click="closeModal"
      ></i>
    </div>
    <div class="slider">
      <base-slider @submit="turnOnOffLight" :value="status.states.OnOff.on" />
    </div>
    <div class="device-icon">
      <i
        :class="'icon-' + getDefaultIconDevice(device, status && status.states)"
      ></i>
    </div>
    <div class="controll-form p-3">
      <div class="mb-4">
        <span>{{ $t("devices.colorTitle") }}</span>
        <span class="pull-right">{{ value }}%</span>
      </div>
      <vue-slider
        class="dimmer-slider"
        @drag-end="changeBrightness"
        :drag-on-click="true"
        v-model="value"
        tooltip="none"
      />
    </div>
  </modal>
</template>
<script>
import { getDefaultIconDevice } from "@/plugins/helper";
import { DEVICE_TRAIT } from "@/plugins/variableConst";
export default {
  name: "controll-dimmer",
  data() {
    return {
      value: 0,
    };
  },
  computed: {
    modalControllDimmer,
    device,
    status,
  },
  methods: {
    closeModal,
    getDefaultIconDevice,
    turnOnOffLight,
    changeBrightness,
  },
};
function device() {
  return $getters["HomeConfig/getDevice"](this.modalControllDimmer);
}
function status() {
  let status = $getters["HomeControll/getDeviceStatusByDeviceID"](
    this.modalControllDimmer
  );
  let { type, traits } = this.device;
  let traitDimmer = traits.find((t) => t.name == DEVICE_TRAIT.Brightness);
  let levelBrightness = 0;
  if (!!traitDimmer) {
    levelBrightness = Math.round(
      (status.states[DEVICE_TRAIT.Brightness].brightness * 100) /
        (traitDimmer.max - traitDimmer.min)
    );
  }
  this.value = levelBrightness;
  return status;
}

function modalControllDimmer() {
  return $state.ContentManager.modal.modalControllDimmer;
}
function turnOnOffLight() {
  let execution = {
    command: DEVICE_TRAIT.OnOff,
    params: {
      on: !(
        this.status &&
        this.status.states &&
        this.status.states.OnOff &&
        this.status.states.OnOff.on
      ),
    },
  };
  $dispatch($api.HomeControll.controllDevice, {
    devid: this.device.devid,
    execution,
  });
}

function changeBrightness() {
  let { traits } = this.device;
  let traitDimmer = traits.find((t) => t.name == DEVICE_TRAIT.Brightness);
  let execution = {
    command: DEVICE_TRAIT.Brightness,
    params: {
      brightness:
        this.value >= traitDimmer.max
          ? traitDimmer.max
          : this.value <= traitDimmer.min
          ? traitDimmer.min
          : this.value,
    },
  };
  $dispatch($api.HomeControll.controllDevice, {
    devid: this.device.devid,
    execution,
  });
}

function closeModal() {
  $commit("ContentManager/UPDATE_MODAL_STATUS", {
    modal: "modalControllDimmer",
    data: false,
  });
}
</script>
<style lang="scss">
</style>
