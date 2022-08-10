<template>
  <v-select
    class="mb-5"
    :options="statusList"
    :reduce="label => label.value"
    v-model="status"
    label="label"
    :clearable="false"
    :searchable="false"
    @input="$emit('updateStatus',{
            command: DEVICE_TRAIT.OnOff,
            params: { on: status }
          })"
  >
    <template #open-indicator>
      <span v-bind="selectAttributes">
        <i class="mdi mdi-menu-down"></i>
      </span>
    </template>
  </v-select>
</template>

<script>
import { DEVICE_TRAIT } from "@/plugins/variableConst";
export default {
  name: "modal-update-deivce-switch",
  props: {
    value: Object
  },
  data() {
    return {
      status: this.value.params&&this.value.params.on,
      statusList: [
        { label: this.$t("devices.on"), value: true },
        { label: this.$t("devices.off"), value: false }
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
    value(value) {
      this.status = value.params.on;
    }
  }
};
</script>

<style lang="scss">
</style>
