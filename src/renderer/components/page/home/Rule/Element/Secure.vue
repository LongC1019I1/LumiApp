<template>
  <div class="rule-info-box mb-1">
    <div class="label">{{$t('rule.secure')}}</div>
    <div class="info">
      <base-slider size="md" class="mb-0" :value="isSecure" @submit="updateSecure"></base-slider>
    </div>
  </div>
</template>

<script>
import { TYPE_RULE } from "@/plugins/variableConst";
export default {
  name: "scene-manager",
  props: {},
  data() {
    return {};
  },
  computed: { isSecure },
  methods: {
    updateSecure
  }
};

function isSecure() {
  return $state.RuleManager.type === TYPE_RULE.rule_security;
}

function updateSecure() {
  $commit("RuleManager/SET_DATA", { type: this.isSecure ? 0 : 2 });
}
</script>

<style lang="scss">
</style>
