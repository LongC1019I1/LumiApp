<template>
  <div class="device-item col" :class="{ active: isActive }">
    <div class="fake-box c-p wave" @click="deviceClick">
      <div class="content">
        <div class="icon" :class="'spin-' + spin">
          <i :class="'icon-' + icon"></i>
        </div>
        <div class="status">
          <span v-if="status && status.status == 'ERROR'" class="text-danger">
            <i class="mdi mdi-sync-off mdi-36px"></i>
          </span>
          <span v-else-if="!status" class="text-warning">
            <i class="mdi mdi-restore-alert mdi-36px"></i>
          </span>
          <span v-else>{{ status_text }}</span>
        </div>
        <div class="name p-2">
          <div>{{ device.name || "Thiết bị" }}</div>
        </div>
      </div>
    </div>
    <pin-modal
      v-if="showPin"
      :showPinModal="showPin"
      @closeModal="showPin = false"
      @update="updateDeviceConfig"
    />
  </div>
</template>

<script>
import {
  getDefaultIconDevice,
  getStatusDeviceFromVal,
  getActiveDeviceFromVal,
} from "@/plugins/helper";
import {
  DEVICE_TYPE,
  DEVICE_TRAIT,
  IR_TYPE,
  IRV2_ALL_TYPE,
} from "@/plugins/variableConst";

import PinModal from "../custom/PinModal";

export default {
  name: "base-device",
  props: {
    device: {
      type: Object,
    },
  },
  data() {
    return {
      icon: getDefaultIconDevice(this.device),
      status_text: "",
      spin: 0,
      isActive: false,
      deviceConfig: true,
      showPin: false,
    };
  },
  computed: {
    status,
  },
  watch: {
    status,
  },
  methods: {
    deviceClick,
    updateDeviceConfig,
    showDeviceConfig,
  },
  components: {
    PinModal,
  },
  mounted() {},
};

function status() {
  status = $getters["HomeControll/getDeviceStatusByDeviceID"](
    this.device.devid
  );
  if (status) {
    this.icon = getDefaultIconDevice(this.device, status.states);
    this.isActive = getActiveDeviceFromVal(
      this.device,
      status && status.states
    );
    this.status_text = this.$t(
      getStatusDeviceFromVal(this.device, status.states)
    );
    if (this.device.type === DEVICE_TYPE.FAN)
      this.spin =
        status.states && status.states.Speed && status.states.Speed.speed;
    else this.spin = 0;
  }
  return status;
}

function updateDeviceConfig() {
  this.deviceConfig = true;
  this.showPin = false;
  this.showDeviceConfig();
}

function deviceClick() {
  if (this.device.protected && this.device.protected === 1) {
    this.deviceConfig = false;
    this.showPin = true;
  } else {
    this.deviceConfig = true;
    this.showPin = false;
    this.showDeviceConfig();
  }
}

