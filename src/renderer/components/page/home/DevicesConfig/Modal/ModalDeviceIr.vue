<template>
  <modal-icon
      :show.sync="ShowModalDeviceIr"
      :showClose="false"
      modalClasses="modal-input"
      footerClasses="p-0"
      id="ModalDeviceIr"

  >
    <h5 class="text-center mb-3">{{ this.$t("deviceList.text.device") }}</h5>
    <p>{{ $t("deviceList.text.deviceName") }}</p>

    <div class="form-group">
      <base-input
          maxlength="30"
          type="text"
          v-model="deviceName"
          :placeholder="$t('deviceList.text.inputDeviceName')"
          class="mb-0 "
          :class=" {'inputError':!isNameValid}"
          @input="checkNameValid"
          @keyup.enter="addIR"
      />
      <span class="input-device-error" v-show="nameError">{{ nameError }}</span>
    </div>

    <p>{{ $t("deviceList.text.addRemote") }}</p>

    <button @click="realIR = IR_TYPE.REMOTE_AIR; IrError='' " class="w-100 device-ir"
            :style=" realIR == IR_TYPE.REMOTE_AIR? 'background-color: #a9a9a9': '' "
            @keyup.enter="addIR"
    >
      {{ $t('deviceList.text.air-conditioner-controls') }}
    </button>

    <button @click="realIR = IR_TYPE.REMOTE_TV ; IrError='' " class="w-100 device-ir"
            :style=" realIR == IR_TYPE.REMOTE_TV? 'background-color: #a9a9a9': '' "
            @keyup.enter="addIR"
    >
      {{ $t('deviceList.text.control-tv') }}
    </button>

    <button @click="realIR = IR_TYPE.REMOTE_FAN ; IrError='' " class="w-100 device-ir"
            :style=" realIR == IR_TYPE.REMOTE_FAN? 'background-color: #a9a9a9': '' "
            @keyup.enter="addIR"
    >
      {{ $t('deviceList.text.control-swing') }}
    </button>

    <span class="input-device-error" v-show="IrError">{{ IrError }}</span>

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
import {checkNameValid} from "../../../account/function";

import {
  IR_TYPE
} from "@/plugins/variableConst";

export default {
  name: "model-device-ir",
  props: {
    ShowModalDeviceIr: {
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
      realIR: '',
      IR_TYPE,
      isNameValid: true,
      nameError: '',
      IrError: ''
    };
  },

  methods: {
    setDefault,
    checkNameValid,
    addIR
  },

  components: {
    ModalIcon,
  }
}


function setDefault() {
  this.deviceName = '';
  this.realIR = '';
  this.nameError = '';
  this.IrError = '';
  this.isNameValid = true
  this.$emit('closeModal')

}

async function addIR() {


  if (this.deviceName !== '' && this.realIR !== '') {
    let deviceName = this.deviceName.trim()

    console.log('irtype', deviceName)
    if (deviceName) {
      this.device.name = deviceName;
      let device = this.device;
      let irtype = this.realIR;

      await $dispatch('HomeConfig/onAddIR', {device, irtype})

      await $dispatch($api.HomeConfig.getListHomeConfigByHomeID, {
        homeid: Number(this.$route.params.homeID)
      });

      this.$emit('closeModal')
    } else {
      this.isNameValid = false
      return this.nameError = this.$t('deviceList.text.not-empty-device-name')
    }

  }

  //Show Validate

  if (this.deviceName == '') {

    this.isNameValid = false
    this.nameError = this.$t('deviceList.text.not-empty-device-name')
  }

  if (this.deviceName !== '') {

    if (this.deviceName.trim() == '') {
      this.isNameValid = false
      return this.nameError = this.$t('deviceList.text.not-space-first-characters')
    }
  }

  if (this.realIR == '') {
    this.IrError = this.$t('deviceList.text.please-select-remote')
  }



}



</script>

<style lang="scss">

#ModalDeviceIr {

  button:focus {
    outline: none !important;;
  }

  .inputError {
    border: 1px solid #F63737;
    border-radius: 7px;
  }

  .modal-content {
    width: 450px !important;
    height: auto !important;
    position: absolute !important;
    left: 56px !important;
    top: 200px !important;

    .modal-body {
      width: 450px !important;
      padding: 18px 15px 10px 18px !important;

      p {
        font-size: 18px;
      }

      input {
        font-size: 16px;
      }

      #iconDevice {
        position: relative !important;

        .dropdown {
          position: absolute !important;
          top: 0;
        }

        .icon-device {
          padding-left: 28px;
          padding-top: 4px;

          span {
            font-size: 18px;
            margin-left: 33px;
            padding-bottom: 10px;
            display: inline-block;
          }

        }
      }


    }

    .device-ir {
      height: 40px;
      line-height: 40px;
      color: white;
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
