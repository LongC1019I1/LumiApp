<template>
  <div class="device-item col wave" @click="onOffDevice" :class="{active:isActive}">
    <div class="fake-box c-p ">
      <div class="content">
        <div class="icon">
          <i :class="'icon-'+icon"></i>
        </div>
        <div class="status">
          <span>
           <base-slider
               size="md" class="mb-0"
               :value="checkSecure(device)">
           </base-slider>
          </span>
        </div>
        <div class="name pl-2 pb-3  row">
          <div class="text-overflow-hidden col-12">
            {{ device.name || "Thiết bị" }}
          </div>
          <div></div>
          <div class="text-overflow-hidden col-12 w-100" >{{
              $store.state.HomeConfig.rooms.find(room => room.roomid === device.roomid)?
                  $store.state.HomeConfig.rooms.find(room => room.roomid === device.roomid).name : ""
            }}</div>
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
    }
  },
  data() {
    return {
      icon: getDefaultIconDevice(this.device),
      status_text: "",
      isActive: false
    };
  },
  computed: {
    status,
    havePin
  },
  watch: {
    status
  },
  methods: {
    checkSecure,
    onOffDevice
  },

};

function havePin() {
  let users = $state.HomeConfig.users
  let pin = users.find(user => user.pin && user.pin_code )
  return !!pin
}

function checkSecure(device) {

  if (device.protected === 0 || device.protected === -1) {
    return false
  }
  return true

}

async function onOffDevice() {

  if (this.device.protected === 0) {

    await this.device.devid ? $dispatch('HomeConfig/deviceSecureProtected', {device: this.device}) : $dispatch('HomeConfig/groupSecureProtected', {group: this.device})
    await $dispatch($api.HomeConfig.getListHomeConfigByHomeID, {
      homeid: Number(this.$route.params.homeID)
    });

    await $dispatch($api.HomeConfig.getListHomeConfigByHomeIDNoAnimation, {
      homeid: Number(this.$route.params.homeID)
    });
    return
  } else {
      this.$emit('confirmPinModal', this.device)
  }
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
          top: 4px;
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
