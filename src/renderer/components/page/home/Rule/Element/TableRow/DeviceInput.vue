<template>
  <tr :device="device">
    <td
      v-if="
        $store.state.RuleManager.in.delay ||
        $store.state.RuleManager.in.delay === 0
      "
    >
      <masked-input
        type="text"
        class="delay-time-input"
        v-model="inputTimer"
        @keyup="updateDelayTime"
        :showMask="true"
        :keepCharPositions="true"
        :mask="[/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/]"
        placeholderChar="-"
      ></masked-input>
    </td>
    <td>
      {{ deviceInfo && deviceInfo.macdev ? deviceInfo.macdev.slice(-5) : "" }}
    </td>
    <td>{{ deviceInfo && deviceInfo.name }}</td>
    <td>{{ (room && room.name) || "" }}</td>
    <td>
      {{
        (CONDITION_DEVICE.find((item) => item.value === device.cond) || {})
          .symbol
      }}
    </td>
    <td v-if="deviceInfo && deviceInfo.type === DEVICE_TYPE.SWITCH">
      <base-slider
        size="md"
        class="mb-0"
        :value="getActiveDeviceFromVal(deviceInfo, device.states)"
        @submit="
          getActiveDeviceFromVal(
            DEVICE_TRAIT.OnOff,
            !g(deviceInfo, device.states)
          )
        "
      />
    </td>
    <td
      class="text-overflow-hidden max-w-100"
      v-else-if="
        deviceInfo &&
        (deviceInfo.type === DEVICE_TYPE.LIGHT ||
          deviceInfo.type === DEVICE_TYPE.FAN ||
          deviceInfo.type === DEVICE_TYPE.SENSOR ||
          deviceInfo.type === DEVICE_TYPE.INPUT ||
          deviceInfo.type === DEVICE_TYPE.LMYALELOCK ||
          deviceInfo.type === DEVICE_TYPE.CAMERA ||
          deviceInfo.type === DEVICE_TYPE.CURTAIN)
      "
    >
      {{ $t(getStatusDeviceFromVal(deviceInfo, device.states)) }}
    </td>
    <td
      class="text-overflow-hidden max-w-100"
      :title="daikinStatus"
      v-else-if="deviceInfo && deviceInfo.type === DEVICE_TYPE.DAIKIN"
    >
      {{ daikinStatus }}
    </td>
    <td class="text-overflow-hidden max-w-100" v-else></td>
    <td class="p-0">
      <base-dropdown position="right" class="device-menu">
        <template #title>
          <div class="c-p">
            <i class="mdi mdi-dots-horizontal"></i>
          </div>
        </template>
        <div class="dropdown-item" @click="$emit('updateDeviceInput')">
          <i class="mdi mdi-clipboard-edit-outline"></i>
          {{ $t("edit") }}
        </div>
        <div class="dropdown-item" @click="$emit('deleteDeviceInput')">
          <i class="mdi mdi-delete"></i>
          {{ $t("delete") }}
        </div>
      </base-dropdown>
    </td>
  </tr>
</template>

<script>
import {
  getStatusDeviceFromVal,
  getActiveDeviceFromVal,
  calcTimestamp,
} from "@/plugins/helper";
import {
  CONDITION_DEVICE,
  DEVICE_TRAIT,
  DEVICE_TYPE,
} from "@/plugins/variableConst";

export default {
  name: "device-row",
  props: {
    device: Object,
    index: Number,
  },
  data() {
    return {
      inputTimer: timer(
        ($state.RuleManager.in.delay || 0) * 1000 - 7 * 3600000,
        "HH:mm:ss"
      ),
      transition: this.device.transition,
      hasOnOffTrait: [
        DEVICE_TYPE.SWITCH,
        DEVICE_TYPE.LIGHT,
        DEVICE_TYPE.CURTAIN,
      ],
      room: "",
      hc: "",
      DEVICE_TYPE,
      DEVICE_TRAIT,
      CONDITION_DEVICE,
    };
  },
  computed: {
    deviceInfo,
    daikinStatus,
  },
  watch: {
    device: { handler: resetData, deep: true },
  },
  methods: {
    getStatusDeviceFromVal,
    getActiveDeviceFromVal,
    updateData,
    updateStatus,
    updateDelayTime,
  },
};

function deviceInfo() {
  let { devid, remoteid } = this.device;
  let device = $getters["HomeConfig/getControll"]({ devid, remoteid });
  if (device) {
    this.room = $state.HomeConfig.rooms.find(
      (room) => room.roomid == device.roomid
    );
    this.hc = $state.Home.currentHome.hcs.find(
      (hc) => hc.hc_id == device.hc_id
    );
  }
  return device;
}

function resetData(device) {
  if (!device) return;
  this.execution = device && device.execution;
}

function updateData(index, param, data) {
  // console.log("log", this.index, this.inputTimer);
  $commit("RuleManager/UPDATE_INPUT_DEVICE_STATUS", {
    index,
    param,
    data,
  });
}

function updateStatus(traits, value) {
  if (!this.deviceInfo) return;
  switch (this.deviceInfo.type) {
    case DEVICE_TYPE.SWITCH:
      updateData(this.index, "execution", {
        command: traits,
        params: { on: value },
      });
      break;
  }
}

function daikinStatus() {
  let data = {};
  if (!this.device.states || this.device.states.OnOff)
    return this.device.states.OnOff.on ? "ON" : "OFF";
  else if (this.device.states.Temperature)
    return `${this.device.states.Temperature.temperature} °C`;
}

function updateDelayTime() {
  let delay = calcTimestamp(this.inputTimer);
  if (delay || delay === 0) {
    this.inputTimer = timer((delay || 0) * 1000 - 7 * 3600000, "HH:mm:ss");
    $commit("RuleManager/SET_DATA", {
      in: { ...$state.RuleManager.in, delay: delay },
    });
  }
}
</script>

<style lang="scss"></style>
