<template>
  <div class="pl-2 mt-5 row device-status">
    <div class="pl-3 w-max">
      <i class="icon-lighting_droplight_1"></i>
    </div>
    <div class="col w-100">
      <vue-slider
        @drag-end="
          $emit('updateStates', {
            Brightness: { brightness },
          })
        "
        :drag-on-click="true"
        v-model="brightness"
        class="dimmer-rule-slider"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "modal-device-input-dimmer",
  props: {
    states: Object,
  },
  data() {
    return {
      brightness: this.states.Brightness&&this.states.Brightness.brightness||0,
    };
  },
  watch: {
    states,
  },
};

function states(states) {
  this.brightness = states.Brightness&&states.Brightness.brightness || 0;
}
</script>

<style lang="scss">
</style>
