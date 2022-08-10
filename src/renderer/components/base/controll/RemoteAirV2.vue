<template >
  <modal
    v-if="modalControllRemoteAirV2"
    :show="true"
    :showClose="false"
    :animationDuration="0"
    @close="closeModal"
    :backdropClick="false"
    modalClasses="modal-controll controll-remote-modal controll-remote-air-v2-modal modal-full-height"
    headerClasses="text-center"
    :remote="remote"
  >
    <div slot="header" class="w-100 text-center">
      <span>{{remote.name}}</span>
      <i class="pull-right c-p mdi mdi-window-close pull-right" @click="closeModal"></i>
    </div>
    <div class="info-box" :class="{active:currentValue.power}">
      <div class="temperature mt-3 mb-4">
        <span>{{currentValue.power?currentValue.temp+'°C':'--'}}</span>
      </div>
      <div class="mode pt-2">
        <div>
          <div>
            <i :class="'icon-'+MODE_IRV2_AC.find(item=>item.mode==currentValue.mode).icon"></i>
          </div>
          <div>
            <span>Mode:</span>
            <span>{{currentValue.power?MODE_IRV2_AC.find(item=>item.mode==currentValue.mode).name:'--'}}</span>
          </div>
        </div>
        <div>
          <div>
            <i class="icon-ic-zw-fan"></i>
          </div>
          <div>
            <span>Fan:</span>
            <span>{{currentValue.power?SPEED_IRV2_AC.find(item=>item.speed==currentValue.fan).name:'--'}}</span>
          </div>
        </div>
        <div>
          <div>
            <i class="icon-icon-ir-ac-swing"></i>
          </div>
          <div>
            <span>Swing:</span>
            <span>{{currentValue.power?SWING_IRV2_AC.find(item=>item.swing==currentValue.swing).name:'--'}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="controll-form my-3">
      <div class="controll-remote-air-v2">
        <div>
          <div>
            <div class="wave" @click="controllRemote({power: currentValue.power==0?1:0})">
              <i class="mdi mdi-power"></i>
            </div>
            <span>Power</span>
          </div>
          <div>
            <div
              @click="controllRemote({mode: currentValue.mode==0?2:currentValue.mode==2?3:currentValue.mode==3?4:currentValue.mode==4?6:0})"
              class="wave"
            >
              <i class="mdi mdi-snowflake"></i>
            </div>
            <span>Mode</span>
          </div>
        </div>
        <div>
          <div class="temp-controll">
            <div
              class="wave"
              @click="controllRemote({temp: currentValue.temp>=30||currentValue.temp<18?18:currentValue.temp+1})"
            >
              <i class="mdi mdi-plus"></i>
            </div>
            <div class="text">Temp</div>
            <div
              class="wave"
              @click="controllRemote({temp: currentValue.temp>30||currentValue.temp<=18?30:currentValue.temp-1})"
            >
              <i class="mdi mdi-minus"></i>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div
              class="wave"
              @click="controllRemote({fan: currentValue.fan==3?5:currentValue.fan==5?7:currentValue.fan==7?10:3})"
            >
              <i class="mdi mdi-signal-cellular-3"></i>
            </div>
            <span>Fan</span>
          </div>
          <div>
            <div class="wave" @click="controllRemote({swing: currentValue.swing==0?1:0})">
              <i class="icon-icon-ir-fan-swing"></i>
            </div>
            <span>Swing</span>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
import { getIrAcDataCommand } from "@/plugins/helper";
import {
  DEVICE_TRAIT,
  //
  MODE_IRV2_AC,
  SPEED_IRV2_AC,
  SWING_IRV2_AC
} from "@/plugins/variableConst";
export default {
  name: "controll-remote",
  data() {
    return {
      MODE_IRV2_AC,
      SPEED_IRV2_AC,
      SWING_IRV2_AC,
      currentValue: {
        power: 0,
        temp: 16,
        mode: MODE_IRV2_AC[0].mode,
        fan: SPEED_IRV2_AC[0].speed,
        swing: SWING_IRV2_AC[0].swing
      }
    };
  },
  computed: {
    remote,
    modalControllRemoteAirV2
  },
  methods: {
    closeModal,
    controllRemote
  }
};

function remote() {
  let remote = $getters["HomeConfig/getRemote"](this.modalControllRemoteAirV2);
  console.log(remote);
  if (remote && remote.stateAcIr) {
    this.currentValue = Object.assign(this.currentValue, remote.stateAcIr);
  }
  return remote;
}

function device() {
  return $getters["HomeConfig/getDevice"](this.modalControllRemoteAirV2);
}
function modalControllRemoteAirV2() {
  return $state.ContentManager.modal.modalControllRemoteAirV2;
}

function closeModal() {
  $commit("ContentManager/UPDATE_MODAL_STATUS", {
    modal: "modalControllRemoteAirV2",
    data: false
  });
}

function controllRemote(newData = {}) {
  let execution = {
    command: DEVICE_TRAIT.IrActiveV2,
    params: {
      irActiveV2: getIrAcDataCommand(this.remote.irData.cmd_rule, {
        ...this.currentValue,
        ...newData
      })
    }
  };
  $dispatch($api.HomeControll.controllDevice, {
    devid: this.remote.devid,
    execution
  }).then(result => {
    if (!result.success) return;
    $dispatch($api.HomeConfig.updateRemote, {
      remoteid: this.remote.remoteid,
      updateData: {
        stateAcIr: {
          ...this.currentValue,
          ...newData
        }
      },
      animation: false
    });
  });
}
</script>
<style scope lang="scss">
.controll-remote-modal.controll-remote-air-v2-modal {
  .info-box {
    border-radius: 1rem;
    padding: 1rem;
    .temperature {
      font-size: 3rem;
      text-align: center;
    }
    .mode {
      display: flex;
      justify-content: space-around;
      div {
        text-align: center;
        i {
          font-size: 1.5rem;
        }
      }
    }
  }
  .controll-form {
    .controll-remote-air-v2 {
      display: flex;
      justify-content: space-around;
      & > div {
        & > div {
          position: relative;
          height: 5rem;
          width: 5rem;
          border-radius: 2.5rem;
          font-size: 3rem;
          margin: 2rem 0;
          text-align: center;
          span {
            font-size: 1rem;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }
          &.temp-controll {
            height: 12rem;
          }
          & > div {
            cursor: pointer;
            &.text {
              font-size: 1rem;
              height: 2rem;
              line-height: 2rem;
            }
            height: 5rem;
            width: 5rem;
            border-radius: 2.5rem;
          }
        }
      }
    }
  }
}
</style>
