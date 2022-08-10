<template>
  <card bodyClasses="pr-0">
    <h5 slot="header">
      <span
        class="c-p"
        :class="{ active: isShowDevice }"
        @click="isShowDevice = true"
        >{{ $t("dashboard.title.oftenUsedDevices") }}</span
      >
      <span
        class="ml-2 c-p"
        :class="{ active: !isShowDevice }"
        @click="isShowDevice = false"
        >{{ $t("dashboard.title.sensor") }}</span
      >
      <i
        class="pull-right c-p mdi mdi-cog"
        @click="$emit('showUsedDevicesSetting')"
      ></i>
    </h5>
    <div v-if="isShowDevice" class="list-device">
      <device-controll
        v-for="(device, index) in oftenUsedControlls"
        :key="index"
        :device="device"
        @contextmenu.native.prevent="$refs.contextmenu.open($event, device)"
      ></device-controll>
    </div>
    <div v-else class="list-sensor">
      <device-controll
        v-for="(sensor, index) in oftenUsedSensors"
        :key="index"
        :device="sensor"
        @contextmenu.native.prevent="$refs.contextmenu.open($event, sensor)"
      ></device-controll>
    </div>
    <vue-context
      ref="contextmenu"
      v-slot="{ data }"
      class="device-context-menu"
    >
      <li v-if="data&&data.type !== DEVICE_TYPE.SENSOR">
        <a href="#" @click.prevent="goToSchedule(data)">
          <i class="mdi mdi-clock-outline"></i>
          <span>{{ $t("roomFloor.text.deviceCalendar") }}</span>
        </a>
      </li>
      <li>
        <a href="#" @click.prevent="showDeviceHistory(data)">
          <i class="mdi mdi-history"></i>
          <span>{{ $t("roomFloor.text.deviceHistory") }}</span>
        </a>
      </li>
      <li>
        <a href="#" @click.prevent="showDeviceInfo(data)">
          <i class="mdi mdi-information"></i>
          <span>{{ $t("roomFloor.text.deviceInfo") }}</span>
        </a>
      </li>
    </vue-context>
  </card>
</template>

<script>
import { getDefaultIconDevice } from "@/plugins/helper";
import { DEVICE_TYPE } from "@/plugins/variableConst";
import DeviceControll from "../../../base/controll/Device";
export default {
  name: "often-used-devices",
  data() {
    return {
      isShowDevice: true,
      DEVICE_TYPE
    };
  },
  computed: {
    oftenUsedControlls,
    oftenUsedSensors,
  },
  methods: {
    getDefaultIconDevice,
    goToSchedule,
    showDeviceHistory,
    showDeviceInfo,
  },
  components: {
    DeviceControll,
  },
};
function oftenUsedControlls() {
  let customerID = $state.Customer.customerData.id;
  return $getters["HomeConfig/getOftenUsedControll"](customerID);
}

function oftenUsedSensors() {
  let customerID = $state.Customer.customerData.id;
  return $getters["HomeConfig/getOftenUsedSensors"](customerID);
}

function goToSchedule(device) {
  if (device)
    $router.push({
      name: "home-schedule",
      query: {
        devid: device.remoteid || device.devid,
      },
    });
}

function showDeviceHistory(device) {
  $commit("ContentManager/UPDATE_MODAL_STATUS", {
    modal: "modalDeviceHistory",
    data: device.devid,
  });
}

function showDeviceInfo(device) {
  $commit("ContentManager/UPDATE_MODAL_STATUS", {
    modal: "modalDeviceInfo",
    data: device.devid,
  });
}
</script>

<style scoped>
.list-device,
.list-sensor {
  display: flex;
  flex-wrap: wrap;
}
/* flexible */
.device-item {
  min-width: 25%;
  max-width: 25%;
}
@media (max-width: 1700px) {
  .device-item {
    min-width: 33.33%;
    max-width: 33.33%;
  }
}
@media (max-width: 1500px) {
  .device-item {
    min-width: 50%;
    max-width: 50%;
  }
}
@media (max-width: 1368px) {
  .device-item {
    min-width: 25%;
    max-width: 25%;
  }
}
@media (max-width: 1150px) {
  .device-item {
    min-width: 33.33%;
    max-width: 33.33%;
  }
}
</style>
