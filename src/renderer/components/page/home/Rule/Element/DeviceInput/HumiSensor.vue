<template>
  <base-input
    type="number"
    :value="states.Humidity.humidity"
    @input="value=>$emit('updateStates',{Humidity:{humidity:value>100?100:value<0?0:value}})"
  >
    <template #addonRight>%</template>
  </base-input>
</template>

<script>
export default {
  name: "modal-device-input-humi-sensor",
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
