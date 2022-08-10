<template>
  <div class="pl-2 mt-5 row device-status">
    <div class="px-3 w-max" :class="'spin-'+status">
      <i class="icon-ic-zw-fan"></i>
    </div>
    <div class="col fan-number">
      <div
        v-for="index in [0,1,2,3,4]"
        :key="index"
        class="c-p"
        :class="{active:index<=status}"
        @click="index===0?$emit('updateStatus',{
            command: DEVICE_TRAIT.OnOff,
            params: { on: false }
          }):$emit('updateStatus',{
            command: DEVICE_TRAIT.Speed,
            params: { speed: index }
          })"
      >{{index}}</div>
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
      status: this.value.params.on === false ? 0 : this.value.params.speed,
      DEVICE_TRAIT
    };
  },
  watch: {
    value(value) {
      this.status = value.params.on === false ? 0 : value.params.speed;
    }
  }
};
</script>

<style lang="scss">
</style>
