<template>
  <div v-if="modalControllRemoteTvV1">
    <modal
      :show="true"
      :showClose="false"
      :animationDuration="0"
      @close="closeModal"
      :backdropClick="false"
      modalClasses="modal-controll controll-remote-modal controll-remote-tv-v1-modal modal-full-height"
      headerClasses="text-center"
      :remote="remote"
    >
      <div slot="header" class="w-100 text-center">
        <span>{{remote.name}}</span>
        <i class="pull-right c-p mdi mdi-window-close pull-right" @click="closeModal"></i>
      </div>
      <div class="controll-form controll-remote-tv-v1 mx-5">
        <!-- row1 -->
        <div>
          <div
            class="power-button"
            :class="{'has-command':btn_list.tv_power}"
            @click="clickBtn(btn_list.tv_power, IR_ID_TV.tv_power)"
            @contextmenu.prevent="btn_list.tv_power?$refs.remoteTvV1ButtonContext.open($event, btn_list.tv_power):''"
          >
            <i class="icon-icon-ir-fan-power"></i>
          </div>
          <div
            :class="{'has-command':btn_list.tv_smart_hub}"
            @click="clickBtn(btn_list.tv_smart_hub, IR_ID_TV.tv_smart_hub)"
            @contextmenu.prevent="btn_list.tv_smart_hub?$refs.remoteTvV1ButtonContext.open($event, btn_list.tv_smart_hub):''"
          >
            <i class="icon-icon-ir-tv-smart-hub"></i>
          </div>
          <div
            :class="{'has-command':btn_list.tv_input}"
            @click="clickBtn(btn_list.tv_input, IR_ID_TV.tv_input)"
            @contextmenu.prevent="btn_list.tv_input?$refs.remoteTvV1ButtonContext.open($event, btn_list.tv_input):''"
          >
            <i class="icon-icon-ir-tv-input"></i>
          </div>
        </div>
        <!-- row2 -->
        <div>
          <!-- left -->
          <div class="vol-controll">
            <div
              :class="{'has-command':btn_list.tv_vol_up}"
              @click="clickBtn(btn_list.tv_vol_up, IR_ID_TV.tv_vol_up)"
              @contextmenu.prevent="btn_list.tv_vol_up?$refs.remoteTvV1ButtonContext.open($event, btn_list.tv_vol_up):''"
            >
              <i class="icon-icon-ir-tv-volume-up"></i>
            </div>
            <span class="text">VOL</span>
            <div
              :class="{'has-command':btn_list.tv_vol_dow}"
              @click="clickBtn(btn_list.tv_vol_dow, IR_ID_TV.tv_vol_dow)"
              @contextmenu.prevent="btn_list.tv_vol_dow?$refs.remoteTvV1ButtonContext.open($event, btn_list.tv_vol_dow):''"
            >
              <i class="icon-icon-ir-tv-volume-down"></i>
            </div>
          </div>
          <!-- center -->
          <div class="center-controll">
            <div
              class="button top"
              :class="{'has-command':btn_list.tv_menu_up}"
              @click="clickBtn(btn_list.tv_menu_up, IR_ID_TV.tv_menu_up)"
              @contextmenu.prevent="btn_list.tv_menu_up?$refs.remoteTvV1ButtonContext.open($event, btn_list.tv_menu_up):''"
            >
              <i class="icon-icon-ir-tv-arrow-up"></i>
            </div>
            <div
              class="button right"
              :class="{'has-command':btn_list.tv_menu_right}"
              @click="clickBtn(btn_list.tv_menu_right, IR_ID_TV.tv_menu_right)"
              @contextmenu.prevent="btn_list.tv_menu_right?$refs.remoteTvV1ButtonContext.open($event, btn_list.tv_menu_right):''"
            >
              <i class="icon-icon-ir-tv-arrow-right"></i>
            </div>
            <div
              class="button left"
              :class="{'has-command':btn_list.tv_menu_left}"
              @click="clickBtn(btn_list.tv_menu_left, IR_ID_TV.tv_menu_left)"
              @contextmenu.prevent="btn_list.tv_menu_left?$refs.remoteTvV1ButtonContext.open($event, btn_list.tv_menu_left):''"
            >
              <i class="icon-icon-ir-arrow-left-01"></i>
            </div>
            <div
              class="button bottom"
              :class="{'has-command':btn_list.tv_menu_down}"
              @click="clickBtn(btn_list.tv_menu_down, IR_ID_TV.tv_menu_down)"
              @contextmenu.prevent="btn_list.tv_menu_down?$refs.remoteTvV1ButtonContext.open($event, btn_list.tv_menu_down):''"
            >
              <i class="icon-icon-ir-tv-arrow-down"></i>
            </div>
            <div class="center-blur"></div>
            <div
              class="center-button"
              :class="{'has-command':btn_list.tv_menu_ok}"
              @click="clickBtn(btn_list.tv_menu_ok, IR_ID_TV.tv_menu_ok)"
              @contextmenu.prevent="btn_list.tv_menu_ok?$refs.remoteTvV1ButtonContext.open($event, btn_list.tv_menu_ok):''"
            >
              <i class="icon-icon-ir-tv-ok"></i>
            </div>
          </div>
          <!-- right -->
          <div class="ch-controll">
            <div
              :class="{'has-command':btn_list.tv_channel_up}"
              @click="clickBtn(btn_list.tv_channel_up, IR_ID_TV.tv_channel_up)"
              @contextmenu.prevent="btn_list.tv_channel_up?$refs.remoteTvV1ButtonContext.open($event, btn_list.tv_channel_up):''"
            >
              <i class="icon-icon-ir-tv-channel-up"></i>
            </div>
            <span class="text">CH</span>
            <div
              :class="{'has-command':btn_list.tv_channel_dow}"
              @click="clickBtn(btn_list.tv_channel_dow, IR_ID_TV.tv_channel_dow)"
              @contextmenu.prevent="btn_list.tv_channel_dow?$refs.remoteTvV1ButtonContext.open($event, btn_list.tv_channel_dow):''"
            >
              <i class="icon-icon-ir-tv-channel-down"></i>
            </div>
          </div>
        </div>
        <!-- row 3+ -->
        <div>
          <div
            :class="{'has-command':btn_list.tv_menu}"
            @click="clickBtn(btn_list.tv_menu, IR_ID_TV.tv_menu)"
            @contextmenu.prevent="btn_list.tv_menu?$refs.remoteTvV1ButtonContext.open($event, btn_list.tv_menu):''"
          >
            <i class="icon-icon-ir-tv-menu-01"></i>
          </div>
          <div
            :class="{'has-command':btn_list.tv_mute}"
            @click="clickBtn(btn_list.tv_mute, IR_ID_TV.tv_mute)"
            @contextmenu.prevent="btn_list.tv_mute?$refs.remoteTvV1ButtonContext.open($event, btn_list.tv_mute):''"
          >
            <i class="icon-icon-ir-tv-volume-off"></i>
          </div>
          <div
            :class="{'has-command':btn_list.tv_enter}"
            @click="clickBtn(btn_list.tv_enter, IR_ID_TV.tv_enter)"
            @contextmenu.prevent="btn_list.tv_enter?$refs.remoteTvV1ButtonContext.open($event, btn_list.tv_enter):''"
          >
            <i class="icon-icon-ir-tv-return"></i>
          </div>
        </div>
        <div class="number-menu">
          <div
            :class="{'has-command':btn_list.tv_ch1}"
            @click="clickBtn(btn_list.tv_ch1, IR_ID_TV.tv_ch1)"
            @contextmenu.prevent="btn_list.tv_ch1?$refs.remoteTvV1ButtonContext.open($event, btn_list.tv_ch1):''"
          >
            <i class="icon-icon-ir-tv-1"></i>
          </div>
          <div
            :class="{'has-command':btn_list.tv_ch2}"
            @click="clickBtn(btn_list.tv_ch2, IR_ID_TV.tv_ch2)"
            @contextmenu.prevent="btn_list.tv_ch2?$refs.remoteTvV1ButtonContext.open($event, btn_list.tv_ch2):''"
          >
            <i class="icon-icon-ir-tv-2"></i>
          </div>
          <div
            :class="{'has-command':btn_list.tv_ch3}"
            @click="clickBtn(btn_list.tv_ch3, IR_ID_TV.tv_ch3)"
            @contextmenu.prevent="btn_list.tv_ch3?$refs.remoteTvV1ButtonContext.open($event, btn_list.tv_ch3):''"
          >
            <i class="icon-icon-ir-tv-3"></i>
          </div>
        </div>
        <div class="number-menu">
          <div
            :class="{'has-command':btn_list.tv_ch4}"
            @click="clickBtn(btn_list.tv_ch4, IR_ID_TV.tv_ch4)"
            @contextmenu.prevent="btn_list.tv_ch4?$refs.remoteTvV1ButtonContext.open($event, btn_list.tv_ch4):''"
          >
            <i class="icon-icon-ir-tv-4"></i>
          </div>
          <div
            :class="{'has-command':btn_list.tv_ch5}"
            @click="clickBtn(btn_list.tv_ch5, IR_ID_TV.tv_ch5)"
            @contextmenu.prevent="btn_list.tv_ch5?$refs.remoteTvV1ButtonContext.open($event, btn_list.tv_ch5):''"
          >
            <i class="icon-icon-ir-tv-5"></i>
          </div>
          <div
            :class="{'has-command':btn_list.tv_ch6}"
            @click="clickBtn(btn_list.tv_ch6, IR_ID_TV.tv_ch6)"
            @contextmenu.prevent="btn_list.tv_ch6?$refs.remoteTvV1ButtonContext.open($event, btn_list.tv_ch6):''"
          >
            <i class="icon-icon-ir-tv-6"></i>
          </div>
        </div>
        <div class="number-menu">
          <div
            :class="{'has-command':btn_list.tv_ch7}"
            @click="clickBtn(btn_list.tv_ch7, IR_ID_TV.tv_ch7)"
            @contextmenu.prevent="btn_list.tv_ch7?$refs.remoteTvV1ButtonContext.open($event, btn_list.tv_ch7):''"
          >
            <i class="icon-icon-ir-tv-7"></i>
          </div>
          <div
            :class="{'has-command':btn_list.tv_ch8}"
            @click="clickBtn(btn_list.tv_ch8, IR_ID_TV.tv_ch8)"
            @contextmenu.prevent="btn_list.tv_ch8?$refs.remoteTvV1ButtonContext.open($event, btn_list.tv_ch8):''"
          >
            <i class="icon-icon-ir-tv-8"></i>
          </div>
          <div
            :class="{'has-command':btn_list.tv_ch9}"
            @click="clickBtn(btn_list.tv_ch9, IR_ID_TV.tv_ch9)"
            @contextmenu.prevent="btn_list.tv_ch9?$refs.remoteTvV1ButtonContext.open($event, btn_list.tv_ch9):''"
          >
            <i class="icon-icon-ir-tv-9"></i>
          </div>
        </div>
        <div class="number-menu">
          <div
            :class="{'has-command':btn_list.tv_list}"
            @click="clickBtn(btn_list.tv_list, IR_ID_TV.tv_list)"
            @contextmenu.prevent="btn_list.tv_list?$refs.remoteTvV1ButtonContext.open($event, btn_list.tv_list):''"
          >
            <span>LIST</span>
          </div>
          <div
            :class="{'has-command':btn_list.tv_ch0}"
            @click="clickBtn(btn_list.tv_ch0, IR_ID_TV.tv_ch0)"
            @contextmenu.prevent="btn_list.tv_ch0?$refs.remoteTvV1ButtonContext.open($event, btn_list.tv_ch0):''"
          >
            <i class="icon-icon-ir-tv-0"></i>
          </div>
          <div
            :class="{'has-command':btn_list.tv_edit}"
            @click="clickBtn(btn_list.tv_edit, IR_ID_TV.tv_edit)"
            @contextmenu.prevent="btn_list.tv_edit?$refs.remoteTvV1ButtonContext.open($event, btn_list.tv_edit):''"
          >
            <span>EXIT</span>
          </div>
        </div>
      </div>
    </modal>
    <vue-context ref="remoteTvV1ButtonContext" v-slot="{ data }" class="device-context-menu">
      <li>
        <a href="#" @click.prevent="learnCommand(data.buttonId)">
          <i class="mdi mdi-plus-circle"></i>
          <span>{{$t('devices.learnCommand')}}</span>
        </a>
      </li>
      <li>
        <a href="#" @click.prevent="removeCommand(data)">
          <i class="mdi mdi-trash-can"></i>
          <span>{{$t('devices.removeCommand')}}</span>
        </a>
      </li>
    </vue-context>
    <modal
      v-if="isIRLearning&&status&&status.states&&status.states.IrStatus&&status.states.IrStatus.irStatus=='learning'"
      :show="true"
      :backdropClick="false"
      :showClose="false"
      modalClasses="modal-confirm modal-learning-command"
      footerClasses="p-0"
    >
      <h5 class="text-center">{{$t('devices.text.learningCommand')}}</h5>
      <div class="p-4 text-center">
        <div class="loading-dots">
          <div class="loading-dots--dot"></div>
          <div class="loading-dots--dot"></div>
          <div class="loading-dots--dot"></div>
          <div class="loading-dots--dot"></div>
        </div>
      </div>
      <template slot="footer">
        <!-- <base-button @click="addRoom">{{$t('confirm')}}</base-button> -->
        <base-button class="ml-auto" @click="stopLearningCommand">{{$t('cancel')}}</base-button>
      </template>
    </modal>
  </div>