function showDeviceConfig() {
  let { type, traits } = this.device;
  let execution = false;
  if (this.status && this.status.status == "ERROR") {
    $alertify
      .confirm({
        title: this.$t("notify.notifyDefautlTitle"),
        text: this.$t("devices.text.wakeupDevice"),
        showCancelButton: true,
        confirmButtonText: this.$t("confirm"),
        cancelButtonText: this.$t("cancel"),
      })
      .then((result) => {
        if (result.isConfirmed)
          $dispatch($api.HomeControll.wakeupDevices, this.device.devid);
      });
    return;
  }

  switch (type) {
    case DEVICE_TYPE.VIRTUAL:
    case DEVICE_TYPE.SWITCH:
      if (this.device.cameraPreview)
        return $commit("ContentManager/UPDATE_MODAL_STATUS", {
          modal: "modalControllSwitchWithCamera",
          data: this.device.devid,
        });
      execution = {
        command: DEVICE_TRAIT.OnOff,
        params: {
          on: !(
            this.status &&
            this.status.states &&
            this.status.states.OnOff &&
            this.status.states.OnOff.on
          ),
        },
      };
      break;
    case DEVICE_TYPE.LMYALELOCK:
      execution = {
        command: DEVICE_TRAIT.LockUnlock,
        params: {
          act:
            this.status &&
            this.status.states &&
            this.status.states.LockUnlock &&
            this.status.states.LockUnlock.act === "unlocked"
              ? "locked"
              : "unlocked",
        },
      };
      break;
    case DEVICE_TYPE.DOORLOCK:
      execution = {
        command: DEVICE_TRAIT.LockUnlock,
        params: {
          act: !(
            this.status &&
            this.status.states &&
            this.status.states.LockUnlock &&
            this.status.states.LockUnlock.lock
          ),
        },
      };
      break;
    case DEVICE_TYPE.CAMERA:
      console.log(123, this.device);
      let camera = $getters["HomeConfig/getCameraByDevid"](this.device.devid);
      return $commit("ContentManager/UPDATE_MODAL_STATUS", {
        modal: "modalFixedCamera",
        data: camera.camid,
      });
    case DEVICE_TYPE.LIGHT:
      return $commit("ContentManager/UPDATE_MODAL_STATUS", {
        modal: "modalControllDimmer",
        data: this.device.devid,
      });
    case DEVICE_TYPE.CURTAIN:
      return $commit("ContentManager/UPDATE_MODAL_STATUS", {
        modal: "modalControllCurtain",
        data: this.device.devid,
      });
    case DEVICE_TYPE.FAN:
      return $commit("ContentManager/UPDATE_MODAL_STATUS", {
        modal: "modalControllFan",
        data: this.device.devid,
      });
    case DEVICE_TYPE.DAIKIN:
      return $commit("ContentManager/UPDATE_MODAL_STATUS", {
        modal: "modalControllDaikin",
        data: this.device.devid,
      });
    case DEVICE_TYPE.SPEAKER:
      $dispatch($api.ContentManager.setCurrentSpeaker, this.device.devid);
      if ($router.currentRoute.name === "home-roomFloor")
        $router.push({
          name: "home-controll",
          query: { isShowSpeakerControll: true },
        });
      return;
    case DEVICE_TYPE.IR:
      switch (this.device.irtype) {
        case IR_TYPE.REMOTE_AIR:
          return $commit("ContentManager/UPDATE_MODAL_STATUS", {
            modal: "modalControllRemoteAirV1",
            data: this.device.remoteid,
          });
        case IR_TYPE.REMOTE_FAN:
          return $commit("ContentManager/UPDATE_MODAL_STATUS", {
            modal: "modalControllRemoteFanV1",
            data: this.device.remoteid,
          });
        case IR_TYPE.REMOTE_TV:
          return $commit("ContentManager/UPDATE_MODAL_STATUS", {
            modal: "modalControllRemoteTvV1",
            data: this.device.remoteid,
          });
      }
      return;
    case DEVICE_TYPE.IRV2:
      switch (this.device.irtype) {
        case IRV2_ALL_TYPE.IR_AC:
          return $commit("ContentManager/UPDATE_MODAL_STATUS", {
            modal: "modalControllRemoteAirV2",
            data: this.device.remoteid,
          });
        case IRV2_ALL_TYPE.IR_FAN:
          return $commit("ContentManager/UPDATE_MODAL_STATUS", {
            modal: "modalControllRemoteFanV2",
            data: this.device.remoteid,
          });
        case IRV2_ALL_TYPE.IR_TV:
          return $commit("ContentManager/UPDATE_MODAL_STATUS", {
            modal: "modalControllRemoteTvV2",
            data: this.device.remoteid,
          });
        case IRV2_ALL_TYPE.IR_STB:
          return $commit("ContentManager/UPDATE_MODAL_STATUS", {
            modal: "modalControllRemoteStbV2",
            data: this.device.remoteid,
          });
      }
      return;
  }
  if (execution)
    $dispatch($api.HomeControll.controllDevice, {
      devid: this.device.devid,
      execution,
    });
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
