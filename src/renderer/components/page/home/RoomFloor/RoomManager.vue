<template>
  <card
    id="roomManager"
    :style="`background-image: url('${
      roomInfo.image || 'static/img/homeDefault.jpg'
    }');`"
  >
    <room-manager-header
      slot="header"
      :roomInfo="roomInfo"
      @openModalChooseSensor="openModalChooseSensor"
      @openModalChooseScene="$emit('openModalChooseScene')"
      @showModalEditRoom="
        (roomid, name) => $emit('showModalEditRoom', roomid, name)
      "
    />
    <div v-if="sceneList && sceneList.length" class="scene">
      <h5>
        <span>{{ $t("roomFloor.title.scene") }}</span>
        <span class="c-p" @click="$emit('openModalChooseScene')">
          {{ $t("roomFloor.text.addScene") }}
          <i class="mdi mdi-plus-circle"></i>
        </span>
      </h5>
      <horizontal-scroll
        v-dragscroll
        class="overflow-x-auto hidden-scroll scene-list mx-2 row"
      >
        <base-scene
          v-for="scene in sceneList"
          :key="scene.ruleid"
          :scene="scene"
          @click="controllRule(scene.ruleid)"
        ></base-scene>
      </horizontal-scroll>
    </div>
    <div v-if="deviceList && deviceList.length" class="device">
      <h5>
        <span>{{ $t("roomFloor.title.device") }}</span>
        <router-link
          tag="span"
          :to="{ name: 'home-configDevice', query: { roomid: selectedRoomID } }"
          class="c-p"
        >
          {{ $t("roomFloor.text.addDevice") }}
          <i class="mdi mdi-plus-circle"></i>
        </router-link>
      </h5>
      <div class="device-list">
        <device-controll
          v-for="(device, index) in deviceList"
          :key="index"
          :device="device"
          @contextmenu.native.prevent="$refs.contextmenu.open($event, device)"
        />
      </div>
    </div>
    <div v-if="sensorList && sensorList.length" class="sensor">
      <h5>
        <span>{{ $t("roomFloor.title.sensor") }}</span>
        <!-- <span>
          {{$t('roomFloor.text.addSensor')}}
          <i class="mdi mdi-plus-circle"></i>
        </span>-->
      </h5>
      <div class="sensor-list">
        <device-controll
          v-for="sensor in sensorList"
          :key="sensor.devid"
          :device="sensor"
          @contextmenu.native.prevent="$refs.contextmenu.open($event, sensor)"
        />
      </div>
    </div>
    <vue-context
      ref="contextmenu"
      v-slot="{ data }"
      class="device-context-menu"
    >
      <li v-if="data && data.type !== DEVICE_TYPE.SENSOR">
        <a href="#" @click.prevent="goToSchedule(data)">
          <i class="mdi mdi-clock-outline"></i>
          <span>{{ $t("roomFloor.text.deviceCalendar") }}</span>
        </a>
      </li>
      <li>
        <a href="#" @click.prevent="showDeviceHistory(data)">
          <i class="mdi mdi-history"></i>
          <span>{{ $t("roomFloor.text.deviceHistory") }}</span>
        </a>
      </li>
      <li>
        <a href="#" @click.prevent="showDeviceInfo(data)">
          <i class="mdi mdi-information"></i>
          <span>{{ $t("roomFloor.text.deviceInfo") }}</span>
        </a>
      </li>
      <li>
        <a href="#" @click.prevent="deleteDevice(data)">
          <i class="mdi mdi-trash-can"></i>
          <span>{{ $t("roomFloor.text.deleteDevice") }}</span>
        </a>
      </li>
    </vue-context>
  </card>
</template>

<script>
import BaseScene from "../../../base/controll/Scene";
import DeviceControll from "../../../base/controll/Device";
import RoomManagerHeader from "./Element/RoomManagerHeader";
import { DEVICE_TYPE, TYPE_RULE } from "@/plugins/variableConst";

