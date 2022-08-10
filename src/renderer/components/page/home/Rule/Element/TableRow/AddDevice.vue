<template>
  <tr :class="{ selected }">
    <td>
      <i
        class="mdi"
        :class="
          selected
            ? 'mdi-checkbox-marked-outline'
            : 'mdi-checkbox-blank-outline'
        "
        @click="$emit('selectDevice', device)"
      />
    </td>
    <td>{{ device && device.brigde_key }}</td>
    <td>{{ device && device.devid ? device.devid.slice(-7) : "" }}</td>
    <td>{{ device && device.macdev ? device.macdev.slice(-5) : "" }}</td>
    <td>{{ device.name }}</td>
    <td :title="(room && room.name) || ''">{{ (room && room.name) || "" }}</td>
    <td :title="$t('devices.TYPE.' + device.type)">
      {{ $t("devices.TYPE." + device.type) }}
    </td>
    <td>
      <i
        v-if="status.status === 'ERROR'"
        class="mdi mdi-sync-off icon-status-error"
      />
      <base-slider
        v-if="DEVICE_TYPE_CAN_CONTROLL_DEFAULT.includes(device.type) && status.status !== 'ERROR'"
        size="md"
        class="mb-0"
        :value="isAcive"
        @submit="checkDeviceValid(device)"
      ></base-slider>
    </td>

  </tr>
</template>

<script>
import {
  getDefaultIconDevice,
  getActiveDeviceFromVal,
  controllDeviceDefault,
} from "@/plugins/helper";
import {
  DEVICE_TYPE_CAN_CONTROLL_DEFAULT,
} from "@/plugins/variableConst";

import PinModal from "../../../../../base/custom/PinModal";

export default {
  name: "device-row-add-device",
  props: {
    device: Object,
    selected: Boolean,
  },
  data() {
    return {
      DEVICE_TYPE_CAN_CONTROLL_DEFAULT,
      room: "",
      group: "",
      hc: "",
      isAcive: false,
      myDevice: {},
      showPin:false
    };
  },
  computed: {
    status,
  },
  methods: {
    getDefaultIconDevice,
    controllDeviceDefault,
    checkDeviceValid
  },
  components:{
  },
  watch: {
    device: {
      handler: watchDevice,
      deep: true,
    },
  },
  mounted: watchDevice,
};

function watchDevice() {
  this.room = $state.HomeConfig.rooms.find(
    (room) => room.roomid == this.device.roomid
  );
  this.hc = $state.Home.currentHome.hcs.find(
    (hc) => hc.hc_id == this.device.hc_id
  );
  this.group = $state.HomeConfig.groups.find(
    (item) => item.groupid == this.device.groupid
  );
}

function status() {
  let status = $getters["HomeControll/getDeviceStatusByDeviceID"](
    this.device && this.device.devid
  );
  this.isAcive = getActiveDeviceFromVal(this.device, status && status.states);
  return status;
}

function checkDeviceValid(device){
  this.myDevice = device;

  if (device && device.protected === 1) {
    // this.showPin = true;
    this.$emit('showPin',device)
  } else {
    controllDeviceDefault(this.device.devid);
  }
}
</script>

<style lang="scss">
</style>
