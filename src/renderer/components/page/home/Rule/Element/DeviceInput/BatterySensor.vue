<template>
  <base-input
    type="number"
    :value="states.Battery.battery"
    @input="value=>$emit('updateStates',{Battery:{battery:value>100?100:value<0?0:value}})"
  >
    <template #addonRight>
      <span>%</span>
    </template>
  </base-input>
</template>

<script>
export default {
  name: "modal-device-input-battery-sensor",
  props: {
    states: Object
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
</style>
