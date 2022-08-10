<template>
  <tr :device="device">
    <td>
      <masked-input
        type="text"
        class="delay-time-input"
        v-model="inputTimer"
        @keyup="updateData(index, 'delay', calcTimestamp(inputTimer))"
        :showMask="true"
        :keepCharPositions="true"
        :mask="[/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/]"
        placeholderChar="-"
      ></masked-input>
    </td>
    <td>
      <!-- <input
        type="number"
        v-model="transition"
        @keyup="$emit('updateData', 'transition', transition)"
        class="delay-time-input"
        min="0"
        max="5"
      >-->
    </td>
    <td>{{ deviceInfo && deviceInfo.name }}</td>
    <td>{{ (room && room.name) || "" }}</td>
    <td>{{ deviceInfo && deviceInfo.macdev ? deviceInfo.macdev.slice(-5) : "" }}</td>
    <td v-if="deviceInfo && deviceInfo.type === DEVICE_TYPE.SWITCH">
      <base-slider
        size="md"
        class="mb-0"
        :value="getActiveDeviceFromExecution(deviceInfo, device.execution)"
        @submit="
          updateStatus(
            DEVICE_TRAIT.OnOff,
            !getActiveDeviceFromExecution(deviceInfo, device.execution)
          )
        "
      />
    </td>
    <td
      class="text-overflow-hidden max-w-100"
      v-else-if="
        deviceInfo &&
        (deviceInfo.type === DEVICE_TYPE.LIGHT ||
          deviceInfo.type === DEVICE_TYPE.FAN)
      "
    >
      {{ $t(getStatusDeviceFromExecution(deviceInfo, device.execution)) }}
    </td>
    <td
      class="text-overflow-hidden max-w-100"
      v-else-if="deviceInfo && deviceInfo.type === DEVICE_TYPE.CURTAIN"
    >
      {{
        device.execution.command === DEVICE_TRAIT.StartStop
          ? $t("scene.stop")
          : $t(getStatusDeviceFromExecution(deviceInfo, device.execution))
      }}
    </td>
    <td
      :title="speakerStatus"
      class="text-overflow-hidden max-w-100"
      v-else-if="deviceInfo && deviceInfo.type === DEVICE_TYPE.SPEAKER"
    >
      {{ speakerStatus }}
    </td>
    <td
      class="text-overflow-hidden max-w-100"
      :title="remoteV1Status"
      v-else-if="deviceInfo && deviceInfo.type === DEVICE_TYPE.IR"
    >
      {{ remoteV1Status }}
    </td>
    <td
      class="text-overflow-hidden max-w-100"
      :title="daikinStatus"
      v-else-if="deviceInfo && deviceInfo.type === DEVICE_TYPE.DAIKIN"
    >
      {{ daikinStatus }}
    </td>
    <td
      class="text-overflow-hidden max-w-100"
      :title="remoteV2Status"
      v-else-if="deviceInfo && deviceInfo.type === DEVICE_TYPE.IRV2"
    >
      {{ remoteV2Status }}
    </td>
    <td class="text-overflow-hidden max-w-100" v-else></td>
    <td class="p-0">
      <base-dropdown position="right" class="device-menu">
        <template #title>
          <div class="c-p">
            <i class="mdi mdi-dots-horizontal"></i>
          </div>
        </template>
        <div class="dropdown-item" @click="$emit('updateDeviceOutput')">
          <i class="mdi mdi-clipboard-edit-outline"></i>
          {{ $t("edit") }}
        </div>
        <div class="dropdown-item" @click="$emit('deleteDeviceOutput')">
          <i class="mdi mdi-delete"></i>
          {{ $t("delete") }}
        </div>
        <div
          class="dropdown-item"
          @click="$store.commit('RuleManager/DUPLICATE_DEVICE_OUTPUT', index)"
        >
          <i class="mdi mdi-content-copy"></i>
          {{ $t("add") }}
        </div>
      </base-dropdown>
    </td>
  </tr>
</template>

<script>
import {
  getStatusDeviceFromExecution,
  getActiveDeviceFromExecution,
  calcTimestamp
} from "@/plugins/helper";
import {
  DEVICE_TRAIT,
  DEVICE_TYPE,
  IR_ID_AIR,
  IR_TYPE,
  IRV2_ALL_TYPE,
  MODE_DAIKIN,
  SPEED_DAIKIN,
  SWING_DAIKIN,
  SPEED_IRV2_AC,
  SWING_IRV2_AC,
  MODE_IRV2_AC,
} from "@/plugins/variableConst";

