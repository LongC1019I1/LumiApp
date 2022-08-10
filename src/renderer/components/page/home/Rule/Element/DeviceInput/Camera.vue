<template>
  <v-select
    class="mb-3 header-select"
    :options="statusList"
    :reduce="(label) => label.value"
    label="label"
    :clearable="false"
    :searchable="false"
    :value="states.CameraEvent.eventType"
    @input="value=>$emit('updateStates',{CameraEvent:{eventType:value }})"
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
        { label: this.$t("secure.noEvent"), value: 0 },
        { label: this.$t("secure.cameraConfigHurdlesDetect"), value: 1 },
        { label: this.$t("secure.cameraConfigIntrusionDetect"), value: 2 },
        { label: this.$t("secure.cameraConfigUpdateViewDetect"), value: 3 },
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
