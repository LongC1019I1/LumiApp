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
    states: Object
  },
  data() {
    return {
      statusList: [
        { label: this.$t("devices.on"), value: true },
        { label: this.$t("devices.off"), value: false }
      ],
      selectAttributes: {
        ref: "openIndicator",
        role: "presentation",
        class: "vs__open-indicator"
      }
    };
  }
};
</script>

<style lang="scss">
</style>
