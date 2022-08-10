<template>
  <div>
    <div class="info-box">
      <span class="name">{{ roomInfo.name }}</span>
      <div class="room-setting">
        <base-dropdown
          id="roomManagerHeaderMenu"
          icon="mdi mdi-dots-horizontal"
          class="pull-right c-p"
          position="right"
        >
          <router-link
            tag="span"
            :to="{
              name: 'home-configDevice',
              query: { roomid: roomInfo.roomid },
            }"
            class="dropdown-item"
          >
            <i class="mdi mdi-plus-circle"></i>
            {{ $t("roomFloor.text.addDevice") }}
          </router-link>
          <span class="dropdown-item" @click="$emit('openModalChooseScene')">
            <i class="mdi mdi-plus-circle"></i>
            {{ $t("roomFloor.text.addScene") }}
          </span>
          <span class="dropdown-item" @click="$emit('openModalChooseSensor')">
            <i class="mdi mdi-drag-variant"></i>
            {{ $t("roomFloor.text.chooseSensorToShow") }}
          </span>
          <span
            class="dropdown-item"
            @click="$emit('showModalEditRoom', roomInfo.roomid, roomInfo.name)"
          >
            <i class="mdi mdi-home-edit"></i>
            {{ $t("roomFloor.text.editRoom") }}
          </span>
          <label for="fileInput" class="dropdown-item mb-0">
            <i class="mdi mdi-camera-plus"></i>
            {{ $t("roomFloor.text.addRoomImage") }}
          </label>
          <input
            class="d-none"
            id="fileInput"
            ref="file"
            accept="image/*"
            v-on:change="uploadImage"
            type="file"
          />
          <span class="dropdown-item" @click="deleteRoom">
            <i class="mdi mdi-trash-can"></i>
            {{ $t("roomFloor.text.deleteRoom") }}
          </span>
        </base-dropdown>
      </div>
    </div>
    <div class="controll-box row py-2">
      <div class="col-7 room-info">
        <div>
          <span>
            <i class="icon-ic-zw-heat-alarm"></i>
          </span>
          <span
            >{{
              temperatureSensor ||
              (localData.main && localData.main.temp) ||
              "???"
            }}°C</span
          >
        </div>
        <div>
          <span>
            <i class="mdi mdi-water-percent"></i>
          </span>
          <span
            >{{
              humiditySensor ||
              (localData.main && localData.main.humidity) ||
              "???"
            }}%</span
          >
        </div>
        <div v-if="lightSensor">
          <span>
            <i class="mdi mdi-weather-sunny"></i>
          </span>
          <span>{{ lightSensor }}lux</span>
        </div>
        <div v-else></div>
      </div>
      <div class="switch-box col-5">
        <div
          class="switch mr-3 c-p"
          :class="{ active: roomStatus == 1 }"
          @click="roomControll(true)"
        >
          {{ $t("roomFloor.text.on") }}
        </div>
        <div
          class="switch c-p"
          :class="{ active: roomStatus == 2 }"
          @click="roomControll(false)"
        >
          {{ $t("roomFloor.text.off") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DEVICE_TRAIT } from "@/plugins/variableConst";
import { hasTraitOnOff } from "@/plugins/helper";

export default {
  name: "room-manager-header",
  props: {
    roomInfo: Object,
  },
  data() {
    return {
      roomStatus: 0,
      deviceids: [],
    };
  },
  watch: {
    devicesInroom,
    listStatusDevice,
  },
  computed: {
    devicesInroom,
    listStatusDevice,
    lightSensor,
    temperatureSensor,
    humiditySensor,
    localData,
  },
  methods: {
    deleteRoom,
    uploadImage,
    roomControll,
  },
};

function lightSensor() {
  let sensor;
  let sensorinfo;
  if (this.roomInfo && this.roomInfo.sensors && this.roomInfo.sensors.luminance)
    sensor = $getters["HomeConfig/getDevice"](this.roomInfo.sensors.luminance);
  if (sensor && sensor.roomid === this.roomInfo.roomid)
    sensorinfo = $getters["HomeControll/getDeviceStatusByDeviceID"](
      this.roomInfo.sensors.luminance
    );
  if (sensorinfo && sensorinfo.states && sensorinfo.states.Luminance)
    return sensorinfo.states.Luminance.lux;
  return false;
}

function temperatureSensor() {
  let sensor;
  let sensorinfo;
  if (this.roomInfo && this.roomInfo.sensors && this.roomInfo.sensors.temp)
    sensor = $getters["HomeConfig/getDevice"](this.roomInfo.sensors.temp);
  if (sensor && sensor.roomid === this.roomInfo.roomid)
    sensorinfo = $getters["HomeControll/getDeviceStatusByDeviceID"](
      this.roomInfo.sensors.temp
    );
  if (sensorinfo && sensorinfo.states && sensorinfo.states.Temperature)
    return sensorinfo.states.Temperature.temperature;
  return false;
}

function humiditySensor() {
  let sensor;
  let sensorinfo;
  if (this.roomInfo && this.roomInfo.sensors && this.roomInfo.sensors.humidity)
    sensor = $getters["HomeConfig/getDevice"](this.roomInfo.sensors.humidity);
  if (sensor && sensor.roomid === this.roomInfo.roomid)
    sensorinfo = $getters["HomeControll/getDeviceStatusByDeviceID"](
      this.roomInfo.sensors.humidity
    );
  if (sensorinfo && sensorinfo.states && sensorinfo.states.Humidity)
    return sensorinfo.states.Humidity.humidity;
  return false;
}

function localData() {
  return $state.LocalData.localData;
}

async function deleteRoom() {
  let confirm = await $alertify.custom({
    title: this.$t("notify.notifyWarninglTitle"),
    text: this.$t("roomFloor.message.confirmDeleteRoom"),
    showCancelButton: true,
    cancelButtonText: this.$t("cancel"),
    confirmButtonText: this.$t("confirm"),
  });

  if (!confirm.isConfirmed) return;

  let responseData = await $dispatch($api.HomeConfig.deleteRoom, {
    roomid: this.roomInfo.roomid,
  });
  $commit("ContentManager/ROOM_FLOOR_SET_SELECTED_ROOMID", "");
}

async function uploadImage() {
  let files = document.getElementById("fileInput").files[0];
  let uploadFileResponse = await $dispatch($api.Media.uploadFile, {
    files,
  });
  if (uploadFileResponse && uploadFileResponse.success) {
    $dispatch($api.HomeConfig.updateRoom, {
      roomid: this.roomInfo.roomid,
      updateData: {
        image: uploadFileResponse.data.files[0],
      },
    });
    document.getElementById("fileInput").value = "";
  }
}

function devicesInroom() {
  let devicesInroom = $getters["HomeConfig/getControllDevicesByRoomID"](
    this.roomInfo.roomid
  );
  this.deviceids = devicesInroom
    .filter(hasTraitOnOff)
    .map((item) => item.devid);
  return devicesInroom;
}

function listStatusDevice() {
  if (this.deviceids && this.deviceids.length) {
    let listStatusDevice = $getters["HomeControll/getListDeviceStatus"](
      this.deviceids
    );
    let isAllDeviceOn = true;
    let isAllDeviceOff = true;
    listStatusDevice.forEach((item) => {
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
    params: { on: value },
  };
  if (this.deviceids && this.deviceids.length)
    $dispatch($api.HomeControll.controllDevice, {
      devid: this.deviceids,
      execution,
    });
}
</script>

<style lang="scss">
#roomManager {
  .info-box {
    display: flex;
    justify-content: space-between;
    font-size: 1.25rem;
    .room-setting {
      height: 2rem;
      width: 2rem;
      border-radius: 50%;
      display: flex;
      justify-content: center;
    }
  }
  .controll-box {
    border-bottom: 1px solid white;
    & > div {
      display: flex;
      &.room-info {
        justify-content: space-between;
        align-items: center;
        i {
          font-size: 1.25rem;
        }
        & > div {
          display: flex;
          align-items: center;
        }
      }
      &.switch-box {
        justify-content: flex-end;
        .switch {
          height: 2.5rem;
          width: 2.5rem;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
  .menu-box {
    span {
      margin-right: 1rem;
      cursor: pointer;
    }
  }
}
</style>