export default {
  name: "device-row",
  props: {
    device: Object,
    index: Number,
  },
  data() {
    return {
      inputTimer: timer(this.device.delay * 1000 - 7 * 3600000, "HH:mm:ss"),
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
      IR_TYPE,
    };
  },
  computed: {
    deviceInfo,
    speakerStatus,
    daikinStatus,
    remoteV1Status,
    remoteV2Status,
    status,
  },
  watch: {
    device: { handler: resetData, deep: true },
  },
  methods: {
    getStatusDeviceFromExecution,
    getActiveDeviceFromExecution,
    calcTimestamp,
    updateData,
    updateStatus,
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

function status() {
  let status = $getters["HomeControll/getDeviceStatusByDeviceID"](
    this.device && this.device.devid
  );
  return status;
}

function resetData(device) {
  if (!device) return;
  this.inputTimer = timer((device.delay || 0) * 1000 - 7 * 3600000, "HH:mm:ss");
  this.execution = device && device.execution;
}

function updateData(index, param, data) {
  // console.log("log", this.index, this.inputTimer);
  $commit("RuleManager/UPDATE_OUTPUT_DEVICE_STATUS", {
    index,
    param,
    data,
  });
}

function updateStatus(traits, value) {
  if (!this.deviceInfo) return;
  switch (this.deviceInfo.type) {
    case DEVICE_TYPE.SWITCH:
      console.log(123, this.index, value);
      updateData(this.index, "execution", {
        command: traits,
        params: { on: value },
      });
      break;
  }
}

function remoteV1Status() {
  let command =
    this.deviceInfo.irCommands &&
    this.deviceInfo.irCommands.find(
      (item) => this.device.execution.params.irActive === item.commandId
    );
  let irtype = this.deviceInfo.irtype;
  if (!command) return "";
  if (
    irtype === IR_TYPE.REMOTE_AIR &&
    command.buttonId !== IR_ID_AIR.air_on &&
    command.buttonId !== IR_ID_AIR.air_off
  )
    return `Mode: ${command.arrIr.mode} - Temp: ${command.arrIr.temp} - Fan: ${command.arrIr.fan} - Swing: ${command.arrIr.swing}`;
  else
    return this.$t(
      `devices.${
        irtype === IR_TYPE.REMOTE_AIR
          ? "ir_air_v1"
          : irtype === IR_TYPE.REMOTE_FAN
          ? "ir_fan_v1"
          : irtype === IR_TYPE.REMOTE_TV
          ? "ir_tv_v1"
          : ""
      }.${command.buttonId}`
    );
}

function daikinStatus() {
  let data = {};
  // console.log(this.device.execution);
  this.device.execution.forEach((execution) => {
    if (execution.command === DEVICE_TRAIT.OnOff)
      data.power = execution.params.on;
    if (execution.command === DEVICE_TRAIT.TemperatureControl)
      data.temp = execution.params.temperatureControl;
    if (execution.command === DEVICE_TRAIT.TemperatureSetting)
      data.mode = MODE_DAIKIN.find(
        (item) => item.mode === execution.params.temperatureSetting
      ).name;
    if (execution.command === DEVICE_TRAIT.Speed)
      data.speed = SPEED_DAIKIN.find(
        (item) => item.speed === execution.params.speed
      ).name;
    if (execution.command === DEVICE_TRAIT.Swing)
      data.swing = SWING_DAIKIN.find(
        (item) => item.swing === execution.params.swing
      ).name;
  });
  return data.power
    ? `Mode: ${data.mode} - Temp: ${data.temp} - Fan: ${data.speed} - Swing: ${data.swing}`
    : "Off";
}

function remoteV2Status() {
  let arrIr = this.device.execution.arrIr;
  let irtype = this.deviceInfo.irtype;
  return arrIr.buttonid
    ? this.$t(
        `devices.${
          irtype === IRV2_ALL_TYPE.IR_FAN
            ? "ir_fan_v2"
            : irtype === IRV2_ALL_TYPE.IR_TV
            ? "ir_tv_v2"
            : irtype === IRV2_ALL_TYPE.IR_STB
            ? "ir_stb_v2"
            : ""
        }.${arrIr.buttonid}`
      )
    : arrIr.power
    ? `Mode: ${
        (MODE_IRV2_AC.find((item) => item.mode === arrIr.mode) || {}).name
      } - Temp: ${arrIr.temp}°C - Fan: ${
        (SPEED_IRV2_AC.find((item) => item.speed === arrIr.fan) || {}).name
      } - Swing: ${
        (SWING_IRV2_AC.find((item) => item.swing === arrIr.swing) || {}).name
      }`
    : "Off";
}

function speakerStatus() {
  let execution = this.device.execution || [];
  let controller = execution.find(
    (item) => item.command === DEVICE_TRAIT.PlayController
  );
  if (controller) return this.$t(`scene.${controller.params.controller}`);
  else {
    let status = "Play";
    // let playSong = execution.find(
    //   (item) => item.command === DEVICE_TRAIT.ConfigSpeaker
    // );
    // if (playSong) {
    //   this.isShowChooseSongBox = true;
    //   status += ` ${this.$t("scene.songIndex")} ${playSong.params.value}`;
    // }
    let volumeControll = execution.find(
      (item) => item.command === DEVICE_TRAIT.Speaker
    );
    if (volumeControll) {
      status += `-volume_${volumeControll.params.volume}%`;
    }
    return status;
  }
}

</script>

<style lang="scss"></style>
