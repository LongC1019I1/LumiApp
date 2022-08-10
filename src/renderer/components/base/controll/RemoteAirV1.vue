<template>
  <div v-if="modalControllRemoteAirV1">
    <modal
      :show="true"
      :showClose="false"
      :animationDuration="0"
      @close="closeModal"
      :backdropClick="false"
      modalClasses="modal-controll controll-remote-modal controll-remote-air-v1-modal modal-full-height"
      headerClasses="text-center"
      :remote="remote"
    >
      <div slot="header" class="w-100 text-center">
        <span>{{remote.name}}</span>
        <i class="pull-right c-p mdi mdi-window-close pull-right" @click="closeModal"></i>
      </div>
      <div class="info-box" :class="{active:isActive}">
        <div class="temperature">
          <span>{{currentValue.temp&&isActive?currentValue.temp+'°C':'--'}}</span>
        </div>
        <div class="mode pt-5">
          <div>
            <div>
              <i class="mdi mdi-snowflake"></i>
            </div>
            <div>
              <span>Mode:</span>
              <span>{{isActive?currentValue.mode:'--'}}</span>
            </div>
          </div>
          <div>
            <div>
              <i class="mdi mdi-fan"></i>
            </div>
            <div>
              <span>Fan:</span>
              <span>{{isActive?currentValue.fan:'--'}}</span>
            </div>
          </div>
          <div>
            <div>
              <i class="mdi mdi-shore"></i>
            </div>
            <div>
              <span>Swing:</span>
              <span>{{isActive?currentValue.swing:'--'}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="controll-form mt-3">
        <div class="controll-remote-air-v1">
          <div class="on-off-controll my-3">
            <div
              class="c-p"
              :class="{'has-command':btn_list.air_on}"
              @click="clickBtn(btn_list.air_on, IR_ID_AIR.air_on)"
              @contextmenu.prevent="$refs.remoteAirV1ButtonContext.open($event, btn_list.air_on)"
            >ON</div>
            <div
              class="c-p"
              :class="{'has-command':btn_list.air_off}"
              @click="clickBtn(btn_list.air_off, IR_ID_AIR.air_off)"
              @contextmenu.prevent="$refs.remoteAirV1ButtonContext.open($event, btn_list.air_off)"
            >OFF</div>
          </div>
          <div class="command-controll my-3">
            <div
              v-for="btn in ['air_btn1','air_btn2','air_btn3','air_btn4','air_btn5','air_btn6']"
              :key="btn"
              class="command-item col"
            >
              <div
                class="fake-box wave c-p"
                v-if="btn_list[btn]"
                @click="clickBtn(btn_list[btn], btn)"
                @contextmenu.prevent="$refs.remoteAirV1ButtonContext.open($event, btn_list[btn])"
              >
                <div class="content">
                  <div>
                    <div>{{btn_list[btn].arrIr.mode}}</div>
                    <div>{{btn_list[btn].arrIr.temp}}</div>
                  </div>
                  <div>
                    <div>Fan</div>
                    <div>{{btn_list[btn].arrIr.fan}}</div>
                  </div>
                  <div>
                    <div>Swing</div>
                    <div>{{btn_list[btn].arrIr.swing}}</div>
                  </div>
                </div>
              </div>
              <div
                v-else
                class="fake-box wave add-command c-p"
                @click="clickBtn(btn_list[btn], btn)"
              >
                <div class="content">
                  <i class="mdi mdi-plus"></i>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="btn-controll" >
          <div class="c-p">{{$t('devices.learnCommand')}}</div>
          <div class="c-p">{{$t('devices.removeCommand')}}</div>
          </div>-->
        </div>
      </div>
    </modal>
    <vue-context ref="remoteAirV1ButtonContext" v-slot="{ data }" class="device-context-menu">
      <li>
        <a href="#" @click.prevent="learnCommand(data.buttonId)">
          <i class="mdi mdi-plus-circle"></i>
          <span>{{$t('devices.learnCommand')}}</span>
        </a>
      </li>
      <li>
        <a href="#" @click.prevent="removeCommand(data.buttonId)">
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
      <h5 class="text-center">{{$t('devices.learning')}}</h5>
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
    <modal
      :show.sync="isOpenModalSettingButton"
      :backdropClick="false"
      :showClose="false"
      modalClasses="modal-input modal-setting-button lumi-input2"
      footerClasses="p-0"
    >
      <div slot="header" class="w-100 text-center">
        <h5>
          <span>{{$t('devices.addDetailIr')}}</span>
          <i
            class="pull-right c-p mdi mdi-window-close pull-right"
            @click="isOpenModalSettingButton=false"
          ></i>
        </h5>
      </div>
      <h6 class="mb-5">{{$t('devices.temp')}}</h6>
      <vue-slider
        class="remote-air-slider"
        :drag-on-click="true"
        :min="16"
        :max="32"
        v-model="settingButton.arrIr.temp"
        tooltip="always"
        :tooltip-formatter="'{value}°C'"
      />
      <h6>{{$t('devices.modeAirIR')}}</h6>
      <div class="form-group">
        <select class="form-control" v-model="settingButton.arrIr.mode">
          <option value="auto" selected>auto</option>
          <option value="heat">heat</option>
          <option value="dry">dry</option>
          <option value="cool">cool</option>
        </select>
      </div>
      <h6>{{$t('devices.fanAirIr')}}</h6>
      <div class="form-group">
        <select class="form-control" v-model="settingButton.arrIr.fan">
          <option value="auto" selected>auto</option>
          <option value="low">low</option>
          <option value="mid">mid</option>
          <option value="high">high</option>
        </select>
      </div>
      <h6>{{$t('devices.swingAirIr')}}</h6>
      <div class="form-group">
        <select class="form-control" v-model="settingButton.arrIr.swing">
          <option value="auto" selected>auto</option>
          <option value="low">low</option>
          <option value="mid">mid</option>
          <option value="high">high</option>
        </select>
      </div>
      <template slot="footer">
        <base-button @click="submitCommand">{{$t('confirm')}}</base-button>
        <base-button class="ml-auto" @click="isOpenModalSettingButton=false">{{$t('cancel')}}</base-button>
      </template>
    </modal>
  </div>
</template>

<script>
import {
  IR_ID_AIR,
  DEVICE_TRAIT,
  IR_PREFIX_KEY
} from "@/plugins/variableConst";

export default {
  name: "controll-remote",
  data() {
    return {
      isActive: false,
      btn_list: {
        air_on: false,
        air_off: false,
        air_btn1: false,
        air_btn2: false,
        air_btn3: false,
        air_btn4: false,
        air_btn5: false,
        air_btn6: false
      },
      currentValue: {
        temp: "",
        mode: "",
        fan: "",
        swing: ""
      },
      IR_ID_AIR,
      isIRLearning: false,
      isOpenModalSettingButton: false,
      settingButton: {
        buttonId: false,
        commandId: false,
        arrIr: {
          temp: 16,
          mode: "auto",
          fan: "auto",
          swing: "auto"
        }
      }
    };
  },
  computed: {
    remote,
    modalControllRemoteAirV1,
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
          if (
            this.settingButton.buttonId == IR_ID_AIR.air_on ||
            this.settingButton.buttonId == IR_ID_AIR.air_off
          ) {
            let listCommand = [...(this.remote.irCommands || [])];
            let oldCommandIndex = listCommand.findIndex(
              item => item.buttonId == this.settingButton.buttonId
            );
            if (oldCommandIndex != -1) listCommand.splice(oldCommandIndex, 1);
            listCommand.push({
              buttonId: this.settingButton.buttonId,
              commandId: status.states.IrConfig.irId
            });
            this.isIRLearning = false;
            return $dispatch($api.HomeConfig.updateRemote, {
              remoteid: this.remote.remoteid,
              updateData: {
                irCommands: listCommand
              }
            });
          }
          this.settingButton.commandId = status.states.IrConfig.irId;
          this.isOpenModalSettingButton = true;
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
    stopLearningCommand,
    submitCommand
  }
};

function remote() {
  let remote = $getters["HomeConfig/getRemote"](this.modalControllRemoteAirV1);
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

function status() {
  return (status = $getters["HomeControll/getDeviceStatusByDeviceID"](
    this.remote && this.remote.devid
  ));
}

function modalControllRemoteAirV1() {
  return $state.ContentManager.modal.modalControllRemoteAirV1;
}

function clickBtn(command, buttonId) {
  let execution = {};
  if (command) {
    //logic app
    if (command.arrIr) {
      this.isActive = true;
      this.currentValue = { ...this.currentValue, ...command.arrIr };
    } else if (buttonId == IR_ID_AIR.air_on) this.isActive = true;
    else if (buttonId == IR_ID_AIR.air_off) this.isActive = false;
    //config request controll
    (execution.command = DEVICE_TRAIT.IrActive),
      (execution.params = {
        irActive: command.commandId
      });
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
    let full_buttonId = `${this.remote.remoteid}${IR_PREFIX_KEY}${buttonId}`;
    let execution = {
      command: DEVICE_TRAIT.IrConfig,
      params: {
        irConfig: "learn",
        buttonId: full_buttonId
      }
    };
    $dispatch($api.HomeControll.controllDevice, {
      devid: this.remote.devid,
      execution
    });
    this.isIRLearning = full_buttonId;
    this.settingButton.buttonId = buttonId;
  }
}

function removeCommand(buttonId) {
  let listCommand = [...(this.remote.irCommands || [])];
  let oldCommandIndex = listCommand.findIndex(
    item => item.buttonId == buttonId
  );
  if (oldCommandIndex != -1) listCommand.splice(oldCommandIndex, 1);
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

function submitCommand() {
  if (!this.settingButton.buttonId || !this.settingButton.commandId) {
    this.isOpenModalSettingButton = false;
    return $alertify.confirm({
      title: this.$t("notify.notifyDefautlTitle"),
      text: this.$t("notify.timeout")
    });
  }
  let listCommand = [...(this.remote.irCommands || [])];
  let oldCommandIndex = listCommand.findIndex(
    item => item.buttonId == this.settingButton.buttonId
  );
  if (oldCommandIndex != -1) listCommand.splice(oldCommandIndex, 1);
  listCommand.push(this.settingButton);
  $dispatch($api.HomeConfig.updateRemote, {
    remoteid: this.remote.remoteid,
    updateData: {
      irCommands: listCommand
    }
  });
  this.isOpenModalSettingButton = false;
}

function closeModal() {
  $commit("ContentManager/UPDATE_MODAL_STATUS", {
    modal: "modalControllRemoteAirV1",
    data: false
  });
}
</script>
<style lang="scss">
.controll-remote-modal.controll-remote-air-v1-modal {
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
      }
    }
  }
  .controll-form {
    .controll-remote-air-v1 {
      & > div {
        display: flex;
      }
      .on-off-controll {
        justify-content: space-between;
        div {
          font-size: 1.2rem;
          padding: 0.3rem 1rem;
          border-radius: 1.5rem;
        }
      }
      .command-controll {
        flex-wrap: wrap;
        margin-right: -1rem;
        .command-item {
          padding: 0 1rem 1rem 0;
          width: 33%;
          max-width: 33%;
          min-width: 33%;
          .fake-box {
            border-radius: 1rem;
            &:after {
              content: "";
              display: block;
              padding-bottom: 100%;
            }
            .content {
              position: absolute;
              // height: calc(100% - 1rem);
              // width: calc(100% - 1rem);
              height: 100%;
              width: 100%;
              padding: 0.5rem;
              & > div {
                height: 33.33%;
                max-height: 33.33%;
                display: flex;
                align-items: center;
                justify-content: space-between;
              }
            }
            &.add-command {
              .content {
                font-size: 4rem;
                i {
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                }
              }
            }
          }
        }
      }
      .btn-controll {
        justify-content: center;
        div {
          padding: 0.2rem 0.7rem;
          margin: 1rem;
          border-radius: 1rem;
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
