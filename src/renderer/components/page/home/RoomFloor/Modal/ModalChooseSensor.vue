<template>
  <modal
    :show.sync="isShowModalChooseSensor"
    :showClose="false"
    modalClasses="modal-choose-sensor modal-full-height modal-width-md"
    footerClasses="p-0"
    @close="closeModal"
  >
    <template slot="header">
      <h5 class="text-center w-100">{{$t('roomFloor.text.chooseSensorToShow')}}</h5>
      <span class="pull-right c-p" @click="closeModal">
        <i class="mdi mdi-close"></i>
      </span>
    </template>
    <div v-if="temperatureSensorList.length" class="temperature-sensor">
      <h5>
        <span>{{$t('roomFloor.title.temperatureSensor')}}</span>
      </h5>
      <div class="temperature-sensor-list">
        <sensor-setting
          v-for="sensor in temperatureSensorList"
          :key="sensor.devid"
          :sensor="sensor"
          :choosed="roomInfo.sensors&&roomInfo.sensors&&roomInfo.sensors.temp==sensor.devid"
          :roomInfo="roomInfo"
          sensorType="temp"
        />
      </div>
    </div>
    <div v-if="lightSensorList.length" class="light-sensor">
      <h5>
        <span>{{$t('roomFloor.title.lightSensor')}}</span>
      </h5>
      <div class="light-sensor-list">
        <sensor-setting
          v-for="sensor in lightSensorList"
          :key="sensor.devid"
          :sensor="sensor"
          :choosed="roomInfo.sensors&&roomInfo.sensors&&roomInfo.sensors.luminance==sensor.devid"
          :roomInfo="roomInfo"
          sensorType="luminance"
        />
      </div>
    </div>
    <div v-if="humiditySensorList.length" class="humidity-sensor">
      <h5>
        <span>{{$t('roomFloor.title.humiditySensor')}}</span>
      </h5>
      <div class="humidity-sensor-list">
        <sensor-setting
          v-for="sensor in humiditySensorList"
          :key="sensor.devid"
          :sensor="sensor"
          :choosed="roomInfo.sensors&&roomInfo.sensors&&roomInfo.sensors.humidity==sensor.devid"
          :roomInfo="roomInfo"
          sensorType="humidity"
        />
      </div>
    </div>
  </modal>
</template>

<script>
import SensorSetting from "../Element/SensorSetting.vue";
export default {
  name: "modal-choose-sensor",
  props: {
    roomid: String
  },
  computed: {
    isShowModalChooseSensor,
    roomInfo,
    temperatureSensorList,
    lightSensorList,
    humiditySensorList
  },
  components: {
    SensorSetting
  },
  methods: { closeModal }
};

function isShowModalChooseSensor() {
  return $state.ContentManager.modal.modalChooseSensor;
}

function roomInfo() {
  return $getters["HomeConfig/getRoomByID"](this.roomid);
}
function temperatureSensorList() {
  return $getters["HomeConfig/getRoomTemperatureSensorData"](this.roomid);
}
function lightSensorList() {
  return $getters["HomeConfig/getRoomLightSensorData"](this.roomid);
}
function humiditySensorList() {
  return $getters["HomeConfig/getRoomHumiditySensorData"](this.roomid);
}
function closeModal() {
  $commit("ContentManager/UPDATE_MODAL_STATUS", {
    modal: "modalChooseSensor",
    data: false
  });
}
</script>

<style scoped lang="scss">
.light-sensor-list,
.humidity-sensor-list,
.temperature-sensor-list {
  display: flex;
  .device-item {
    min-width: 25%;
    max-width: 25%;
  }
}
</style>
