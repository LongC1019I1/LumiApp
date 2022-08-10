<template>
  <modal
    :show.sync="isShowModal"
    :showClose="false"
    modalClasses="modal-device-input modal-width-md lumi-input2"
    bodyClasses="p-5 mb-5 overflow-inherit"
    :backdropClick="false"
    @close="$emit('closeModal')"
  >
    <div slot="header" class="w-100 text-center">
      <span>{{ deviceInfo && deviceInfo.name }}</span>
      <i class="pull-right c-p mdi mdi-window-close pull-right" @click="$emit('closeModal')"></i>
    </div>
    <h6>{{ $t("rule.condition") }}</h6>
    <v-select
      class="mb-3 header-select"
      :options="CONDITION_DEVICE"
      :reduce="(label) => label.value"
      :clearable="false"
      :searchable="false"
      :value="device && device.cond"
      :disabled="isDisabled"
      @input="(value) => updateData(index, 'cond', value)"
    >
      <template #open-indicator>
        <span v-bind="selectAttributes">
          <i class="mdi mdi-menu-down"></i>
        </span>
      </template>
      <template #option="{ name }">
        <span>{{ $t("rule." + name) }}</span>
      </template>
      <template #selected-option="{name}">
        <span>{{ $t("rule." + name) }}</span>
      </template>
    </v-select>
    <h6 class="my-2">{{ $t("rule.status") }}</h6>
    <device-input-switch
      v-if="deviceInfo && deviceInfo.type === DEVICE_TYPE.SWITCH"
      :states="device && device.states"
      @updateStates="updateStates"
    />
    <device-input-input
      v-if="deviceInfo && deviceInfo.type === DEVICE_TYPE.INPUT"
      :states="device && device.states"
      :device="deviceInfo"
      @updateStates="updateStates"
    />
    <device-input-fan
      v-else-if="deviceInfo && deviceInfo.type === DEVICE_TYPE.FAN"
      :states="device && device.states"
      @updateStates="updateStates"
    />
    <device-input-dimmer
      v-else-if="deviceInfo && deviceInfo.type === DEVICE_TYPE.LIGHT"
      :states="device && device.states"
      @updateStates="updateStates"
    />
    <device-input-curtain
      v-else-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.CURTAIN"
      :states="device&&device.states"
      @updateStates="updateStates"
    />
    <device-input-motion-sensor
      v-else-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.SENSOR && deviceInfo.traits.find(item=>item.name===DEVICE_TRAIT.Pir)"
      :states="device&&device.states"
      :device="deviceInfo"
      @updateStates="updateStates"
    />
    <device-input-humi-sensor
      v-else-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.SENSOR && deviceInfo.traits.find(item=>item.name===DEVICE_TRAIT.Humidity)"
      :states="device&&device.states"
      :device="deviceInfo"
      @updateStates="updateStates"
    />
    <device-input-light-sensor
      v-else-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.SENSOR && deviceInfo.traits.find(item=>item.name===DEVICE_TRAIT.Luminance)"
      :states="device&&device.states"
      :device="deviceInfo"
      @updateStates="updateStates"
    />
    <device-input-temp-sensor
      v-else-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.SENSOR && deviceInfo.traits.find(item=>item.name===DEVICE_TRAIT.Temperature)"
      :states="device&&device.states"
      :device="deviceInfo"
      @updateStates="updateStates"
    />
    <device-input-battery-sensor
      v-else-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.SENSOR && deviceInfo.traits.find(item=>item.name===DEVICE_TRAIT.Battery)"
      :states="device&&device.states"
      :device="deviceInfo"
      @updateStates="updateStates"
    />
    <device-input-door-sensor
      v-else-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.SENSOR && deviceInfo.traits.find(item=>item.name===DEVICE_TRAIT.ContactSensor)"
      :states="device&&device.states"
      :device="deviceInfo"
      @updateStates="updateStates"
    />
    <device-input-daikin
      v-else-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.DAIKIN"
      :states="device&&device.states"
      @updateStates="updateStates"
    />
    <device-input-dooryale
      v-else-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.LMYALELOCK"
      :states="device&&device.states"
      @updateStates="updateStates"
    />
    <device-input-doorlock
      v-else-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.DOORLOCK"
      :states="device&&device.states"
      @updateStates="updateStates"
    />
    <device-input-camera
      v-else-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.CAMERA"
      :states="device&&device.states"
      @updateStates="updateStates"
    />
  </modal>
