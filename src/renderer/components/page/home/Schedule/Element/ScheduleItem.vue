<template>
  <div class="mb-2 c-p">
    <div
      class="schedule pr-2 py-2"
      :class="{
        'bg-disabled': !schedule.enable,
      }"
    >
      <div
        class="name text-overflow-hidden d-flex"
        @click="$store.dispatch('RuleManager/setRule', schedule)"
      >
        <i class="px-2 c-p" :class="'icon-' + getDefaultIconDevice(device)"></i>
        <span class="text-overflow-hidden">
          <div class="text-overflow-hidden">
            {{
              schedule.in.schedule.starttime.moment
                ? $t(
                    "schedule.time." +
                      schedule.in.schedule.starttime.moment +
                      schedule.in.schedule.starttime.offset
                  )
                : schedule.in.schedule.starttime
            }}
          </div>
          <div
            class="text-overflow-hidden"
            v-if="schedule && device && device.type === DEVICE_TYPE.SWITCH"
          >
            {{
              schedule &&
              schedule.out &&
              schedule.out.devices &&
              schedule.out.devices[0] &&
              schedule.out.devices[0].execution &&
              schedule.out.devices[0].execution.command === "OnOff"
                ? $t("schedule.state.state") +
                  ": " +
                  $t(
                    "schedule.state." +
                      schedule.out.devices[0].execution.params.on
                  )
                : ""
            }}
          </div>

          <div
            class="text-overflow-hidden"
            v-else-if="
              schedule &&
              device &&
              device.type === 'LIGHT' &&
              device.traits.find((device) => device.name === 'Brightness')
            "
          >
            {{
              schedule &&
              schedule.out &&
              schedule.out.devices &&
              schedule.out.devices[0] &&
              schedule.out.devices[0].execution &&
              schedule.out.devices[0].execution.command === "OnOff"
                ? $t("schedule.state.state") +
                  ": " +
                  $t(
                    "schedule.state." +
                      schedule.out.devices[0].execution.params.on
                  )
                : $t("schedule.level") + ": " + schedule.out &&
                  schedule.out.devices &&
                  schedule.out.devices[0] &&
                  schedule.out.devices[0].execution &&
                  schedule.out.devices[0].execution.params &&
                  schedule.out.devices[0].execution.params.brightness
            }}
          </div>

          <div
            class="text-overflow-hidden"
            v-else-if="schedule && device && device.type === 'CURTAIN'"
          >
            {{
              schedule &&
              schedule.out &&
              schedule.out.devices &&
              schedule.out.devices[0] &&
              schedule.out.devices[0].execution &&
              schedule.out.devices[0].execution.command === "StartStop"
                ? $t("schedule.state.state") +
                  ": " +
                  $t(
                    "schedule.start." +
                      schedule.out.devices[0].execution.params.start
                  )
                : showState(schedule.out.devices[0].execution.params.level)
            }}
          </div>

          <div
            class="text-overflow-hidden"
            v-else-if="schedule && device && device.type === 'FAN'"
          >
            {{
              schedule.out.devices[0].execution.command === "OnOff"
                ? $t("schedule.state.state") +
                  ": " +
                  $t(
                    "schedule.state." +
                      schedule.out.devices[0].execution.params.on
                  )
                : $t("schedule.level") +
                  ": " +
                  schedule.out.devices[0].execution.params.speed
            }}
          </div>

          <div
            class="text-overflow-hidden"
            v-else-if="
              schedule && device && device.type === DEVICE_TYPE.SPEAKER
            "
          >
            {{
              schedule &&
              schedule.out &&
              schedule.out.devices &&
              schedule.out.devices[0].execution &&
              schedule.out.devices[0].execution[0].params.controller ===
                PLAY_CONTROL.pause
                ? $t("schedule.state.state") + ": " + $t("schedule.state.off")
                : $t("schedule.state.state") + ": " + $t("schedule.state.on")
            }}
          </div>

          <div
            class="text-overflow-hidden"
            v-else-if="
              (schedule && device && device.type === DEVICE_TYPE.IR) ||
              DEVICE_TYPE.IRV2
            "
          >
            {{ $t("schedule.state.state") + ": " + showNameIR }}
          </div>

          <div
            class="text-overflow-hidden"
            v-else-if="schedule && device && device.type === DEVICE_TYPE.DAIKIN"
          >
            {{ $t("schedule.state.state") + ": " + showNameIR }}
          </div>
        </span>
      </div>
      <div class="option c-p">
        <div @click="deleteSchedule">
          <div class="tooltip-hover">{{ $t("schedule.deleteSchedule") }}</div>
          <i class="mdi mdi-trash-can" />
        </div>
        <div v-if="schedule.enable" @click="toggleEnable(0)">
          <div class="tooltip-hover">{{ $t("schedule.offSchedule") }}</div>
          <i class="mdi mdi-sync-off" />
        </div>
        <div v-else @click="toggleEnable(1)">
          <div class="tooltip-hover">{{ $t("schedule.onSchedule") }}</div>
          <i class="mdi mdi-sync" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDefaultIconDevice } from "../../../../../plugins/helper";
