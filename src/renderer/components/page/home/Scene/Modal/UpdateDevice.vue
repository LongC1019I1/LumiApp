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
    <device-status-switch
      v-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.SWITCH"
      :value="device&&device.execution"
      @updateStatus="updateStatus"
    />
    <device-status-fan
      v-else-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.FAN"
      :value="device&&device.execution"
      @updateStatus="updateStatus"
    />
    <device-status-dimmer
      v-else-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.LIGHT"
      :value="device&&device.execution"
      @updateStatus="updateStatus"
    />
    <device-status-curtain
      v-else-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.CURTAIN"
      :value="device&&device.execution"
      @updateStatus="updateStatus"
    />
    <device-status-speaker
      v-else-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.SPEAKER"
      :value="device&&device.execution"
      :device="deviceInfo"
      @updateStatus="updateStatus"
    />
    <device-status-daikin
      v-else-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.DAIKIN"
      :value="device&&device.execution"
      @updateStatus="updateStatus"
    />
    <device-status-remote-air-v1
      v-else-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.IR&&deviceInfo.irtype===IR_TYPE.REMOTE_AIR"
      :value="device&&device.execution"
      :device="deviceInfo"
      @updateStatus="updateStatus"
    />
    <device-status-remote-fan-v1
      v-else-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.IR&&deviceInfo.irtype===IR_TYPE.REMOTE_FAN"
      :value="device&&device.execution"
      :device="deviceInfo"
      @updateStatus="updateStatus"
    />
    <device-status-remote-tv-v1
      v-else-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.IR&&deviceInfo.irtype===IR_TYPE.REMOTE_TV"
      :value="device&&device.execution"
      :device="deviceInfo"
      @updateStatus="updateStatus"
    />
    <device-status-remote-air-v2
      v-else-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.IRV2&&deviceInfo.irtype===IRV2_ALL_TYPE.IR_AC"
      :value="device&&device.execution"
      :device="deviceInfo"
      @updateStatus="updateStatus"
    />
    <device-status-remote-fan-v2
      v-else-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.IRV2&&deviceInfo.irtype===IRV2_ALL_TYPE.IR_FAN"
      :value="device&&device.execution"
      :device="deviceInfo"
      @updateStatus="updateStatus"
    />
    <device-status-remote-tv-v2
      v-else-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.IRV2&&deviceInfo.irtype===IRV2_ALL_TYPE.IR_TV"
      :value="device&&device.execution"
      :device="deviceInfo"
      @updateStatus="updateStatus"
    />
    <device-status-remote-stb-v2
      v-else-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.IRV2&&deviceInfo.irtype===IRV2_ALL_TYPE.IR_STB"
      :value="device&&device.execution"
      :device="deviceInfo"
      @updateStatus="updateStatus"
    />
    <div
      v-else
    >Chức năng hiện chưa được cập nhật</div>
  </modal>
</template>

<script>
import DeviceStatusSwitch from "../Element/DeviceStatus/Switch";
import DeviceStatusFan from "../Element/DeviceStatus/Fan";
import DeviceStatusDimmer from "../Element/DeviceStatus/Dimmer";
import DeviceStatusCurtain from "../Element/DeviceStatus/Curtain";
import DeviceStatusSpeaker from "../Element/DeviceStatus/Speaker";
import DeviceStatusDaikin from "../Element/DeviceStatus/Daikin";
import DeviceStatusRemoteAirV1 from "../Element/DeviceStatus/RemoteAirV1";
import DeviceStatusRemoteFanV1 from "../Element/DeviceStatus/RemoteFanV1";
import DeviceStatusRemoteTvV1 from "../Element/DeviceStatus/RemoteTvV1";
import DeviceStatusRemoteAirV2 from "../Element/DeviceStatus/RemoteAirV2";
import DeviceStatusRemoteFanV2 from "../Element/DeviceStatus/RemoteFanV2";
import DeviceStatusRemoteTvV2 from "../Element/DeviceStatus/RemoteTvV2";
import DeviceStatusRemoteStbV2 from "../Element/DeviceStatus/RemoteStbV2";

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
    DeviceStatusSwitch,
    DeviceStatusFan,
    DeviceStatusDimmer,
    DeviceStatusCurtain,
    DeviceStatusSpeaker,
    DeviceStatusDaikin,
    DeviceStatusRemoteAirV1,
    DeviceStatusRemoteFanV1,
    DeviceStatusRemoteTvV1,
    DeviceStatusRemoteAirV2,
    DeviceStatusRemoteFanV2,
    DeviceStatusRemoteTvV2,
    DeviceStatusRemoteStbV2
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
  console.log("device", device);
  console.log("device", device);
  if (device) return device;
  this.$emit("closeModal");
}

function deviceInfo() {
  let { devid, remoteid } = this.device || {};
  let device = $getters["HomeConfig/getControll"]({ devid, remoteid });
  console.log("device-ìno", device);
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
