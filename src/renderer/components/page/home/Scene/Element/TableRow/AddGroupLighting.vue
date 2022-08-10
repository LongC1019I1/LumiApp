<template>
  <tr :class="{selected}">
    <td>
      <i
        class="mdi"
        :class="selected?'mdi-checkbox-marked-outline':'mdi-checkbox-blank-outline'"
        @click="$emit('selectDevice', device)"
      />
    </td>
    <td></td>
    <td>{{ device && device.devid? device.devid.slice(-7): '' }}</td>
    <td>{{ device && device.macdev? device.macdev.slice(-5): '' }}</td>
    <td>{{ device.name }}</td>
    <td :title="room && room.name||''">{{ room && room.name || ''}}</td>
    <td :title="$t('devices.TYPE.' + device.type)">{{ $t('devices.TYPE.' + device.type) }}</td>
    <td>
      <i v-if=" status.status === 'ERROR' " class="mdi mdi-sync-off icon-status-error"/>
      <base-slider
        v-if="hasOnOffTrait.includes(device.type)&&status.status !== 'ERROR'"
        size="md"
        class="mb-0"
        :value="isAcive"
        @submit="controllDeviceOnOff"
      ></base-slider>
    </td>
  </tr>
</template>

<script>
import {
  getDefaultIconDevice,
  getActiveDeviceFromVal
} from "@/plugins/helper";
import {
  DEVICE_TRAIT,
  DEVICE_TYPE
} from "@/plugins/variableConst";

export default {
  name: "device-row-add-device",
  props: {
    groupLighting: Object,
    selected: Boolean
  },
  data() {
    return {
      hasOnOffTrait: [DEVICE_TYPE.SWITCH, DEVICE_TYPE.LIGHT],
      room: "",
      hc: "",
      isAcive: false
    };
  },
  computed: {
    status
  },
  methods: {
    getDefaultIconDevice,
    controllDeviceOnOff
  },
  watch: {
    device: {
      handler: watchDevice,
      deep: true
    }
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

function controllDeviceOnOff() {
  let execution;
  if (this.device.type === DEVICE_TYPE.CURTAIN)
    execution = {
      command: DEVICE_TRAIT.OpenClose,
      params: {
        open: !this.isAcive
      }
    };
  else
    execution = {
      command: DEVICE_TRAIT.OnOff,
      params: {
        on: !this.isAcive
      }
    };
  $dispatch($api.HomeControll.controllDevice, {
    devid: this.device.devid,
    execution
  });
}
</script>

<style lang="scss">
</style>
