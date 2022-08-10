<template>
  <div class="row w-100 h-100 m-0 p-0">
    <div class="col-2 h-100 m-0 p-0" id="deviceConfig">
      <device-controller
      :deviceRemote="deviceRemoteSelect"
      />
    </div>

    <div class="col-10 h-100  m-0 p-0 " id="deviceList">
      <device-list
          @showModalDeviceIn="checkShowModal($event) "
          @deviceRemoteSelect="deviceRemoteSelect = $event"
      />
    </div>

    <modal-device-in
        :ShowModalDeviceIn="isShowModalDeviceIn"
        :device="device"
        :deviceName="device.name"
        @closeModal="isShowModalDeviceIn = false"
    />

    <modal-device-ir
        :ShowModalDeviceIr="isShowModalDeviceIr"
        :device="device"
        @closeModal="isShowModalDeviceIr = false"
    />

    <modal-device-irv2
        :ShowModalDeviceIrv2="isShowModalDeviceIrv2"
        :device="device"
        @closeModal="isShowModalDeviceIrv2 = false"
    />

  </div>
</template>

<script>

import DeviceController from "./DeviceController";
import DeviceList from "./DeviceList";

//model
import ModalDeviceIn from "./Modal/ModalDeviceIn";
import ModalDeviceIr from "./Modal/ModalDeviceIr";
import ModalDeviceIrv2 from "./Modal/ModalDeviceIrv2";

export default {
  name: "index",

  data() {
    return {
      isShowModalDeviceIn: false,
      isShowModalDeviceIr: false,
      isShowModalDeviceIrv2: false,
      deviceRemoteSelect:[],
      device: {}
    }
  },

  components: {
    DeviceController,
    DeviceList,
    ModalDeviceIn,
    ModalDeviceIr,
    ModalDeviceIrv2
  },
  computed: {
    devicesHc,
  },
  methods: {
    checkShowModal
  }


};

function devicesHc() {

  return $state.HomeConfig.devices

}

function checkShowModal(event) {

  this.device = event;
  if (event.type == 'IR' && !event.remoteid) {
   return  this.isShowModalDeviceIr = true;
  }

  if (event.type == 'IRV2' && !event.remoteid) {
    return this.isShowModalDeviceIrv2 = true;
  }

  else {
    console.log('event', event)
    return this.isShowModalDeviceIn = true;
  }

}

</script>

<style scoped lang="scss">

#deviceConfig {
  min-width: 230px !important;
  max-width: 230px !important;
}

#deviceList {
  min-width: calc(100% - 230px) !important;
  max-width: calc(100% - 230px) !important;
}
</style>
