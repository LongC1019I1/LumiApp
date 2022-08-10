<template>
  <div class="controll-remote-modal controll-remote-tv-v2-modal">
    <div
      class="border-radius-1 p-2 bg-disabled2 text-overflow-hidden"
    >{{$t('devices.ir_tv_v2.'+currentComand)}}</div>
    <div class="m-3 py-3 bg-1 border-radius-2">
      <div class="controll-form controll-remote-tv-v2 mx-5">
        <!-- row1 -->
        <div>
          <div class="power-button" @click="clickBtn(IRV2_ID_TV.power)">
            <i class="icon-icon-ir-fan-power"></i>
          </div>
          <div @click="clickBtn(IRV2_ID_TV.source)">
            <i class="icon-icon-ir-tv-input"></i>
          </div>
        </div>
        <!-- row2 -->
        <div>
          <!-- left -->
          <div class="vol-controll">
            <div @click="clickBtn(IRV2_ID_TV.volume_up)">
              <i class="icon-icon-ir-tv-volume-up"></i>
            </div>
            <span class="text">VOL</span>
            <div @click="clickBtn(IRV2_ID_TV.volume_down)">
              <i class="icon-icon-ir-tv-volume-down"></i>
            </div>
          </div>
          <!-- center -->
          <div class="center-controll">
            <div class="button top" @click="clickBtn(IRV2_ID_TV.up)">
              <i class="icon-icon-ir-tv-arrow-up"></i>
            </div>
            <div class="button right" @click="clickBtn(IRV2_ID_TV.right)">
              <i class="icon-icon-ir-tv-arrow-right"></i>
            </div>
            <div class="button left" @click="clickBtn(IRV2_ID_TV.left)">
              <i class="icon-icon-ir-arrow-left-01"></i>
            </div>
            <div class="button bottom" @click="clickBtn(IRV2_ID_TV.down)">
              <i class="icon-icon-ir-tv-arrow-down"></i>
            </div>
            <div class="center-blur"></div>
            <div class="center-button" @click="clickBtn(IRV2_ID_TV.enter)">
              <i class="icon-icon-ir-tv-ok"></i>
            </div>
          </div>
          <!-- right -->
          <div class="ch-controll">
            <div @click="clickBtn(IRV2_ID_TV.channel_up)">
              <i class="icon-icon-ir-tv-channel-up"></i>
            </div>
            <span class="text">CH</span>
            <div @click="clickBtn(IRV2_ID_TV.channel_down)">
              <i class="icon-icon-ir-tv-channel-down"></i>
            </div>
          </div>
        </div>
        <!-- row 3+ -->
        <div>
          <div @click="clickBtn(IRV2_ID_TV.menu)">
            <i class="icon-icon-ir-tv-menu-01"></i>
          </div>
          <div @click="clickBtn(IRV2_ID_TV.mute)">
            <i class="icon-icon-ir-tv-volume-off"></i>
          </div>
          <div @click="clickBtn(IRV2_ID_TV.return)">
            <i class="icon-icon-ir-tv-return"></i>
          </div>
        </div>
        <div class="number-menu">
          <div @click="clickBtn(IRV2_ID_TV.number_1)">
            <i class="icon-icon-ir-tv-1"></i>
          </div>
          <div @click="clickBtn(IRV2_ID_TV.number_2)">
            <i class="icon-icon-ir-tv-2"></i>
          </div>
          <div @click="clickBtn(IRV2_ID_TV.number_3)">
            <i class="icon-icon-ir-tv-3"></i>
          </div>
        </div>
        <div class="number-menu">
          <div @click="clickBtn(IRV2_ID_TV.number_4)">
            <i class="icon-icon-ir-tv-4"></i>
          </div>
          <div @click="clickBtn(IRV2_ID_TV.number_5)">
            <i class="icon-icon-ir-tv-5"></i>
          </div>
          <div @click="clickBtn(IRV2_ID_TV.number_6)">
            <i class="icon-icon-ir-tv-6"></i>
          </div>
        </div>
        <div class="number-menu">
          <div @click="clickBtn(IRV2_ID_TV.number_7)">
            <i class="icon-icon-ir-tv-7"></i>
          </div>
          <div @click="clickBtn(IRV2_ID_TV.number_8)">
            <i class="icon-icon-ir-tv-8"></i>
          </div>
          <div @click="clickBtn(IRV2_ID_TV.number_9)">
            <i class="icon-icon-ir-tv-9"></i>
          </div>
        </div>
        <div class="number-menu">
          <div @click="clickBtn(IRV2_ID_TV.chn_list)">
            <span>LIST</span>
          </div>
          <div @click="clickBtn(IRV2_ID_TV.number_0)">
            <i class="icon-icon-ir-tv-0"></i>
          </div>
          <div @click="clickBtn(IRV2_ID_TV.exit)">
            <span>EXIT</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  DEVICE_TRAIT,
  IRV2_ID_TV
} from "@/plugins/variableConst";
import { getIrDataCommand } from "@/plugins/helper";
export default {
  name: "modal-update-deivce-switch",
  props: {
    value: Object,
    device: Object
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
      IRV2_ID_TV,
      DEVICE_TRAIT
    };
  },
  watch: {
    value: updateData,
    device: updateData
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
