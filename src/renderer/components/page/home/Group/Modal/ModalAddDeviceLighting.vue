<template>
  <modal
    :show.sync="isShowModalAddDeviceLighting"
    :showClose="false"
    modalClasses="modal-input modal-lg modal-list-device-lighting modal-full-height"
    bodyClasses="p-0"
    @close="closeModal"
  >
    <div slot="header" class="w-100 text-center">
      <span>{{group&&group.name}}</span>
      <i class="pull-right c-p mdi mdi-window-close pull-right" @click="closeModal"></i>
    </div>
    <div>
      <div class="search">
        <i class="mdi mdi-magnify"></i>
        <base-input
          id="searchDevice"
          :placeholder=" $t('deviceList.text.search')"
          v-model="textSearch"
          class="mb-0"
        ></base-input>
      </div>
    </div>
    <div id="tableDevice">
      <table class="table table-hover m-0">
        <thead>
          <tr>
            <th>
              <i
                v-if="listDeviceLighting.every((item, index, array)=>item.type==array[0].type)"
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
          <device-row-add-device-lighting
            v-for="(device) in listDeviceLighting"
            :key="device.devid"
            :device="device"
            :selected="selectedDevices.includes(device.devid)"
            @selectDevice="selectDevice"
          />
        </tbody>
      </table>
    </div>
  </modal>
</template>

<script>
import DeviceRowAddDeviceLighting from "../Element/DeviceRowAddDeviceLighting";
import { GROUP_TYPE } from "@/plugins/variableConst";

export default {
  name: "modal-group",
  props: {
    isShowModalAddDeviceLighting: {
      type: Boolean,
      default: false
    },
    groupid: [String, Boolean]
  },
  data() {
    return {
      textSearch: "",
      selectedDevices: [],
      isSelectedAllDevice:false,
    };
  },
  components: {
    DeviceRowAddDeviceLighting
  },
  computed: {
    group,
    listDeviceLighting
  },
  methods: {
    closeModal,
    selectDevice,
    selectAllDevice
  }
};

function group() {
  return $state.HomeConfig.groups.find(item => item.groupid === this.groupid);
}

function listDeviceLighting() {
  let listDevice = $getters["HomeConfig/getDevicesSearch"](
    this.textSearch,
    null,
    GROUP_TYPE.normalGroup
  );
  return listDevice;
}

function selectDevice(device) {
  let index = this.selectedDevices.findIndex(item => item == device.devid);
  if (index === -1) {
    this.selectedDevices.push(device.devid);
    this.selectedType = device.type;
  } else {
    this.selectedDevices.splice(index, 1);
    if (!this.selectedDevices.length) this.selectedType = "";
  }
}

function selectAllDevice(device) {
  return 
}

function closeModal() {
  this.groupName = "";
  this.groupNameError = "";
  this.$emit("closeModal");
}
</script>

<style lang="scss">
#group {
  .modal-list-device-lighting {
    .search {
      position: relative;
      max-width: 400px;
      width: 40%;
      float: right;
      margin: 0.5rem;
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
        z-index: 1;
        position: absolute;
        left: 4%;
        top: 0;
        font-size: 28px;
        margin-left: 15px;
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
            &:first-child {
              border-top-left-radius: 10px;
            }
            &:last-child {
              border-top-right-radius: 10px;
            }
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
    }
  }
}
</style>
