<template>
  <div
    class="mb-3 boxRoom c-p"
    :style="`background-image: url('${room.image||'static/img/homeDefault.jpg'}');`"
  >
    <div>
      <div class="ml-3">
        <span>
          <i class="icon-ic-zw-heat-alarm m-0"></i>
        </span>
        <span class="m-0">{{ deviceTemperature(room)||'???'}}°C</span>
        <h6>{{ room.name }}</h6>
      </div>
      <div class="boxSwitch">
        <div
          class="switch wave"
          :class="{active:roomStatus==1}"
          @click.stop.prevent="roomControll(true)"
        >{{$t('dashboard.text.ON')}}</div>
        <div
          class="switch wave"
          :class="{active:roomStatus==2}"
          @click.stop.prevent="roomControll(false)"
        >{{$t('dashboard.text.OFF')}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getIconScene, hasTraitOnOff } from "@/plugins/helper";
import { DEVICE_TRAIT } from "@/plugins/variableConst";
export default {
  name: "base-device",
  props: {
    room: {
      type: Object
    }
  },
  data() {
    return {
      roomStatus: 0,
      deviceids: []
    };
  },
  watch: {
    devicesInroom,
    listStatusDevice
  },
  computed: {
    devicesInroom,
    deviceTemperature,
    listStatusDevice
  },
  methods: {
    roomControll
  }
};

function deviceTemperature(room) {
  return room => {
    let sensorinfo;
    if (room && room.sensors && room.sensors.temp)
      sensorinfo = $getters["HomeControll/getDeviceStatusByDeviceID"](
        room.sensors.temp
      );
    if (sensorinfo && sensorinfo.states && sensorinfo.states.Temperature)
      return sensorinfo.states.Temperature.temperature;
    return (
      $state.LocalData.localData &&
      $state.LocalData.localData.main &&
      $state.LocalData.localData.main.temp
    );
  };
}

function devicesInroom() {
  let devicesInroom = $getters["HomeConfig/getControllDevicesByRoomID"](
    this.room.roomid
  );
  this.deviceids = devicesInroom.filter(hasTraitOnOff).map(item => item.devid);
  return devicesInroom;
}

function listStatusDevice() {
  if (this.deviceids && this.deviceids.length) {
    let listStatusDevice = $getters["HomeControll/getListDeviceStatus"](
      this.deviceids
    );
    let isAllDeviceOn = true;
    let isAllDeviceOff = true;
    listStatusDevice.forEach(item => {
      if (item.states.hasOwnProperty(DEVICE_TRAIT.OnOff)) {
        item.states.OnOff.on
          ? (isAllDeviceOff = false)
          : (isAllDeviceOn = false);
      }
    });
    if (isAllDeviceOn) this.roomStatus = 1;
    else if (isAllDeviceOff) this.roomStatus = 2;
    else this.roomStatus = 0;
    return $getters["HomeControll/getListDeviceStatus"](this.deviceids);
  }
  return (this.roomStatus = 0);
}

function roomControll(value) {
  let execution = {
    command: DEVICE_TRAIT.OnOff,
    params: { on: value }
  };
  if (this.deviceids && this.deviceids.length)
    $dispatch($api.HomeControll.controllDevice, {
      devid: this.deviceids,
      execution
    });
}
</script>
<style lang="scss">
.scene-item {
  .alert {
    display: flex;
    align-items: center;
    border-radius: 0.8rem;
    i {
      font-size: 1.5rem;
      padding-left: 0.5rem;
    }
  }
}
</style>
