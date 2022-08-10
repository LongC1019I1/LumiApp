<template>
  <modal
    :show.sync="isShowModal"
    :showClose="false"
    modalClasses="modal-input modal-xlg modal-list-device modal-full-height"
    bodyClasses="p-0"
    :backdropClick="false"
    @close="closeModal"
  >
    <div slot="header" class="w-100 text-center">
      <span>{{ $t("scene.chooseDevice") }}</span>
      <i
        class="pull-right c-p mdi mdi-window-close pull-right"
        @click="closeModal"
      ></i>
    </div>
    <div class="filter-header">
      <base-button
        class="confirm-button"
        @click="addDevices"
        :class="{ disabled: !selectedDevices.length }"
        >{{ $t("scene.addDevice") }}</base-button
      >
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
            class="dropdown-item justify-between"
            @click="filterType = type.value"
          >
            {{ type.name }}
            <i v-if="filterType === type.value" class="mdi mdi-check-bold"></i>
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
                v-if="
                  !(
                    $store.state.RuleManager.in.delay ||
                    $store.state.RuleManager.in.delay === 0
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
            <th>{{ $t("deviceList.text.network") }}</th>
            <th>Net ID</th>
            <th>Mac</th>
            <th>{{ $t("deviceList.text.nameDevice") }}</th>
            <th>{{ $t("room") }}</th>
            <th>{{ $t("deviceList.text.type") }}</th>
            <th>{{ $t("deviceList.text.status") }}</th>
          </tr>
        </thead>
        <tbody>
          <add-device-row
            v-for="(device, index) in listDevice"
            :key="index"
            :device="device"
            :selected="
              device.remoteid
                ? selectedDevices.includes(device.remoteid)
                : selectedDevices.includes(device.devid)
            "
            @selectDevice="selectDevice"
            @showPin="$emit('showPin',$event)"
          />
        </tbody>
      </table>
    </div>

  </modal>
</template>

<script>
import AddDeviceRow from "../Element/TableRow/AddDevice";
import { DEVICE_TYPE, DEVICE_TRAIT } from "@/plugins/variableConst";
import {controllDeviceDefault} from "../../../../../plugins/helper";

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
      selectedDevices: [],
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
          name: this.$t("devices.deviceTypeSpeaker"),
          value: "SPEAKER",
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
          name: this.$t("devices.deviceTypeUnknow"),
          value: "UNDIFIEND",
        },
      ],

    };
  },
  components: {
    AddDeviceRow,
  },
  computed: {
    listDevice,
    isSelectedAllDevice,
  },
  methods: {
    closeModal,
    selectDevice,
    selectAllDevice,
    addDevices,
    controllDeviceDefault
  },
};

function listDevice() {
  this.selectedDevices = [];
  let listDevice = $getters["HomeConfig/getDeviceInputSearch"](
    this.textSearch,
    this.filterType
  );
  let { logic, sequenceType } = $state.RuleManager.in;
  if (logic === 2 && sequenceType === 1)
    listDevice = listDevice.filter(
      (device) =>
        !(
          [
            DEVICE_TYPE.CURTAIN,
            DEVICE_TYPE.FAN,
            DEVICE_TYPE.LIGHT,
            DEVICE_TYPE.LIGHTV2,
            DEVICE_TYPE.SPEAKER,
          ].includes(device.type) ||
          (device.type === DEVICE_TYPE.SENSOR &&
            device.traits.find((item) =>
              [
                DEVICE_TRAIT.Battery,
                DEVICE_TRAIT.Luminance,
                DEVICE_TRAIT.Humidity,
                DEVICE_TRAIT.Temperature,
              ].includes(item.name)
            ))
        )
    );
  if ($state.RuleManager.in.devices && $state.RuleManager.in.devices.length)
    return listDevice.filter(
      (device) =>
        !$state.RuleManager.in.devices.find((item) =>
          device.remoteid
            ? item.remoteid === device.remoteid
            : item.devid === device.devid
        )
    );
  return listDevice;
}

function selectDevice(device) {
  if ($state.RuleManager.in.delay || $state.RuleManager.in.delay === 0)
    return (this.selectedDevices = [
      device.remoteid ? device.remoteid : device.devid,
    ]);
  let index = this.selectedDevices.findIndex((item) =>
    device.remoteid ? item === device.remoteid : item === device.devid
  );
  if (index === -1) {
    this.selectedDevices.push(device.remoteid ? device.remoteid : device.devid);
  } else {
    this.selectedDevices.splice(index, 1);
  }
}

function isSelectedAllDevice() {
  return (
    this.listDevice.length &&
    this.selectedDevices.length === this.listDevice.length
  );
}

function selectAllDevice(device) {
  if (this.isSelectedAllDevice) this.selectedDevices = [];
  else
    this.selectedDevices = this.listDevice.map(
      (item) => item.remoteid || item.devid
    );
}

function addDevices() {
  $commit("RuleManager/ADD_DEVICES_INPUT", this.selectedDevices);
  this.selectedDevices = [];
}

function closeModal() {
  this.selectedDevices = [];
  this.filterType = "";
  this.textSearch = "";
  this.$emit("closeModal");
}
</script>

<style lang="scss">
</style>
