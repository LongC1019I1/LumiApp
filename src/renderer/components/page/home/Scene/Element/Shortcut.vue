<template>
  <div class="scene-info-box mb-3">
    <div class="label">{{$t('scene.addShortcut')}}</div>
    <div class="info">
      <base-slider size="md" class="mb-0" :value="isShortcut" @submit="updateShortcut"></base-slider>
    </div>
  </div>
</template>

<script>
export default {
  name: "scene-manager",
  props: {},
  data() {
    return {};
  },
  computed: { isShortcut },
  methods: {
    updateShortcut
  }
};

function isShortcut() {
  return $state.RuleManager.shortcut_by_user &&
    $state.RuleManager.shortcut_by_user[$state.Customer.customerData.id]
    ? true
    : false;
}

function updateShortcut() {
  let newShotcut = Object.assign({}, $state.RuleManager.shortcut_by_user);
  newShotcut[$state.Customer.customerData.id] = this.isShortcut ? 0 : 1;
  $commit("RuleManager/SET_DATA", { shortcut_by_user: newShotcut });
}
</script>

<style lang="scss">
</style>
