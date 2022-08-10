<template>
  <fragment>
    <table
      v-if="listDeviceOutput && listDeviceOutput.length"
      class="table scene-info-box mb-1 overflow-inherit"
    >
      <thead>
        <tr>
          <th class="w-10">{{ $t("scene.delay") }}</th>
          <th class="w-10">{{ $t("scene.transition") }}</th>
          <th>{{ $t("deviceList.text.nameDevice") }}</th>
          <th>{{ $t("room") }}</th>
          <th>MAC</th>
          <th>{{ $t("scene.status") }}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <device-output
          v-for="(device, index) in listDeviceOutput"
          :key="index"
          :device="device"
          :index="index"
          @updateDeviceOutput="updateDeviceOutput(device, index)"
          @deleteDeviceOutput="deleteDeviceOutput(device, index)"
        />
        <tr>
          <td colspan="7" class="py-2">
            <div class="pull-right d-flex align-center">
              <span>{{ $t("scene.addDevice") }}</span>
              <base-button
                class="mr-4 ml-2 add-item-button"
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
    <div v-else class="scene-info-box mb-1">
      <div class="label">{{ $t("scene.addDevice") }}</div>
      <div class="info">
        <base-button
          class="ml-2 mr-2 add-item-button"
          size="md"
          type="secondary"
          @click="isShowModalAddDeviceOutput = true"
        >
          <i class="mdi mdi-plus"></i>
        </base-button>
      </div>
    </div>
    <modal-add-device
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
    />
  </fragment>
</template>

<script>
import DeviceOutput from "./TableRow/DeviceOutput";
import ModalAddDevice from "../Modal/AddDevice";
import ModalUpdateDevice from "../Modal/UpdateDevice";
import ModalConfirmDeleteDevice from "../Modal/ConfirmDeleteDevice";
export default {
  name: "device-ouput",
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
    DeviceOutput,
    ModalAddDevice,
    ModalUpdateDevice,
    ModalConfirmDeleteDevice,
  },
  computed: {
    listDeviceOutput,
  },
  methods: {
    updateDeviceOutput,
    deleteDeviceOutput,
  },
};

function listDeviceOutput() {
  return $state.RuleManager.out.devices;
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
