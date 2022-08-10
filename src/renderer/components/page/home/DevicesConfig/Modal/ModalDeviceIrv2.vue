<template>
  <modal-icon
      :show.sync="ShowModalDeviceIrv2"
      :showClose="false"
      modalClasses="modal-input"
      footerClasses="p-0"
      id="ModalDeviceIrv2"
      modal-classes=""
  >

    <h5 class="text-center mb-3">{{ this.$t("deviceList.text.device") }}</h5>

    <p>{{ $t("deviceList.text.name") }}</p>

    <div class="form-group">

      <base-input
          maxlength="30"
          type="text"
          v-model="deviceName"
          :placeholder="$t('deviceList.text.deviceName')"
          class="mb-0 "
          :class=" {'inputError':!isNameValid}"
          @input="checkNameValid"
          @keyup.enter="addIR"
      />

      <span class="input-device-error" v-show="nameError">{{ nameError }}</span>

    </div>

    <div class="form-group">
      <p>{{ $t("deviceList.text.select-type-remote") }}</p>
      <div>
        <div class="w-100" id="remoteSelect">

          <div slot="title" type="secondary"
               class="dropdown-toggle select-remote"
               :class="{'inputError': !isChannelValid}"
               @click="showAndHiddenMenu"
          >
            {{ deviceChoose === '' ? $t('deviceList.text.select-remote') : deviceChoose }}

            <icon v-if="showListDevice" class="mdi mdi-menu-up show-icon"/>
            <icon v-else class="mdi mdi-menu-down show-icon"/>
          </div>
          <div v-if="showListDevice" class="list-device-library">
            <menu-ir
                @selectIrDevice="checkDevice"
                @changeStatusRemote="isChannelValid = true; channelError=''"
                :isChannelValid="isChannelValid"
            />
          </div>
          <air-conditional
              :showAirRemote="showAirRemote"
              ref="airRemote"
              :device="device"
          />

          <tv-set-top-box
              :showTvSetTopBox="showTvSetTopBox"
              ref="tvSetTopBox"
              :device="device"
          />

          <fan-remote
              :showFanRemote="showFanRemote"
              ref="fanRemote"
              :device="device"
          />
        </div>
      </div>
      <span class="input-device-error" v-show="channelError">{{ channelError }}</span>
    </div>


    <template slot="footer">
      <base-button @click="addIR">{{ $t('confirm') }}</base-button>
      <base-button class="ml-auto" @click=" setDefault">{{
          $t('cancel')
        }}
      </base-button>
    </template>
  </modal-icon>
</template>

<script>

import ModalIcon from "../../../../base/element/ModalIcon";
import MenuIr from "./ir-template/MenuIr";
import AirConditional from "./ir-template/AirConditional";
import TvSetTopBox from "./ir-template/TvSetTopBox";
import {
  IR_TYPE
} from "@/plugins/helper";
import FanRemote from "./ir-template/FanRemote";
import {checkNameValid} from "../../../account/function";


export default {
  name: "model-device-ir",
  props: {
    ShowModalDeviceIrv2: {
      type: Boolean,
      default: false,

    },
    device: {
      type: Object
    },

  },
  data() {

    return {
      showMenu: false,
      deviceName: '',
      deviceChoose: '',
      showListDevice: false,
      isNameValid: true,
      isChannelValid: true,
      nameError: '',
      showAirRemote: false,
      showTvSetTopBox: false,
      showFanRemote: false,
      channelError: '',
      irType: ''
    };
  },

  methods: {
    setDefault,
    checkNameValid,
    addIR,
    checkDevice,
    showAndHiddenMenu,
    isEmpty,
    checkSubmitValid
  },

  created() {
    $dispatch($api.IrTemplate.getIrAC);
    $dispatch($api.IrTemplate.getIrFan);
    $dispatch($api.IrTemplate.getIrSTB);
    $dispatch($api.IrTemplate.getIrTV);
  },

  components: {
    TvSetTopBox,
    ModalIcon,
    MenuIr,
    FanRemote,
    AirConditional
  }
}


function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

function showAndHiddenMenu() {
  this.showListDevice = !this.showListDevice;
  this.showAirRemote = false;
  this.showTvSetTopBox = false;
  this.showFanRemote = false;
  this.deviceChoose = ''
  this.channelError = '';
  this.isChannelValid = true
  $commit('IrRemote/UPDATE_CURRENT_CHANNEL', {})
}

