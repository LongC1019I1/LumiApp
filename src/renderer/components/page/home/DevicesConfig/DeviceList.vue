<template>
  <div id="DeviceList" class="h-100 w-100 pl-3">
    <!--    ADD FLOOR & FILLTER -->
    <div class="col-12 m-0 p-0" id="fillterSearchDevice" style>
      <!--      SELECT FLOOR & ADD FLOOR-->

      <div class="col-7 h-100 p-0 m-0 float-left row">
        <div
          class="col-7 m-0 p-0"
          :class="checkIR == true ? '' : 'menu-hidden'"
        >
          <base-dropdown id="SelectFloor" class="w-100 float-left">
            <base-button
              slot="title"
              type="secondary"
              class="dropdown-toggle"
              @click="showRoom = !showRoom"
            >
              <div class="float-left text-overflow-hidden">
                {{
                  chooseFloorName == ""
                    ? $t("deviceList.text.selectRoom")
                    : chooseFloorName
                }}
              </div>

              <div class="float-right">
                <i v-if="showRoom" class="mdi mdi-chevron-down iconHc"></i>
                <i v-else class="mdi mdi-chevron-up iconHc"></i>
              </div>
            </base-button>

            <a
              @click="
                chooseFloorName = $t('deviceList.text.outRoom');
                selectFloorId = '-1';
              "
              class="dropdown-item"
              href="#"
              >{{ $t("deviceList.text.outRoom") }}</a
            >
            <a
              @click="
                chooseFloorName = room.floorName + ' - ' + room.name;
                selectFloorId = room.roomid;
              "
              v-for="room in floorRooms"
              :key="room.roomid"
              class="dropdown-item"
              href="#"
            >
              {{ room.floorName + " - " + room.name }}
              <i
                :style="
                  selectFloorId === room.roomid ? 'float:right' : 'display:none'
                "
                class="mdi mdi-check-bold"
              ></i>
            </a>
          </base-dropdown>
        </div>

        <div
          class="col-5 addDevice"
          :class="
            checkIR == true && arrDevicesRemotes.length && selectFloorId
              ? ''
              : 'menu-hidden'
          "
        >
          <base-button
            v-if="checkIR && arrDevicesRemotes.length && selectFloorId"
            @click="addDeviceInRoom"
            type="secondary"
            class="float-left"
          >
            {{ $t("deviceList.text.add") }}
          </base-button>

          <base-button v-else type="secondary" class="float-left">
            {{ $t("deviceList.text.add") }}
          </base-button>
        </div>
      </div>

      <!--FILLTER ADN DEVICES-->
      <div class="col-5 row h-100 float-left" id="searchFillterDevices">
        <div class="search col-10 m-0 p-0">
          <i class="mdi mdi-magnify"></i>
          <base-input
            id="searchDevice"
            :placeholder="$t('deviceList.text.search')"
            v-model="textSearch"
          ></base-input>
        </div>

        <!--        FILLTER-->
        <div class="col-2 filter-device">
          <base-dropdown>
            <i slot="title" class="mdi mdi-filter dropdown-toggle"></i>
            <a
              v-for="(type, index) in deviceType"
              :key="index"
              class="dropdown-item"
              @click="
                filterType = type.value;
                selectType = type.value;
              "
            >
              {{ type.name }}
              <i
                :style="
                  selectType === type.value
                    ? 'float: right; font-size: 15px; position: relative; top: -3px;'
                    : 'display:none'
                "
                class="mdi mdi-check-bold"
              ></i>
            </a>
          </base-dropdown>
        </div>
      </div>
    </div>

    <!--    LIST DEVICE-->
    <div
      class="col-12 m-0 p-0 overflow-auto"
      id="tableDevice"
      :class="devicesHc.length > 5 ? 'td-more-than-10' : ''"
    >
      <table class="table table-hover table-have-devices">
        <thead>
          <tr>
            <th scope="col">
              <div class="th-checkbox" @click="selectAllDevice">
                <icon
                  class="mdi"
                  :class="
                    isSelectedAllDevice
                      ? 'mdi-checkbox-marked-outline'
                      : 'mdi-checkbox-blank-outline'
                  "
                />
              </div>
            </th>
            <th scope="col">{{ this.$t("deviceList.text.network") }}</th>
            <th scope="col">Net ID</th>
            <th scope="col">Mac</th>
            <th scope="col">{{ this.$t("deviceList.text.nameDevice") }}</th>
            <th scope="col">{{ this.$t("room") }}</th>
            <th scope="col">{{ this.$t("deviceList.text.type") }}</th>
            <th scope="col">Icon</th>
            <th scope="col">HC/LC</th>
            <th scope="col">{{ this.$t("deviceList.text.status") }}</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(device, index) in devicesHc"
            :key="index"
            :style="
              arrDevicesRemotes.includes(
                device.remoteid ? device.remoteid : device.devid
              )
                ? 'background-color: #000; opacity:0.5'
                : ''
            "
          >
            <td>
              <div
                @click="insertDevice(device)"
                class="check-device"
                style="width: 20px"
              >
                <icon
                  v-if="
                    arrDevicesRemotes.includes(
                      device.remoteid ? device.remoteid : device.devid
                    )
                  "
                  class="mdi mdi-check-box-outline"
                />
                <icon v-else class="mdi mdi-checkbox-blank-outline" />
              </div>
            </td>
            <td>
              <div style="text-transform: capitalize">
                {{ device.brigde_key }}
              </div>
            </td>
            <td>
              <div>
                {{ device && device.devid ? device.devid.slice(-6) : "" }}
              </div>
            </td>
            <td>
              <div>
                {{ device && device.macdev ? device.macdev.slice(-5) : "" }}
              </div>
            </td>

            <td @dblclick="$emit('showModalDeviceIn', device)">
              <!-- Case DEVICE TYPE IS IR -->
              <div
                v-if="device.type == 'IR' || device.type == 'IRV2'"
                @click="remoteOrDeviceIR(device)"
              >
                <div
                  v-if="
                    device.remoteid !== undefined
                      ? selectRemoteId == device.remoteid
                      : selectDeviceId == device.devid
                  "
                  class="input-device-name"
                  @focusout="selectRemoteId = ''"
                >
                  <base-input
                    maxlength="30"
                    type="text"
                    :placeholder="$t('devices.text.inputDevice')"
                    v-model="deviceName"
                    @keyup.enter="
                      device.remoteid !== undefined
                        ? changeNameRemote(device)
                        : changeNameDevice(device)
                    "
                    class="mb-0"
                  />
                </div>

                <div
                  v-else
                  :title="device.name"
                  class="text-overflow-hidden device-name"
                >
                  <span v-if="device.name !== ''">
                    {{ getNameDevice(device) }}
                  </span>

                  <span v-else style="color: #707070">{{
                    $t("devices.text.inputDevice")
                  }}</span>
                </div>
              </div>

              <!-- Other Case DEVICE TYPE  -->
              <div
                v-else
                @click="
                  selectDeviceId = device.devid;
                  deviceName = device.name;
                "
              >
                <div
                  v-if="selectDeviceId === device.devid"
                  class="input-device-name"
                  @focusout="selectDeviceId = ''"
                >
                  <base-input
                    maxlength="30"
                    type="text"
                    :placeholder="$t('devices.text.inputDevice')"
                    v-model="deviceName"
                    @keyup.enter="changeNameDevice(device)"
                    class="mb-0"
                  />
                </div>

                <div
                  v-else
                  :title="device.name"
                  class="text-overflow-hidden device-name"
                >
                  <span v-if="device.name !== ''">{{ device.name }}</span>

                  <span v-else style="color: #707070">{{
                    $t("devices.text.inputDevice")
                  }}</span>
                </div>
              </div>
            </td>

            <td>
              <div
                :title="getRoomName(device.roomid)"
                class="text-overflow-hidden"
                style="width: 104px"
              >
                {{ getRoomName(device.roomid) }}
              </div>
            </td>
            <td>
              <div
                :title="$t('devices.TYPE.' + device.type)"
                class="text-overflow-hidden"
              >
                {{ $t("devices.TYPE." + device.type) }}
              </div>
            </td>
            <td>
              <div>
                <i
                  v-show="checkDeviceStatusError(device.devid) == 'ERROR'"
                  class="mdi mdi-sync-off icon-status-error"
                />

                <i
                  class="icon-config"
                  :class="
                    'icon-' +
                    getDefaultIconDevice(
                      device,
                      $store.state.HomeControll.listDeviceStatus.find(
                        (dev) => dev.devid === device.devid
                      ) && $store.state.HomeControll.listDeviceStatus.find(
                        (dev) => dev.devid === device.devid
                      ).states
                    )
                  "
                ></i>
              </div>
            </td>
            <td style>
              <div>{{ getHcName(device.hc_id) }}</div>
            </td>
            <td>
              <div
                @click="checkDeviceValid(device)"
                v-if="
                  DEVICE_TYPE_CAN_CONTROLL_DEFAULT.includes(device.type) &&
                  checkDeviceStatusError(device.devid) !== 'ERROR'
                "
                style="padding-top: 10px"
              >
                <base-slider
                  size="md"
                  :value="getStatusDevice(device)"
                ></base-slider>
              </div>

              <div v-else></div>
            </td>
          </tr>
        </tbody>
      </table>

      <curtain
        :showCurtain="showCurtain"
        @closeModal="showCurtain = false"
        :deviceCurtain="device"
      />

      <pin-modal
        :showPinModal="showPin"
        @closeModal="showPin = false"
        @update="
          controllDeviceDefault(device.devid);
          showPin = false;
        "
      />
    </div>
  </div>
