<template>
  <div class="pl-2 mt-5 row device-status">
    <div class="px-3 w-max" :class="'spin-'+states.Speed.speed">
      <i class="icon-ic-zw-fan"></i>
    </div>
    <div class="col fan-number">
      <div
        v-for="index in [0,1,2,3,4]"
        :key="index"
        :class="{active:index<=states.Speed.speed}"
        @click="$emit('updateStates',{Speed: {speed: index}})"
      >{{index}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modal-device-input-fan",
  props: {
    states: Object
  }
};
</script>

<style lang="scss">
</style>
