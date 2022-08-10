<template>
  <div class="state-device curtain-schedule">
    <div class="state">
      {{ $t("schedule.state.state") + ": " + showState }}
    </div>
    <!--            SELECT STATE-->
    <div class="state setState">
      <div class="d-flex pb-2">
        <div class="min-w-maxcontent pr-1">
          {{ $t("schedule.state.select-state") + " :" }}
        </div>
        <div class="w-100 state-dimmer row">
          <base-dropdown class="w-100 float-left select-status">
            <base-button slot="title" type="secondary" class="dropdown-toggle">
              <div class="float-left">
                {{ selectState }}
              </div>
              <div class="float-right">
                <i class="text-16 mdi mdi-menu-down"></i>
              </div>
            </base-button>

            <a
              @click="
                status = 0;
                selectState = $t('schedule.state.open');
              "
              class="dropdown-item"
              href="#"
            >
              {{ $t("schedule.state.open") }}</a
            >

            <a
              @click="
                status = -1;
                selectState = $t('schedule.state.pause');
              "
              class="dropdown-item"
              href="#"
            >
              {{ $t("schedule.state.pause") }}</a
            >

            <a
              @click="
                status = 100;
                selectState = $t('schedule.state.close');
              "
              class="dropdown-item"
              href="#"
            >
              {{ $t("schedule.state.close") }}</a
            >
          </base-dropdown>
          <div
            v-if="status !== -1"
            class="device-status d-flex justify-center align-center mt-4 w-100"
          >
            <div>
              <i
                :class="
                  (
                    statusList.find((item) => item.value === status) ||
                    statusList[0]
                  ).icon
                "
              ></i>
            </div>
            <div class="ml-3">
              <div class="col row w-100 px-3" style="width: 355px !important">
                <vue-slider
                  class="curtain-rule-slider w-250"
                  @drag-end="updateStatus"
                  :drag-on-click="true"
                  v-model="status"
                  :data="statusList"
                  tooltip="always"
                  tooltip-formatter="{value}%"
                >
                  <template v-slot:step="{ active }">
                    <div :class="['custom-step', { active }]"></div>
                  </template>
                </vue-slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDefaultIconDevice, getStatusDeviceFromExecution } from "../../../../../../plugins/helper";
import { DEVICE_TRAIT } from "../../../../../../plugins/variableConst";

let statusList = [
  {
    icon: "icon-device-curtain-horizontal-6",
    value: 0,
  },
  {
    icon: "icon-device-curtain-horizontal-5",
    value: 17,
  },
  {
    icon: "icon-device-curtain-horizontal-3",
    value: 33,
  },
  {
    icon: "icon-device-curtain-horizontal-3",
    value: 50,
  },
  {
    icon: "icon-device-curtain-horizontal-2",
    value: 67,
  },
  {
    icon: "icon-device-curtain-horizontal-1",
    value: 83,
  },
  {
    icon: "icon-device-curtain-horizontal-0",
    value: 100,
  },
];

export default {
  name: "Curtain",

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
      selectState: this.$t("schedule.state.open"),
      status: 0,
      statusList,
    };
  },
  methods: {
    getDefaultIconDevice,
    updateStatus,
  },
  watch: {
    scheduleSelect:{
      handler: resetData,
      deep: true
    },
  },
  computed: {
    schedules,
    showState,
  },

  mounted:resetData,
};

function resetData() {
  if (
    this.scheduleSelect.out &&
    this.scheduleSelect.out.devices &&
    this.scheduleSelect.out.devices[0] &&
    this.scheduleSelect.out.devices[0].execution &&
    this.scheduleSelect.out.devices[0].execution.command === "StartStop" &&
    this.scheduleSelect.out.devices[0].execution.params.start === false
  ) {
    this.status = -1;
  } else {
    this.status =
      ((this.scheduleSelect.out &&
        this.scheduleSelect.out.devices &&
        this.scheduleSelect.out.devices[0] &&
        this.scheduleSelect.out.devices[0].execution &&
        this.scheduleSelect.out.devices[0].execution.params &&
        this.scheduleSelect.out.devices[0].execution.params.level) ||
        0) === 99
        ? 100
        : (this.scheduleSelect.out &&
            this.scheduleSelect.out.devices &&
            this.scheduleSelect.out.devices[0] &&
            this.scheduleSelect.out.devices[0].execution &&
            this.scheduleSelect.out.devices[0].execution.params &&
            this.scheduleSelect.out.devices[0].execution.params.level) ||
          0;
  }
}

function schedules() {
  let schedules = $getters["HomeConfig/getRulesByType"]([3]).filter(
    (schedule) => schedule.out.devices[0].devid === this.device.devid
  );

  schedules.map((schedule) => (schedule.device = this.device));

  return schedules;
}

function showState() {
  if (this.status === -1) {
    this.$emit("updateStatus", {
      command: DEVICE_TRAIT.StartStop,
      params: { start: false },
    });
    return this.$t("schedule.state.pause");
  }

  if (this.status === 0) {
    this.updateStatus();
    return this.$t("schedule.state.open");
  }

  if (this.status === 100) {
    this.selectState = this.$t("schedule.state.close");
    this.updateStatus();
    return this.$t("schedule.state.close");
  } else {
    this.selectState = this.$t("schedule.state.open");
  }

  return this.$t("schedule.level") + " " + this.status + "%";
}

function updateStatus() {
  if (!$state.RuleManager.in.schedule) {
    console.log("ssd");
    let inData = Object.assign({}, $state.RuleManager.in);
    inData.schedule = {
      starttime: timer(Date.now(), "HH:mm"),
      endtime: timer(Date.now(), "HH:mm"),
    };
    $commit("RuleManager/SET_DATA", { in: inData });
  }

  if ($state.RuleManager.out.devices.length === 0) {
    let outDevice = Object.assign({}, $state.RuleManager.out);
    outDevice.devices = [
      {
        delay: 0,
        devid: this.device.devid,
        execution: {
          command: DEVICE_TRAIT.StartStop,
          params: { start: false },
        },
      },
    ];
    $commit("RuleManager/SET_DATA", { out: outDevice });
  }

  this.$emit("updateStatus", {
    command: DEVICE_TRAIT.Level,
    params: { level: this.status },
  });
}
</script>

<style lang="scss">
</style>