</template>

<script>
import { getDefaultIconDevice, controllDeviceDefault } from "@/plugins/helper";
import {
  DEVICE_TRAIT,
  DEVICE_TYPE,
  DEVICE_TYPE_CAN_CONTROLL_DEFAULT,
} from "../../../../plugins/variableConst";
import Curtain from "./Modal/Curtain";
import PinModal from "../../../base/custom/PinModal";

export default {
  name: "DeviceList",
  components: {
    Curtain,
    PinModal,
  },
  data() {
    return {
      hc: [],
      selectDeviceId: "",
      selectRemoteId: "",
      selectFloorId: "",
      deviceName: "",
      chooseFloorName: "",
      arrDevicesRemotes: [],
      findDevice: "",
      selectType: "",
      textSearch: "",
      filterType: "",
      showCurtain: false,
      showRoom: true,
      showPin: false,
      DEVICE_TYPE,
      DEVICE_TYPE_CAN_CONTROLL_DEFAULT,
      flag: false,
      device: {},
      deviceType: [
        {
          name: this.$t("deviceList.text.allDevices"),
          value: "",
        },
        {
          name: this.$t("devices.deviceTypeSwitch"),
          value: DEVICE_TYPE.SWITCH,
        },
        {
          name: this.$t("devices.deviceTypeLight"),
          value: DEVICE_TYPE.LIGHT,
        },
        {
          name: this.$t("devices.deviceTypeFan"),
          value: DEVICE_TYPE.FAN,
        },
        {
          name: this.$t("devices.deviceCurtain"),
          value: DEVICE_TYPE.CURTAIN,
        },
        {
          name: this.$t("devices.ic-zw-door-lock-keypad"),
          value: "LOCK",
        },
        {
          name: this.$t("devices.deviceTypeSensor"),
          value: DEVICE_TYPE.SENSOR,
        },
        {
          name: "IR",
          value: DEVICE_TYPE.IR,
        },
        {
          name: "Daikin",
          value: DEVICE_TYPE.DAIKIN,
        },
        {
          name: "Bluetooth",
          value: DEVICE_TYPE.LIGHTV2,
        },
        {
          name: this.$t("devices.deviceTypeBattery"),
          value: DEVICE_TYPE.BATTERY,
        },
        {
          name: this.$t("devices.deviceTypeUnknow"),
          value: DEVICE_TYPE.UNKNOW,
        },
      ],
    };
  },

  mounted() {
    let room = this.floorRooms.find(
      (fr) => fr.roomid == $router.currentRoute.query.roomid
    );
    if (room) {
      this.chooseFloorName = room.floorName + " - " + room.name;
      this.selectFloorId = room.roomid;
    }
  },

  methods: {
    getRoomName,
    getHcName,
    getStatusDevice,
    getDefaultIconDevice,
    checkDeviceValid,
    changeNameDevice,
    changeNameRemote,
    checkDeviceStatusError,
    insertDevice,
    addDeviceInRoom,
    remoteOrDeviceIR,
    getNameDevice,
    selectAllDevice,
    controllDeviceDefault,
  },
  computed: {
    devicesHc,
    rooms,
    hcs,
    floorRooms,
    statusDevices,
    checkIR,
    checkColumn,
    isSelectedAllDevice,
  },
};

