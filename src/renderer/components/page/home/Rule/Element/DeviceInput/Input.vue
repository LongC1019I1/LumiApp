<template>
  <v-select
    class="mb-3 header-select"
    :options="statusList"
    :reduce="(label) => label.value"
    label="label"
    :clearable="false"
    :searchable="false"
    :value="states.OnOff.on"
    @input="value=>$emit('updateStates',{OnOff:{on:value }})"
  >
    <template #open-indicator>
      <span v-bind="selectAttributes">
        <i class="mdi mdi-menu-down"></i>
      </span>
    </template>
  </v-select>
</template>

<script>
export default {
  name: "modal-device-input-switch",
  props: {
    states: Object,
    device: Object
  },
  data() {
    return {
      statusList: getStatusList.call(this, this.device),
      selectAttributes: {
        ref: "openIndicator",
        role: "presentation",
        class: "vs__open-indicator"
      }
    };
  },
  watch: {
    device(device) {
      this.statusList = getStatusList.call(this, device);
    }
  }
};

function getStatusList(device) {
  let { iconkey } = device||{};
  if (iconkey == "ic-zw-water-alarm")
    return [
      { label: this.$t("devices.hasWatter"), value: true },
      { label: this.$t("devices.normal"), value: false }
    ];
  if (iconkey == "ic-zw-smoke-alarm")
    return [
      { label: this.$t("devices.hasSmoke"), value: true },
      { label: this.$t("devices.normal"), value: false }
    ];
  if (iconkey == "ic-zw-gas-alarm")
    return [
      { label: this.$t("devices.hasGar"), value: true },
      { label: this.$t("devices.normal"), value: false }
    ];
  if (iconkey == "ic-zw-co-alarm")
    return [
      { label: this.$t("devices.hasGar"), value: true },
      { label: this.$t("devices.normal"), value: false }
    ];
  if (iconkey == "ic-zw-security-door")
    return [
      { label: this.$t("devices.doorOpen"), value: true },
      { label: this.$t("devices.doorClose"), value: false }
    ];
  if (iconkey == "ic-zw-sencer-motion")
    return [
      { label: this.$t("devices.motionDetect"), value: true },
      { label: this.$t("devices.noMotion"), value: false }
    ];
  return [
    { label: this.$t("devices.statusOn"), value: true },
    { label: this.$t("devices.statusOff"), value: false }
  ];
}
</script>

<style lang="scss">
</style>
