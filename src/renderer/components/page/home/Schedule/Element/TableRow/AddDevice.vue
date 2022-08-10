<template>
  <tr :class="{selected}">
    <td>
      <i
          class="mdi"
          :class="selected?'mdi-checkbox-marked-outline':'mdi-checkbox-blank-outline'"
          @click="$emit('selectDevice', device)"
      />
    </td>
    <td>{{ device && device.devid ? device.devid.slice(-7) : '' }}</td>
    <td>{{ device && device.macdev ? device.macdev.slice(-5) : '' }}</td>
    <td>{{ device.name }}</td>
    <td style="padding: 0 !important;" :title="getFloorRoom(room)||''">
     <div class="getFloorRoomName text-overflow-hidden">
       {{ getFloorRoom(room) }}
     </div>
    </td>
    <td :title="$t('devices.TYPE.' + device.type)">{{ $t('devices.TYPE.' + device.type) }}</td>
  </tr>
</template>

<script>
import {getDefaultIconDevice} from "@/plugins/helper";
import {
  DEVICE_TRAIT,
  DEVICE_TYPE
} from "@/plugins/variableConst";

export default {
  name: "device-row-add-device",
  props: {
    device: Object,
    selected: Boolean
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
    getFloorRoom
  },
  watch: {
    device: {
      handler: watchDevice,
      deep: true
    }
  },
  mounted: watchDevice
};

function getFloorRoom(room) {

  if (room && room.name) {
    let floor = $state.HomeConfig.floors.find(floor => floor.floorid === room.floorid)
    return floor.name + ' - ' + room.name
  }

}

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
    this.device?  this.device && this.device.devid : ''
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
</script>

<style lang="scss">

.getFloorRoomName {
  width: 230px;
  padding: 0 15px;
  margin: auto;
}
</style>
