<template>
  <div class="state-device dimmer-schedule">
    <div class="state">{{ $t("status") }}: {{ $t(status) }}</div>
    <div class="state setState d-flex">
      <!--            SELECT STATE-->
      <div class="min-w-maxcontent">
        {{ $t("schedule.state.select-state") + " :" }}
      </div>

      <div class="state-dimmer d-flex justify-center align-center mt-4 w-100">
        <div class="device-status">
          <i :class="'icon-' + getDefaultIconDevice(device)"></i>
        </div>
        <vue-slider
          class="mx-3 w-250"
          @drag-end="changeBrightness"
          :drag-on-click="true"
          v-model="value"
          tooltip="always"
          tooltip-formatter="{value}%"
          :min="0"
          :max="100"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  getDefaultIconDevice,
  getStatusDeviceFromExecution,
} from "../../../../../../plugins/helper";
import { DEVICE_TRAIT } from "../../../../../../plugins/variableConst";

export default {
  name: "scheduleConfig",

  props: {
    device: {
      type: Object,
    },
    scheduleSelect: {
      type: Object,
    },
  },
  data() {
    return {
      value: 0,
      DEVICE_TRAIT,
      status: "device.statusOff",
    };
  },
  methods: {
    getStatusDeviceFromExecution,
    getDefaultIconDevice,
    changeBrightness,
  },
  watch: {
    scheduleSelect: { handler: resetData, deep: true },
  },
  mounted: resetData,
};

function resetData() {
  this.value =
    this.scheduleSelect.out &&
    this.scheduleSelect.out.devices &&
    this.scheduleSelect.out.devices[0] &&
    this.scheduleSelect.out.devices[0].execution &&
    this.scheduleSelect.out.devices[0].execution.params &&
    this.scheduleSelect.out.devices[0].execution.params.brightness
      ? this.scheduleSelect.out.devices[0].execution.params.brightness
      : 0;
  this.status = getStatusDeviceFromExecution(
    this.device,
    this.scheduleSelect.out &&
      this.scheduleSelect.out.devices &&
      this.scheduleSelect.out.devices[0] &&
      this.scheduleSelect.out.devices[0].execution
  );
}

function changeBrightness() {
  if (this.value === 0) {
    this.$emit("updateStatus", {
      command: DEVICE_TRAIT.OnOff,
      params: { on: false },
    });
  } else {
    console.log("valueT", this.value);
    this.$emit("updateStatus", {
      command: DEVICE_TRAIT.Brightness,
      params: { brightness: this.value },
    });
  }
}
</script>

<style scoped>
</style>
