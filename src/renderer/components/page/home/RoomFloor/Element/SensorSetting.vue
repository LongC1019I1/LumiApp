<template>
  <div class="device-item col" :class="{'choosed':choosed}">
    <div class="fake-box c-p" @click="updateMainRoomSensor">
      <div class="content">
        <div class="icon">
          <i :class="'icon-'+icon"></i>
        </div>
        <div class="status">
          <div v-if="choosed">
            <i class="mdi mdi-check-bold"></i>
          </div>
          <div v-else></div>
        </div>
        <div class="name p-2">
          <div>{{sensor.name||"Thiết bị"}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getDefaultIconDevice,
  getStatusDeviceFromVal
} from "@/plugins/helper";

export default {
  name: "sensor-setting",
  props: {
    sensor: Object,
    choosed: Boolean,
    roomInfo: Object,
    sensorType: String
  },
  data() {
    return {
      icon: ""
    };
  },
  methods: {
    updateMainRoomSensor
  },
  computed: {
    status
  },
  watch: {
    status
  }
};

function status() {
  status = $getters["HomeControll/getDeviceStatusByDeviceID"](this.sensor.devid);
  if (status) {
    this.icon = getDefaultIconDevice(this.sensor, status.states);
  }
  return status;
}

function updateMainRoomSensor() {
  let devid = this.sensor.devid;
  let sensors = { ...this.roomInfo.sensors };
  if (this.choosed) {
    sensors[this.sensorType] = "";
    $dispatch($api.HomeConfig.updateRoom, {
      roomid: this.roomInfo.roomid,
      updateData: { sensors }
    });
  } else {
    sensors[this.sensorType] = devid;
    $dispatch($api.HomeConfig.updateRoom, {
      roomid: this.roomInfo.roomid,
      updateData: { sensors }
    });
  }
}
</script>
<style scoped lang="scss">
.device-item {
  padding: 0 1rem 1rem 0;
  .fake-box {
    border-radius: 1rem;
    &:after {
      content: "";
      display: block;
      padding-bottom: 100%;
    }
    .content {
      display: flex;
      flex-wrap: wrap;
      position: absolute;
      height: calc(100% - 1rem);
      width: calc(100% - 1rem);
      & > div {
        height: 50%;
        min-height: 50%;
        min-width: 50%;
        display: flex;
        align-items: center;
      }
      .icon {
        justify-content: center;
        max-width: 50%;
        i {
          font-size: 3rem;
          margin: 0.5rem;
        }
      }
      .status {
        max-width: 50%;
        justify-content: center;
        & > div {
          position: relative;
          height: 2rem;
          width: 2rem;
          border-radius: 50%;
          border: solid 1px;
          i {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 1.5rem;
          }
        }
      }
      .name {
        max-width: 100%;
        align-items: flex-end;
        & > div {
          line-height: 1.5rem;
          max-height: 3rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>
