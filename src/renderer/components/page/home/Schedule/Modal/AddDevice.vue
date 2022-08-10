<template>
  <modal
    :show.sync="isShowModal"
    :showClose="false"
    modalClasses="modal-input modal-xlg modal-list-device modal-full-height"
    bodyClasses="p-0"
    :backdropClick="false"
    @close="closeModal"
    id="schedule"
  >
    <div slot="header" class="w-100 text-center">
      <span>{{ $t("scene.chooseDevice") }}</span>
      <i
        class="pull-right c-p mdi mdi-window-close pull-right"
        @click="closeModal"
      ></i>
    </div>
    <div class="filter-header">
      <base-button class="confirm-button" @click="addDevices">{{
        $t("scene.addDevice")
      }}</base-button>
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
            @click="filterType = type.value"
          >
            {{ type.name }}
            <i v-if="filterType == type.value" class="mdi mdi-check-bold"></i>
          </a>
        </base-dropdown>
      </div>
    </div>
    <div id="tableDevice">
      <table class="table table-hover m-0">
        <thead>
          <tr>
            <th>
              <i class="mdi mdi-checkbox-blank-outline" />
            </th>
            <th>Net ID</th>
            <th>Mac</th>
            <th>{{ $t("deviceList.text.nameDevice") }}</th>
            <th>{{ $t("room") }}</th>
            <th>{{ $t("deviceList.text.type") }}</th>
          </tr>
        </thead>
        <tbody>
          <device-row-add-device
            v-for="(device, key) in listDevice"
            :key="key"
            :device="device"
            :selected="
              selectedDevices ==
              (device.remoteid ? device.remoteid : device.devid)
                ? true
                : false
            "
            @selectDevice="selectDevice"
          />
        </tbody>
      </table>
    </div>
  </modal>
</template>

<script>
import DeviceRowAddDevice from "../Element/TableRow/AddDevice";
import { GROUP_TYPE, TYPE_RULE } from "@/plugins/variableConst";

export default {
  name: "modal-add-deivce",
  props: {
    isShowModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      textSearch: "",
      filterType: "",
      selectedDevices: "",
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
          name: this.$t("devices.deviceTypeSpeaker"),
          value: "SPEAKER",
        },
        {
          name: this.$t("devices.ic-zw-door-lock-keypad"),
          value: "LOCK",
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
      ],
    };
  },
  components: {
    DeviceRowAddDevice,
  },
  computed: {
    listDevice,
  },
  methods: {
    closeModal,
    selectDevice,
    addDevices,
  },
};

function listDevice() {
  this.selectedDevices = [];

  let listDevice = $getters["HomeConfig/getDeviceOutputSearch"](
    this.textSearch,
    this.filterType
  );

  let schedules = $getters["HomeConfig/getAllRulesByType"]([
    TYPE_RULE.schedule,
  ]);

  return listDevice.filter(
    (device) =>
      !schedules.find((item) =>
        item.out &&
        item.out.devices &&
        item.out.devices[0] &&
        item.out.devices[0].remoteid
          ? item.out.devices[0].remoteid === device.remoteid
          : item.out &&
            item.out.devices &&
            item.out.devices[0] &&
            item.out.devices[0].devid === device.devid
      )
  );
}

function selectDevice(device) {
  let deviceRemote = device.remoteid ? device.remoteid : device.devid;

  if (this.selectedDevices === deviceRemote) {
    return (this.selectedDevices = "");
  }
  this.selectedDevices = deviceRemote;
}

function addDevices() {
  // $dispatch("HomeConfig/addSchedule", {deviceRemoteid: this.selectedDevices});

  let device = this.listDevice.find(
    (dev) => this.selectedDevices === (dev.remoteid ? dev.remoteid : dev.devid)
  );
  this.$emit("device", device);
  this.selectedDevices = "";
  this.$emit("closeModal");
}

function closeModal() {
  this.selectedDevices = "";
  this.filterType = "";
  this.textSearch = "";
  this.$emit("closeModal");
}
</script>

<style lang="scss">
#schedule {
  .modal-list-device {
    .filter-header {
      display: flex;
      justify-content: flex-end;

      .search {
        max-width: 400px;
        width: 35%;
        margin: 0.5rem 3rem;
        position: relative;

        input {
          border-radius: 20px;
          border: none;
          padding-left: 3.5em;
          color: white;
          height: 43px;
        }

        i {
          z-index: 1;
          position: absolute;
          left: 0;
          top: 0;
          font-size: 28px;
          margin-left: 15px;
        }
      }

      .filter-device {
        position: relative;
        margin: 0.5rem;

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

      .confirm-button {
        border-radius: 30px;
        position: absolute;
        left: 0;
        margin: 0.5rem;
        width: max-content;
      }
    }

    #tableDevice {
      width: calc(100% - 1px);
      max-height: calc(100% - 3.8rem);
      overflow: auto;

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
            border: solid 1px gray;
            background: #52524c;

            &:after,
            &:before {
              content: "";
              position: absolute;
              left: 0;
              width: 100%;
            }

            &:before {
              top: -1px;
              border-top: 1px solid gray;
            }

            &:after {
              bottom: -1px;
              border-bottom: 1px solid gray;
            }
          }
        }
      }

      td {
        background: #52524c;
        border: solid 1px gray;
      }
    }

    .selected {
      td {
        background: #393933 !important;
      }
    }
  }
}
</style>