import {
  DEVICE_TYPE,
  DEVICE_TRAIT,
  PLAY_CONTROL,
  IR_ID_AIR,
  IR_TYPE,
  IRV2_ALL_TYPE,
} from "../../../../../plugins/variableConst";

export default {
  name: "ScheduleState",
  data() {
    return {
      check: false,
      DEVICE_TYPE,
      DEVICE_TRAIT,
      IR_ID_AIR,
      PLAY_CONTROL,
      valueIR: "",
    };
  },
  props: {
    schedule: {
      type: Object,
    },
    value: [Object, Array, String],
    device: Object,
  },
  methods: {
    getDefaultIconDevice,
    deleteSchedule,
    showState,
    toggleEnable,
  },
  computed: {
    showNameIR,
  },
};

function showNameIR() {
  console.log("schdeduleir", this.schedule);
  let stateIr = "";

  if (this.device.type === DEVICE_TYPE.IR) {
    if (this.device.irtype === IR_TYPE.REMOTE_AIR) {
      this.device.irCommands &&
        this.device.irCommands.forEach((item) => {
          if (
            this.schedule &&
            this.schedule.out &&
            this.schedule.out.devices &&
            this.schedule.out.devices[0] &&
            this.schedule.out.devices[0].execution &&
            this.schedule.out.devices[0].execution.params &&
            this.schedule.out.devices[0].execution.params.irActive ===
              item.commandId
          ) {
            if (item.buttonId === IR_ID_AIR.air_on) {
              stateIr = "On";
            } else if (item.buttonId === IR_ID_AIR.air_off) {
              stateIr = "Off";
            } else {
              stateIr = `Mode: ${item.arrIr.mode} - Temp: ${item.arrIr.temp} - Fan: ${item.arrIr.fan} - Swing: ${item.arrIr.swing}`;
            }
          }
        });
    } else if (this.device.irtype === IR_TYPE.REMOTE_FAN || IR_TYPE.REMOTE_TV) {
      this.device.irCommands &&
        this.device.irCommands.forEach((item) => {
          if (
            this.schedule.out.devices[0].execution.params.irActive ===
            item.commandId
          )
            stateIr = item.buttonId;
        });
    }
  } else if (this.device.type === DEVICE_TYPE.IRV2) {
    if (this.device.irtype === IRV2_ALL_TYPE.IR_AC) {
      console.log("avc22", this.schedule);
      return (stateIr =
        this.schedule &&
        this.schedule.out &&
        this.schedule.out.devices &&
        this.schedule.out.devices[0] &&
        this.schedule.out.devices[0].execution &&
        this.schedule.out.devices[0].execution.arrIr
          ? `Mode: ${this.schedule.out.devices[0].execution.arrIr.mode} `
          : // - Temp: ${this.schedule.out.devices[0].execution.arrIr.temp} - Fan: ${
            //     this.schedule.out.devices[0].execution.arrIr.fan
            // } - Swing: ${this.schedule.out.devices[0].execution.arrIr.swing}`
            "Off");
    }

    if (this.device.irtype === IRV2_ALL_TYPE.IR_FAN || IRV2_ALL_TYPE.IR_TV) {
      return (stateIr = this.schedule.out.devices[0].execution.arrIr.buttonid);
    }
  } else if (this.device.type === DEVICE_TYPE.DAIKIN) {
    let state = this.schedule.out.devices[0].execution.find(
      (dev) => dev.command === DEVICE_TRAIT.OnOff
    );

    if (state.params.on === false) {
      return (stateIr = this.$t("schedule.state.off"));
    } else {
      let value = this.schedule.out.devices[0].execution.find(
        (dev) => dev.command === DEVICE_TRAIT.TemperatureControl
      );
      if (value) {
        return (stateIr = String(value.params.temperatureControl) + " °C");
      }
      return "";
    }
  }

  return stateIr;
}

function showState(value) {
  if (this.device.type === "CURTAIN") {
    if (value === 0) {
      return (
        this.$t("schedule.state.state") + ": " + this.$t("schedule.state.open")
      );
    }

    if (value === 100) {
      return (
        this.$t("schedule.state.state") + ": " + this.$t("schedule.state.close")
      );
    }

    return this.$t("schedule.level") + ": " + value;
  }
}

function deleteSchedule() {
  return $alertify
    .confirm({
      title: this.$t("notify.notifyWarninglTitle"),
      text: this.$t("schedule.confirmDeleteSchedule"),
      showCancelButton: true,
      confirmButtonText: this.$t("confirm"),
      cancelButtonText: this.$t("cancel"),
    })
    .then((result) => {
      if (result.isConfirmed)
        return $dispatch($api.HomeConfig.deleteRule, {
          ruleid: this.schedule.ruleid,
        });
    });
}

function toggleEnable(enable) {
  $dispatch($api.HomeConfig.updateRule, {
    ruleid: this.schedule.ruleid,
    updateData: {
      enable,
    },
  });
}
</script>

<style lang="scss">
</style>
