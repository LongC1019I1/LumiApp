<template>
  <tr>
    <td>
      {{index+1}}
    </td>
    <td>{{ device.name }}</td>
    <td>
      <div
        :title="room && room.name || ''"
        class="text-overflow-hidden"
        style="width: 104px;"
      >{{ room && room.name || ''}}</div>
    </td>
    <td>{{ device && device.macdev? device.macdev.slice(-5): '' }}</td>
    <td>
      <base-slider
        v-if="hasOnOffTrait.includes(device.type)"
        size="md"
        class="mb-0"
        :value="status.states.OnOff && status.states.OnOff.on"
        @submit="controllDeviceOnOff"
      ></base-slider>
    </td>
    <td>
      <base-button size="sm" type="secondary" @click="removeDevice">{{$t('delete')}}</base-button>
    </td>
  </tr>
</template>

<script>
import { getDefaultIconDevice } from "@/plugins/helper";
import {
  DEVICE_TRAIT,
  DEVICE_TYPE
} from "@/plugins/variableConst";

export default {
  name: "device-row",
  props: {
    device: Object,
    index: Number
  },
  data() {
    return {
      hasOnOffTrait: [DEVICE_TYPE.SWITCH, DEVICE_TYPE.LIGHT],
      room: "",
      group: "",
      hc: ""
    };
  },
  computed: {
    status
  },
  methods: {
    getDefaultIconDevice,
    controllDeviceOnOff,
    removeDevice
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
  return $getters["HomeControll/getDeviceStatusByDeviceID"](
    this.device && this.device.devid
  );
}

function controllDeviceOnOff(value) {
  $dispatch($api.HomeControll.controllDevice, {
    devid: this.device.devid,
    execution: {
      command: DEVICE_TRAIT.OnOff,
      params: {
        on: !(
          this.status &&
          this.status.states.OnOff &&
          this.status.states.OnOff.on
        )
      }
    }
  });
}

function removeDevice(){

}
</script>

<style lang="scss">
</style>
