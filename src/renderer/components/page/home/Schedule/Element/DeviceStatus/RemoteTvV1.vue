<template>

  <div class="state-device">
    <div class="state">
      {{
        $t('schedule.state.state') + ": " +
        $t('devices.ir_tv_v1.' + currentComand)

      }}
    </div>
    <!--            SELECT STATE-->
    <div class="state setState remote-irv1-tv">
      <div class="row">
        <div class="col-2 pr-1">
          {{ $t('schedule.state.select-state') + ' :' }}
        </div>

        <div class="col-lg-8  ">

          <div class="controll-remote-modal controll-remote-tv-v1-modal">
            <div class="m-3 px-4 py-3 bg-1 border-radius-2">
              <div class="controll-form controll-remote-tv-v1 mx-5">
                <!-- row1 -->
                <div class="set-up">
                  <div
                      class="power-button"
                      :class="{'has-command':btn_list.tv_power}"
                      @click="clickBtn(btn_list.tv_power, IR_ID_TV.tv_power)"
                  >
                    <i class="icon-icon-ir-fan-power"></i>
                  </div>
                  <div
                      :class="{'has-command':btn_list.tv_smart_hub}"
                      @click="clickBtn(btn_list.tv_smart_hub, IR_ID_TV.tv_smart_hub)"
                  >
                    <i class="icon-icon-ir-tv-smart-hub"></i>
                  </div>
                  <div
                      :class="{'has-command':btn_list.tv_input}"
                      @click="clickBtn(btn_list.tv_input, IR_ID_TV.tv_input)"
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
                    >
                      <i class="icon-icon-ir-tv-volume-up"></i>
                    </div>
                    <span class="text">VOL</span>
                    <div
                        :class="{'has-command':btn_list.tv_vol_dow}"
                        @click="clickBtn(btn_list.tv_vol_dow, IR_ID_TV.tv_vol_dow)"
                    >
                      <i class="icon-icon-ir-tv-volume-down"></i>
                    </div>
                  </div>
                  <!-- center -->
                  <div class="center-controll">
                    <div
                        class="button-tv top"
                        :class="{'has-command':btn_list.tv_menu_up}"
                        @click="clickBtn(btn_list.tv_menu_up, IR_ID_TV.tv_menu_up)"
                    >
                      <i class="icon-icon-ir-tv-arrow-up"></i>
                    </div>
                    <div
                        class="button-tv right"
                        :class="{'has-command':btn_list.tv_menu_right}"
                        @click="clickBtn(btn_list.tv_menu_right, IR_ID_TV.tv_menu_right)"
                    >
                      <i class="icon-icon-ir-tv-arrow-right"></i>
                    </div>
                    <div
                        class="button-tv left"
                        :class="{'has-command':btn_list.tv_menu_left}"
                        @click="clickBtn(btn_list.tv_menu_left, IR_ID_TV.tv_menu_left)"
                    >
                      <i class="icon-icon-ir-arrow-left-01"></i>
                    </div>
                    <div
                        class="button-tv bottom"
                        :class="{'has-command':btn_list.tv_menu_down}"
                        @click="clickBtn(btn_list.tv_menu_down, IR_ID_TV.tv_menu_down)"
                    >
                      <i class="icon-icon-ir-tv-arrow-down"></i>
                    </div>
                    <div class="center-blur"></div>
                    <div
                        class="center-button"
                        :class="{'has-command':btn_list.tv_menu_ok}"
                        @click="clickBtn(btn_list.tv_menu_ok, IR_ID_TV.tv_menu_ok)"
                    >
                      <i class="icon-icon-ir-tv-ok"></i>
                    </div>
                  </div>
                  <!-- right -->
                  <div class="ch-controll">
                    <div
                        :class="{'has-command':btn_list.tv_channel_up}"
                        @click="clickBtn(btn_list.tv_channel_up, IR_ID_TV.tv_channel_up)"
                    >
                      <i class="icon-icon-ir-tv-channel-up"></i>
                    </div>
                    <span class="text">CH</span>
                    <div
                        :class="{'has-command':btn_list.tv_channel_dow}"
                        @click="clickBtn(btn_list.tv_channel_dow, IR_ID_TV.tv_channel_dow)"
                    >
                      <i class="icon-icon-ir-tv-channel-down"></i>
                    </div>
                  </div>
                </div>
                <!-- row 3+ -->
                <div class="set-up">
                  <div
                      :class="{'has-command':btn_list.tv_menu}"
                      @click="clickBtn(btn_list.tv_menu, IR_ID_TV.tv_menu)"
                  >
                    <i class="icon-icon-ir-tv-menu-01"></i>
                  </div>
                  <div
                      :class="{'has-command':btn_list.tv_mute}"
                      @click="clickBtn(btn_list.tv_mute, IR_ID_TV.tv_mute)"
                  >
                    <i class="icon-icon-ir-tv-volume-off"></i>
                  </div>
                  <div
                      :class="{'has-command':btn_list.tv_enter}"
                      @click="clickBtn(btn_list.tv_enter, IR_ID_TV.tv_enter)"
                  >
                    <i class="icon-icon-ir-tv-return"></i>
                  </div>
                </div>
                <div class="number-menu">
                  <div
                      :class="{'has-command':btn_list.tv_ch1}"
                      @click="clickBtn(btn_list.tv_ch1, IR_ID_TV.tv_ch1)"
                  >
                    <i class="icon-icon-ir-tv-1"></i>
                  </div>
                  <div
                      :class="{'has-command':btn_list.tv_ch2}"
                      @click="clickBtn(btn_list.tv_ch2, IR_ID_TV.tv_ch2)"
                  >
                    <i class="icon-icon-ir-tv-2"></i>
                  </div>
                  <div
                      :class="{'has-command':btn_list.tv_ch3}"
                      @click="clickBtn(btn_list.tv_ch3, IR_ID_TV.tv_ch3)"
                  >
                    <i class="icon-icon-ir-tv-3"></i>
                  </div>
                </div>
                <div class="number-menu">
                  <div
                      :class="{'has-command':btn_list.tv_ch4}"
                      @click="clickBtn(btn_list.tv_ch4, IR_ID_TV.tv_ch4)"
                  >
                    <i class="icon-icon-ir-tv-4"></i>
                  </div>
                  <div
                      :class="{'has-command':btn_list.tv_ch5}"
                      @click="clickBtn(btn_list.tv_ch5, IR_ID_TV.tv_ch5)"
                  >
                    <i class="icon-icon-ir-tv-5"></i>
                  </div>
                  <div
                      :class="{'has-command':btn_list.tv_ch6}"
                      @click="clickBtn(btn_list.tv_ch6, IR_ID_TV.tv_ch6)"
                  >
                    <i class="icon-icon-ir-tv-6"></i>
                  </div>
                </div>
                <div class="number-menu">
                  <div
                      :class="{'has-command':btn_list.tv_ch7}"
                      @click="clickBtn(btn_list.tv_ch7, IR_ID_TV.tv_ch7)"
                  >
                    <i class="icon-icon-ir-tv-7"></i>
                  </div>
                  <div
                      :class="{'has-command':btn_list.tv_ch8}"
                      @click="clickBtn(btn_list.tv_ch8, IR_ID_TV.tv_ch8)"
                  >
                    <i class="icon-icon-ir-tv-8"></i>
                  </div>
                  <div
                      :class="{'has-command':btn_list.tv_ch9}"
                      @click="clickBtn(btn_list.tv_ch9, IR_ID_TV.tv_ch9)"
                  >
                    <i class="icon-icon-ir-tv-9"></i>
                  </div>
                </div>
                <div class="number-menu">
                  <div
                      :class="{'has-command':btn_list.tv_list}"
                      @click="clickBtn(btn_list.tv_list, IR_ID_TV.tv_list)"
                  >
                    <span>LIST</span>
                  </div>
                  <div
                      :class="{'has-command':btn_list.tv_ch0}"
                      @click="clickBtn(btn_list.tv_ch0, IR_ID_TV.tv_ch0)"
                  >
                    <i class="icon-icon-ir-tv-0"></i>
                  </div>
                  <div
                      :class="{'has-command':btn_list.tv_edit}"
                      @click="clickBtn(btn_list.tv_edit, IR_ID_TV.tv_edit)"
                  >
                    <span>EXIT</span>
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
  IR_ID_TV
} from "@/plugins/variableConst";

export default {
  name: "modal-update-deivce-switch",
  props: {
    value: [Object,Array, String],
    device: Object,
    schedule: Object,
  },
  data() {
    return {
      currentComand: false,
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
      DEVICE_TRAIT
    };
  },
  watch: {
    value: updateData,
    device: updateData,
    schedule(){
      delete this.schedule.device;
      $dispatch('RuleManager/setRule',this.schedule)
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
