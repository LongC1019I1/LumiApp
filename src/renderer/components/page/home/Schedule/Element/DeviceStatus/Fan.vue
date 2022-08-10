<template>
  <div class="state-device">
    <div class="state">
      {{
        $t("schedule.state.state") + ":  " + $t("schedule.level") + " " + status
      }}
    </div>

    <!--            SELECT STATE-->
    <div class="state setState d-flex">
      <div class="min-w-maxcontent">
        {{ $t("schedule.state.select-state") + " :" }}
      </div>

      <div class="state-dimmer d-flex justify-center align-center mt-4 w-100">
        <div class="device-status">
          <i :class="'icon-' + getDefaultIconDevice(scheduleSelect.device)"></i>
        </div>

        <div class="d-flex fan-speed">
          <div
            v-for="index in [0, 1, 2, 3, 4]"
            :key="index"
            :class="{ active: index <= status }"
            @click="updateStatus(index)"
          >
            {{ index }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDefaultIconDevice } from "../../../../../../plugins/helper";
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
      status: 0,
    };
  },
  methods: {
    getDefaultIconDevice,
    updateStatus,
  },
  watch: {
    scheduleSelect: {
      handler: resetData,
      deep: true,
    },
  },
  mounted: resetData,
};

function resetData() {
  this.status =
    this.scheduleSelect.out &&
    this.scheduleSelect.out.devices &&
    this.scheduleSelect.out.devices[0] &&
    this.scheduleSelect.out.devices[0].execution.command === "Speed"
      ? this.scheduleSelect.out.devices[0].execution.params.speed
      : 0;
}

function updateStatus(index) {
  if (index === 0) {
    this.$emit("updateStatus", {
      command: DEVICE_TRAIT.OnOff,
      params: { on: false },
    });
  } else {
    this.$emit("updateStatus", {
      command: DEVICE_TRAIT.Speed,
      params: { speed: index },
    });
  }
}
</script>

<style scoped>
</style>
