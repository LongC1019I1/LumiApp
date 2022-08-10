<template>
  <modal
    :show.sync="isShowModal"
    :showClose="false"
    modalClasses="modal-device-output modal-width-md"
    bodyClasses="px-5 pt-3 pb-5"
    :backdropClick="false"
    @close="$emit('closeModal')"
  >
    <div slot="header" class="w-100 text-center">
      <span>{{deviceInfo&&deviceInfo.name}}</span>
      <i class="pull-right c-p mdi mdi-window-close pull-right" @click="$emit('closeModal')"></i>
    </div>
    <h6 class="my-2">{{$t('scene.delay')}}</h6>
    <div class="lumi-input2">
      <div class="form-group">
        <masked-input
          type="text"
          class="form-control"
          v-model="inputTimer"
          :showMask="true"
          :keepCharPositions="true"
          :mask="[/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/,':',/[0-9]/, /[0-9]/,]"
          placeholderChar="-"
        ></masked-input>
      </div>
    </div>
    <h6
      class="my-2"
    >{{deviceInfo&&(deviceInfo.type===DEVICE_TYPE.IR||deviceInfo.type===DEVICE_TYPE.IR_V2)?$t('scene.choooseCommand'):$t('scene.status')}}</h6>
    <device-output-switch
      v-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.SWITCH"
      :value="device&&device.execution"
      @updateStatus="updateStatus"
    />
    <device-output-fan
      v-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.FAN"
      :value="device&&device.execution"
      @updateStatus="updateStatus"
    />
    <device-output-dimmer
      v-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.LIGHT"
      :value="device&&device.execution"
      @updateStatus="updateStatus"
    />
    <device-output-curtain
      v-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.CURTAIN"
      :value="device&&device.execution"
      @updateStatus="updateStatus"
    />
    <device-output-speaker
      v-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.SPEAKER"
      :value="device&&device.execution"
      :device="deviceInfo"
      @updateStatus="updateStatus"
    />
    <device-output-daikin
      v-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.DAIKIN"
      :value="device&&device.execution"
      @updateStatus="updateStatus"
    />
    <device-output-remote-air-v1
      v-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.IR&&deviceInfo.irtype===IR_TYPE.REMOTE_AIR"
      :value="device&&device.execution"
      :device="deviceInfo"
      @updateStatus="updateStatus"
    />
    <device-output-remote-fan-v1
      v-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.IR&&deviceInfo.irtype===IR_TYPE.REMOTE_FAN"
      :value="device&&device.execution"
      :device="deviceInfo"
      @updateStatus="updateStatus"
    />
    <device-output-remote-tv-v1
      v-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.IR&&deviceInfo.irtype===IR_TYPE.REMOTE_TV"
      :value="device&&device.execution"
      :device="deviceInfo"
      @updateStatus="updateStatus"
    />
    <device-output-remote-air-v2
      v-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.IRV2&&deviceInfo.irtype===IRV2_ALL_TYPE.IR_AC"
      :value="device&&device.execution"
      :device="deviceInfo"
      @updateStatus="updateStatus"
    />
    <device-output-remote-fan-v2
      v-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.IRV2&&deviceInfo.irtype===IRV2_ALL_TYPE.IR_FAN"
      :value="device&&device.execution"
      :device="deviceInfo"
      @updateStatus="updateStatus"
    />
    <device-output-remote-tv-v2
      v-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.IRV2&&deviceInfo.irtype===IRV2_ALL_TYPE.IR_TV"
      :value="device&&device.execution"
      :device="deviceInfo"
      @updateStatus="updateStatus"
    />
    <device-output-remote-stb-v2
      v-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.IRV2&&deviceInfo.irtype===IRV2_ALL_TYPE.IR_STB"
      :value="device&&device.execution"
      :device="deviceInfo"
      @updateStatus="updateStatus"
    />
  </modal>
</template>

<script>
import DeviceOutputSwitch from "../Element/DeviceOutput/Switch";
import DeviceOutputFan from "../Element/DeviceOutput/Fan";
import DeviceOutputDimmer from "../Element/DeviceOutput/Dimmer";
import DeviceOutputCurtain from "../Element/DeviceOutput/Curtain";
import DeviceOutputSpeaker from "../Element/DeviceOutput/Speaker";
import DeviceOutputDaikin from "../Element/DeviceOutput/Daikin";
import DeviceOutputRemoteAirV1 from "../Element/DeviceOutput/RemoteAirV1";
import DeviceOutputRemoteFanV1 from "../Element/DeviceOutput/RemoteFanV1";
import DeviceOutputRemoteTvV1 from "../Element/DeviceOutput/RemoteTvV1";
import DeviceOutputRemoteAirV2 from "../Element/DeviceOutput/RemoteAirV2";
import DeviceOutputRemoteFanV2 from "../Element/DeviceOutput/RemoteFanV2";
import DeviceOutputRemoteTvV2 from "../Element/DeviceOutput/RemoteTvV2";
import DeviceOutputRemoteStbV2 from "../Element/DeviceOutput/RemoteStbV2";

import { calcTimestamp } from "@/plugins/helper";
import {
  DEVICE_TYPE,
  DEVICE_TRAIT,
  IR_TYPE,
  IRV2_ALL_TYPE
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
      DEVICE_TYPE,
      DEVICE_TRAIT,
      IR_TYPE,
      IRV2_ALL_TYPE
    };
  },
  components: {
    DeviceOutputSwitch,
    DeviceOutputFan,
    DeviceOutputDimmer,
    DeviceOutputCurtain,
    DeviceOutputSpeaker,
    DeviceOutputDaikin,
    DeviceOutputRemoteAirV1,
    DeviceOutputRemoteFanV1,
    DeviceOutputRemoteTvV1,
    DeviceOutputRemoteAirV2,
    DeviceOutputRemoteFanV2,
    DeviceOutputRemoteTvV2,
    DeviceOutputRemoteStbV2
  },
  computed: {
    inputTimer: {
      get() {
        return timer(
          ((this.device && this.device.delay) || 0) * 1000 - 7 * 3600000,
          "HH:mm:ss"
        );
      },
      set(value) {
        updateData(this.index, "delay", calcTimestamp(value));
      }
    },
    device,
    deviceInfo
  },
  methods: {
    updateStatus,
    calcTimestamp,
    updateData
  }
};

function device() {
  let device = $state.RuleManager.out.devices[this.index];
  console.log('device',device);
  if (device) return device;
  this.$emit("closeModal");
}

function deviceInfo() {
  let { devid, remoteid } = this.device || {};
  let device = $getters["HomeConfig/getControll"]({ devid, remoteid });
  console.log('device-ìno', device);
  return device;
}

function updateStatus(execution) {
  if (!this.deviceInfo || !this.device) return;
  updateData(this.index, "execution", execution);
}

function resetData(device) {
  console.log(device);
  if (!device) return;
  if (device.delay)
    this.inputTimer = timer(device.delay * 1000 - 7 * 3600000, "HH:mm:ss");
  this.execution = device && device.execution;
}

function updateData(index, param, data) {
  $commit("RuleManager/UPDATE_OUTPUT_DEVICE_STATUS", {
    index,
    param,
    data
  });
}
</script>

<style lang="scss">
</style>
