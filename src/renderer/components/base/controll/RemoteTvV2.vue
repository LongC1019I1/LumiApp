<template>
  <div v-if="modalControllRemoteTvV2">
    <modal
      :show="true"
      :showClose="false"
      :animationDuration="0"
      @close="closeModal"
      :backdropClick="false"
      modalClasses="modal-controll controll-remote-modal controll-remote-tv-v2-modal modal-full-height"
      headerClasses="text-center"
      :remote="remote"
    >
      <div slot="header" class="w-100 text-center">
        <span>{{remote.name}}</span>
        <i class="pull-right c-p mdi mdi-window-close pull-right" @click="closeModal"></i>
      </div>
      <div class="controll-form controll-remote-tv-v2 mx-5">
        <!-- row1 -->
        <div>
          <div class="power-button" @click="controllRemote(IRV2_ID_TV.power)">
            <i class="icon-icon-ir-fan-power"></i>
          </div>
          <div @click="controllRemote(IRV2_ID_TV.source)">
            <i class="icon-icon-ir-tv-input"></i>
          </div>
        </div>
        <!-- row2 -->
        <div>
          <!-- left -->
          <div class="vol-controll">
            <div @click="controllRemote(IRV2_ID_TV.volume_up)">
              <i class="icon-icon-ir-tv-volume-up"></i>
            </div>
            <span class="text">VOL</span>
            <div @click="controllRemote(IRV2_ID_TV.volume_down)">
              <i class="icon-icon-ir-tv-volume-down"></i>
            </div>
          </div>
          <!-- center -->
          <div class="center-controll">
            <div class="button top" @click="controllRemote(IRV2_ID_TV.up)">
              <i class="icon-icon-ir-tv-arrow-up"></i>
            </div>
            <div class="button right" @click="controllRemote(IRV2_ID_TV.right)">
              <i class="icon-icon-ir-tv-arrow-right"></i>
            </div>
            <div class="button left" @click="controllRemote(IRV2_ID_TV.left)">
              <i class="icon-icon-ir-arrow-left-01"></i>
            </div>
            <div class="button bottom" @click="controllRemote(IRV2_ID_TV.down)">
              <i class="icon-icon-ir-tv-arrow-down"></i>
            </div>
            <div class="center-blur"></div>
            <div class="center-button" @click="controllRemote(IRV2_ID_TV.enter)">
              <i class="icon-icon-ir-tv-ok"></i>
            </div>
          </div>
          <!-- right -->
          <div class="ch-controll">
            <div @click="controllRemote(IRV2_ID_TV.channel_up)">
              <i class="icon-icon-ir-tv-channel-up"></i>
            </div>
            <span class="text">CH</span>
            <div @click="controllRemote(IRV2_ID_TV.channel_down)">
              <i class="icon-icon-ir-tv-channel-down"></i>
            </div>
          </div>
        </div>
        <!-- row 3+ -->
        <div>
          <div @click="controllRemote(IRV2_ID_TV.menu)">
            <i class="icon-icon-ir-tv-menu-01"></i>
          </div>
          <div @click="controllRemote(IRV2_ID_TV.mute)">
            <i class="icon-icon-ir-tv-volume-off"></i>
          </div>
          <div @click="controllRemote(IRV2_ID_TV.return)">
            <i class="icon-icon-ir-tv-return"></i>
          </div>
        </div>
        <div class="number-menu">
          <div @click="controllRemote(IRV2_ID_TV.number_1)">
            <i class="icon-icon-ir-tv-1"></i>
          </div>
          <div @click="controllRemote(IRV2_ID_TV.number_2)">
            <i class="icon-icon-ir-tv-2"></i>
          </div>
          <div @click="controllRemote(IRV2_ID_TV.number_3)">
            <i class="icon-icon-ir-tv-3"></i>
          </div>
        </div>
        <div class="number-menu">
          <div @click="controllRemote(IRV2_ID_TV.number_4)">
            <i class="icon-icon-ir-tv-4"></i>
          </div>
          <div @click="controllRemote(IRV2_ID_TV.number_5)">
            <i class="icon-icon-ir-tv-5"></i>
          </div>
          <div @click="controllRemote(IRV2_ID_TV.number_6)">
            <i class="icon-icon-ir-tv-6"></i>
          </div>
        </div>
        <div class="number-menu">
          <div @click="controllRemote(IRV2_ID_TV.number_7)">
            <i class="icon-icon-ir-tv-7"></i>
          </div>
          <div @click="controllRemote(IRV2_ID_TV.number_8)">
            <i class="icon-icon-ir-tv-8"></i>
          </div>
          <div @click="controllRemote(IRV2_ID_TV.number_9)">
            <i class="icon-icon-ir-tv-9"></i>
          </div>
        </div>
        <div class="number-menu">
          <div @click="controllRemote(IRV2_ID_TV.chn_list)">
            <span>LIST</span>
          </div>
          <div @click="controllRemote(IRV2_ID_TV.number_0)">
            <i class="icon-icon-ir-tv-0"></i>
          </div>
          <div @click="controllRemote(IRV2_ID_TV.exit)">
            <span>EXIT</span>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { IRV2_ID_TV, DEVICE_TRAIT } from "@/plugins/variableConst";

