<template>
  <div>
    <v-select
      :options="curtainStatus"
      :reduce="label => label.value"
      v-model="currentCurtainStatus"
      label="label"
      :clearable="false"
      :searchable="false"
      @input="updateCurtainStatus"
      :class="{'mb-5 pb-5':currentCurtainStatus===1}"
    >
      <template #open-indicator>
        <span v-bind="selectAttributes">
          <i class="mdi mdi-menu-down"></i>
        </span>
      </template>
    </v-select>
    <div v-if="currentCurtainStatus!==1" class="pl-2 mt-5 row device-status">
      <div class="pl-3 w-max">
        <i :class="(statusList.find(item=>item.value===level)||statusList[0]).icon"></i>
      </div>
      <div class="col">
        <vue-slider
          class="curtain-rule-slider"
          @drag-end="updateStatus"
          :drag-on-click="true"
          v-model="level"
          :data="statusList"
          tooltip="always"
          :tooltip-formatter="'{value}%'"
        >
          <template v-slot:step="{ active }">
            <div :class="['custom-step', { active }]"></div>
          </template>
        </vue-slider>
      </div>
    </div>
  </div>
</template>

<script>
import { DEVICE_TRAIT } from "@/plugins/variableConst";

let statusList = [
  {
    icon: "icon-device-curtain-horizontal-6",
    value: 0
  },
  {
    icon: "icon-device-curtain-horizontal-5",
    value: 17
  },
  {
    icon: "icon-device-curtain-horizontal-3",
    value: 33
  },
  {
    icon: "icon-device-curtain-horizontal-3",
    value: 50
  },
  {
    icon: "icon-device-curtain-horizontal-2",
    value: 67
  },
  {
    icon: "icon-device-curtain-horizontal-1",
    value: 83
  },
  {
    icon: "icon-device-curtain-horizontal-0",
    value: 100
  }
];

export default {
  name: "modal-update-deivce-switch",
  props: {
    states: Object
  },
  data() {
    return {
      level:
        this.states.Level && this.states.Level.level === 99
          ? 100
          : this.states.Level&&this.states.Level.level || 0,
      currentCurtainStatus:
        this.states.StartStop && this.states.StartStop.start === false
          ? 1
          : this.states.Level &&
            (this.states.Level.level === 100 || this.states.Level.level === 99)
          ? 2
          : 0,
      statusList,
      curtainStatus: [
        { label: this.$t("scene.open"), value: 0 },
        { label: this.$t("scene.stop"), value: 1 },
        { label: this.$t("scene.close"), value: 2 }
      ],
      selectAttributes: {
        ref: "openIndicator",
        role: "presentation",
        class: "vs__open-indicator"
      },
      DEVICE_TRAIT
    };
  },
  watch: {
    states
  },
  methods: {
    updateCurtainStatus,
    updateStatus
  }
};

function states(states) {
  this.currentCurtainStatus =
    states.StartStop && states.StartStop.start === false
      ? 1
      : states.Level &&
        (states.Level.level === 100 || states.Level.level === 99)
      ? 2
      : 0;
  this.level =
    states.Level && states.Level.level === 99 ? 100 : states.Level.level || 0;
}

function updateStatus() {
  if (this.level === 100) this.currentCurtainStatus = 2;
  else this.currentCurtainStatus = 0;
  this.$emit("updateStates", {
    Level: { level: this.level === 100 ? 99 : this.level }
  });
}

function updateCurtainStatus() {
  if (this.currentCurtainStatus === 2) this.level = 100;
  if (this.currentCurtainStatus === 0) this.level = 0;
  if (this.currentCurtainStatus === 1)
    this.$emit("updateStates", {
      StartStop: { start: false }
    });
  else
    this.$emit("updateStates", {
      Level: { level: this.level === 100 ? 99 : this.level }
    });
}
</script>

<style lang="scss">
</style>
