<template>
  <modal-icon

      :show.sync="ShowModalDeviceIn"
      :showClose="false"
      modalClasses="modal-input"
      footerClasses="p-0"
      id="ModalDeviceIn"
  >
    <h5 class="text-center mb-3">{{ this.$t("deviceList.text.device") }}</h5>
    <p>{{ $t("deviceList.text.deviceName") }}</p>

    <div class="form-group">
      <base-input
          maxlength="30"
          type="text"
          :placeholder="$t('deviceList.text.inputDeviceName')"
          @keyup.enter="changeNameAndIcon(device)"
          @input="checkNameValid"
          :class="{'isInputValid': !isNameValid }"
          v-model="deviceName"
          class="mb-0"
      />
      <span class="input-device-error" v-show="nameError">{{ nameError }}</span>
    </div>

    <p>Icon</p>

    <div class="form-group" id="iconDevice">

      <base-dropdown v-if="selectIconDevices && selectIconDevices.length >= 1">
        <button slot="title" @click="showMenu =! showMenu" class="dropdown-toggle">
          <i class="icon-config"
             :class="newDeviceInfo.icon === '' ? 'icon-'+ getDefaultIconDevice(device, device.status&&device.status.states): 'icon-'+ newDeviceInfo.icon"></i>
          <span style=" float: left">
            {{
              this.newDeviceInfo.icon == '' ? this.$t('devices.' + getDefaultIconDevice(device, device.status && device.status.states)) : this.$t('devices.' + this.newDeviceInfo.icon)
            }}

          </span>

          <icon v-if="showMenu" class="mdi mdi-menu-up show-icon"/>
          <icon v-else class="mdi mdi-menu-down show-icon"/>
        </button>


        <li @click="changeIcon(icon.key,$t(icon.name) )" class="icon-device" v-for="(icon,index) in selectIconDevices"
            :key="index">
          <i :class="'icon-'+icon.key"><span>{{ $t(icon.name) }}</span></i>
        </li>

      </base-dropdown>

      <div v-else class="button-no-change-icon disabled">
        <i
            :class="newDeviceInfo.icon === '' ? 'icon-'+ getDefaultIconDevice(device, device.status&&device.status.states): 'icon-'+ newDeviceInfo.icon"></i>
        <span style=" float: left">
            {{
            this.newDeviceInfo.icon == '' ? this.$t('devices.' + getDefaultIconDevice(device, device.status && device.status.states)) : this.$t('devices.' + this.newDeviceInfo.icon)
          }}
          </span>

      </div>


    </div>


    <template slot="footer">
      <base-button @click="changeNameAndIcon(device)">{{ $t('confirm') }}</base-button>
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
  getDefaultIconDevice,
  getIconByTypeForSetting
} from "@/plugins/helper";

export default {
  name: "model-device-in",
  props: {
    ShowModalDeviceIn: {
      type: Boolean,
      default: false,

    },
    device: {
      type: Object
    },
    deviceName: {
      type: String
    }
  },
  data() {
    return {
      showMenu: false,
      isNameValid: true,
      newDeviceInfo: {
        icon: '',
        deviceName: '',
        iconName: 'Thiết bị',
      },
      nameError: ''
    };
  },
  methods: {
    getDefaultIconDevice,
    getIconByTypeForSetting,
    changeNameAndIcon,
    changeIcon,
    setDefault,
    setDefaultDeviceName,
    checkNameValid
  },

  computed: {
    selectIconDevices
  },
  components: {
    ModalIcon,
  }
}



function selectIconDevices() {

  this.deviceName = this.device.name;
  return this.getIconByTypeForSetting(this.device)

}

function changeNameAndIcon(device) {

  if (this.deviceName !== '') {
    let deviceName = this.deviceName.trim()

    if (deviceName) {
      if (device.remoteid) {
        $dispatch("HomeConfig/changeNameRemote", {
          remoteid: device.remoteid,
          name: deviceName
        });
      } else {
        $dispatch('HomeConfig/changeNameDeivce', {
          devid: device.devid,
          name: deviceName
        })
      }
    } else {
      this.isNameValid = false
      return this.nameError = this.$t('deviceList.text.not-space-first-characters')
    }


    if (this.newDeviceInfo.icon) {
      $dispatch($api.HomeConfig.changeIconDevices, {
        devid: device.devid,
        iconkey: this.newDeviceInfo.icon,
        real_type: device.type
      })
    }
    this.newDeviceInfo.icon = '';
    this.nameError = ''
    this.deviceName = '';
    this.newDeviceInfo.iconName = 'Biểu tượng';

    this.$emit('closeModal')

  }


}

function setDefault() {
  this.newDeviceInfo.icon = '';
  this.deviceName = '';
  this.nameError = ''
  this.newDeviceInfo.iconName = 'Biểu tượng';
  this.isNameValid = true;

  this.$emit('closeModal')

}

function changeIcon(iconKey, iconName) {
  this.newDeviceInfo.icon = iconKey
  this.newDeviceInfo.iconName = iconName
}

function setDefaultDeviceName() {
  return this.device.name;
}


</script>

<style lang="scss">

#ModalDeviceIn {

  .isInputValid {
    border: 1px solid #F63737;
    border-radius: 7px;
  }

  .modal-content {
    width: 450px !important;
    min-height: 350px !important;
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

        .button-no-change-icon {
          background-color: #393933;
          border: none;
          color: #fff;
          position: relative;
          height: 46px;
          width: 100%;
          padding: 0 20px;
          border-radius: 7px;

          i:first-child {
            float: left;
            font-size: 34px;
            line-height: 46px;
            margin-right: 29px;
          }

          span {
            float: left;
            line-height: 46px;
          }

          .mdi-menu-down {
            float: right;
            font-size: 24px;
            line-height: 46px;
            position: relative;
            left: 35px;
          }


        }

        li {
          width: 100%;

          button {
            width: 100%;
            height: 45px;
            color: white;
            border-radius: 8px;
            background: #393933;
            position: absolute;
            z-index: 2;


            .icon-config {
              font-size: 31px;
              float: left;
              padding-left: 21px;
              padding-right: 33px;
            }

            .show-icon {
              position: absolute;
              right: 0px;
              bottom: 3%;
              top: 25%;
              font-size: 25px;
              height: 0px;
            }

            span {
              padding-top: 2px;
            }
          }
        }

        ul {
          background: #201a1a;
          color: white;
          font-size: 30px;
          width: 100%;
          z-index: 1;
          overflow: auto;
          max-height: 300px;
          top: 32px;

          li:hover {
            background-color: #707070;
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
    }


  }

}


</style>