</template>

<script>
import { IR_ID_TV, DEVICE_TRAIT, IR_PREFIX_KEY } from "@/plugins/variableConst";

export default {
  name: "controll-remote",
  data() {
    return {
      isActive: false,
      btn_list: {
        tv_power: false,
        tv_input: false,
        tv_vol_up: false,
        tv_vol_dow: false,
        tv_channel_up: false,
        tv_channel_dow: false,
        tv_menu_up: false,
        tv_menu_down: false,
        tv_menu_left: false,
        tv_menu_right: false,
        tv_menu_ok: false,
        tv_ch1: false,
        tv_ch2: false,
        tv_ch3: false,
        tv_ch4: false,
        tv_ch5: false,
        tv_ch6: false,
        tv_ch7: false,
        tv_ch8: false,
        tv_ch9: false,
        tv_ch0: false,
        tv_menu: false,
        tv_edit: false,
        tv_list: false,
        tv_info: false,
        tv_mute: false,
        tv_smart_hub: false,
        tv_enter: false
      },
      IR_ID_TV,
      isIRLearning: false,
      learnningButtonId: false
    };
  },
  computed: {
    remote,
    modalControllRemoteTvV1,
    status
  },
  watch: {
    status: {
      handler(status) {
        if (!this.isIRLearning) return;
        if (
          status &&
          status.states.IrConfig &&
          status.states.IrConfig.buttonId == this.isIRLearning
        ) {
          let listCommand = [...(this.remote.irCommands || [])];
          let oldCommandIndex = listCommand.findIndex(
            item => item.buttonId == this.learnningButtonId
          );
          if (oldCommandIndex != -1) listCommand.splice(oldCommandIndex, 1);
          listCommand.push({
            buttonId: this.learnningButtonId,
            commandId: status.states.IrConfig.irId
          });
          $dispatch($api.HomeConfig.updateRemote, {
            remoteid: this.remote.remoteid,
            updateData: {
              irCommands: listCommand
            }
          });
          this.isIRLearning = false;
        }
      },
      deep: true
    }
  },
  methods: {
    clickBtn,
    closeModal,
    learnCommand,
    removeCommand,
    stopLearningCommand
  }
};
function remote() {
  let remote = $getters["HomeConfig/getRemote"](this.modalControllRemoteTvV1);
  for (const property in this.btn_list) {
    this.btn_list[property] = false;
  }
  if (remote) {
    remote.irCommands &&
      remote.irCommands.forEach(item => {
        this.btn_list[item.buttonId] = item;
      });
  }
  return remote;
}

