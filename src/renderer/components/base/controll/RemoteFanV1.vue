<template>
  <div v-if="modalControllRemoteFanV1">
    <modal
      :show="true"
      :showClose="false"
      :animationDuration="0"
      @close="closeModal"
      :backdropClick="false"
      modalClasses="modal-controll controll-remote-modal controll-remote-fan-v1-modal modal-full-height"
      headerClasses="text-center"
      :remote="remote"
    >
      <div slot="header" class="w-100 text-center">
        <span>{{remote.name}}</span>
        <i class="pull-right c-p mdi mdi-window-close pull-right" @click="closeModal"></i>
      </div>
      <div class="controll-form controll-remote-fan-v1 info-box m-3">
        <div>
          <div>
            <div
              class="power-button"
              :class="{'has-command':btn_list.fan_onOff}"
              @click="clickBtn(btn_list.fan_onOff, IR_ID_FAN.fan_onOff)"
              @contextmenu.prevent="btn_list.fan_onOff?$refs.remoteFanV1ButtonContext.open($event, btn_list.fan_onOff):''"
            >
              <i class="icon-icon-ir-fan-power"></i>
            </div>
            <span>Power</span>
          </div>
        </div>
        <div>
          <div>
            <div
              :class="{'has-command':btn_list.fan_speed}"
              @click="clickBtn(btn_list.fan_speed, IR_ID_FAN.fan_speed)"
              @contextmenu.prevent="btn_list.fan_speed?$refs.remoteFanV1ButtonContext.open($event, btn_list.fan_speed):''"
            >
              <i class="mdi mdi-signal-cellular-3"></i>
            </div>
            <span>Speed</span>
          </div>
          <div>
            <div
              :class="{'has-command':btn_list.fan_timer}"
              @click="clickBtn(btn_list.fan_timer, IR_ID_FAN.fan_timer)"
              @contextmenu.prevent="btn_list.fan_timer?$refs.remoteFanV1ButtonContext.open($event, btn_list.fan_timer):''"
            >
              <i class="icon-icon-ir-fan-timer"></i>
            </div>
            <span>Timer</span>
          </div>
        </div>
        <div>
          <div>
            <div
              :class="{'has-command':btn_list.fan_auto}"
              @click="clickBtn(btn_list.fan_auto, IR_ID_FAN.fan_auto)"
              @contextmenu.prevent="btn_list.fan_auto?$refs.remoteFanV1ButtonContext.open($event, btn_list.fan_auto):''"
            >
              <i class="icon-icon-ir-fan-auto"></i>
            </div>
            <span>Auto</span>
          </div>
          <div>
            <div
              :class="{'has-command':btn_list.fan_swing}"
              @click="clickBtn(btn_list.fan_swing, IR_ID_FAN.fan_swing)"
              @contextmenu.prevent="btn_list.fan_swing?$refs.remoteFanV1ButtonContext.open($event, btn_list.fan_swing):''"
            >
              <i class="icon-icon-ir-fan-swing"></i>
            </div>
            <span>Swing</span>
          </div>
        </div>
      </div>
    </modal>
    <vue-context ref="remoteFanV1ButtonContext" v-slot="{ data }" class="device-context-menu">
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
import {
  IR_ID_FAN,
  DEVICE_TRAIT,
  IR_PREFIX_KEY
} from "@/plugins/variableConst";

export default {
  name: "controll-remote",
  data() {
    return {
      isActive: false,
      btn_list: {
        fan_onOff: false,
        fan_timer: false,
        fan_swing: false,
        fan_auto: false,
        fan_speed: false
      },
      IR_ID_FAN,
      isIRLearning: false,
      learnningButtonId: false
    };
  },
  computed: {
    remote,
    modalControllRemoteFanV1,
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
  let remote = $getters["HomeConfig/getRemote"](this.modalControllRemoteFanV1);
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

function modalControllRemoteFanV1() {
  return $state.ContentManager.modal.modalControllRemoteFanV1;
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
    modal: "modalControllRemoteFanV1",
    data: false
  });
}
</script>
<style lang="scss">
.controll-remote-modal.controll-remote-fan-v1-modal {
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

.v-context.device-context-menu {
  padding: 0px;
  a {
    i {
      margin-right: 0.5rem;
    }
  }
}
</style>