function getNameDevice(device) {
  return device.name;
}

function filterType(type) {
  this.selectType = type;
  this.flag = true;
}

function remoteOrDeviceIR(device) {
  if (device.remoteid !== undefined) {
    this.selectRemoteId = device.remoteid;
    this.deviceName = device.name;
    this.selectDeviceId = "";
  } else {
    this.selectDeviceId = device.devid;
    this.deviceName = device.name;
    this.selectRemoteId = "";
  }
}

function checkColumn() {
  let numberColumn = 10 - this.devicesHc.length;

  if (numberColumn < 0) {
    return 0;
  }

  return numberColumn;
}

function checkIR() {
  console.log("arrDevice", this.arrDevicesRemotes);
  let flag = true;

  this.arrDevicesRemotes.forEach(function (deviceid) {
    let device = $state.HomeConfig.devices.find(
      (device) => device.devid == deviceid
    );

    if (device) {
      if (device.type == "IR" || device.type == "IRV2") {
        flag = false;
      }
    }
  });
  return flag;
}

function addDeviceInRoom() {
  let deviceInRoom = [];
  let remoteInRoom = [];
  let floorId = this.selectFloorId;

  this.arrDevicesRemotes.forEach(function (devid) {
    if (devid !== "" && floorId !== "") {
      devid.length <= 9
        ? remoteInRoom.push({ remoteid: devid, roomid: floorId })
        : deviceInRoom.push({
            devid: devid,
            roomid: floorId,
          });
    }
  });
  if (deviceInRoom.length > 0) {
    $dispatch($api.HomeConfig.addDevicesRemotesInRoom, {
      deviceRemoteInRoom: deviceInRoom,
      typeDR: "devices",
    });
  }

  if (remoteInRoom.length > 0) {
    $dispatch($api.HomeConfig.addDevicesRemotesInRoom, {
      deviceRemoteInRoom: remoteInRoom,
      typeDR: "remotes",
    });
  }

  this.arrDevicesRemotes = [];
}

