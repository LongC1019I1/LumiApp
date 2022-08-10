<template>
  <div class="device-item col p-1">
    <div class="fake-box" @contextmenu.prevent="$refs.menu.open">
      <div class="content row p-1 m-0">
        <base-dropdown style="height: 10px !important; ">
          <base-button slot="title" size="sm" type="secondary" class="dropdown-toggle">
            Thay biểu tượng
          </base-button>
          <a @click="changeIcon(device, icon.key)" v-for="(icon, index) in selectIconDevices " :key="index"
             class="dropdown-item" href="#">
            <i :class="'icon-'+icon.key "> <span style="font-size: 15px">{{ icon.name }}</span></i></a>

        </base-dropdown>

        <div class="col-6 h-50 p-0">
          <i :class="'icon-'+getDefaultIconDevice(device, device.status&&device.status.states)"></i>
        </div>
        <div class="col-6 h-50 text-right status pl-0 pr-1">
          <span>{{ getStatusDeviceFromVal(device, device.status && device.status.states) }}</span>

        </div>
        <div class="text-wrap col-12 name">
          {{ device.name || "Thiết bị" }}<br>

          Mac: {{ device.macdev.slice(-4) }}
        </div>

      </div>
    </div>



    <vue-context v-if="device.type == 'IR' " ref="menu">
      <li v-for="(ir,index) in irDevices" :key="index">

        <a @click.prevent="ir.onPress()">
          <i :class="'icon-'+ir.leftIconName "> <span style="font-size: 15px"> {{ir.title}}</span></i>

        </a>

      </li>
    </vue-context>
  </div>
</template>

<script>

import {
  getDefaultIconDevice,
  getStatusDeviceFromVal,
  getIconByTypeForSetting,
  getOptionActionSheet

} from "@/plugins/helper";


import VueContext from "vue-context";
import 'vue-context/src/sass/vue-context.scss';


export default {
  name: "DeviceSet",
  props: {
    device: {
      type: Object
    }
  },
  methods: {
    getDefaultIconDevice,
    getStatusDeviceFromVal,
    getIconByTypeForSetting,
    changeIcon,
    getOptionActionSheet
  },
  components: {
    VueContext
  },

  computed: {
    selectIconDevices,
    irDevices
  }

}

function selectIconDevices() {
  return this.getIconByTypeForSetting(this.device)
}

function irDevices() {

return this.getOptionActionSheet(this.device)
}

function changeIcon(device, iconkey) {

  $dispatch($api.HomeConfig.changeIconDevices,
      {
        'devid': device.devid,
        'iconkey': iconkey,
        "real_type": device.type
      })
}


</script>

<style scoped lang="scss">
.device-item {
  .fake-box {
    border: solid 1px black;
    border-radius: 1rem;

    &:after {
      content: "";
      display: block;
      padding-bottom: 100%;
    }

    .content {
      position: absolute;
      height: calc(100% - 0.5rem);
      width: calc(100% - 0.5rem);

      i {
        font-size: 3rem;
        margin: 0.5rem;
      }

      .name {
        line-height: 1.5rem;
        height: 3rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .status {

        span {
          position: relative;
        }
      }
    }
  }
}
</style>