function modalControllRemoteTvV1() {
  return $state.ContentManager.modal.modalControllRemoteTvV1;
}

function status() {
  return (status = $getters["HomeControll/getDeviceStatusByDeviceID"](
    this.remote && this.remote.devid
  ));
}

function clickBtn(command, buttonId) {
  if (command) {
    let execution = {
      command: DEVICE_TRAIT.IrActive,
      params: {
        irActive: command.commandId
      }
    };
    //send-request
    $dispatch($api.HomeControll.controllDevice, {
      devid: this.remote.devid,
      execution
    });
  } else learnCommand.call(this, buttonId);
}

async function learnCommand(buttonId) {
  let confirmLearnCommand = await $alertify.confirm({
    title: this.$t("notify.notifyDefautlTitle"),
    text: this.$t("devices.text.confirmLearnCommand"),
    showCancelButton: true,
    confirmButtonText: this.$t("confirm"),
    cancelButtonText: this.$t("cancel")
  });
  if (confirmLearnCommand.value) {
    let execution = {
      command: DEVICE_TRAIT.IrConfig,
      params: {
        irConfig: "learn",
        buttonId: `${this.remote.remoteid}${IR_PREFIX_KEY}${buttonId}`
      }
    };
    $dispatch($api.HomeControll.controllDevice, {
      devid: this.remote.devid,
      execution
    });
    this.isIRLearning = `${this.remote.remoteid}${IR_PREFIX_KEY}${buttonId}`;
    this.learnningButtonId = buttonId;
  }
}

function removeCommand(command) {
  let listCommand = [...(this.remote.irCommands || [])];
  listCommand.splice(
    this.remote.irCommands.findIndex(
      item => item.buttonId === command.buttonId
    ),
    1
  );
  $dispatch($api.HomeConfig.updateRemote, {
    remoteid: this.remote.remoteid,
    updateData: {
      irCommands: listCommand
    }
  });
}

function stopLearningCommand(command, buttonId) {
  let execution = {
    command: DEVICE_TRAIT.IrConfig,
    params: {
      irConfig: "stop",
      buttonId: `${this.remote.remoteid}${IR_PREFIX_KEY}${this.isIRLearning}`
    }
  };
  $dispatch($api.HomeControll.controllDevice, {
    devid: this.remote.devid,
    execution
  });
  this.isIRLearning = false;
}

function closeModal() {
  $commit("ContentManager/UPDATE_MODAL_STATUS", {
    modal: "modalControllRemoteTvV1",
    data: false
  });
}
</script>
<style lang="scss">
.controll-remote-modal.controll-remote-tv-v1-modal {
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
.v-context.device-context-menu {
  padding: 0px;
  a {
    i {
      margin-right: 0.5rem;
    }
  }
}
</style>
