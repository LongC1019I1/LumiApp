<template>
  <div class="state-device">
    <div class="state">
      {{
        $t('schedule.state.state') + ": " +
        currentComand

      }}
    </div>
    <!--            SELECT STATE-->
    <div class="state setState remote-irv2-ac">
      <div class="row">
        <div class="col-2 pr-1">
          {{ $t('schedule.state.select-state') + ' :' }}
        </div>

        <div class="col-lg-8  ">
            <div class="controll-remote-modal controll-remote-air-v2-modal">
              <div class="m-3 px-4 py-3  border-radius-2">
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
                        <div class="wave" @click="clickBtn({power: currentValue.power==0?1:0})">
                          <i class="mdi mdi-power"></i>
                        </div>
                        <span>Power</span>
                      </div>
                      <div>
                        <div
                            @click="clickBtn({mode: currentValue.mode==0?2:currentValue.mode==2?3:currentValue.mode==3?4:currentValue.mode==4?6:0})"
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
                            @click="clickBtn({temp: currentValue.temp>=30||currentValue.temp<18?18:currentValue.temp+1})"
                        >
                          <i class="mdi mdi-plus"></i>
                        </div>
                        <div class="text">Temp</div>
                        <div
                            class="wave"
                            @click="clickBtn({temp: currentValue.temp>30||currentValue.temp<=18?30:currentValue.temp-1})"
                        >
                          <i class="mdi mdi-minus"></i>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <div
                            class="wave"
                            @click="clickBtn({fan: currentValue.fan==3?5:currentValue.fan==5?7:currentValue.fan==7?10:3})"
                        >
                          <i class="mdi mdi-signal-cellular-3"></i>
                        </div>
                        <span>Fan</span>
                      </div>
                      <div>
                        <div class="wave" @click="clickBtn({swing: currentValue.swing==0?1:0})">
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
  </div>
</template>

<script>
import {
  DEVICE_TRAIT,
  MODE_IRV2_AC,
  SPEED_IRV2_AC,
  SWING_IRV2_AC
} from "@/plugins/variableConst";
import {getIrAcDataCommand} from "@/plugins/helper";

export default {
  name: "modal-update-deivce-switch",
  props: {
    value: [Object,Array, String],
    device: Object,
    schedule: Object
  },
  data() {
    return {
      currentComand: '',
      MODE_IRV2_AC,
      SPEED_IRV2_AC,
      SWING_IRV2_AC,
      currentValue: {
        power: 0,
        temp: 16,
        mode: MODE_IRV2_AC[0].mode,
        fan: SPEED_IRV2_AC[0].speed,
        swing: SWING_IRV2_AC[0].swing
      },
      DEVICE_TRAIT
    };
  },
  watch: {
    value: updateData,
    device: updateData,
    schedule(){
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
  if (!this.device) return;
  this.currentComand = this.value.arrIr.power
      ? `Mode: ${this.value.arrIr.mode} - Temp: ${this.value.arrIr.temp} - Fan: ${
          this.value.arrIr.fan
      } - Swing: ${this.value.arrIr.swing}`
      : "Off";
  this.currentValue = Object.assign(this.currentValue, this.value.arrIr);
}

function clickBtn(newData = {}) {
  console.log('newData', newData)
  return this.$emit("updateStatus", {
    arrIr: {
      ...this.currentValue,
      ...newData
    },
    command: DEVICE_TRAIT.IrActiveV2,
    params: {
      irActivev2: getIrAcDataCommand(this.device.irData.cmd_rule, {
        ...this.currentValue,
        ...newData
      })
    }
  });
}
</script>

<style lang="scss">
</style>
