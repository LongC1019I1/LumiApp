<template>
  <modal
    v-if="modalControllCurtain"
    :show="true"
    :showClose="false"
    :animationDuration="0"
    :backdropClick="false"
    @close="closeModal"
    modalClasses="modal-controll modal-full-height"
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
    <div class="device-icon" :class="{ 'my-2': camera }">
      <i
        :class="'icon-' + getDefaultIconDevice(device, status && status.states)"
      ></i>
    </div>
    <div class="controll-form">
      <div class="text-center">
        <span>{{ $t(status_text) }}</span>
      </div>
      <div class="controll-curtain-menu m-5" :class="{ 'my-1': camera }">
        <div @click="openCurtain" class="c-p">
          <i class="fa fa-caret-left"></i>
          <i class="fa fa-caret-right"></i>
        </div>
        <div @click="pause" class="c-p">
          <i class="mdi mdi-pause"></i>
        </div>
        <div @click="closeCurtain" class="c-p">
          <i class="fa fa-caret-right"></i>
          <i class="fa fa-caret-left"></i>
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
import { getDefaultIconDevice, getStatusDeviceFromVal } from "@/plugins/helper";

import { DEVICE_TRAIT } from "@/plugins/variableConst";

import CameraBox from "@/components/page/home/Secure/CameraTab/Element/CameraBox";
export default {
  name: "controll-curtain",
  data() {
    return {
      status_text: "",
    };
  },
  computed: {
    modalControllCurtain,
    device,
    status,
    camera,
  },
  methods: {
    closeModal,
    getDefaultIconDevice,
    openCurtain,
    pause,
    closeCurtain,
  },
  components: {
    CameraBox,
  }
};

function modalControllCurtain() {
  return $state.ContentManager.modal.modalControllCurtain;
}

function device() {
  return $getters["HomeConfig/getDevice"](this.modalControllCurtain);
}

function status() {
  let status = $getters["HomeControll/getDeviceStatusByDeviceID"](
    this.modalControllCurtain
  );
  this.status_text = getStatusDeviceFromVal(
    this.device,
    status && status.states
  );
  return status;
}

function camera() {
  return $getters["HomeConfig/getCameraByID"](this.device.cameraPreview);
}

function openCurtain() {
  let execution = {
    command: DEVICE_TRAIT.OpenClose,
    params: {
      open: true,
    },
  };
  $dispatch($api.HomeControll.controllDevice, {
    devid: this.device.devid,
    execution,
  });
}

function pause() {
  let execution = {
    command: DEVICE_TRAIT.StartStop,
    params: {
      start: false,
    },
  };
  $dispatch($api.HomeControll.controllDevice, {
    devid: this.device.devid,
    execution,
  });
}

function closeCurtain() {
  let execution = {
    command: DEVICE_TRAIT.OpenClose,
    params: {
      open: false,
    },
  };
  $dispatch($api.HomeControll.controllDevice, {
    devid: this.device.devid,
    execution,
  });
}

function closeModal() {
  $commit("ContentManager/UPDATE_MODAL_STATUS", {
    modal: "modalControllCurtain",
    data: false,
  });
}
</script>
<style lang="scss">
.modal-controll {
  .modal-body {
    .device-icon {
      margin: 5rem;
      text-align: center;
      i {
        font-size: 15rem;
      }
    }
    .controll-form {
      .controll-curtain-menu {
        display: flex;
        justify-content: space-around;
        div {
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 2rem;
          line-height: 4rem;
          i {
            font-size: larger;
            margin: 0.3rem;
          }
        }
      }
    }
  }
}
</style>
