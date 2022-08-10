<template>
  <div class="state-device">
    <div class="state">
      {{
        $t('schedule.state.state') + ": " +
        $t('devices.ir_fan_v1.' + currentComand)

      }}
    </div>
    <!--            SELECT STATE-->
    <div class="state setState remote-irv1-fan">
      <div class="row">
        <div class="col-2 pr-1">
          {{ $t('schedule.state.select-state') + ' :' }}
        </div>

        <div class="col-lg-8  ">
          <div class="controll-remote-modal controll-remote-fan-v1-modal">

            <div class="m-3 py-3 border-radius-2">
              <div class="controll-form controll-remote-fan-v1 info-box m-3">
                <div>
                  <div>
                    <div
                        class="power-button"
                        :class="{'has-command':btn_list.fan_onOff}"
                        @click="clickBtn(btn_list.fan_onOff, IR_ID_FAN.fan_onOff)"
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
                    >
                      <i class="mdi mdi-signal-cellular-3"></i>
                    </div>
                    <span>Speed</span>
                  </div>
                  <div>
                    <div
                        :class="{'has-command':btn_list.fan_timer}"
                        @click="clickBtn(btn_list.fan_timer, IR_ID_FAN.fan_timer)"
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
                    >
                      <i class="icon-icon-ir-fan-auto"></i>
                    </div>
                    <span>Auto</span>
                  </div>
                  <div>
                    <div
                        :class="{'has-command':btn_list.fan_swing}"
                        @click="clickBtn(btn_list.fan_swing, IR_ID_FAN.fan_swing)"
                    >
                      <i class="icon-icon-ir-fan-swing"></i>
                    </div>
                    <span>Swing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>

</template>

<script>
import {
  DEVICE_TRAIT,
  IR_ID_FAN
} from "@/plugins/variableConst";

export default {
  name: "modal-update-deivce-switch",
  props: {
    value: [Object,Array, String],
    device: Object,
    schedule: Object
  },
  data() {
    return {
      currentComand: false,
      isActive: false,
      btn_list: {
        fan_onOff: false,
        fan_timer: false,
        fan_swing: false,
        fan_auto: false,
        fan_speed: false
      },
      IR_ID_FAN,
      DEVICE_TRAIT
    };
  },
  watch: {
    value: updateData,
    device: updateData,
    schedule() {
      delete this.schedule.device
      $dispatch('RuleManager/setRule', this.schedule)
    }
  },
  methods: {
    clickBtn
  },
  mounted: updateData
};

function updateData() {
  for (const property in this.btn_list) {
    this.btn_list[property] = false;
  }
  if (this.device) {
    this.device.irCommands &&
    this.device.irCommands.forEach(item => {
      if (this.value.params.irActive === item.commandId)
        this.currentComand = item.buttonId;
      this.btn_list[item.buttonId] = item;
    });
  }
}

function clickBtn(command, buttonId) {
  if (!command) return;
  return this.$emit("updateStatus", {
    command: DEVICE_TRAIT.IrActive,
    params: {irActive: command.commandId}
  });
}
</script>

<style lang="scss">
</style>
