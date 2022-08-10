<template>
  <div class="w-100 h-100 m-0 pl-4 overflow-auto " id="deviceController">
    <h5 class="pt-3 pb-4 title">{{ this.$t('deviceController.text.Remotecontroll') }}</h5>
    <div class="spinner-border text-success"></div>
    <div v-for="(hc,index) in homeInfo_hcs"
         :key="index"
         :style="hcsDevices.includes(hc.mac) ? 'height:auto': 'height:30px'"
         class="deivceConfig mb-4"
    >

      <div @click=" showOrHiddenHc(hc.mac)" class="col row m-0 p-0 hc-title">
        <div class="col-12 m-0 p-0">

          <h5 class="pb-1 "
              :class="hc.is_connect?'text-success':'text-warning'"
          >
            {{ hc.is_master ? 'HC' : 'LC' }}_{{ hc.mac.slice(12).toUpperCase() }} ({{ countDevicesInHc(hc.hc_id) }})
          </h5>

          <icon v-if="hcsDevices.includes(hc.mac)" class="mdi mdi-chevron-up iconHc"/>
          <icon v-else class="mdi mdi-chevron-down iconHc"/>
        </div>
      </div>

      <div class="boxDevice">

        <div
            v-for="(device,index) in deveicesOption"
            :key="index"

        >

          <div v-if="check_show_HcLc( hc.is_master, device.name) == true"
               class="typeDevice"
               :style=" typeDevicesHc.includes(`id:${hc.mac}_${device.name}`)? 'height:auto; color:white' : 'height:30px'  "
          >


            <div @click="showOrHiddenTypeDevice(hc.mac, device.name) ">
              {{ device.name }}
              <i v-if=" typeDevicesHc.includes(`id:${hc.mac}_${device.name}`) "
                 class="mdi mdi-chevron-up icon-type-device"></i>
              <i v-else class="mdi mdi-chevron-down icon-type-device"></i>
            </div>

            <ul class="p-0 listConfig">
              <li v-if="device.connect !== undefined "
                  :class="statusConfig.status == 1 && statusConfig.bridgeKey == device.brigde_key && statusConfig.machc == hc.mac ? 'loadDevice' : 'unLoadDevice' "

                  @click="addDevices(1,device.brigde_key,hc.mac,`${device.name}${hc.mac}`)">

                <div style="float:left">
                  {{ device.connect }}
                </div>

                <div class="loader">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>

                </div>
              </li>

              <li v-if="device.disconnect !== undefined "
                  @click="disConnectDevice(0,device.brigde_key,hc.mac,`${device.name}${hc.mac}`)"
              >{{ device.disconnect }}
              </li>

              <li v-if="device.deviceSync !== undefined "
                  @click="syncDevices(device.brigde_key,hc.mac,`Sync${device.brigde_key}`)"
              >
                <div style="float:left">
                  {{ device.deviceSync }}
                </div>
              </li>

              <li v-if="device.removeSelect !== undefined ">{{ device.removeSelect }}</li>

              <li v-if="device.removeAll !== undefined "
                  :id="`colorRemove${device.name}${hc.mac}`"
                  @click="removeDevices(device.brigde_key,hc.mac,`${device.name}${hc.mac}`)">

                <div style="float:left">
                  {{ device.removeAll }}
                </div>

                <div :id="`remove${device.name}${hc.mac}`"
                     style="float:left; margin-top: 8px; margin-left: 5px; display: none" class="loader"></div>
              </li>
            </ul>

          </div>


        </div>

        <div class="typeDevice"
             id="deleteSelectDevice"
             :style="typeDevicesHc.includes(`id:${hc.mac}_${deleteSelectDevice.name}`)? 'height:auto; color:white':''  "
             @click="deleteSelectDeviceRemote "
        >
          {{ deleteSelectDevice.name }}
        </div>
      </div>
    </div>

    <modal :show.sync="modal"
           :showClose="false"
           modalClasses="modal-input"
           footerClasses="p-0"
    >

      <h5 class="modal-title, text-center p-4" id="exampleModalLabel">
        {{ this.$t('deviceController.text.LoginPassword') }}</h5>


      <base-input
          class="iconPassWord"
          inputID="password"
          :placeholder=" $t('deviceController.text.LoginPassword') "
          :addon-right-icon="password.length > 1 ?'mdi mdi-close':''"
          @rightIconClick="password = '' "
          maxlength="15"
          @keyup.enter="deleteDevices"
          v-model="password"
      />
      <template slot="footer">
        <base-button @click="deleteDevices">{{ $t('confirm') }}</base-button>
        <base-button class="ml-auto" @click="modal=false">{{ $t('cancel') }}</base-button>
      </template>
    </modal>
  </div>
</template>

<script>
import {md5} from "../../account/function";

