<template>
  <card
    id="setSchedule"
    :checkSchedule="checkSchedule"
    bodyClasses="d-flex overflow-x-auto pr-0"
    headerClasses="bg-2"
  >
    <template #header>
      {{ device.name }}
      <i
        class="pull-right c-p mdi mdi-window-close pull-right"
        @click="close"
      ></i>
    </template>
    <card class="h-100 schedule-device overflow-auto" headerClasses="p-0">
      <div slot="header" class="text-center mb-4">
        {{ $t("schedule.schedule-device") }}
      </div>
      <schedule-item
        v-for="(schedule, index) in schedules"
        :key="index"
        :schedule="schedule"
        :value="deviceSchedule && deviceSchedule.execution"
        :device="deviceInfo"
        :class="scheduleSelect.ruleid === schedule.ruleid ? 'selectRule' : ''"
        @select-Schedule="
          scheduleSelect = schedule;
          scheduleSelect.select = true;
        "
        @openCloseSchedule="submit"
      />
    </card>

    <div class="m-0 p-0 h-100 schedule-option overflow-y-auto pr-3">
      <div class="d-flex justify-end mb-3">
        <base-button @click="setDefaultSchedule" class="button">
          {{ $t("cancel") }}
        </base-button>
        <base-button class="button mr-2" @click="submit">
          {{ $t("save") }}
        </base-button>
      </div>
      <div class="config w-100">
        <dimmer
          v-if="
            device &&
            device.type === DEVICE_TYPE.LIGHT &&
            device.traits.find((device) => device.name === 'Brightness')
          "
          :device="device"
          :scheduleSelect="scheduleSelect"
          @updateStatus="updateStatus"
        />
        <fan
          v-if="device && device.type === DEVICE_TYPE.FAN"
          :device="device"
          :scheduleSelect="scheduleSelect"
          @updateStatus="updateStatus"
        />
        <curtain
          v-if="device && device.type === DEVICE_TYPE.CURTAIN"
          :device="device"
          :scheduleSelect="scheduleSelect"
          @updateStatus="updateStatus"
        />
        <speaker
          v-if="device && device.type === DEVICE_TYPE.SPEAKER"
          :value="deviceSchedule && deviceSchedule.execution"
          :device="deviceInfo"
          :schedule="scheduleSelect"
          @updateStatus="updateStatus"
        />

        <device-status-daikin
          v-if="device && device.type === DEVICE_TYPE.DAIKIN"
          :value="deviceSchedule && deviceSchedule.execution"
          :schedule="scheduleSelect"
          @updateStatus="updateStatus"
        />

        <device-status-remote-air-v1
          v-if="
            deviceInfo &&
            deviceInfo.type === DEVICE_TYPE.IR &&
            deviceInfo.irtype === IR_TYPE.REMOTE_AIR
          "
          :value="deviceSchedule && deviceSchedule.execution"
          :device="deviceInfo"
          :schedule="scheduleSelect"
          @updateStatus="updateStatus"
        />

        <device-status-remote-fan-v1
          v-if="
            device &&
            device.type === DEVICE_TYPE.IR &&
            device.irtype === IR_TYPE.REMOTE_FAN
          "
          :value="deviceSchedule && deviceSchedule.execution"
          :device="deviceInfo"
          :schedule="scheduleSelect"
          @updateStatus="updateStatus"
        />

        <device-status-remote-tv-v1
          v-if="
            device &&
            device.type === DEVICE_TYPE.IR &&
            device.irtype === IR_TYPE.REMOTE_TV
          "
          :value="deviceSchedule && deviceSchedule.execution"
          :device="deviceInfo"
          :schedule="scheduleSelect"
          @updateStatus="updateStatus"
        />

        <device-status-remote-air-v2
          v-if="
            device &&
            device.type === DEVICE_TYPE.IRV2 &&
            device.irtype === IRV2_ALL_TYPE.IR_AC
          "
          :value="deviceSchedule && deviceSchedule.execution"
          :device="deviceInfo"
          :schedule="scheduleSelect"
          @updateStatus="updateStatus"
        />

        <device-status-remote-fan-v2
          v-if="
            device &&
            device.type === DEVICE_TYPE.IRV2 &&
            device.irtype === IRV2_ALL_TYPE.IR_FAN
          "
          :value="deviceSchedule && deviceSchedule.execution"
          :device="deviceInfo"
          :schedule="scheduleSelect"
          @updateStatus="updateStatus"
        />

        <device-status-remote-tv-v2
          v-if="
            device &&
            device.type === DEVICE_TYPE.IRV2 &&
            device.irtype === IRV2_ALL_TYPE.IR_TV
          "
          :value="deviceSchedule && deviceSchedule.execution"
          :device="deviceInfo"
          :schedule="scheduleSelect"
          @updateStatus="updateStatus"
        />

        <device-status-stb-v2
          v-if="
            device &&
            device.type === DEVICE_TYPE.IRV2 &&
            device.irtype === IRV2_ALL_TYPE.IR_STB
          "
          :value="deviceSchedule && deviceSchedule.execution"
          :device="deviceInfo"
          :schedule="scheduleSelect"
          @updateStatus="updateStatus"
        />

        <device-other
          v-if="device && device.type === DEVICE_TYPE.SWITCH"
          :device="device"
          :scheduleSelect="scheduleSelect"
        />

        <!--          SET CONFIG-->
        <timer />
        <repeat />
        <notify />


        <!--          DELETE Schedule-->

        <div
          v-if="scheduleSelect.ruleid !== ''"
          class="w-100 deleteSchedule m-0 p-0"
          @click="deleteSchedule"
        >
          {{ $t("schedule.deleteSchedule") }}
        </div>
      </div>
    </div>
  </card>
