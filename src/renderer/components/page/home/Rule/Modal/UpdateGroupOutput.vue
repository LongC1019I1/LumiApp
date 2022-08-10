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
    <!-- <device-output-switch
      v-if="deviceInfo&&deviceInfo.type===DEVICE_TYPE.SWITCH"
      :value="device&&device.execution"
      @updateStatus="updateStatus"
    /> -->
  </modal>
</template>

<script>
import DeviceOutputSwitch from "../Element/DeviceOutput/Switch";

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
    // DeviceOutputSwitch,
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
