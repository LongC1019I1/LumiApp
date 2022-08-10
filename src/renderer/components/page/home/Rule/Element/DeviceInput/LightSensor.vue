<template>
  <base-input
    type="number"
    :value="states.Luminance.lux"
    @input="value=>$emit('updateStates',{Luminance:{lux:value>20000?20000:value<0?0:value}})"
  >
    <template #addonRight>
      <span>Lux</span>
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
