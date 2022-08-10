<template>
  <div id="homePage" class="h-100">
    <Header :showPagename="false" />
    <div id="pageContent" class="p-3">
      <div class="row h-100">
        <sidebar />
        <div class="col" style="max-width: calc(100% - 235px)">
          <fade-transition origin="center" mode="out-in" :duration="250">
            <router-view />
          </fade-transition>
        </div>
      </div>
    </div>
    <controll-dimmer />
    <controll-switch-with-camera />
    <controll-fan />
    <controll-curtain />
    <controll-daikin />
    <controll-remote-air-v1 />
    <controll-remote-air-v2 />
    <controll-remote-fan-v1 />
    <controll-remote-fan-v2 />
    <controll-remote-tv-v1 />
    <controll-remote-tv-v2 />
    <controll-remote-stb-v2 />
    <modal-device-info />
    <modal-device-history />
    <modal-update-firmware
      :ShowModalFirm="showModalFirm"
      @closeModal="showModalFirm = false"
    />
    <modal-full-camera />
    <modal-fixed-camera />
  </div>
</template>

<script>
import Header from "../base/custom/Header";
import Sidebar from "../base/custom/Sidebar";

import ControllSwitchWithCamera from "../base/controll/SwitchWithCamera";
import ControllDimmer from "../base/controll/Dimmer";
import ControllFan from "../base/controll/Fan";
import ControllCurtain from "../base/controll/Curtain";
import ControllDaikin from "../base/controll/Daikin";
import ControllRemoteAirV1 from "../base/controll/RemoteAirV1";
import ControllRemoteAirV2 from "../base/controll/RemoteAirV2";
import ControllRemoteFanV1 from "../base/controll/RemoteFanV1";
import ControllRemoteFanV2 from "../base/controll/RemoteFanV2";
import ControllRemoteTvV1 from "../base/controll/RemoteTvV1";
import ControllRemoteTvV2 from "../base/controll/RemoteTvV2";
import ControllRemoteStbV2 from "../base/controll/RemoteSTBV2";

import ModalDeviceInfo from "../base/Modal/DeviceInfo";
import ModalDeviceHistory from "../base/Modal/DeviceHistory";
import ModalUpdateFirmware from "../page/home/Control/Modal/ModalUpdateFirmware";

import ModalFullCamera from "../page/home/Secure/CameraTab/Modal/FullCamera";
import ModalFixedCamera from "../page/home/Secure/CameraTab/Modal/FixedCamera";

export default {
  name: "home",
  data() {
    return {
      showModalFirm: false,
    };
  },
  components: {
    Header,
    Sidebar,

    ControllDimmer,
    ControllSwitchWithCamera,
    ControllFan,
    ControllCurtain,
    ControllDaikin,
    ControllRemoteAirV1,
    ControllRemoteAirV2,
    ControllRemoteFanV1,
    ControllRemoteFanV2,
    ControllRemoteTvV1,
    ControllRemoteTvV2,
    ControllRemoteStbV2,

    ModalDeviceInfo,
    ModalDeviceHistory,
    ModalUpdateFirmware,

    ModalFullCamera,
    ModalFixedCamera
  },
  methods: {
    checkShowConfirmUpdateFirmware,
  },
  beforeMount() {},
  mounted() {
    this.checkShowConfirmUpdateFirmware();
  },
  computed: {
    connectStatus() {
      return $state.Socket.connectStatus;
    },
  },
  watch: {
    connectStatus,
  },
  beforeCreate,
  beforeDestroy,
};

async function beforeCreate() {
  let homeID = this.$route.params.homeID;
  $commit("Home/UPDATE_CURRENT_HOME", homeID);
  $dispatch($api.HomeConfig.getListHomeConfigByHomeID, {
    homeid: Number(this.$route.params.homeID),
  });
  if ($state.Socket.connectStatus === 0) $dispatch($api.Socket.connect);
  if ($state.Socket.connectStatus === 2)
    $dispatch($api.Socket.joinRoom, [homeID]);
}

function connectStatus() {
  if (this.connectStatus === 2) {
    let homeID = Number(this.$route.params.homeID);
    $dispatch($api.Socket.joinRoom, [homeID]);
  }
}

function beforeDestroy() {
  let homeID = this.$route.params.homeID;
  $dispatch($api.CameraManager.resetData);
  $dispatch($api.HomeConfig.resetData);
  $dispatch($api.HomeControll.resetData);
  $dispatch($api.ContentManager.resetData);
  $dispatch($api.LocalData.resetData);
  $commit("Home/UPDATE_CURRENT_HOME", false);
  $dispatch($api.Socket.leavingRoom, [homeID]);
}

async function checkShowConfirmUpdateFirmware() {
  await $dispatch("Home/getFirmware");
  await $dispatch("HomeConfig/getListHomeConfigByHomeIDNoAnimation", {
    homeid: Number(this.$route.params.homeID),
  });

  let firmwareId = $state.Home.firmware.id;
  let hcOnline = $state.HomeConfig.hcs.find(
    (hc) => hc.is_master === 1 && hc.is_connect === 1
  );
  let machc =
    (
      ($state.Home.currentHome.hcs &&
        $state.Home.currentHome.hcs.find(
          (item) => item.is_connect && item.is_master
        )) ||
      {}
    ).mac || "";

  //FIND VALID

  let emailValid = $state.Home.notShowUpdateFirmware.find(
    (user) => user === localStorage.getItem("email")
  );
  let phoneValid = $state.Home.notShowUpdateFirmware.find(
    (phone) => phone === localStorage.getItem("phone")
  );
  let machcValid = $state.Home.notShowUpdateFirmware.find(
    (mac) => mac === machc
  );
  let firmwareValid = $state.Home.notShowUpdateFirmware.find(
    (firmwareid) => firmwareid === firmwareId
  );

  //CASE NOT SHOW MODAL UPDATE CONFIRM

  if (firmwareId && $state.Home.currentHome.hc_auto_ota === 0 && hcOnline) {
    if (machcValid && firmwareValid && (emailValid || phoneValid)) {
      return (this.showModalFirm = false);
    }
    return (this.showModalFirm = true);
  }
  return (this.showModalFirm = false);
}
</script>

<style lang="scss">
</style>
