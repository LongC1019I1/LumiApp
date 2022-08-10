<template>
  <fragment>
    <table v-if="listDeviceInput.length" class="table rule-info-box mb-1 overflow-inherit">
      <thead>
      <tr>
        <th
            v-if="$store.state.RuleManager.in.delay || $store.state.RuleManager.in.delay === 0"
        >{{ $t('rule.inputDelay') }}
        </th>
        <th>MAC</th>
        <th>{{ $t("deviceList.text.nameDevice") }}</th>
        <th>{{ $t("room") }}</th>
        <th>{{ $t("rule.condition") }}</th>
        <th>{{ $t("rule.status") }}</th>
        <th></th>
      </tr>
      </thead>
      <draggable
          v-model="listDeviceInput"
          v-bind="dragOptions"
          tag="tbody"
          :disabled="$store.state.RuleManager.in.delay || $store.state.RuleManager.in.delay === 0"
      >
        <device-input-row
            v-for="(device, index) in listDeviceInput"
            :key="index"
            :device="device"
            :index="index"
            @updateDeviceInput="updateDeviceInput(device, index)"
            @deleteDeviceInput="deleteDeviceInput(device, index)"
        />
      </draggable>
      <tbody
          v-if="!($store.state.RuleManager.in.delay || $store.state.RuleManager.in.delay === 0)"
      >
      <tr>
        <td colspan="7" class="py-2">
          <div class="pull-right d-flex align-center">
            <span>{{ $t("rule.addDevice") }}</span>
            <base-button
                class="mr-4 ml-2 add-item-button"
                size="md"
                type="secondary"
                @click="isShowModalAddDeviceInput = true"
            >
              <i class="mdi mdi-plus"></i>
            </base-button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
    <div v-else class="scene-info-box mb-1">
      <div class="label">{{ $t("rule.addDeviceInput") }}</div>
      <div class="info">
        <base-button
            class="ml-2 mr-2 add-item-button"
            size="md"
            type="secondary"
            @click="isShowModalAddDeviceInput = true"
        >
          <i class="mdi mdi-plus"></i>
        </base-button>
      </div>
    </div>
    <modal-add-device-input
        :isShowModal="isShowModalAddDeviceInput"
        @closeModal="isShowModalAddDeviceInput = false"
        @showPin="$emit('showPin',$event)"
    />
    <modal-update-device-input
        :isShowModal="isShowModalUpdateDeviceInput"
        @closeModal="isShowModalUpdateDeviceInput = false"
        :index="currentIndex"
    />



  </fragment>
</template>

<script>
import draggable from "vuedraggable";
import DeviceInputRow from "./TableRow/DeviceInput";
import ModalAddDeviceInput from "../Modal/AddDeviceInput";
import ModalUpdateDeviceInput from "../Modal/UpdateDeviceInput";

export default {
  name: "rule-manager",
  data() {
    return {
      currentIndex: false,
      currentDevice: false,
      isShowModalAddDeviceInput: false,
      isShowModalUpdateDeviceInput: false,
      showPin: false,
      myDevice: {},
    };
  },
  components: {
    draggable,
    DeviceInputRow,
    ModalAddDeviceInput,
    ModalUpdateDeviceInput,
  },
  computed: {
    listDeviceInput: {
      get: listDeviceInput,
      set: updateDeviceIndex
    },
    listGrouplightingInput,
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  methods: {
    updateDeviceInput,
    deleteDeviceInput,
    showModalUpdateDeviceInput,
  },
};

function listDeviceInput() {
  return $state.RuleManager.in.devices;
}

function updateDeviceIndex(value) {
  let inData = Object.assign({}, $state.RuleManager.in);
  inData.devices = value;
  $dispatch($api.RuleManager.setRule, {in: inData});
}

function listGrouplightingInput() {
  return $state.RuleManager.out.groups;
}

function updateDeviceInput(device, index) {
  this.currentIndex = index;
  this.isShowModalUpdateDeviceInput = true;
}

function deleteDeviceInput(device, index) {
  $alertify
      .confirm({
        title: this.$t("notify.notifyDefautlTitle"),
        text: this.$t("rule.confirmDeleteDeivceInput"),
        showCancelButton: true,
        confirmButtonText: this.$t("confirm"),
        cancelButtonText: this.$t("cancel")
      })
      .then(result => {
        if (result && result.isConfirmed)
          $commit("RuleManager/DELETE_DEVICE_INPUT", index);
      });
}

function showModalUpdateDeviceInput() {
}
</script>

<style lang="scss"></style>