function insertDevice(device) {
  let devid;

  device.remoteid ? (devid = device.remoteid) : (devid = device.devid);

  if (this.arrDevicesRemotes.includes(devid)) {
    this.arrDevicesRemotes = this.arrDevicesRemotes.filter(function (
      arrDevice
    ) {
      return arrDevice !== devid;
    });
  } else {
    this.arrDevicesRemotes.push(devid);
  }

  this.$emit("deviceRemoteSelect", this.arrDevicesRemotes);
}

function isSelectedAllDevice() {
  console.log(
    "deviceHc",
    this.devicesHc.length &&
      this.arrDevicesRemotes.length === this.devicesHc.length
  );
  return (
    this.devicesHc.length &&
    this.arrDevicesRemotes.length === this.devicesHc.length
  );
}

function selectAllDevice(device) {
  if (this.isSelectedAllDevice) this.arrDevicesRemotes = [];
  else
    this.arrDevicesRemotes = this.devicesHc.map(
      (item) =>
        (item && item.remoteid) ||
        (item &&
          item.type !== DEVICE_TYPE.IRV2 &&
          item.type !== DEVICE_TYPE.IR &&
          item.devid)
    );
}

function hcs() {
  return $state.HomeConfig.hcs;
}

function rooms() {
  return $state.HomeConfig.rooms;
}

function devicesHc() {
  return $getters["HomeConfig/getDevicesConfigSearch"](
    this.textSearch,
    this.filterType
  );
}

function statusDevices() {
  return $state.HomeControll.listDeviceStatus;
}

function getRoomName(roomid) {
  let room = this.rooms.find((room) => room.roomid == roomid);

  return room ? room.name : "";
}

function floorRooms() {
  let rooms = $state.HomeConfig.rooms;
  let floors = $state.HomeConfig.floors;

  let newRoom = rooms.map(function (room) {
    let floor = floors.find((floor) => room.floorid == floor.floorid);
    room.floorName = floor ? floor.name : "";
    return room;
  });

  let newRoomUpdate = [];

  floors.forEach((floor) => {
    newRoomUpdate = newRoomUpdate.concat(
      newRoom.filter((room) => room.floorid === floor.floorid)
    );
  });
  return newRoomUpdate;
}

function getStatusDevice(device) {
  let status = this.statusDevices.find(
    (status) => status.devid === device.devid
  );
  if (status && status.states) {
    if (device.type === DEVICE_TYPE.CURTAIN) {
      let statusCurtain = status.states.Level && status.states.Level.level;

      if (statusCurtain === 100) {
        return false;
      }
      return true;
    } else if (device.type === DEVICE_TYPE.FAN) {
      let statusFan = status.states.Speed && status.states.Speed.speed;

      return !!(statusFan && statusFan > 0);
    } else {
      return status.states.OnOff
        ? status.states.OnOff.on
        : status.states.OpenClose
        ? status.states.OpenClose.open
        : false;
    }
  }
}

function checkDeviceStatusError(devid) {
  let device = this.statusDevices.find((status) => status.devid === devid);
  return device ? device.status : "";
}

function checkDeviceValid(device) {
  this.device = device;

  if (device && device.protected === 1) {
    this.showPin = true;
  } else {
    controllDeviceDefault(this.device.devid);
  }
}

