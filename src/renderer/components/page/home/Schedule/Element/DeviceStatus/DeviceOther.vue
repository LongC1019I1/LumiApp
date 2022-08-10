<template>
  <div class="state-device">
    <div class="state">
      {{
        scheduleSelect.out &&
        scheduleSelect.out.devices &&
        scheduleSelect.out.devices[0] &&
        scheduleSelect.out.devices[0].execution &&
        scheduleSelect.out.devices[0].execution.command == "OnOff"
          ? $t("schedule.state.state") +
            ": " +
            $t(
              "schedule.state." +
                scheduleSelect.out.devices[0].execution.params.on
            )
          : $t("schedule.level")
      }}
    </div>
    <div class="state" style="height: 46px !important">
      <div class="float-left">
        {{ $t("schedule.state.select-state") + " :" }}
      </div>
      <div class="float-left">
        <base-dropdown class="w-100 float-left select-status">
          <base-button slot="title" type="secondary" class="dropdown-toggle">
            <div class="float-left">
              {{
                scheduleSelect.out &&
                scheduleSelect.out.devices &&
                scheduleSelect.out.devices[0] &&
                scheduleSelect.out.devices[0].execution &&
                scheduleSelect.out.devices[0].execution.command == "OnOff"
                  ? $t(
                      "schedule.state." +
                        scheduleSelect.out.devices[0].execution.params.on
                    )
                  : $t("schedule.level")
              }}
            </div>
            <div class="float-right">
              <i class="mdi mdi-menu-down"></i>
            </div>
          </base-button>
          <a
            class="dropdown-item"
            href="#"
            @click="setState($t('schedule.state.on'), true)"
          >
            {{ $t("schedule.state.on") }}</a
          >
          <a
            class="dropdown-item"
            href="#"
            @click="setState($t('schedule.state.off'), false)"
          >
            {{ $t("schedule.state.off") }}</a
          >
        </base-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { DEVICE_TRAIT } from "../../../../../../plugins/variableConst";

export default {
  name: "ScheduleNormal",

  data() {
    return {
      state: this.$t("schedule.state.on"),
      DEVICE_TRAIT,
    };
  },

  props: {
    scheduleSelect: {
      type: Object,
    },
    device: {
      type: Object,
    },
  },

  watch: {
    scheduleSelect(scheduleSelect) {
      if (
        scheduleSelect.out &&
        scheduleSelect.out.devices &&
        scheduleSelect.out.devices[0] &&
        scheduleSelect.out.devices[0].execution &&
        scheduleSelect.out.devices[0].execution.params
      ) {
        this.state = this.$t(
          "schedule.state." + scheduleSelect.out.devices[0].execution.params.on
        );
      } else {
        this.setState(this.$t("schedule.state.off"), false);
      }

      console.log("scheduless", this.scheduleSelect);
      delete this.scheduleSelect.device;
      $dispatch("RuleManager/setRule", this.scheduleSelect);
    },
  },

  methods: {
    setState,
  },
};

function setState(state, value) {
  console.log("state", state);
  this.state = state;

  if (this.scheduleSelect.out.devices && !this.scheduleSelect.out.devices[0]) {
    let out = Object.assign({}, $state.RuleManager.out);
    out.devices = [
      {
        delay: 0,
        devid: this.device.devid,
        execution: {
          command: DEVICE_TRAIT.OnOff,
          params: { on: false },
        },
      },
    ];
    $commit("RuleManager/SET_DATA", { out: out });
  }

  updateData(0, "execution", {
    command: DEVICE_TRAIT.OnOff,
    params: { on: value },
  });
}

function updateData(index, param, data) {
  // console.log("log", this.index, this.inputTimer);
  $commit("RuleManager/UPDATE_OUTPUT_DEVICE_STATUS", {
    index,
    param,
    data,
  });
}
</script>

<style scoped>
</style>