function checkDevice(devicename, irtype) {

  //CSS

  this.isChannelValid = true;
  this.channelError = '';

  //Value
  this.deviceChoose = devicename;
  this.showListDevice = false;
  this.irType = irtype;


  console.log('myir', irtype)
  if (irtype == 'IR_AC') {

    this.showAirRemote = true;
    this.$refs.airRemote.getDefaultChannel(1);
  }

  if (irtype == 'IR_TV' || irtype == 'IR_STB') {
    this.showTvSetTopBox = true;
    this.$refs.tvSetTopBox.getDefaultChannel(1);
  }

  if (irtype == 'IR_FAN') {
    this.showFanRemote = true;
    this.$refs.fanRemote.getDefaultChannel(1);
  }

}

function setDefault() {
  this.deviceName = '';
  this.nameError = '';
  this.channelError = '';
  this.deviceChoose = '';
  this.isNameValid = true;
  this.isChannelValid = true;
  this.showListDevice = false;

  //Show
  this.showAirRemote = false;
  this.showTvSetTopBox = false;
  this.showFanRemote = false;
  $commit('IrRemote/UPDATE_CURRENT_CHANNEL', {})
  this.$emit('closeModal')
}


async function addIR() {
  let channelAC = $state.IrRemote.currentChannel
  if (this.checkSubmitValid(channelAC) && !isEmpty(channelAC)) {
    let deviceName = this.deviceName.trim();
    this.device.name = deviceName

    console.log('this.device', this.device)
    await $dispatch('HomeConfig/onAddIRv2', {device: this.device, irtype: this.irType, irData: channelAC})
    $commit('IrRemote/UPDATE_CURRENT_CHANNEL', {})

    await $dispatch($api.HomeConfig.getListHomeConfigByHomeID, {
      homeid: Number(this.$route.params.homeID)
    });
    this.setDefault()
  }


}

function checkSubmitValid(channelAC) {

  if (isEmpty(channelAC) == true) {
    this.isChannelValid = false
    this.channelError = this.$t('deviceList.text.please-select-remote')
  }
  if (this.deviceName == '') {
    this.isNameValid = false
    this.nameError = this.$t('deviceList.text.not-empty-device-name')
    return false
  }

  if (this.deviceName) {
    let deviceName = this.deviceName.trim();

    if (!deviceName) {
      this.isNameValid = false
      this.nameError = this.$t('deviceList.text.not-empty-device-name')
      return false
    }
  }

  return true

}


</script>

<style lang="scss">

#ModalDeviceIrv2 {
  .input-device-error {
    color: #F63737 !important;

  }

  padding-top: 29px;
  overflow: hidden;

  .inputError {
    border: 1px solid #F63737;
    border-radius: 7px;
  }

  .ir-device {

    padding-top: 10px;

    li {
      list-style-type: none;
      border-bottom: 1px solid white;
      position: relative;
      left: -25px;
      margin-bottom: 8px;
    }

  }

  .modal-content {
    width: 450px !important;
    height: auto !important;
    position: absolute !important;
    left: 56px !important;

    .modal-body {
      width: 450px !important;
      padding: 18px 15px 10px 18px !important;

      p {
        font-size: 18px;
      }


      input {
        font-size: 18px;
      }

      ::-webkit-input-placeholder {
        text-align: center;
      }

      :-moz-placeholder { /* Firefox 18- */
        text-align: center;
      }

      ::-moz-placeholder { /* Firefox 19+ */
        text-align: center;
      }

      :-ms-input-placeholder {
        text-align: center;
      }

      #remoteSelect {

        > li {
          width: 100%;
        }

        .select-remote {
          width: 100%;
          text-align: left;
          font-size: 15px;
          height: 40px;
          line-height: 40px;
          border-radius: 7px;
          margin-bottom: 8px;
          padding: 0 10px 0 10px;
          z-index: 1;
          position: relative;

          .icon-shape {
            float: right;
            font-size: 32px;
          }

        }

        .list-device-library {
          width: 100%;
          position: relative;
          top: -11px;
          z-index: 0;
          padding: 14px 0;
          border-radius: 5px;
          max-height: 424px;
          overflow-y: scroll;

          .dropdown-item {
            width: 100%;
          }

          .icon-typical {
            float: right;
            font-size: 20px;
          }

        }

      }

    }

    .device-ir {
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 7px;
      margin-bottom: 8px;
    }

    .device-ir:hover {
      cursor: pointer;
    }

  }


}


</style>