import { getIrDataCommand } from "@/plugins/helper";

export default {
  name: "controll-remote-tv-v2",
  data() {
    return {
      currentValue: {
        power: "",
        temp: "",
        mode: "",
        tv: "",
        swing: ""
      },
      IRV2_ID_TV
    };
  },
  computed: {
    remote,
    modalControllRemoteTvV2
  },
  methods: {
    closeModal,
    controllRemote
  }
};

function remote() {
  let remote = $getters["HomeConfig/getRemote"](this.modalControllRemoteTvV2);
  return remote;
}

function modalControllRemoteTvV2() {
  return $state.ContentManager.modal.modalControllRemoteTvV2;
}

function closeModal() {
  $commit("ContentManager/UPDATE_MODAL_STATUS", {
    modal: "modalControllRemoteTvV2",
    data: false
  });
}

function controllRemote(code) {
  console.log("mycode", code);
  console.log("irData", this.remote);
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
<style lang="scss">
.controll-remote-modal.controll-remote-tv-v2-modal {
  .controll-form {
    border-radius: 1rem;
    padding: 1rem;
    & > div {
      display: flex;
      justify-content: space-between;
      span {
        font-size: 1rem;
        font-weight: bold;
      }
      &.number-menu {
        i {
          font-size: 2rem;
        }
      }
      & > div {
        position: relative;
        height: 2rem;
        width: 4rem;
        border-radius: 1rem;
        font-size: 1.5rem;
        margin: 1rem 0;
        text-align: center;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        &.vol-controll,
        &.ch-controll {
          flex-direction: column;
          justify-content: space-between;
          & > div {
            height: 4rem;
            width: 4rem;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          span {
            font-size: 1rem;
          }
          height: 10rem;
          border-radius: 2rem;
        }
        &.center-controll {
          display: block;
          width: 10rem;
          height: 10rem;
          border-radius: 50%;
          -webkit-transform: rotate(45deg);
          -moz-transform: rotate(45deg);
          transform: rotate(45deg);
          position: relative;
          .center-button {
            display: block;
            height: 38%;
            width: 38%;
            position: absolute;
            top: 31%;
            left: 31%;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            i {
              font-size: 2rem;
            }
          }
          .center-blur {
            display: block;
            height: 60%;
            width: 60%;
            position: absolute;
            top: 20%;
            left: 20%;
            border-radius: 50%;
            -webkit-transform: rotate(-45deg);
            -moz-transform: rotate(-45deg);
            transform: rotate(-45deg);
            cursor: default;
          }

          .button {
            display: block;
            width: 50%;
            height: 50%;
            position: relative;
            float: left;
            border-radius: 50px;
            i {
              font-size: 1.5rem;
            }
          }

          .button.top {
            border-radius: 100% 0 0 0;
          }

          .button.right {
            border-radius: 0 100% 0 0;
          }
          .button.left {
            border-radius: 0 0 0 100%;
          }

          .button.bottom {
            border-radius: 0 0 100% 0;
          }

          i {
            -webkit-transform: rotate(-45deg);
            -moz-transform: rotate(-45deg);
            transform: rotate(-45deg);
            position: absolute;
          }

          .top i {
            top: 30%;
            left: 30%;
          }

          .left i {
            top: 40%;
            left: 30%;
          }

          .right i {
            top: 30%;
            left: 40%;
          }

          .bottom i {
            top: 40%;
            left: 40%;
          }
        }
      }
    }
  }
}
</style>
