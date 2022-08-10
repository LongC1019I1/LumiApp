\<template>
  <div class="pl-2 mt-5 row device-status">
    <div class="pl-3 w-max">
      <i class="icon-lighting_droplight_1"></i>
    </div>
    <div class="col w-100">
      <vue-slider
        @drag-end="status===0?$emit('updateStatus',{
            command: DEVICE_TRAIT.OnOff,
            params: { on: false }
          }):$emit('updateStatus',{
            command: DEVICE_TRAIT.Brightness,
            params: { brightness: status}
          })"
        :drag-on-click="true"
        v-model="status"
        class="dimmer-rule-slider"
      />
    </div>
  </div>
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
      status:
        this.value.params.on === false
          ? 0
          : this.value.params.brightness,
      DEVICE_TRAIT
    };
  },
  watch: {
    value(value) {
      this.status =
        value.params.on === false
          ? 0
          : value.params.brightness;
    }
  }
};
</script>

<style lang="scss">
</style>
