<template>
  <modal
    v-if="modalDeviceInfo"
    :show="true"
    :showClose="false"
    :backdropClick="false"
    modalClasses="modal-device-info modal-full-height"
    footerClasses="p-0"
    @close="closeModal"
    :status="status"
  >
    <template slot="header">
      <h5 class="text-center w-100">
        {{ $t("roomFloor.text.deviceInfo") }}
      </h5>
      <span class="pull-right c-p" @click="closeModal">
        <i class="mdi mdi-close"></i>
      </span>
    </template>
    <div class="device-info">
      <span>{{ $t("roomFloor.text.name") }}</span>
      <span>{{ device && device.name }}</span>
    </div>
    <div class="device-info">
      <span>{{ $t("roomFloor.text.type") }}</span>
      <span>{{ $t(`devices.TYPE.${device && device.type}`) }}</span>
    </div>
    <div class="device-info">
      <span>{{ $t("roomFloor.text.netID") }}</span>
      <span>{{ device && device.devid && device.devid.slice(-7) }}</span>
    </div>
    <div class="device-info">
      <span>{{ $t("roomFloor.text.MAC") }}</span>
      <span>{{ device && device.macdev }}</span>
    </div>
    <div class="device-info">
      <span>{{ $t("roomFloor.text.icon") }}</span>
      <span>
        <i :class="'icon-' + icon"></i>
      </span>
    </div>
    <div
      v-if="
        [
          DEVICE_TYPE.SWITCH,
          DEVICE_TYPE.CURTAIN,
          DEVICE_TYPE.DOORLOCK,
          DEVICE_TYPE.LMYALELOCK,
        ].includes(device.type)
      "
      class="device-info"
    >
      <span>{{ $t("roomFloor.text.camera") }}</span>
      <base-dropdown position="right">
        <span slot="title" class="dropdown-toggle"
          >{{ currentCamera }} <i class="text-16 mdi mdi-menu-down"></i
        ></span>
        <div @click="chooseCanera(false)" class="dropdown-item" href="#">
          <span>{{ $t("devices.removeCameraPreview") }}</span>
        </div>
        <div
          v-for="(camera, index) in cameraList"
          @click="chooseCanera(camera)"
          :key="index"
          class="dropdown-item"
          href="#"
        >
          <span>{{ camera.name }}</span>
        </div>
      </base-dropdown>
    </div>
    <div class="device-info">
      <span>{{ $t("roomFloor.text.network") }}</span>
      <span>{{ device.brigde_key }}</span>
    </div>
    <div class="device-info">
      <span>{{ $t("roomFloor.text.hcManager") }}</span>
      <span>{{ hc.mac }}</span>
    </div>
    <div class="device-info">
      <span>{{ $t("room") }}</span>
      <span>{{ roomData }}</span>
    </div>
    <div class="device-info d-block">
      <h6>{{ $t("roomFloor.text.ruleInfo") }} ({{ ruleList.length }})</h6>
      <h6 v-for="rule in ruleList" :key="rule.ruleid">- {{ rule.name }}</h6>
    </div>
    <div class="device-info d-block">
      <h6>{{ $t("roomFloor.text.sceneInfo") }} ({{ sceneList.length }})</h6>
      <h6 v-for="scene in sceneList" :key="scene.ruleid">- {{ scene.name }}</h6>
    </div>
    <div class="device-info d-block">
      <h6>{{ $t("roomFloor.text.groupInfo") }} ({{ groupList.length }})</h6>
      <h6 v-for="(group, index) in groupList" :key="index">
        - {{ group && group.name }}
      </h6>
    </div>
  </modal>
</template>

<script>
import { getDefaultIconDevice, getStatusDeviceFromVal } from "@/plugins/helper";
import { TYPE_RULE, DEVICE_TYPE } from "@/plugins/variableConst";

export default {
  name: "modal-deivce-info",
  data() {
    return {
      icon: "",
      status_text: "",
      DEVICE_TYPE,
    };
  },
  computed: {
    modalDeviceInfo,
    device,
    status,
    hc,
    roomData,
    cameraList,
    ruleList,
    sceneList,
    groupList,
    currentCamera,
  },
  methods: {
    chooseCanera,
    closeModal,
  },
};

function modalDeviceInfo() {
  return $state.ContentManager.modal.modalDeviceInfo;
}

function device() {
  return $getters["HomeConfig/getDevice"](this.modalDeviceInfo);
}

function status() {
  status = $getters["HomeControll/getDeviceStatusByDeviceID"](
    this.device.devid
  );
  if (status) {
    this.icon = getDefaultIconDevice(this.device, status.states);
    this.status_text = this.$t(
      getStatusDeviceFromVal(this.device, status.states)
    );
  }
  return status;
}

function hc() {
  return $state.HomeConfig.hcs.find((hc) => hc.hc_id === this.device.hc_id);
}

function roomData() {
  return $getters["HomeConfig/getRoomByID"](this.device.roomid).name || "";
}

function cameraList() {
  return $state.HomeConfig.cameras;
}

function currentCamera() {
  if (this.device.cameraPreview) {
    let camera = $state.HomeConfig.cameras.find(
      (item) => item.camid === this.device.cameraPreview
    );
    if (camera) return camera.name;
  }
  return this.$t("devices.removeCameraPreview");
}

function ruleList() {
  return $getters["HomeConfig/getAllRulesByTypeAndDevid"](
    [TYPE_RULE.rule_nomal, TYPE_RULE.rule_security],
    this.device.devid
  );
}

function sceneList() {
  return $getters["HomeConfig/getAllRulesByTypeAndDevid"](
    [TYPE_RULE.scene],
    this.device.devid
  );
}

function groupList() {
  if (this.device && this.device.groupid)
    return [
      $state.HomeConfig.groups.find(
        (group) => group && this.device && group.groupid === this.device.groupid
      ),
    ];
  return [];
}

function chooseCanera(camera) {
  if (!this.device) return;
  $dispatch($api.HomeConfig.updateDevice, {
    devid: this.device.devid,
    updateData: { cameraPreview: camera.camid||-1 },
  });
}

function closeModal() {
  $commit("ContentManager/UPDATE_MODAL_STATUS", {
    modal: "modalDeviceInfo",
    data: false,
  });
}
</script>

<style lang="scss">
.modal-device-info {
  .modal-body {
    padding: 0 1rem;
    .device-info {
      padding: 0.5rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .dropdown-toggle {
        i {
          font-size: 1rem;
        }
      }
      h6 {
        margin-bottom: 0;
      }
      i {
        font-size: 2rem;
      }
    }
  }
}
</style>