export default {
  name: "room-manager",
  props: {
    selectedRoomID: String,
  },
  data() {
    return {
      isShowModalDeviceInfo: false,
      isShowModalDeviceHistory: false,
      ModalDeviceData: {},
      DEVICE_TYPE,
    };
  },
  computed: {
    roomInfo,
    sceneList,
    deviceList,
    sensorList,
  },
  components: {
    BaseScene,
    DeviceControll,
    RoomManagerHeader,
  },
  methods: {
    openModalChooseSensor,
    goToSchedule,
    showDeviceHistory,
    showDeviceInfo,
    deleteDevice,
    controllRule,
  },
};
//computed
function roomInfo() {
  return $getters["HomeConfig/getRoomByID"](this.selectedRoomID);
}
function sceneList() {
  return $getters["HomeConfig/getRulesByTypeAndRoomID"]({
    type: [TYPE_RULE.scene, TYPE_RULE.scene_lighting],
    roomid: this.selectedRoomID,
  });
}
function deviceList() {
  return $getters["HomeConfig/getControllInRoom"](this.selectedRoomID);
}
function sensorList() {
  return $getters["HomeConfig/getDeviceByTypeInRoom"](
    DEVICE_TYPE.SENSOR,
    this.selectedRoomID
  );
}

function openModalChooseSensor() {
  if (this.sensorList.length)
    $commit("ContentManager/UPDATE_MODAL_STATUS", {
      modal: "modalChooseSensor",
      data: true,
    });
  else
    $alertify.confirm({
      text: this.$t("roomFloor.message.noSensorError"),
      title: this.$t("notify.notifyDefautlTitle"),
    });
}

function goToSchedule(device) {
  if (device)
    $router.push({
      name: "home-schedule",
      query: {
        devid: device.remoteid || device.devid,
      },
    });
}

function showDeviceHistory(device) {
  $commit("ContentManager/UPDATE_MODAL_STATUS", {
    modal: "modalDeviceHistory",
    data: device.devid,
  });
}

function showDeviceInfo(device) {
  $commit("ContentManager/UPDATE_MODAL_STATUS", {
    modal: "modalDeviceInfo",
    data: device.devid,
  });
}

async function deleteDevice(device) {
  let confirm = await $alertify.custom({
    title: this.$t("notify.notifyWarninglTitle"),
    text: this.$t("roomFloor.message.confirmDeleteDevice"),
    showCancelButton: true,
    cancelButtonText: this.$t("cancel"),
    confirmButtonText: this.$t("confirm"),
  });
  if (!confirm.isConfirmed) return;
  await $dispatch($api.HomeConfig.updateDevice, {
    devid: device.devid,
    updateData: {
      roomid: -1,
    },
  });
}

function controllRule(ruleid) {
  $dispatch($api.HomeControll.controllRule, { ruleid });
}
</script>

<style lang="scss">
#roomManager {
  background-size: cover;
  background-position: center;
  background-blend-mode: soft-light;
  .card-body {
    h5 {
      display: flex;
      justify-content: space-between;
    }
    .scene {
      .scene-list {
        flex-wrap: nowrap;
        .scene-item {
          min-width: 33%;
          max-width: 33%;
          &:nth-child(1) {
            padding-left: 0px;
          }
        }
        @media (max-width: 1368px) {
          .scene-item {
            min-width: 50%;
            max-width: 50%;
          }
        }
      }
    }
    .device,
    .sensor {
      .device-list,
      .sensor-list {
        display: flex;
        flex-wrap: wrap;
      }
      /* flexible */
      .device-item {
        padding: 0 2rem 2rem 0;
        min-width: 16.6%;
        max-width: 16.6%;
      }
      @media (max-width: 1600px) {
        .device-item {
          min-width: 20%;
          max-width: 20%;
        }
      }
      @media (max-width: 1368px) {
        .device-item {
          min-width: 25%;
          max-width: 25%;
        }
      }
      @media (max-width: 1280px) {
        .device-item {
          min-width: 33.33%;
          max-width: 33.33%;
        }
      }
      @media (max-width: 1150px) {
        .device-item {
          min-width: 50%;
          max-width: 50%;
        }
      }
    }
    .v-context.device-context-menu {
      padding: 0px;
      a {
        i {
          margin-right: 0.5rem;
        }
      }
    }
  }
}
</style>
