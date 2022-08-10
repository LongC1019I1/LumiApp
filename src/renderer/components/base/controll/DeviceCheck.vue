<template>
  <div class="device-item col wave" :class="{'device-checked': ( check && !userRoleAdmin ) }" @click="$emit('pushDevice',device)">
    <div class="fake-box c-p ">
      <div class="content">
        <div class="icon">
          <i :class="'icon-'+icon"></i>
        </div>

        <div class="status" :style=" userRoleAdmin? 'visibility:hidden': '' " >
          <span @click="openCloseDevice">
          <i v-if="!check" class="mdi mdi-checkbox-blank-circle-outline" />
          <i v-else class="mdi mdi-checkbox-marked-circle" @click=" checkAll = !checkAll"/>
          </span>
        </div>
        <div class="name p-2">

          <div>{{ device.name || "Thiết bị" }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getDefaultIconDevice,
  getStatusDeviceFromVal,
  getActiveDeviceFromVal,

} from "@/plugins/helper";

import {deviceStates} from "../../../plugins/helper";
import {
  DEVICE_TYPE,
  DEVICE_TRAIT,
  IR_TYPE,
  IRV2_ALL_TYPE
} from "@/plugins/variableConst";

export default {
  name: "base-device",
  props: {
    device: {
      type: Object
    },
    check:{
      type:Boolean
    },
    userRoleAdmin: {
      type:Number
    }
  },
  data() {
    return {
      icon: getDefaultIconDevice(this.device),
      status_text: "",
      isActive: false,
      checkAll: false
    };
  },
  computed: {
    status
  },
  watch: {
    status,
  },
  methods: {
    checkSecure,
    openCloseDevice,
  },

};

function checkSecure(devid) {
  let rules = $state.HomeConfig.rules.filter(dev => dev.type === 2)
  let deviceValid = false
  if (rules) {
    rules.forEach(rule => {
      if (rule.in.devices.find(dev => dev.devid === devid)) {
        deviceValid = true
      }
    })
  }
  return deviceValid

}

function openCloseDevice() {

  if (!checkSecure(this.device.devid)) {
    this.$emit('createRule', this.device)
  } else {
    this.$emit('deleteRule', this.device)
  }
  // $dispatch('RuleManager/resetData')
  // let rule = $state.HomeConfig.rules.filter(dev => dev.type === 2 && dev.security === true).find(dev => dev.security === true)
  // $commit('RuleManager/SET_DATA_SECURE', rule)
  //
  // //IN RULE
  // let devices = Object.assign([], $state.RuleManager.in.devices)
  // let inDevice = Object.assign({}, $state.RuleManager.in)
  //
  //
  // if (devices.find(dev => dev.devid === this.device.devid)) {
  //   devices = devices.filter(dev => dev.devid !== this.device.devid)
  // } else {
  //   let mydevice = deviceStates(this.device)
  //   devices.push(mydevice)
  // }
  //
  // inDevice.devices = devices
  // $commit('RuleManager/SET_DATA_SECURE', {in: inDevice})
  // this.$emit('updateState')
}


function status() {
  status = $getters["HomeControll/getDeviceStatusByDeviceID"](
      this.device.devid
  );
  if (status) {
    this.icon = getDefaultIconDevice(this.device, status.states);
    this.isActive = getActiveDeviceFromVal(this.device, status && status.states);
    this.status_text = this.$t(
        getStatusDeviceFromVal(this.device, status.states)
    );
  }
  return status;
}

</script>
<style scoped lang="scss">
.device-item {
  padding: 0 1rem 1rem 0;
  // padding: 0px;

  i {
    font-size: 30px;
  }
  .fake-box {
    border-radius: 1rem;

    &:after {
      content: "";
      display: block;
      padding-bottom: 100%;
    }

    .content {
      display: flex;
      flex-wrap: wrap;
      position: absolute;
      // height: calc(100% - 1rem);
      // width: calc(100% - 1rem);
      height: 100%;
      width: 100%;
      padding: 12px 8px;

      & > div {
        height: 50%;
        min-height: 50%;
        min-width: 50%;
        display: flex;
        align-items: center;
      }

      .icon {
        justify-content: center;
        max-width: 50%;

        i {
          font-size: 3rem;
          margin: 0.5rem;
        }
      }

      .status {
        max-width: 50%;
        justify-content: center;
        position: relative;

        > span {
          position: absolute;
          top: -4px;
          right: 12px;
          font-size: 28px;
        }
      }

      .name {
        max-width: 100%;
        align-items: flex-end;

        & > div {
          line-height: 1.5rem;
          max-height: 3rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>
