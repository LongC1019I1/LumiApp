<template >
  <modal
    v-if="modalControllDaikin"
    :show="true"
    :showClose="false"
    :animationDuration="0"
    @close="closeModal"
    :backdropClick="false"
    modalClasses="modal-controll modal-controll-daikin modal-full-height"
    headerClasses="text-center"
    :device="device"
    :status="status"
  >
    <div slot="header" class="w-100 text-center">
      <span>{{device&&device.name}}</span>
      <i class="pull-right c-p mdi mdi-window-close pull-right" @click="closeModal"></i>
    </div>
    <div class="info-box m-3" :class="{active:currentValue.power}">
      <div class="top-info">
        <span v-if="status.status=='SUCCESS'||status.status==1" class="text-success">Online</span>
        <span v-else class="text-danger">Offline</span>
        <div>
          <i class="icon-ic-zw-heat-alarm"></i>
          <span>{{currentValue.tempRoom||'--'}}°C</span>
        </div>
      </div>
      <div class="temperature mt-3 mb-4">
        <span>{{currentValue.power?currentValue.temp+'°C':'--'}}</span>
      </div>
      <div class="mode pt-2">
        <div>
          <div>
            <i :class="'icon-'+MODE_DAIKIN.find(item=>item.mode==currentValue.mode).icon"></i>
          </div>
          <div>
            <span>Mode:</span>
            <span>{{MODE_DAIKIN.find(item=>item.mode==currentValue.mode).name||'--'}}</span>
          </div>
        </div>
        <div>
          <div>
            <i class="icon-ic-zw-fan"></i>
          </div>
          <div>
            <span>Fan:</span>
            <span>{{SPEED_DAIKIN.find(item=>item.speed==currentValue.fan).name||'--'}}</span>
          </div>
        </div>
        <div>
          <div>
            <i class="icon-icon-ir-ac-swing"></i>
          </div>
          <div>
            <span>Swing:</span>
            <span>{{SWING_DAIKIN.find(item=>item.swing==currentValue.swing).name||'--'}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="controll-form controll-daikin m-3 pt-4">
      <h5>{{$t('devices.temp')}}</h5>
      <div class="mt-3 p-2">
        <vue-slider
          class="daikin-slider"
          @drag-end="controllDaikin({
              command:DEVICE_TRAIT.TemperatureControl,
              params:{
                temperatureControl:currentValue.temp
              }})"
          :drag-on-click="true"
          v-model="currentValue.temp"
          :min="TEMP_DAIKIN.min"
          :max="TEMP_DAIKIN.max"
          tooltip="none"
        />
      </div>
      <div class="button-daikin">
        <div>
          <div
            class="wave c-p"
            @click="controllDaikin({
              command:DEVICE_TRAIT.OnOff,
              params:{
                on:!currentValue.power
              }})"
          >
            <i class="mdi mdi-power"></i>
          </div>
          <span>Power</span>
        </div>
        <div>
          <div
            class="wave c-p"
            :class="{disabled:!currentValue.power}"
            @click="currentValue.power?controllDaikin({
              command:DEVICE_TRAIT.TemperatureSetting,
              params:{
                temperatureSetting: currentValue.mode==4?0:currentValue.mode+1
              }}):''"
          >
            <i class="mdi mdi-snowflake"></i>
          </div>
          <span>Mode</span>
        </div>
        <div>
          <div
            class="wave c-p"
            :class="{disabled:!currentValue.power}"
            @click="currentValue.power?controllDaikin({
              command:DEVICE_TRAIT.Speed,
              params:{
                speed: currentValue.fan==3?1:currentValue.fan+1
              }}):''"
          >
            <i class="icon-ic-zw-fan"></i>
          </div>
          <span>Fan</span>
        </div>
        <div>
          <div
            class="wave c-p"
            :class="{disabled:!currentValue.power}"
            @click="currentValue.power?controllDaikin({
              command:DEVICE_TRAIT.Swing,
              params:{
                swing: currentValue.swing==6?0:currentValue.swing+1
              }}):''"
          >
            <i class="icon-icon-ir-fan-swing"></i>
          </div>
          <span>Swing</span>
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
import {
  DEVICE_TRAIT,
  SPEED_DAIKIN,
  SWING_DAIKIN,
  MODE_DAIKIN,
  TEMP_DAIKIN
} from "@/plugins/variableConst";

export default {
  name: "controll-daikin",
  data() {
    return {
      currentValue: {
        power: 0,
        temp: TEMP_DAIKIN.min,
        mode: 0,
        fan: 0,
        swing: 0,
        tempRoom: 0
      },
      SPEED_DAIKIN,
      SWING_DAIKIN,
      MODE_DAIKIN,
      TEMP_DAIKIN,
      DEVICE_TRAIT
    };
  },
  computed: {
    modalControllDaikin,
    device,
    status
  },
  methods: {
    closeModal,
    controllDaikin,
  }
};

function device() {
  return $getters["HomeConfig/getDevice"](this.modalControllDaikin);
}

function status() {
  let status = $getters["HomeControll/getDeviceStatusByDeviceID"](
    this.modalControllDaikin
  );
  if (status && status.states) {
    let {
      OnOff,
      Speed,
      Swing,
      TemperatureControl,
      TemperatureSetting,
      Temperature
    } = status.states;
    this.currentValue.power = OnOff&&OnOff.on||0;
    this.currentValue.fan = Speed&&Speed.speed||0;
    this.currentValue.swing = Swing&&Swing.swing||0;
    this.currentValue.mode = TemperatureSetting&&TemperatureSetting.temperatureSetting||0;
    this.currentValue.temp = TemperatureControl&&TemperatureControl.temperatureControl||TEMP_DAIKIN.min;
    this.currentValue.tempRoom = Temperature&&Temperature.temperature||0;
  }
  return status;
}

function modalControllDaikin() {
  return $state.ContentManager.modal.modalControllDaikin;
}

function closeModal() {
  $commit("ContentManager/UPDATE_MODAL_STATUS", {
    modal: "modalControllDaikin",
    data: false
  });
}

function controllDaikin(execution) {
  return $dispatch($api.HomeControll.controllDevice, {
    devid: this.device.devid,
    execution
  });
}
</script>
<style scope lang="scss">
.modal-controll.modal-controll-daikin {
  .modal-body {
    .info-box {
      border-radius: 1rem;
      padding: 1rem;
      .top-info {
        display: flex;
        justify-content: space-between;
      }
      .temperature {
        font-size: 3rem;
        text-align: center;
      }
      .mode {
        display: flex;
        justify-content: space-around;
        div {
          text-align: center;
          i {
            font-size: 1.5rem;
          }
        }
      }
    }
    .controll-form {
      .button-daikin {
        display: flex;
        justify-content: space-between;
        & > div {
          position: relative;
          & > div {
            position: relative;
            height: 5rem;
            width: 5rem;
            border-radius: 1rem;
            font-size: 3rem;
            margin: 2rem 0;
            text-align: center;
            &.disabled{
              cursor: not-allowed;
            }
          }
          span {
            position: absolute;
            bottom: 0rem;
            left: 50%;
            transform: translateX(-50%);
          }
        }
        
      }
    }
  }
}
</style>
