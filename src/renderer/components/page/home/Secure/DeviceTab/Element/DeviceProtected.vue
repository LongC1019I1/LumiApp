<template>
  <div id="deviceProtected">
    <div slot="header" class=" card-header row m-0 p-0 mb-4">
      <div class="col-9">
        <div class="my-header">
          {{ $t('secure.device-secure.off-notification') }}
        </div>

      </div>
      <div class="col-3 ">
        <div class=" float-right add-decvice" @click="showDeviceList = true">
          <i class="mdi mdi-plus "></i>
        </div>
        <div class="float-right mr-2">
          {{ $t('secure.device-secure.add-device') }}
        </div>
      </div>
    </div>

    <div class="card-body row m-0 p-0">
      <div v-for="(device,index) in listDeviceSecure" :key="index" class="device col-2 mb-3">
        <device-on-off-protect
            :device="device"
            @createPin="$emit('createPin')"
            @confirmPinModal="showPinModal = true; deviceCurrent = $event; type = 'device' "
            @contextmenu.native.prevent="$refs.contextmenu.open($event, device)"
        />
      </div>

    </div>

    <add-device
        :isShowModal="showDeviceList"
        @closeModal="showDeviceList = false"
    />

    <pin-modal
        :show-pin-modal="showPinModal"
        :typePin="type"
        @update="onOffDevice"
        @createPin="$emit('createPin')"
        @closeModal="showPinModal = false"
    />

    <vue-context ref="contextmenu" v-slot="{ data }" class="device-context-menu left-secure-menu ">
      <li>
        <a href="#" @click.prevent="deleteDevice(data)">
          <i class="mdi mdi-trash-can"></i>
          <span>{{ $t('secure.deleteDevice') }}</span>
        </a>
      </li>
    </vue-context>
  </div>
</template>


<script>
import DeviceOnOffProtect from "../../../../../base/controll/DeviceOnOffProtect";
import AddDevice from "../Modal/AddDevice";
import PinModal from "../../../../../base/custom/PinModal";

export default {
  name: "DeviceProtected",
  data() {
    return {
      showDeviceList: false,
      showPinModal: false,
      deviceCurrent: {},
      type: ''
    }
  },

  components: {
    PinModal,
    AddDevice,
    DeviceOnOffProtect
  },
  computed: {
    listDeviceSecure,
  },
  methods: {
    onOffDevice,
    deleteDevice
  }
}

function listDeviceSecure() {
  let devices = $state.HomeConfig.devices.filter(dev => dev.protected === 1 || dev.protected === 0)
  let groups = $state.HomeConfig.groups.filter(dev => dev.protected === 1 || dev.protected === 0 && dev.type === 2)

  return [...devices, ...groups]
}

function deleteDevice(device) {
  this.showPinModal = true
  this.currentDevice = device
  this.type = 'delete'
}

async function onOffDevice(type) {

  this.showPinModal = false
  if (type === 'device') {
    // await $dispatch('HomeConfig/deviceSecureProtected', {device: this.deviceCurrent})

    this.deviceCurrent.devid ?  await $dispatch('HomeConfig/deviceSecureProtected', {device: this.deviceCurrent}) : await $dispatch('HomeConfig/groupSecureProtected', {group: this.deviceCurrent})
    await $dispatch($api.HomeConfig.getListHomeConfigByHomeIDNoAnimation, {
      homeid: Number(this.$route.params.homeID)
    });

    await $dispatch($api.HomeConfig.getListHomeConfigByHomeIDNoAnimation, {
      homeid: Number(this.$route.params.homeID)
    });

  } else if (type === 'delete') {
    $dispatch('HomeConfig/deleteSecureProtected', {device: this.currentDevice})
  }


}
</script>

<style lang="scss">

.left-secure-menu {
  border: 1px solid #201a1a !important;
}

.left-secure-menu:hover {
  background: #201a1a !important;
}

#deviceProtected {
  .card-body {
    .device {
      //width: 140px;
      //height: 140px;

      margin-bottom: 20px;

      .device-item {
        background: #393933;
        border-radius: 8px;
      }
    }
  }
}

@media  (max-width: 1565px) {

  #deviceProtected {
    .col-2 {
      flex: 0 0 25% !important;
      max-width: 25% !important;
    }
  }

}
</style>