</template>

<script>
import {
  getDefaultIconDevice,
  getIrAcDataCommand,
  getIrDataCommand,
} from "@/plugins/helper";
import {
  IR_TYPE,
  IRV2_ALL_TYPE,
  DEVICE_TYPE,
  DEVICE_TRAIT,
  MODE_IRV2_AC,
  SPEED_IRV2_AC,
  SWING_IRV2_AC,
  RULE,
  IRV2_ID_FAN,
  IRV2_ID_TV,
  IRV2_ID_STB,
} from "@/plugins/variableConst";
import DeviceOther from "./Element/DeviceStatus/DeviceOther";
import Dimmer from "./Element/DeviceStatus/Dimmer";
import Fan from "./Element/DeviceStatus/Fan";
import Curtain from "./Element/DeviceStatus/Curtain";
import Speaker from "./Element/DeviceStatus/Speaker";
import DeviceStatusRemoteTvV1 from "./Element/DeviceStatus/RemoteTvV1";
import DeviceStatusRemoteAirV1 from "./Element/DeviceStatus/RemoteAirV1";
import DeviceStatusRemoteFanV1 from "./Element/DeviceStatus/RemoteFanV1";
import DeviceStatusStbV2 from "./Element/DeviceStatus/RemoteStbV2";
import DeviceStatusRemoteTvV2 from "./Element/DeviceStatus/RemoteTvV2";
import DeviceStatusRemoteAirV2 from "./Element/DeviceStatus/RemoteAirV2";
import DeviceStatusRemoteFanV2 from "./Element/DeviceStatus/RemoteFanV2";
import DeviceStatusDaikin from "./Element/DeviceStatus/Daikin";
import ScheduleItem from "./Element/ScheduleItem";
import Timer from "./Element/Timer";
import Notify from "./Element/Notify";
import Repeat from "./Element/Repeat";