export default {
  name: "DeviceController",
  props: ['deviceRemote'],
  data() {
    return {
      hcsDevices: [],
      typeDevicesHc: [],
      showHiddenHc: [],
      brigde_key: '',
      machc: '',
      deleteSelectDevice: {
        name: this.$t('deviceController.text.deleteSelectDevice'),
        show: false
      },

      deveicesOption: [
        {
          name: "Zigbee",
          connect: this.$t('deviceController.deveicesOption.connect'),
          disconnect: this.$t('deviceController.deveicesOption.disconnect'),
          removeAll: this.$t('deviceController.deveicesOption.removeAll'),
          brigde_key: "zigbee",
          show: false
        },

        {
          name: "Bluetooth",
          connect: this.$t('deviceController.deveicesOption.connect'),
          disconnect: this.$t('deviceController.deveicesOption.disconnect'),
          removeAll: this.$t('deviceController.deveicesOption.removeAll'),
          brigde_key: "bluetooth",
          show: false
        },
        {
          name: "Loa",
          connect: this.$t('deviceController.deveicesOption.connectSpeaker'),
          disconnect: this.$t('deviceController.deveicesOption.disFind'),
          removeAll: this.$t('deviceController.deveicesOption.removeAllSpeaker'),
          brigde_key: "speaker",
          show: false
        },
        {
          name: this.$t('deviceController.deveicesOption.virtualSwitch'),
          connect: this.$t('deviceController.deveicesOption.addDevice'),
          removeAll: this.$t('deviceController.deveicesOption.removeAll'),
          brigde_key: "virtual",
          show: false
        },
        {
          name: "Cool master",
          connect: this.$t('deviceController.deveicesOption.addDevice'),
          removeAll: this.$t('deviceController.deveicesOption.removeAll'),
          deviceSync: this.$t('deviceController.deveicesOption.deviceSync'),
          brigde_key: "coolmaster",
          show: false
        },

      ],
      hcSelect: false,
      typeDevice: "",
      modal: false,
      password: "",
      isShowPassword: false,
    };
  },

  methods: {
    addDevices,
    disConnectDevice,
    removeDevices,
    syncDevices,
    deleteDevices,
    showOrHiddenHc,
    check_show_HcLc,
    showOrHiddenTypeDevice,
    countDevicesInHc,
    deleteSelectDeviceRemote
  },

  computed: {
    homeInfo_hcs,
    statusConfig
  },
}


async function deleteSelectDeviceRemote() {


  if (this.deviceRemote.length >= 1) {
    let confirm = await $alertify.custom({
      title: this.$t("notify.notifyWarninglTitle"),
      text: this.$t("deviceController.text.confirmDeleteSelectDevice"),
      showCancelButton: true,
      cancelButtonText: this.$t("cancel"),
      confirmButtonText: this.$t("confirm")
    });

    if (confirm.isConfirmed) {

      let deviceOut = [];
      let remoteOut = [];

      this.deviceRemote.forEach(function (devid) {
        if (devid !== '') {
          devid.length <= 9 ? remoteOut.push(devid) : deviceOut.push(devid)
        }
      })


      if (deviceOut.length > 0) {

        $dispatch($api.HomeConfig.deleteSelectRemote, {deviceRemoteOut: deviceOut, typeDR: 'devices'});
      }

      if (remoteOut.length > 0) {

        $dispatch($api.HomeConfig.deleteSelectRemote, {deviceRemoteOut: remoteOut, typeDR: 'remotes'});

      }

    }
  }

  this.deviceRemote = []

}

function countDevicesInHc(hcid) {

  let devices = $state.HomeConfig.devices;

  let devicesInHc = devices.filter(device => device.hc_id == hcid).length

  return devicesInHc


}

function check_show_HcLc(hc_is_Master, deviceName) {

  if (hc_is_Master == 0 && deviceName == this.$t('deviceController.deveicesOption.speaker')) {
    return false
  }

  if (hc_is_Master == 0 && deviceName == 'Cool master') {
    return false
  }

  if (hc_is_Master == 0 && deviceName == this.$t('deviceController.deveicesOption.virtualSwitch')) {
    return false
  }

  return true

}

function homeInfo_hcs() {

  let hcs = $state.HomeConfig.hcs
  let new_hcs = hcs.map(hc => {
    return {...hc, show: false}
  })
  return hcs.map(hc => {
    return {...hc, show: true}
  })
}

function statusConfig() {
  return $state.HomeControll.deviceJoin
}

async function addDevices(action, brigde_key, machc, id) {

  if (brigde_key == "coolmaster") {
    let ip = await $alertify.promp("Nhập IP ", "text");
    if (ip.isConfirmed) {
      if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip.value)) {
        return $dispatch($api.HomeConfig.addDevices, {
          brigde_key: brigde_key,
          machc: machc,
          ip: ip.value
        })
      } else {
        $alertify.confirmHome({
          text: this.$t('deviceController.deveicesOption.deviceSync'),
        });
      }
    }


  } else {

    $dispatch($api.HomeConfig.addDevices, {
      action: action,
      brigde_key: brigde_key,
      machc: machc
    });
  }

}

