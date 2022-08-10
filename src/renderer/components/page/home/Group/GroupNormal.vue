<template>
  <card id="groupNormal" class="bg-transparent" bodyClasses="p-0 m-0">
    <template #header>
      <div class="left-box">
        <v-select
          id="selectGroup"
          :options="listGroup"
          :reduce="(name) => name.groupid"
          label="name"
          :clearable="false"
          :searchable="false"
          :placeholder="$t('group.choosseGroup')"
          class="header-select"
          v-model="selectedGroup"
          @input="selectGroup"
        >
          <template #open-indicator>
            <span v-bind="selectAttributes" class="bg-transparent">
              <i class="mdi mdi-menu-down"></i>
            </span>
          </template>
        </v-select>
        <base-button
          type="secondary"
          id="addDevice"
          @click="addDevice"
          :disabled="!selectedDevices.length || selectedGroup == false"
          >{{
            selectedGroup === -1
              ? $t("group.removeDevice")
              : $t("deviceList.text.add")
          }}</base-button
        >
      </div>
      <div v-if="groupid" class="right-box">
        <base-button type="secondary" @click="$emit('removeSelectedGroup')">{{
          $t("group.backToListDevice")
        }}</base-button>
      </div>
      <div v-else class="right-box">
        <div class="search">
          <i class="mdi mdi-magnify"></i>
          <base-input
            id="searchDevice"
            :placeholder="$t('deviceList.text.search')"
            v-model="textSearch"
            class="mb-0"
          ></base-input>
        </div>
        <div class="filter-device">
          <base-dropdown>
            <i slot="title" class="mdi mdi-filter dropdown-toggle"></i>
            <a
              v-for="(type, index) in deviceType"
              :key="index"
              class="dropdown-item"
              @click="filterType(type.value)"
            >
              {{ type.name }}
              <i v-if="selectType == type.value" class="mdi mdi-check-bold"></i>
            </a>
          </base-dropdown>
        </div>
      </div>
    </template>
    <table id="tableDevice" class="table table-hover m-0">
      <thead>
        <tr>
          <th>
            <i
              v-if="
                listDeviceSearch.every(
                  (item, index, array) => item.type == array[0].type
                )
              "
              class="mdi"
              :class="
                isSelectedAllDevice
                  ? 'mdi-checkbox-marked-outline'
                  : 'mdi-checkbox-blank-outline'
              "
              @click="selectAllDevice"
            />
          </th>
          <th>Net ID</th>
          <th>Mac</th>
          <th>{{ $t("deviceList.text.nameDevice") }}</th>
          <th>{{ $t("room") }}</th>
          <th>{{ $t("deviceList.text.type") }}</th>
          <th>Icon</th>
          <th>HC/LC</th>
          <th>{{ $t("deviceList.text.status") }}</th>
          <th>{{ $t("deviceList.text.group") }}</th>
        </tr>
      </thead>
      <tbody>
        <device-row
          v-for="device in listDeviceSearch"
          :key="device.devid"
          :device="device"
          :selected="selectedDevices.includes(device.devid)"
          @selectDevice="selectDevice"
        />
      </tbody>
    </table>
  </card>
</template>

<script>
import { GROUP_TYPE } from "@/plugins/variableConst";
import DeviceRow from "./Element/DeviceRow.vue";
import { watch } from "fs";

export default {
  name: "group-normal",
  props: {
    groupid: [Boolean, String],
  },
  data() {
    return {
      selectAttributes: {
        ref: "openIndicator",
        role: "presentation",
        class: "vs__open-indicator",
      },
      selectedGroup: false,
      selectedDevices: [],
      selectedType: "",
      textSearch: "",
      selectType: "",
      deviceType: [
        {
          name: this.$t("deviceList.text.allDevices"),
          value: "",
        },
        {
          name: this.$t("devices.deviceTypeSwitch"),
          value: "SWITCH",
        },
        {
          name: this.$t("devices.deviceTypeLight"),
          value: "LIGHT",
        },
        {
          name: this.$t("devices.deviceTypeFan"),
          value: "FAN",
        },
        {
          name: this.$t("devices.deviceCurtain"),
          value: "CURTAIN",
        },
        {
          name: this.$t("devices.ic-zw-door-lock-keypad"),
          value: "LOCK",
        },
        {
          name: this.$t("devices.deviceTypeSensor"),
          value: "SENSOR",
        },
        {
          name: "IR",
          value: "IR",
        },
        {
          name: "Daikin",
          value: "DAIKIN",
        },
        {
          name: "Bluetooth",
          value: "BLUETOOTH",
        },
        {
          name: this.$t("devices.deviceTypeBattery"),
          value: "BATTERY",
        },
        {
          name: this.$t("devices.deviceTypeUnknow"),
          value: "UNDIFIEND",
        },
      ],
    };
  },
  components: {
    DeviceRow,
  },
  computed: {
    listGroup,
    rooms,
    listDeviceSearch,
    isSelectedAllDevice,
  },
  methods: {
    selectDevice,
    selectAllDevice,
    addDevice,
    filterType,
    selectGroup,
  },
  watch: {
    groupid() {
      this.selectedDevices = [];
      this.textSearch = '';
      this.selectType = '';
      this.selectedType = '';
    },
  },
};
//computede
function listGroup() {
  return [
    { name: this.$t("group.removeDevice"), groupid: -1 },
    ...$getters["HomeConfig/getListGroupByType"](GROUP_TYPE.normalGroup),
  ];
}