function getHcName(hc_id) {
  let hc = this.hcs.find((hc) => hc.hc_id == hc_id);

  return hc
    ? `${hc.is_master ? "HC" : "LC"}` +
        "_" +
        `${hc.mac.slice(12).toUpperCase()}`
    : "";
}

function changeNameDevice(device) {
  if (this.deviceName !== "") {
    let deviceName = this.deviceName.trim();

    if (deviceName) {
      $dispatch("HomeConfig/changeNameDeivce", {
        devid: device.devid,
        name: deviceName,
      });
    }
    this.selectRemoteId = "";
    this.selectDeviceId = "";
    this.deviceName = device.name;
  }
}

function changeNameRemote(device) {
  if (this.deviceName !== "") {
    let deviceName = this.deviceName.trim();

    if (deviceName) {
      $dispatch("HomeConfig/changeNameRemote", {
        remoteid: device.remoteid,
        name: deviceName,
      });
    }
  }

  this.selectRemoteId = "";
  this.selectDeviceId = "";
  this.deviceName = device.name;
}
</script>

<style lang="scss">
#DeviceList {
  .table td {
    padding: 0.5rem !important;
  }

  .icon-status-error {
    position: absolute;
    right: -6px;
    top: 0px;
    z-index: 1;
    font-size: 19px;
    color: red;
  }

  .td-more-than-10 {
    height: 92% !important;
  }

  .menu-hidden {
    .dropdown-toggle {
      background: #4a4a44 !important;
      color: #707070;
      cursor: not-allowed;
    }

    ul {
      display: none;
    }

    button {
      background: #4a4a44 !important;
      color: #707070;
      cursor: not-allowed;
    }
  }

  #fillterSearchDevice {
    height: 8%;

    #SelectFloor {
      .text-overflow-hidden {
        width: 90%;
      }

      .mdi-chevron-down {
        position: absolute;
        right: 5%;
      }
    }
  }

  #tableDevice {
    min-height: 92%;

    td {
      max-height: 80px !important;
      vertical-align: middle;
    }

    thead {
      tr {
        th {
          max-height: 56px !important;
          vertical-align: middle;
        }
      }
    }

    .table-have-devices {
      align-items: center;
      min-width: 1080px !important;

      .switch-md {
        position: relative;
        top: 4px;
      }

      thead {
        border-radius: 50px !important;

        .th-checkbox {
          position: relative;
          padding-right: 5px;
          width: 100%;
          height: 100%;
          top: -25px;
          right: 2px;

          .icon-shape {
            position: absolute !important;
            padding-left: 0px;
          }
        }

        th:nth-child(5) {
          width: 190px;
        }
      }
    }

    .icon-shape {
      font-size: 25px;
      position: relative !important;
      padding-right: 35px;
      top: 0 !important;
    }

    .device-name {
      width: 155px !important;
      background: #393933;
      height: 38px;
      line-height: 38px;
      text-align: center;
      border-radius: 10px;
      padding: 0 10px 0 10px;
    }

    .input-device-name {
      input {
        background-color: #393933;
        border: none;
        color: #fff;
        height: 38px;
        line-height: 38px;
        font-size: 16px;
        text-align: center;
        border-radius: 10px;
        padding: 0 10px 0 10px;
      }
    }

    table {
      thead th {
        top: 0px;
        position: sticky !important;
        z-index: 5;
        text-align: center;
        max-height: 56px !important;
      }

      tr:first-child {
        th {
          border: none !important;
          background-color: #848484;
          position: relative;

          .custom-control {
            top: 0 !important;
            left: 37%;
            position: absolute;
            height: 25px;

            .custom-control-label::after {
              border: 1px white solid;
              border-radius: 2px;
            }
          }
        }

        th:first-child {
          border-top-left-radius: 10px;
          border-left: 1px solid white;
        }

        th:last-child {
          border-top-right-radius: 10px;
          border-right: 1px solid white;
        }
      }

      tr {
        td {
          text-align: center;

          div {
            position: relative;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
          }

          .check_device {
            border: 1px white solid;
            border-radius: 2px;
          }

          .icon-config {
            font-size: 42px;
          }

          border: #737373 0.3px solid;
        }

        td:nth-child(3) {
          div {
            width: 55px;
          }
        }

        td:nth-child(7) {
          div {
            width: 85px;
          }
        }
      }
    }
  }

  .addDevice button {
    z-index: 20;
    border-radius: 20px !important;
    text-align: left !important;
    text-transform: none;
    font-weight: 100;
    border: none;
    height: 43px;
  }
}
</style>
