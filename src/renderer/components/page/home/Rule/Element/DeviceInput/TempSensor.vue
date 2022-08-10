<template>
  <base-input
    type="number"
    :value="states.Temperature.temperature"
    @input="value=>$emit('updateStates',{Temperature:{temperature:value>1000?1000:value<0?0:value}})"
  >
    <template #addonRight>
      <span>°C</span>
    </template>
  </base-input>
</template>

<script>
export default {
  name: "modal-device-input-switch",
  props: {
    states: Object
  },
};
</script>

<style lang="scss">
</style>
