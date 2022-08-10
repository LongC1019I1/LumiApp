<template>
  <fragment>
    <table v-if="listGrouplightingOutput.length" class="table scene-info-box">
      <thead>
        <tr>
          <th>{{ $t("scene.delay") }}</th>
          <th>{{ $t("scene.transition") }}</th>
          <th>{{ $t("group.groupName") }}</th>
          <th>{{ $t("room") }}</th>
          <th>{{ $t("scene.status") }}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <group-lighting-output
          v-for="(group, index) in listGrouplightingOutput"
          :key="index"
          :group="group"
          :index="index"
        />
        <tr>
          <td colspan="7" class="py-2">
            <div class="pull-right d-flex align-center">
              <span>{{ $t("scene.addGroup") }}</span>
              <base-button
                class="mr-4 ml-2 add-item-button disabled"
                size="md"
                type="secondary"
                @click="isShowModalAddDeviceOutput = true"
              >
                <i class="mdi mdi-plus"></i>
              </base-button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="scene-info-box mb-3 disabled">
      <div class="label">{{ $t("scene.addGroupLighting") }}</div>
      <div class="info">
        <base-button
          class="ml-2 mr-2 add-item-button disabled"
          size="md"
          type="secondary"
          @click="isShowModalAddDeviceOutput = true"
        >
          <i class="mdi mdi-plus"></i>
        </base-button>
      </div>
    </div>
    <!-- <modal-add-device
      :isShowModal="isShowModalAddDeviceOutput"
      @closeModal="isShowModalAddDeviceOutput = false"
    />
    <modal-update-device
      :index="currentIndex"
      :isShowModal="isShowModalUpdateDeviceOutput"
      @closeModal="isShowModalUpdateDeviceOutput = false"
    />
    <modal-confirm-delete-device
      :index="currentIndex"
      :device="currentDevice"
      :isShowModal="isShowModalConfirmDeleteDeviceOutput"
      @closeModal="isShowModalConfirmDeleteDeviceOutput = false"
    /> -->
  </fragment>
</template>

<script>
import GroupLightingOutput from "./TableRow/GroupLighting";
import ModalAddDevice from "../Modal/AddDevice";
import ModalUpdateDevice from "../Modal/UpdateDevice";
import ModalConfirmDeleteDevice from "../Modal/ConfirmDeleteDevice";
export default {
  name: "scene-manager",
  data() {
    return {
      currentIndex: false,
      currentDevice: false,
      isShowModalAddDeviceOutput: false,
      isShowModalUpdateDeviceOutput: false,
      isShowModalConfirmDeleteDeviceOutput: false,
    };
  },
  components: {
    GroupLightingOutput,
    // ModalAddDevice,
    // ModalUpdateDevice,
    // ModalConfirmDeleteDevice,
  },
  computed: {
    listGrouplightingOutput,
  },
  methods: {
    updateDeviceOutput,
    deleteDeviceOutput,
  },
};

function listGrouplightingOutput() {
  return $state.RuleManager.out.groups;
}

function updateDeviceOutput(device, index) {
  this.currentIndex = index;
  this.isShowModalUpdateDeviceOutput = true;
}

function deleteDeviceOutput(device, index) {
  this.currentIndex = index;
  this.currentDevice = device;
  this.isShowModalConfirmDeleteDeviceOutput = true;
}
</script>

<style lang="scss">
</style>
