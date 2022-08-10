<template>
  <div class="state-device">
    <div class="state">
      {{
        $t('schedule.state.state') + ": " +
        $t('devices.ir_stb_v2.' + currentComand)

      }}
    </div>
    <!--            SELECT STATE-->
    <div class="state setState remote-irv2-stb">
      <div class="row">
        <div class="col-2 pr-1">
          {{ $t('schedule.state.select-state') + ' :' }}
        </div>

        <div class="col-lg-8  ">
          <div class="controll-remote-modal controll-remote-stb-v2-modal">

            <div class="m-3 py-3 bg-1 border-radius-2">
              <div class="controll-form controll-remote-stb-v2 mx-5">
                <!-- row1 -->
                <div class="set-up">
                  <div class="power-button" @click="clickBtn(IRV2_ID_STB.power)">
                    <i class="icon-icon-ir-fan-power"></i>
                  </div>
                  <div @click="clickBtn(IRV2_ID_STB.info)">
                    <span>INFO</span>
                  </div>
                </div>
                <!-- row2 -->
                <div>
                  <!-- left -->
                  <div class="vol-controll">
                    <div @click="clickBtn(IRV2_ID_STB.volume_up)">
                      <i class="icon-icon-ir-tv-volume-up"></i>
                    </div>
                    <span class="text">VOL</span>
                    <div @click="clickBtn(IRV2_ID_STB.volume_down)">
                      <i class="icon-icon-ir-tv-volume-down"></i>
                    </div>
                  </div>
                  <!-- center -->
                  <div class="center-controll">
                    <div class="button-stb top" @click="clickBtn(IRV2_ID_STB.up)">
                      <i class="icon-icon-ir-tv-arrow-up"></i>
                    </div>
                    <div class="button-stb right" @click="clickBtn(IRV2_ID_STB.right)">
                      <i class="icon-icon-ir-tv-arrow-right"></i>
                    </div>
                    <div class="button-stb left" @click="clickBtn(IRV2_ID_STB.left)">
                      <i class="icon-icon-ir-arrow-left-01"></i>
                    </div>
                    <div class="button-stb bottom" @click="clickBtn(IRV2_ID_STB.down)">
                      <i class="icon-icon-ir-tv-arrow-down"></i>
                    </div>
                    <div class="center-blur"></div>
                    <div class="center-button" @click="clickBtn(IRV2_ID_STB.enter)">
                      <i class="icon-icon-ir-tv-ok"></i>
                    </div>
                  </div>
                  <!-- right -->
                  <div class="ch-controll">
                    <div @click="clickBtn(IRV2_ID_STB.channel_up)">
                      <i class="icon-icon-ir-tv-channel-up"></i>
                    </div>
                    <span class="text">CH</span>
                    <div @click="clickBtn(IRV2_ID_STB.channel_down)">
                      <i class="icon-icon-ir-tv-channel-down"></i>
                    </div>
                  </div>
                </div>
                <!-- row 3+ -->
                <div class="set-up">
                  <div @click="clickBtn(IRV2_ID_STB.page_down)">
                    <i class="icon-icon-ir-tv-rewind"></i>
                  </div>
                  <div @click="clickBtn(IRV2_ID_STB.mute)">
                    <i class="icon-icon-ir-tv-volume-off"></i>
                  </div>
                  <div @click="clickBtn(IRV2_ID_STB.page_up)">
                    <i class="icon-icon-ir-tv-forward"></i>
                  </div>
                </div>
                <div class="set-up">
                  <div @click="clickBtn(IRV2_ID_STB.menu)">
                    <i class="icon-icon-ir-tv-menu-01"></i>
                  </div>
                  <div @click="clickBtn(IRV2_ID_STB.home)">
                    <span>HOME</span>
                  </div>
                  <div @click="clickBtn(IRV2_ID_STB.back)">
                    <i class="icon-icon-ir-tv-return"></i>
                  </div>
                </div>
                <div class="number-menu">
                  <div @click="clickBtn(IRV2_ID_STB.number_1)">
                    <i class="icon-icon-ir-tv-1"></i>
                  </div>
                  <div @click="clickBtn(IRV2_ID_STB.number_2)">
                    <i class="icon-icon-ir-tv-2"></i>
                  </div>
                  <div @click="clickBtn(IRV2_ID_STB.number_3)">
                    <i class="icon-icon-ir-tv-3"></i>
                  </div>
                </div>
                <div class="number-menu">
                  <div @click="clickBtn(IRV2_ID_STB.number_4)">
                    <i class="icon-icon-ir-tv-4"></i>
                  </div>
                  <div @click="clickBtn(IRV2_ID_STB.number_5)">
                    <i class="icon-icon-ir-tv-5"></i>
                  </div>
                  <div @click="clickBtn(IRV2_ID_STB.number_6)">
                    <i class="icon-icon-ir-tv-6"></i>
                  </div>
                </div>
                <div class="number-menu">
                  <div @click="clickBtn(IRV2_ID_STB.number_7)">
                    <i class="icon-icon-ir-tv-7"></i>
                  </div>
                  <div @click="clickBtn(IRV2_ID_STB.number_8)">
                    <i class="icon-icon-ir-tv-8"></i>
                  </div>
                  <div @click="clickBtn(IRV2_ID_STB.number_9)">
                    <i class="icon-icon-ir-tv-9"></i>
                  </div>
                </div>
                <div class="number-menu">
                  <div @click="clickBtn(IRV2_ID_STB.delete)">
                    <!-- <i class="icon-icon-ir-tv-list"></i> -->
                    <span>DEL</span>
                  </div>
                  <div @click="clickBtn(IRV2_ID_STB.number_0)">
                    <i class="icon-icon-ir-tv-0"></i>
                  </div>
                  <div @click="clickBtn(IRV2_ID_STB.exit)">
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
  IRV2_ID_STB
} from "@/plugins/variableConst";
import {getIrDataCommand} from "@/plugins/helper";

export default {
  name: "modal-update-deivce-switch",
  props: {
    value: [Object,Array, String],
    device: Object,
    schedule: Object,

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
      IRV2_ID_STB,
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
  if (this.device) {
    this.currentComand = this.value && this.value.arrIr.buttonid;
  }
}

function clickBtn(code) {
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
