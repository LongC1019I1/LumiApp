<template>
  <modal
    v-if="modalControllFan"
    :show="true"
    :showClose="false"
    :animationDuration="0"
    @close="closeModal"
    :backdropClick="false"
    modalClasses="modal-controll modal-full-height"
    headerClasses="text-center"
  >
    <div slot="header" class="w-100 text-center">
      <span>{{ device && device.name }}</span>
      <i
        class="pull-right c-p mdi mdi-window-close pull-right"
        @click="closeModal"
      ></i>
    </div>
    <div
      class="device-icon"
      :class="`spin-${status && status.states && status.states.Speed.speed}`"
    >
      <i :class="`icon-${getDefaultIconDevice(device, status.states)}`"></i>
    </div>
    <div class="controll-form">
      <div class="controll-fan-menu mt-5">
        <div
          v-for="speed in [0, 1, 2, 3, 4]"
          :key="speed"
          class="c-p"
          :class="{
            active:
              status && status.states && status.states.Speed.speed == speed,
          }"
          @click="controllFan(speed)"
        >
          {{ speed }}
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
import { DEVICE_TRAIT } from "../../../plugins/variableConst";
import { getDefaultIconDevice } from "@/plugins/helper";
export default {
  name: "controll-remote",
  computed: {
    modalControllFan,
    device,
    status,
  },
  methods: {
    getDefaultIconDevice,
    closeModal,
    controllFan,
  },
};
function modalControllFan() {
  return $state.ContentManager.modal.modalControllFan;
}
function device() {
  return $getters["HomeConfig/getDevice"](this.modalControllFan);
}
function status() {
  return $getters["HomeControll/getDeviceStatusByDeviceID"](
    this.modalControllFan
  );
}
function controllFan(speed) {
  let execution = {
    command: DEVICE_TRAIT.Speed,
    params: {
      speed,
    },
  };
  $dispatch($api.HomeControll.controllDevice, {
    devid: this.device.devid,
    execution,
  });
}
function closeModal() {
  $commit("ContentManager/UPDATE_MODAL_STATUS", {
    modal: "modalControllFan",
    data: false,
  });
}
</script>
<style lang="scss">
.modal-controll {
  .modal-body {
    .controll-form {
      .controll-fan-menu {
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
        }
      }
    }
  }
}
</style>
