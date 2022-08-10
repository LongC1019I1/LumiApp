<template>
  <modal
    v-if="isShowModal"
    :show="true"
    :showClose="false"
    :animationDuration="0"
    :backdropClick="false"
    @close="closeModal"
    modalClasses="modal-controll modal-full-height modal-switch-camera"
    headerClasses="text-center"
  >
    <div slot="header" class="w-100 text-center">
      <span>{{ device.name || "Thiết bị" }}</span>
      <i
        class="pull-right c-p mdi mdi-window-close pull-right"
        @click="closeModal"
      ></i>
    </div>
    <camera-box :camera="camera" :noControll="true"></camera-box>
    <div class="device-item col" :class="{ active: isActive }">
      <div class="fake-box c-p wave" @click="controllDevice">
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
    </div>
  </modal>
</template>
<script>
import {
  getStatusDeviceFromVal,
  getDefaultIconDevice,
  getActiveDeviceFromVal,
} from "@/plugins/helper";

import { DEVICE_TYPE, DEVICE_TRAIT } from "@/plugins/variableConst";

import CameraBox from "@/components/page/home/Secure/CameraTab/Element/CameraBox";
export default {
  name: "controll-curtain",
  data() {
    return {
      status_text: "",
      icon: "",
      isActive: false,
      spin: "",
    };
  },
  computed: {
    isShowModal,
    device,
    status,
    camera,
  },
  methods: {
    closeModal,
    controllDevice,
  },
  components: {
    CameraBox,
  },
};

function isShowModal() {
  return $state.ContentManager.modal.modalControllSwitchWithCamera;
}

function device() {
  return $getters["HomeConfig/getDevice"](this.isShowModal);
}

function status() {
  let status = $getters["HomeControll/getDeviceStatusByDeviceID"](
    this.isShowModal
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

function camera() {
  return $getters["HomeConfig/getCameraByID"](this.device.cameraPreview);
}

function controllDevice() {
  let { type, traits } = this.device;
  let execution = false;
  switch (type) {
    case DEVICE_TYPE.VIRTUAL:
    case DEVICE_TYPE.SWITCH:
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
  }
  if (execution)
    $dispatch($api.HomeControll.controllDevice, {
      devid: this.device.devid,
      execution,
    });
}

function closeModal() {
  $commit("ContentManager/UPDATE_MODAL_STATUS", {
    modal: "modalControllSwitchWithCamera",
    data: false,
  });
}
</script>
<style lang="scss">
.modal-controll {
  .modal-body {
    .device-item {
      padding: 100px 150px 0px 150px;
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
  }
}
</style>
