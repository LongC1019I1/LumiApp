<template>
  <div class="pb-5 mb-3">
    <v-select
      class="mb-3"
      :options="statusList"
      :reduce="(label) => label.value"
      v-model="currentValue.power"
      label="label"
      :clearable="false"
      :searchable="false"
      @input="updateStatus"
    >
      <template #open-indicator>
        <span v-bind="selectAttributes">
          <i class="mdi mdi-menu-down"></i>
        </span>
      </template>
    </v-select>
    <template v-if="currentValue.power">
      <h6 class="my-2">{{ $t("scene.temp") }}</h6>
      <vue-slider
        class="daikin-slider2 px-2 mb-3 mt-5"
        @drag-end="updateStatus"
        :drag-on-click="true"
        v-model="currentValue.temp"
        :min="TEMP_DAIKIN.min"
        :max="TEMP_DAIKIN.max"
        tooltip="always"
        :tooltip-formatter="'{value}°C'"
      ></vue-slider>
      <h6 class="my-2">{{ $t("scene.mode") }}</h6>
      <v-select
        :options="MODE_DAIKIN"
        :reduce="(label) => label.mode"
        v-model="currentValue.mode"
        label="name"
        :clearable="false"
        :searchable="false"
        @input="updateStatus"
      >
        <template #open-indicator>
          <span v-bind="selectAttributes">
            <i class="mdi mdi-menu-down"></i>
          </span>
        </template>
      </v-select>
      <h6 class="my-2">{{ $t("scene.speed") }}</h6>
      <v-select
        :options="SPEED_DAIKIN"
        :reduce="(label) => label.speed"
        v-model="currentValue.speed"
        label="name"
        :clearable="false"
        :searchable="false"
        @input="updateStatus"
      >
        <template #open-indicator>
          <span v-bind="selectAttributes">
            <i class="mdi mdi-menu-down"></i>
          </span>
        </template>
      </v-select>
      <h6 class="my-2">{{ $t("scene.swing") }}</h6>
      <v-select
        class="drop-up"
        :options="SWING_DAIKIN"
        :reduce="(label) => label.swing"
        v-model="currentValue.swing"
        label="name"
        :clearable="false"
        :searchable="false"
        @input="updateStatus"
      >
        <template #open-indicator>
          <span v-bind="selectAttributes">
            <i class="mdi mdi-menu-down"></i>
          </span>
        </template>
      </v-select>
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
    value: [Object, Array],
    device: Object,
  },
  data() {
    return {
      currentValue: {
        power: false,
        temp: TEMP_DAIKIN.min,
        mode: 0,
        speed: 0,
        swing: 0,
      },
      statusList: [
        { label: "On", value: true },
        { label: "Off", value: false },
      ],
      SPEED_DAIKIN,
      MODE_DAIKIN,
      SWING_DAIKIN,
      TEMP_DAIKIN,
      selectAttributes: {
        ref: "openIndicator",
        role: "presentation",
        class: "vs__open-indicator",
      },
    };
  },
  watch: {
    value: updateData,
  },
  methods: {
    updateStatus,
  },
  mounted: updateData,
};

function updateData() {
  this.value.forEach((item) => {
    if (item.command === DEVICE_TRAIT.OnOff)
      this.currentValue.power = item.params.on;
    if (item.command === DEVICE_TRAIT.TemperatureControl)
      this.currentValue.temp = item.params.temperatureControl;
    if (item.command === DEVICE_TRAIT.TemperatureSetting)
      this.currentValue.mode = item.params.temperatureSetting;
    if (item.command === DEVICE_TRAIT.Speed)
      this.currentValue.speed = item.params.speed;
    if (item.command === DEVICE_TRAIT.Swing)
      this.currentValue.swing = item.params.swing;
  });
}

function updateStatus() {
  let { power, temp, mode, speed, swing } = this.currentValue;
  let execution = [];
  if (!power)
    execution = [
      {
        command: DEVICE_TRAIT.OnOff,
        params: {
          on: power,
        },
      },
    ];
  else {
    execution = [
      {
        command: DEVICE_TRAIT.OnOff,
        params: {
          on: power,
        },
      },
      {
        command: DEVICE_TRAIT.TemperatureControl,
        params: {
          temperatureControl: temp,
        },
      },
      {
        command: DEVICE_TRAIT.TemperatureSetting,
        params: {
          temperatureSetting: mode,
        },
      },
      {
        command: DEVICE_TRAIT.Speed,
        params: {
          speed: speed,
        },
      },
      {
        command: DEVICE_TRAIT.Swing,
        params: {
          swing: swing,
        },
      },
    ];
  }
  console.log(execution)
  this.$emit("updateStatus", execution);
}
</script>

<style lang="scss">
</style>
