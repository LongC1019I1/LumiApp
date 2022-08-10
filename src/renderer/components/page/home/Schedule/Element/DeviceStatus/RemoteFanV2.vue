<template>

  <div class="state-device">
    <div class="state">
      {{
        $t('schedule.state.state') + ": " +
        currentComand

      }}
    </div>
    <!--            SELECT STATE-->
    <div class="state setState remote-irv2-fan">
      <div class="row">
        <div class="col-2 pr-1">
          {{ $t('schedule.state.select-state') + ' :' }}
        </div>

        <div class="col-lg-8  ">
          <div class="controll-remote-modal controll-remote-fan-v2-modal">
            <div class="m-3 py-3 border-radius-2">
              <div class="controll-form controll-remote-fan-v2 info-box m-3">
                <div>
                  <div class="power-button">
                    <div @click="clickBtn(IRV2_ID_FAN.on_off)">
                      <i class="icon-icon-ir-fan-power"></i>
                    </div>
                    <span>Power</span>
                  </div>
                </div>
                <div>
                  <div>
                    <div @click="clickBtn(IRV2_ID_FAN.speed)">
                      <i class="mdi mdi-signal-cellular-3"></i>
                    </div>
                    <span>Speed</span>
                  </div>
                  <div>
                    <div @click="clickBtn(IRV2_ID_FAN.timer)">
                      <i class="icon-icon-ir-fan-timer"></i>
                    </div>
                    <span>Timer</span>
                  </div>
                </div>
                <div>
                  <div>
                    <div @click="clickBtn(IRV2_ID_FAN.auto)">
                      <i class="icon-icon-ir-fan-auto"></i>
                    </div>
                    <span>Auto</span>
                  </div>
                  <div>
                    <div @click="clickBtn(IRV2_ID_FAN.swing)">
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
  IRV2_ID_FAN
} from "@/plugins/variableConst";
import {getIrDataCommand} from "@/plugins/helper";

export default {
  name: "modal-update-deivce-switch",
  props: {
    value: [Object,Array, String],
    device: Object,
    schedule: Object
  },
  data() {
    return {
      currentComand: this.value && this.value.arrIr.buttonid,
      currentValue: {
        power: "",
        temp: "",
        mode: "",
        fan: "",
        swing: ""
      },
      IRV2_ID_FAN,
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
    clickBtn,
    getIrDataCommand
  },
  mounted: updateData
};

function updateData() {
  if (this.device) {
    this.currentComand = this.value && this.value.arrIr.buttonid;
  }
}

function clickBtn(code) {
  console.log('cide',code)
  return this.$emit("updateStatus", {
    arrIr: {
      buttonid: code
    },
    command: DEVICE_TRAIT.IrActiveV2,
    params: {
      irActiveV2: getIrDataCommand(
          this.device.irtype,
          this.device.irData,
          this.device.irData.ir_code[code]
      )
    }
  });
}
</script>

<style lang="scss">
</style>