function disConnectDevice(action, brigde_key, machc, id) {
  $dispatch($api.HomeConfig.addDevices, {
    brigde_key: brigde_key,
    action: action,
    machc: machc
  });
}

function syncDevices(brigde_key, machc, id) {


  $dispatch($api.HomeConfig.syncDevices, {
    brigde_key: brigde_key,
    machc: machc
  });


}

async function removeDevices(brigde_key, machc, id) {

  document.getElementById('colorRemove' + id).style.color = '#ee9723';

  let device = this.$t(`devices.TYPE.${brigde_key.toUpperCase()}`)
  let confirm = await $alertify.custom({
    title: this.$t("notify.notifyWarninglTitle"),
    text: this.$t("deviceController.text.confirmDeleteDevice", {msg: device}),
    showCancelButton: true,
    cancelButtonText: this.$t("cancel"),
    confirmButtonText: this.$t("confirm")
  });


  document.getElementById('colorRemove' + id).style.color = null;

  if (!confirm.isConfirmed) return;

  this.machc = machc;
  this.brigde_key = brigde_key
  this.modal = true


}

function deleteDevices() {

  let wrongPasswrd = this.$t("deviceController.text.wrongPass")
  if (md5(this.password) == localStorage.getItem("password")) {
    $dispatch($api.HomeConfig.removeDevices, {
      brigde_key: this.brigde_key,
      machc: this.machc
    });
  } else {
    $alertify.confirmHome({
      text: wrongPasswrd
    });
  }

  this.modal = false
  this.brigde_key = '';
  this.machc = '';
  this.password = ''

}


function showOrHiddenHc(hcmac) {

  let checkHc = this.hcsDevices.includes(hcmac)
  if (checkHc == false) {
    this.hcsDevices.push(hcmac)
  } else {
    this.hcsDevices = this.hcsDevices.filter(hc => hc !== hcmac)
  }
}

function showOrHiddenTypeDevice(hcid, devicename) {
  let typeName = `id:${hcid}_${devicename}`

  let checkType = this.typeDevicesHc.includes(typeName)

  if (checkType == false) {
    this.typeDevicesHc.push(typeName)

  } else {
    this.typeDevicesHc = this.typeDevicesHc.filter(type => type !== typeName)
  }
}


</script>

<style lang="scss">
.icon-cutain-screen-0:before {
  color: #ffffff!important;
}

#deviceConfig {

  .input-group-append {
    position: relative;
    z-index: 10000;

    .input-group-text {
      background: none !important;
      border: none;
      position: absolute;
      right: 5px;
      top: 2px;
      color: white;
    }
  }


  #deviceController {
    background: #4a4a44;
    border-radius: 8px;

    .title {
      color: #ee9723;
      font-size: 1.3em;
    }

    h5 {
      font-size: 1.2em;
    }

    .hc-title > div {
      float: left;
      height: 42px;
    }

    .deivceConfig {
      overflow: auto;
      overflow-x: hidden;
      overflow-y: hidden;
      margin-top: 10px;
      transition: height 0.5s;
      position: relative;

      .boxDevice {
        margin-top: -7px !important;

        #deleteSelectDevice {
          cursor: pointer;
        }

        #deleteSelectDevice:active {
          color: #ee9723;

        }

        ul li {
          font-weight: normal;
          cursor: pointer;
        }

      }

      .typeDevice {
        overflow: auto;
        overflow-x: hidden;
        overflow-y: hidden;
        transition: height 0.5s;
        font-weight: bold;
        position: relative;

        margin: 5px 0 5px 0;

        i {
          font-weight: normal !important;
          top: 3px;
          font-size: 22px;
          padding-left: 5px;
        }

        .listConfig {
          margin-left: 21px;
          margin-top: 8px;
          font-size: 15px;

          li:active {
            color: #ee9723;
          }

          .loadDevice {

            color: #ee9723;

            .loader {
              float: left;
              margin-top: 6.5px;
              margin-left: 5px;
              display: block;
            }

          }

          .unLoadDevice {

            color: white;

            .loader {
              float: left;
              margin-top: 6.5px;
              margin-left: 5px;
              display: none
            }
          }

        }

      }
    }

    .iconHc {
      padding-bottom: 30px;
      padding-left: 3px;
      font-size: 24px;
      box-sizing: border-box;
    }

    .icon-type-device {
      position: absolute;
      font-size: 15px;
    }

    .text-success {
      color: #18e16f !important;
      float: left;
    }

    .text-warning {
      color: red !important;
      float: left;
    }
  }
}


.loader {
  display: block;
  position: relative;
  width: 11px;
  height: 11px;
}

.loader div {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  display: block;
  position: absolute;
  width: 11px;
  height: 11px;
  margin-top: 2.5px;
  margin-left: 2px;
  border: 0.5px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}

.loader div:nth-child(1) {
  animation-delay: -0.45s;
}

.loader div:nth-child(2) {
  animation-delay: -0.3s;
}

.loader div:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
