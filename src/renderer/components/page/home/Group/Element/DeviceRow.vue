<template>
  <tr :class="{selected}">
    <td>
      <i
        class="mdi"
        :class="selected?'mdi-checkbox-marked-outline':'mdi-checkbox-blank-outline'"
        @click="$emit('selectDevice', device)"
      />
    </td>
    <td>{{ device && device.devid? device.devid.slice(-5): '' }}</td>

    <td>{{ device && device.mac? device.mac.slice(-5): '' }}</td>
    <td>{{ device.name }}</td>
    <td>
      <div
        :title="room && room.name || ''"
        class="text-overflow-hidden"
        style="width: 104px;"
      >{{ room && room.name || ''}}</div>
    </td>
    <td>
      <div
        :title="$t('devices.TYPE.' + device.type)"
        class="text-overflow-hidden"
      >{{ $t('devices.TYPE.' + device.type) }}</div>
    </td>
    <td>
      <div>
        <i v-if=" status&&status.status === 'ERROR' " class="mdi mdi-sync-off icon-status-error"/>
        <i class="icon-config" :class="'icon-'+getDefaultIconDevice(device, status.states)"></i>
      </div>
    </td>
    <td style>
      <div>
        {{ hc
        ? `${hc.is_master ? "HC" : "LC"}_${hc.mac.slice(12).toUpperCase()}`
        : "" }}
      </div>
    </td>
    <td>
      <base-slider
        v-if="DEVICE_TYPE_CAN_CONTROLL_DEFAULT.includes(device.type)&&status.status !== 'ERROR'"
        size="md"
        class="mb-0"
        :value="isAcive"
        @submit="checkDeviceValid(device)"
      ></base-slider>
    </td>
    <td>
      <div>{{ group && group.name || ''}}</div>
    </td>
    <pin-modal
        :showPinModal="showPin"
        @closeModal="showPin = false"
        @update="
          controllDeviceDefault(myDevice.devid);
          showPin = false;"
    />
  </tr>


</template>

<script>
import {
  getDefaultIconDevice,
  getActiveDeviceFromVal,
  controllDeviceDefault
} from "@/plugins/helper";
import {
  DEVICE_TYPE_CAN_CONTROLL_DEFAULT
} from "@/plugins/variableConst";
import PinModal from "../../../../base/custom/PinModal";

export default {
  name: "device-row",
  props: {
    device: Object,
    selected: Boolean
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
    status
  },
  methods: {
    getDefaultIconDevice,
    controllDeviceDefault,
    checkDeviceValid

  },
  watch: {
    device: {
      handler: watchDevice,
      deep: true
    },
  },
  components:{
    PinModal
  },
  mounted: watchDevice
};

function watchDevice() {
  this.room = $state.HomeConfig.rooms.find(
    room => room.roomid == this.device.roomid
  );
  this.hc = $state.Home.currentHome.hcs.find(
    hc => hc.hc_id == this.device.hc_id
  );
  this.group = $state.HomeConfig.groups.find(
    item => item.groupid == this.device.groupid
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

  console.log('device', device)

  if (device && device.protected === 1) {
    this.showPin = true;
  } else {
    controllDeviceDefault(this.device.devid);
  }
}
</script>

<style lang="scss">
</style>