export default {
  name: "scheduleConfig",

  data() {
    return {
      IR_TYPE,
      IRV2_ALL_TYPE,
      DEVICE_TYPE,

      scheduleSelect: $state.RuleManager,
    };
  },
  props: {
    device: {
      type: Object,
    },
  },
  methods: {
    updateStatus,
    getDefaultIconDevice,
    setDefaultSchedule,
    submit,
    getIrDataCommand,
    deleteSchedule,
    close,
  },
  mounted() {},
  components: {
    ScheduleItem,
    Timer,
    Notify,
    Curtain,
    Dimmer,
    Fan,
    Speaker,
    Repeat,
    DeviceStatusDaikin,
    DeviceStatusRemoteAirV1,
    DeviceStatusRemoteFanV1,
    DeviceStatusRemoteTvV1,
    DeviceStatusRemoteAirV2,
    DeviceStatusRemoteFanV2,
    DeviceStatusRemoteTvV2,
    DeviceStatusStbV2,
    DeviceOther,
  },
  computed: {
    schedules,
    checkSchedule,
    deviceInfo,
    deviceSchedule,
  },
};

function deviceSchedule() {
  let device = $state.RuleManager.out.devices[0];
  if (device) return device;
}

function updateStatus(execution) {
  console.log("exc", execution);
  updateData(0, "execution", execution);
}

function updateData(index, param, data) {
  $commit("RuleManager/UPDATE_OUTPUT_DEVICE_STATUS", {
    index,
    param,
    data,
  });
}

function deviceInfo() {
  let { devid, remoteid } = this.device || {};
  let device = $getters["HomeConfig/getControll"]({ devid, remoteid });
  console.log("device-info", device);
  return device;
}

function setDefaultSchedule() {
  $dispatch("RuleManager/resetData");
  this.scheduleSelect = $state.RuleManager;
}

function deleteSchedule() {
  $dispatch("HomeConfig/deleteRule", { ruleid: $state.RuleManager.ruleid });
}

function schedules() {
  let schedules = $getters["HomeConfig/getAllRulesByType"]([3])
    .filter(
      (schedule) =>
        schedule.out &&
        schedule.out.devices &&
        schedule.out.devices[0] &&
        (this.device && this.device.remoteid
          ? schedule.out.devices[0].remoteid === this.device.remoteid
          : schedule.out.devices[0].devid === this.device.devid)
    )
    .sort((item) => !item.enable);
  return schedules;
}

function checkSchedule() {
  if (!$state.RuleManager.in.schedule) {
    let inData = Object.assign({}, $state.RuleManager.in);
    inData.schedule = {
      starttime: timer(Date.now(), "HH:mm"),
      endtime: timer(Date.now(), "HH:mm"),
    };
    $commit("RuleManager/SET_DATA", { in: inData });
  }
  if ($state.RuleManager.out.devices.length === 0)
    $commit("RuleManager/ADD_DEVICES_OUTPUT", [
      this.device && (this.device.remoteid || this.device.devid),
    ]);
}

function close() {
  this.$emit("close");
  $dispatch("RuleManager/resetData");
}

async function submit() {
  this.scheduleSelect.select = false;
  let data = (({
    enable,
    iconkey,
    name,
    out,
    roomid,
    active,
    rooms,
    shortcut,
    shortcut_by_user,
    type,
  }) => ({
    enable,
    iconkey,
    name,
    out,
    roomid,
    active,
    rooms,
    shortcut,
    shortcut_by_user,
    type,
  }))($state.RuleManager);

  data.in = $state.RuleManager.in;
  data.type = 3;

  if ($state.RuleManager.ruleid) {
    await $dispatch($api.HomeConfig.updateRule, {
      ruleid: $state.RuleManager.ruleid,
      updateData: data,
    });
    $dispatch($api.RuleManager.setRule, false);
  } else {
    await $dispatch($api.HomeConfig.createRule, {
      data: [data],
    });
    $dispatch($api.RuleManager.setRule, false);
  }
}
</script>

<style scoped>
</style>