</template>

<script>
import DeviceInputSwitch from "../Element/DeviceInput/Switch";
import DeviceInputInput from "../Element/DeviceInput/Input";
import DeviceInputFan from "../Element/DeviceInput/Fan";
import DeviceInputDimmer from "../Element/DeviceInput/Dimmer";
import DeviceInputCurtain from "../Element/DeviceInput/Curtain";
import DeviceInputMotionSensor from "../Element/DeviceInput/MotionSensor";
import DeviceInputHumiSensor from "../Element/DeviceInput/HumiSensor";
import DeviceInputLightSensor from "../Element/DeviceInput/LightSensor";
import DeviceInputTempSensor from "../Element/DeviceInput/TempSensor";
import DeviceInputBatterySensor from "../Element/DeviceInput/BatterySensor";
import DeviceInputDoorSensor from "../Element/DeviceInput/DoorSensor";
import DeviceInputDaikin from "../Element/DeviceInput/Daikin";
import DeviceInputDooryale from "../Element/DeviceInput/Dooryale";
import DeviceInputDoorlock from "../Element/DeviceInput/Doorlock";
import DeviceInputCamera from "../Element/DeviceInput/Camera";
import {
  DEVICE_TYPE,
  DEVICE_TRAIT,
  IR_TYPE,
  IRV2_ALL_TYPE,
  CONDITION_DEVICE
} from "@/plugins/variableConst";
export default {
  name: "modal-update-deivce",
  props: {
    isShowModal: {
      type: Boolean,
      default: false
    },
    index: [Number, Boolean]
  },
  data() {
    return {
      CONDITION_DEVICE,
      selectAttributes: {
        ref: "openIndicator",
        role: "presentation",
        class: "vs__open-indicator"
      },
      DEVICE_TYPE,
      DEVICE_TRAIT,
      IR_TYPE,
      IRV2_ALL_TYPE
    };
  },
  components: {
    DeviceInputSwitch,
    DeviceInputInput,
    DeviceInputFan,
    DeviceInputDimmer,
    DeviceInputCurtain,
    DeviceInputMotionSensor,
    DeviceInputHumiSensor,
    DeviceInputLightSensor,
    DeviceInputTempSensor,
    DeviceInputBatterySensor,
    DeviceInputDoorSensor,
    DeviceInputDaikin,
    DeviceInputDooryale,
    DeviceInputDoorlock,
    DeviceInputCamera,
  },
  computed: {
    device,
    deviceInfo,
    isDisabled
  },
  methods: {
    updateStates,
    updateData
  }
};

function device() {
  if (this.index || (this.index === 0 && $state.RuleManager.in.devices)) {
    let device = $state.RuleManager.in.devices[this.index];
    console.log("device", device);
    if (device) return device;
    this.$emit("closeModal");
  }
}

function deviceInfo() {
  let { devid, remoteid } = this.device || {};
  let device = $getters["HomeConfig/getControll"]({ devid, remoteid });
  console.log("device-info", device);
  return device;
}

function isDisabled() {
  if (!this.deviceInfo) return true;
  if (this.deviceInfo.type === DEVICE_TYPE.SWITCH) return true;
  if (this.deviceInfo.type === DEVICE_TYPE.INPUT) return true;
  if (this.deviceInfo.type === DEVICE_TYPE.LMYALELOCK) return true;
  if (this.deviceInfo.type === DEVICE_TYPE.CAMERA) return true;
  if (this.deviceInfo.type === DEVICE_TYPE.SENSOR) {
    if (this.deviceInfo.traits.find(item => item.name === DEVICE_TRAIT.Pir||item.name === DEVICE_TRAIT.ContactSensor))
      return true;
  }
  return false;
}

function updateStates(states) {
  if (!this.deviceInfo || !this.device) return;
  updateData(this.index, "states", states);
}

function updateData(index, param, data) {
  $commit("RuleManager/UPDATE_INPUT_DEVICE_STATUS", {
    index,
    param,
    data
  });
}
</script>

<style lang="scss">
</style>
