<template>
  <div class="pb-5 mb-3">
    <v-select
      class="mb-3"
      :options="statusList"
      :reduce="(label) => label.value"
      v-model="currentValue"
      label="label"
      :clearable="false"
      :searchable="false"
      @input="updateStates"
    >
      <template #open-indicator>
        <span v-bind="selectAttributes">
          <i class="mdi mdi-menu-down"></i>
        </span>
      </template>
    </v-select>
    <template v-if="currentValue === 2">
      <h6 class="my-2">{{ $t("scene.temp") }}</h6>
      <vue-slider
        class="daikin-slider2 px-2 mb-3 mt-5"
        @drag-end="updateStates"
        :drag-on-click="true"
        v-model="currentTemp"
        :min="TEMP_DAIKIN.min"
        :max="TEMP_DAIKIN.max"
        tooltip="always"
        :tooltip-formatter="'{value}°C'"
      ></vue-slider>
    </template>
  </div>
</template>

<script>
import {
  DEVICE_TRAIT,
  TEMP_DAIKIN,
  SPEED_DAIKIN,
  MODE_DAIKIN,
  SWING_DAIKIN,
} from "@/plugins/variableConst";
export default {
  name: "modal-update-deivce-switch",
  props: {
    states: Object,
  },
  data() {
    return {
      currentValue:
        !this.states || this.states.OnOff ? (this.states.OnOff.on ? 1 : 0) : 2,
      currentTemp: this.states.Temperature
        ? this.states.Temperature.temperature
        : TEMP_DAIKIN.min,
      statusList: [
        { label: this.$t("devices.statusOn"), value: 1 },
        { label:this.$t("devices.statusOff"), value: 0 },
        { label: this.$t("devices.temp"), value: 2 },
      ],
      TEMP_DAIKIN,
      selectAttributes: {
        ref: "openIndicator",
        role: "presentation",
        class: "vs__open-indicator",
      },
    };
  },
  methods: {
    updateStates,
  },
};

function updateData() {
  if (!this.states || this.states.OnOff) {
    this.currentValue = this.states.OnOff.on ? 1 : 0;
    this.currentTemp = TEMP_DAIKIN.min;
  } else if (this.states.Temperature) {
    this.currentValue = 2;
    this.currentTemp = this.states.Temperature.temperature;
  }
}

function updateStates() {
  console.log(this.currentTemp, this.currentValue);
  let states = {};
  if (this.currentValue === 0) states = { OnOff: { on: false } };
  else if (this.currentValue === 1) states = { OnOff: { on: true } };
  else states = { Temperature: { temperature: this.currentTemp } };
  this.$emit("updateStates", states);
}
</script>

<style lang="scss">
</style>