function rooms() {
  return $state.HomeConfig.rooms;
}

function listDeviceSearch() {
  if (this.groupid)
    return $getters["HomeConfig/getDevicesByGroup"](this.groupid);
  let listDevice = $getters["HomeConfig/getDevicesSearch"](
    this.textSearch,
    this.selectType,
    GROUP_TYPE.normalGroup
  );
  if (this.selectedType)
    listDevice = listDevice.filter((item) => item.type === this.selectedType);
  return listDevice;
}

function isSelectedAllDevice() {
  return this.selectedDevices.length >= this.listDeviceSearch.length;
}
//methode
function selectDevice(device) {
  let index = this.selectedDevices.findIndex((item) => item == device.devid);
  if (index === -1) {
    this.selectedDevices.push(device.devid);
    this.selectedType = device.type;
  } else {
    this.selectedDevices.splice(index, 1);
    if (!this.selectedDevices.length) this.selectedType = "";
  }
}

function selectAllDevice() {
  if (this.isSelectedAllDevice) {
    this.selectedType = "";
    this.selectedDevices = [];
  } else {
    this.selectedDevices = this.listDeviceSearch.map((item) => item.devid);
  }
}

function filterType(type) {
  this.selectedType = "";
  this.selectedDevices = [];
  this.selectType = type;
}

function addDevice() {
  if (this.selectedGroup === false)
    return $alertify.error(this.$t("group.pleseSelectGroup"));
  if (!this.selectedDevices.length)
    return $alertify.error(this.$t("group.pleseSelectDevice"));
  //get list selected device
  let selectedDevice = this.listDeviceSearch.filter((item) =>
    this.selectedDevices.includes(item.devid)
  );
  //get device aready in group
  let deviceInGropp = [];
  if (this.selectedGroup != -1)
    deviceInGropp = $getters["HomeConfig/getDevicesByGroup"](
      this.selectedGroup
    );
  //get group device type
  let groupDeviceType;
  if (!deviceInGropp.length) groupDeviceType = selectedDevice[0].type;
  //if no device in group
  else groupDeviceType = deviceInGropp[0].type; // if group aready has device
  //check list device has same type
  let checkDeviceType = selectedDevice.every(
    (item, index, array) => item.type == groupDeviceType
  );
  if (!checkDeviceType)
    return $alertify.error(this.$t("group.deviceTypeNotEqual"));

  $dispatch(
    "HomeConfig/updateDevices",
    this.selectedDevices.map((item) => {
      return { devid: item, groupid: this.selectedGroup };
    })
  );
  this.selectedDevices = [];
}

function selectGroup(groupid) {
  this.selectedType = "";
  this.selectType = ""
  if (groupid == -1) return;
  let deviceInGropp = $getters["HomeConfig/getDevicesByGroup"](groupid);
  if (!deviceInGropp.length) return;

  if (deviceInGropp[0].type === this.selectedType) return;
  if (this.selectedType) this.selectedDevices = [];
  this.selectedType = deviceInGropp[0].type;
  this.selectedDevices = []
}
</script>

<style lang="scss">
#groupNormal {
  .icon-status-error {
    position: absolute;
    right: 0px;
    top: 3px;
    z-index: 1;
    font-size: 19px;
    color: red;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    padding: 0 0 1rem 0;
    & > div {
      display: flex;
      width: 50%;
    }
    .left-box {
      justify-content: flex-start;
      #selectGroup {
        max-width: 400px;
        width: 70%;
      }
    }
    button {
      z-index: 20;
      border-radius: 20px !important;
      text-align: left !important;
      text-transform: none;
      font-weight: 100;
      border: none;
      height: 2.5rem;
      margin-left: 1rem;
    }
    .right-box {
      justify-content: flex-end;
      .search {
        position: relative;
        max-width: 400px;
        width: 50%;
        margin-right: 3rem;
        .form-group {
          float: left;
          margin-left: 5%;
          width: 95%;
          input {
            border-radius: 20px;
            border: none;
            padding-left: 3.5em;
            color: white;
            height: 43px;
          }
        }
        i {
          position: absolute;
          left: 4%;
          top: 0;
          font-size: 28px;
          margin-left: 15px;
        }
      }
      .filter-device {
        position: relative;
        li {
          & > i {
            font-size: 3rem;
            margin-left: 15px;
            position: absolute;
            top: -2.3rem;
            right: -100%;
          }
          ul {
            position: absolute;
            top: -21px;
            left: -300px;
            width: 300px;
            padding: 0 1rem;
            a i {
              float: right;
            }
          }
        }
      }
    }
  }
  .card-body {
    border-radius: 1rem;
    #tableDevice {
      width: calc(100% - 1px);
      th,
      td {
        text-align: center;
        vertical-align: middle;
        padding: 0.5rem;
        min-height: 4rem;
        height: 4rem;
        &:nth-child(1) {
          font-size: 1.5rem;
        }
      }
      thead {
        tr {
          th {
            position: sticky;
            top: 0;
            z-index: 100;
            border: none;
            &:first-child {
              border-top-left-radius: 10px;
            }
            &:last-child {
              border-top-right-radius: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
