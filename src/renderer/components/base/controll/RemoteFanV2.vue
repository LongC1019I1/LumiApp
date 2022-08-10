<template>
  <div v-if="modalControllRemoteFanV2">
    <modal
      :show="true"
      :showClose="false"
      :animationDuration="0"
      @close="closeModal"
      :backdropClick="false"
      modalClasses="modal-controll controll-remote-modal controll-remote-fan-v2-modal modal-full-height"
      headerClasses="text-center"
      :remote="remote"
    >
      <div slot="header" class="w-100 text-center">
        <span>{{remote.name}}</span>
        <i class="pull-right c-p mdi mdi-window-close pull-right" @click="closeModal"></i>
      </div>
      <div class="controll-form controll-remote-fan-v2 info-box m-3">
        <div>
          <div class="power-button">
            <div @click="controllRemote(IRV2_ID_FAN.on_off)">
              <i class="icon-icon-ir-fan-power"></i>
            </div>
            <span>Power</span>
          </div>
        </div>
        <div>
          <div>
            <div @click="controllRemote(IRV2_ID_FAN.speed)">
              <i class="mdi mdi-signal-cellular-3"></i>
            </div>
            <span>Speed</span>
          </div>
          <div>
            <div @click="controllRemote(IRV2_ID_FAN.timer)">
              <i class="icon-icon-ir-fan-timer"></i>
            </div>
            <span>Timer</span>
          </div>
        </div>
        <div>
          <div>
            <div @click="controllRemote(IRV2_ID_FAN.auto)">
              <i class="icon-icon-ir-fan-auto"></i>
            </div>
            <span>Auto</span>
          </div>
          <div>
            <div @click="controllRemote(IRV2_ID_FAN.swing)">
              <i class="icon-icon-ir-fan-swing"></i>
            </div>
            <span>Swing</span>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { DEVICE_TRAIT, IRV2_ID_FAN } from "@/plugins/variableConst";

import { getIrDataCommand } from "@/plugins/helper";

export default {
  name: "controll-remote-fan-v2",
  data() {
    return {
      currentValue: {
        power: "",
        temp: "",
        mode: "",
        fan: "",
        swing: ""
      },
      IRV2_ID_FAN
    };
  },
  computed: {
    remote,
    modalControllRemoteFanV2
  },
  methods: {
    closeModal,
    controllRemote
  }
};

function remote() {
  let remote = $getters["HomeConfig/getRemote"](this.modalControllRemoteFanV2);
  return remote;
}

function modalControllRemoteFanV2() {
  return $state.ContentManager.modal.modalControllRemoteFanV2;
}

function closeModal() {
  $commit("ContentManager/UPDATE_MODAL_STATUS", {
    modal: "modalControllRemoteFanV2",
    data: false
  });
}

function controllRemote(code) {
  let execution = {
    command: DEVICE_TRAIT.IrActiveV2,
    params: {
      irActiveV2: getIrDataCommand(
        this.remote.irtype,
        this.remote.irData,
        this.remote.irData.ir_code[code]
      )
    }
  };
  $dispatch($api.HomeControll.controllDevice, {
    devid: this.remote.devid,
    execution
  });
}
</script>
<style scope lang="scss">
.controll-remote-modal.controll-remote-fan-v2-modal {
  .modal-body {
    display: flex;
    align-items: center;
    .controll-form {
      width: 100%;
    }
  }
  .controll-form {
    border-radius: 1rem;
    padding: 1rem;
    & > div {
      display: flex;
      justify-content: space-around;
      & > div {
        position: relative;
        height: 5rem;
        width: 5rem;
        border-radius: 2.5rem;
        font-size: 3rem;
        margin: 2rem 0;
        text-align: center;
        & > div {
          cursor: pointer;
          border-radius: 2.5rem;
          min-height: 5rem;
          min-width: 5rem;
        }
        span {
          font-size: 1rem;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }
        &.temp-controll {
          height: 12rem;
        }
      }
    }
  }
}
</style>
