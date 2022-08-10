<template>
  <modal
      :show.sync="isShowModal"
      :showClose="false"
      modalClasses="modal-input modal-xlg modal-list-device modal-full-height"
      bodyClasses="p-0"
      :backdropClick="false"
      @close="closeModal"
      id="secureDeviceSearch"
  >
    <div slot="header" class="w-100 text-center">
      <span>{{ $t('scene.chooseDevice') }}</span>
      <i class="pull-right c-p mdi mdi-window-close pull-right" @click="closeModal"></i>
    </div>
    <div class="filter-header">
      <base-button class="confirm-button" :disabled="selectedDevices.length === 0" @click="addDevices">{{ $t('scene.addDevice') }}</base-button>
      <div class="search">
        <i class="mdi mdi-magnify"></i>
        <base-input
            id="searchDevice"
            :placeholder=" $t('deviceList.text.search')"
            v-model="textSearch"
            class="mb-0"
        ></base-input>
      </div>
      <div class="filter-device">
        <base-dropdown>
          <i slot="title" class="mdi mdi-filter dropdown-toggle"></i>
          <a
              v-for="(type,index) in deviceType"
              :key="index"
              class="dropdown-item"
              @click="filterType=type.value"
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
            <i
                class="mdi"
                :class="isSelectedAllDevice?'mdi-checkbox-marked-outline':'mdi-checkbox-blank-outline'"
                @click="selectAllDevice"
            />
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
            v-for="(device,key) in listDevice"
            :key="key"
            :device="device"
            :selected="device && device.devid ? selectedDevices.includes(device.devid) : selectedDevices.includes(device.groupid)"
            @selectDevice="selectDevice"
        />
        </tbody>
      </table>
    </div>
  </modal>
</template>

<script>
import DeviceRowAddDevice from "./DeviceRowAddDevice";
import {GROUP_TYPE, TYPE_RULE} from "@/plugins/variableConst";
import {DEVICE_TYPE} from "../../../../../../plugins/variableConst";

function listDevice() {

  let listDevice = $getters["HomeConfig/getDeviceRemoteSecure"](
      this.textSearch,
      this.filterType
  );

  let deviceSecure = []

  let devices = $state.HomeConfig.devices.filter(dev => dev.protected === 1 || dev.protected === 0 &&  dev.type !== 'IR' &&  dev.type !== 'IRV2')
  let groups = $state.HomeConfig.groups.filter(dev => dev && dev.protected === 1 || dev && dev.protected === 0 && dev && dev.type === 2)

  devices && devices.length > 0 ? deviceSecure.push(...devices) : '';
  groups && groups.length > 0 ? deviceSecure.push(...groups) : ''



    let deviceFilter =  listDevice.filter(device => !deviceSecure.find(item =>
            item.devid ? item.devid === device.devid : item.groupid  === device.groupid
    ))

  return deviceFilter

}

export default {
  name: "modal-add-deivce",
  props: {
    isShowModal: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      textSearch: "",
      filterType: "",
      selectedDevices: [],
      deviceType: [
        {
          name: this.$t("deviceList.text.allDevices"),
          value: ""
        },
        {
          name: this.$t("devices.deviceTypeSwitch"),
          value: "SWITCH"
        },
        {
          name: this.$t("devices.deviceTypeLight"),
          value: DEVICE_TYPE.LIGHT,
        },
        {
          name: this.$t("devices.deviceTypeSpeaker"),
          value: "SPEAKER",
        },
        {
          name: this.$t("devices.deviceTypeFan"),
          value: "FAN"
        },
        {
          name: this.$t("devices.deviceCurtain"),
          value: "CURTAIN"
        },
        {
          name: this.$t("devices.ic-zw-door-lock-keypad"),
          value: "LOCK"
        },
        {
          name: "Daikin",
          value: "DAIKIN"
        },
        {
          name: "Bluetooth",
          value: "BLUETOOTH"
        },
        {
          name: this.$t("devices.deviceTypeUnknow"),
          value: "UNDIFIEND",
        },
      ]
    };
  },
  components: {
    DeviceRowAddDevice
  },
  computed: {
    listDevice,
    isSelectedAllDevice
  },
  methods: {
    closeModal,
    selectDevice,
    addDevices,
    selectAllDevice
  }
};

function isSelectedAllDevice() {
  return (
      this.listDevice.length &&
      this.selectedDevices.length === this.listDevice.length
  );
}

function selectDevice(device) {

  let index = this.selectedDevices.findIndex( item =>
      device.devid ? item === device.devid : item === device.groupid
  );

  if (index === -1) {
    this.selectedDevices.push(device.devid? device.devid : device.groupid)
  } else {
    this.selectedDevices.splice(index,1);
  }
}

function selectAllDevice(device) {
  if (this.isSelectedAllDevice) this.selectedDevices = [];
  else
    this.selectedDevices = this.listDevice.map(
        item => item && item.devid || item && item.groupid && item.groupid !== -1
    );
}


async function addDevices() {

  let deviceAdd = []

  this.selectedDevices.forEach( id => {
    let device = this.listDevice.find(dev =>
        (dev && dev.devid ? dev.devid :
                dev.groupid && dev.groupid !== -1 ? dev.groupid : ' '
        )
        === id )
    if (device){
      deviceAdd.push(device)
    }
  })

  await $dispatch('HomeConfig/addSecureProtected', {devices: deviceAdd})
  await $dispatch($api.HomeConfig.getListHomeConfigByHomeID, {
    homeid: Number(this.$route.params.homeID)
  });


  this.selectedDevices = [];
  this.$emit('closeModal')

  await $dispatch($api.HomeConfig.getListHomeConfigByHomeIDNoAnimation, {
    homeid: Number(this.$route.params.homeID)
  });

}

function closeModal() {
  this.selectedDevices = [];
  this.filterType = "";
  this.textSearch = "";
  this.$emit("closeModal");
}
</script>

<style lang="scss">
#secureDeviceSearch {
  .modal-list-device {
    .filter-header {
      display: flex;
      justify-content: flex-end;

      .search {
        max-width: 400px;
        width: 35%;
        margin: 0.5rem 3rem;
        position: relative;

        i {
          z-index: 1;
          position: absolute;
          left: 0;
          top: 0;
          font-size: 28px;
          margin-left: 15px;
        }

        .form-group {
          input {
            border-radius: 1.5rem !important;
            border: none;
            padding-left: 3.5em !important;
            color: white;
            height: 43px;
            width: 100% !important;
          }


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
            top: 10px;
            left: -300px;
            width: 300px;
            padding: 0 1rem;
            border: 1px solid rgb(104,103,100);

            a i {
              float: right;
              position: absolute;
              right: 0;
            }

            a {
              border-bottom: 1px solid rgb(104,103,100);
            }

            a:last-child {
              border-bottom: none !important;
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
