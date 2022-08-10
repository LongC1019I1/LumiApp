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

          <div class="controll-remote-modal controll-remote-air-v1-modal">
            <div class="m-3 px-4 py-3 border-radius-2">
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
                    >ON</div>
                    <div
                        class="c-p"
                        :class="{'has-command':btn_list.air_off}"
                        @click="clickBtn(btn_list.air_off, IR_ID_AIR.air_off)"
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
  IR_ID_AIR
} from "@/plugins/variableConst";

export default {
  name: "modal-update-deivce-switch",
  props: {
    value: [Object,Array, String],
    device: Object,
    schedule:Object
  },
  data() {
    return {
      currentComand: false,
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
  for (const property in this.btn_list) {
    this.btn_list[property] = false;
  }
  if (this.device) {
    this.device.irCommands &&
    this.device.irCommands.forEach(item => {
      if (this.value.params.irActive === item.commandId) {
        if (item.buttonId === IR_ID_AIR.air_on) {
          this.currentComand = "On";
          this.isActive = true;
        } else if (item.buttonId === IR_ID_AIR.air_off) {
          this.currentComand = "Off";
          this.isActive = false;
        } else {
          this.currentComand = `Mode: ${item.arrIr.mode} - Temp: ${
              item.arrIr.temp
          } - Fan: ${item.arrIr.fan} - Swing: ${item.arrIr.swing}`;
          this.isActive = true;
          this.currentValue = { ...this.currentValue, ...item.arrIr };
        }
      }
      this.btn_list[item.buttonId] = item;
    });
  }
}

function clickBtn(command, buttonId) {
  if (!command) return;
  return this.$emit("updateStatus", {
    command: DEVICE_TRAIT.IrActive,
    params: { irActive: command.commandId }
  });
}
</script>

<style lang="scss">
</style>
