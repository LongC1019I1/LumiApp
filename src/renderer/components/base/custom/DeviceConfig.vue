<template>
  <div class="device col row p-1">
    <div class="col-2 h-30">
      <i
        style="font-size: 50px !important; text-align: center"
        class="mx-auto"
        :class="'icon-'+getDefaultIconDevice(device, device.status&&device.status.states)"
      />
    </div>
    <div class="col-10 row h-30">
      <div class="col-6">
        <input
          type="text"
          class="w-100 h-100"
          style="border-radius: 5px"
          @keyup.enter="changeName"
          v-model="deviceName"
          placeholder="Tên thiết bị"
        >

        <div class="col row w-100 mt-3">
          <p
            class="col-6 mr-2 w-100 h-25"
            type="text"
            style="color: black "
          >{{ device.hc.slice(12) }}</p>
          <p class="col-5 w-100 h-25" type="text" style="color: black ">{{device.mac.slice(-5)}}</p>
        </div>
      </div>

      <div class="col-6">
        <base-dropdown>
          <base-button slot="title" size="sm" type="secondary" class="dropdown-toggle">Secondary</base-button>

          <a
            @click="changeIcon(device, icon.key)"
            v-for="(icon, index) in selectIconDevices "
            :key="index"
            class="dropdown-item"
            href="#"
          >
            <i :class="'icon-'+icon.key "></i>
          </a>
        </base-dropdown>

        <div class="col row col-12">
          <base-input class="col-6 col-sm-6"></base-input>
          <base-input class="col-6 col-sm-6"></base-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getDefaultIconDevice,
  getStatusDeviceFromVal,
  getIconByTypeForSetting
} from "@/plugins/helper";

import { changeNameDeivce } from "../../../store/modules/homeConfig/devices";

export default {
  name: "DeviceConfig",
  props: {
    device: {
      type: Object
    }
  },

  data() {
    return {
      deviceName: ""
    };
  },
  methods: {
    getDefaultIconDevice,
    getStatusDeviceFromVal,
    setDefault,
    changeName,
    getIconByTypeForSetting,
    changeIcon
  },
  mounted() {
    this.setDefault();
  },
  computed: {
    homeInfo_hcs,
    selectIconDevices
  }
};

function homeInfo_hcs() {
  return $state.HomeConfig.hcs;
}

function selectIconDevices() {
  return this.getIconByTypeForSetting(this.device);
}

function changeIcon(device, iconkey) {
  $dispatch($api.HomeConfig.changeIconDevices, {
    devid: device.devid,
    iconkey: iconkey,
    real_type: device.type
  });
}

async function setDefault() {
  this.deviceName = this.device.name;
}

function changeName() {
  if (this.deviceName !== "" && this.device.devid !== "") {
    $dispatch($api.HomeConfig.changeNameDeivce, {
      name: this.deviceName,
      devid: this.device.devid
    });
  }
}
</script>

<style scoped>
.device {
  border: 1px solid #000000;
  border-radius: 15px;
  height: 100% !important;
}
</style>
