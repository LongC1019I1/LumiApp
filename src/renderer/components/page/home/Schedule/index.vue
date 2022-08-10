<template>
  <fragment>
    <device-list
      v-if="!deviceSelect"
      :selectFLoor="selectFLoor"
      @selectDevice="selectDevice"
      @showAddDeviceModal="showDeviceList = true"
      @updateSelectFloor="(value) => (selectFLoor = value)"
    />
    <schedule-config
      v-if="deviceSelect"
      :device="deviceSelect"
      @close="deviceSelect = false"
    />
    <add-device
      :isShowModal="showDeviceList"
      @closeModal="showDeviceList = false"
      @device="selectDevice"
    />
  </fragment>
</template>

<script>
import AddDevice from "./Modal/AddDevice";
import ScheduleConfig from "./ScheduleConfig";
import DeviceList from "./DeviceList";

export default {
  name: "schedule",
  data() {
    return {
      selectFLoor: "",
      deviceSelect: false,
      showDeviceList: false,
    };
  },
  components: {
    AddDevice,
    ScheduleConfig,
    DeviceList,
  },
  methods: {
    selectDevice,
  },
  mounted,
  destroyed() {
    $dispatch($api.RuleManager.resetData);
  },
};

function selectDevice(device) {
  this.deviceSelect = device;
}
function mounted() {
  if ($router.currentRoute.query.devid)
    this.deviceSelect = $getters["HomeConfig/getDevice"](
      $router.currentRoute.query.devid
    );
}
</script>

<style scoped>
</style>
