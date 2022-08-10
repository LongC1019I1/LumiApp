<template>
  <div class="device-item col" :class="{active:isActive}">
    <div class="fake-box c-p wave" >
      <div class="content">
        <div class="icon">
          <i :class="'icon-'+icon"></i>
        </div>
        <div class="status" @click="$emit('setSchedule')">
          <span >
            <i class="mdi mdi-dots-horizontal c-p" ></i>
          </span>

        </div>
        <div class="name p-2">
          <div>{{device.name||"Thiết bị"}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getDefaultIconDevice,
  getStatusDeviceFromVal,
  getActiveDeviceFromVal
} from "@/plugins/helper";
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
    status
  },
  watch: {
    status
  },
  methods: {
    deviceClick
  }
};

function status() {
  status = $getters["HomeControll/getDeviceStatusByDeviceID"](
    this.device.devid
  );
  if (status) {
    this.icon = getDefaultIconDevice(this.device, status.states);
    this.isActive = getActiveDeviceFromVal(this.device, status&&status.states);
    this.status_text = this.$t(
      getStatusDeviceFromVal(this.device, status.states)
    );
  }
  return status;
}

function deviceClick() {
  console.log(this.device, this.status);
  let { type, traits } = this.device;
  let execution = {};
  if (this.status && this.status.status == "ERROR") {
    $alertify
      .confirm({
        title: this.$t("notify.notifyDefautlTitle"),
        text: this.$t("devices.text.wakeupDevice"),
        showCancelButton: true,
        confirmButtonText: this.$t("confirm"),
        cancelButtonText: this.$t("cancel")
      })
      .then(result => {
        if (result.isConfirmed)
          $dispatch($api.HomeControll.wakeupDevices, this.device.devid);
      });
    return;
  }
  switch (type) {
    case DEVICE_TYPE.VIRTUAL:
    case DEVICE_TYPE.SWITCH:
      execution.command = DEVICE_TRAIT.OnOff;
      execution.params = {
        on: !(
          this.status &&
          this.status.states &&
          this.status.states.OnOff &&
          this.status.states.OnOff.on
        )
      };
      $dispatch($api.HomeControll.controllDevice, {
        devid: this.device.devid,
        execution
      });
      break;
    case DEVICE_TYPE.LIGHT:
      return $commit("ContentManager/UPDATE_MODAL_STATUS", {
        modal: "modalControllDimmer",
        data: this.device.devid
      });
    case DEVICE_TYPE.CURTAIN:
      return $commit("ContentManager/UPDATE_MODAL_STATUS", {
        modal: "modalControllCurtain",
        data: this.device.devid
      });
    case DEVICE_TYPE.FAN:
      return $commit("ContentManager/UPDATE_MODAL_STATUS", {
        modal: "modalControllFan",
        data: this.device.devid
      });
      break;
    case DEVICE_TYPE.DAIKIN:
      return $commit("ContentManager/UPDATE_MODAL_STATUS", {
        modal: "modalControllDaikin",
        data: this.device.devid
      });
    case DEVICE_TYPE.SPEAKER:
      $dispatch($api.ContentManager.setCurrentSpeaker, this.device.devid);
      if ($router.currentRoute.name === "home-roomFloor")
        $router.push({
          name: "home-controll",
          query: { isShowSpeakerControll: true }
        });
      break;
    case DEVICE_TYPE.IR:
      switch (this.device.irtype) {
        case IR_TYPE.REMOTE_AIR:
          return $commit("ContentManager/UPDATE_MODAL_STATUS", {
            modal: "modalControllRemoteAirV1",
            data: this.device.remoteid
          });
        case IR_TYPE.REMOTE_FAN:
          return $commit("ContentManager/UPDATE_MODAL_STATUS", {
            modal: "modalControllRemoteFanV1",
            data: this.device.remoteid
          });
        case IR_TYPE.REMOTE_TV:
          return $commit("ContentManager/UPDATE_MODAL_STATUS", {
            modal: "modalControllRemoteTvV1",
            data: this.device.remoteid
          });
      }
      break;
    case DEVICE_TYPE.IRV2:
      switch (this.device.irtype) {
        case IRV2_ALL_TYPE.IR_AC:
          return $commit("ContentManager/UPDATE_MODAL_STATUS", {
            modal: "modalControllRemoteAirV2",
            data: this.device.remoteid
          });
        case IRV2_ALL_TYPE.IR_FAN:
          return $commit("ContentManager/UPDATE_MODAL_STATUS", {
            modal: "modalControllRemoteFanV2",
            data: this.device.remoteid
          });
        case IRV2_ALL_TYPE.IR_TV:
          return $commit("ContentManager/UPDATE_MODAL_STATUS", {
            modal: "modalControllRemoteTvV2",
            data: this.device.remoteid
          });
        case IRV2_ALL_TYPE.IR_STB:
          return $commit("ContentManager/UPDATE_MODAL_STATUS", {
            modal: "modalControllRemoteStbV2",
            data: this.device.remoteid
          });
      }
      break;
  }
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
