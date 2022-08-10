<template>
  <fragment>
    <div
      class="rule-info-box border-bottom-radius-1"
      :class="{ 'input-error': ruleNameError }"
      @click="$refs.ruleName.focus()"
    >
      <div class="label">{{ $t("rule.ruleName") }}</div>
      <div class="info">
        <input
          id="ruleName"
          ref="ruleName"
          type="text"
          class="text-right"
          maxlength="30"
          :placeholder="$t('rule.enterName')"
          v-model="currentName"
        >
      </div>
    </div>
    <span class="text-error">{{ ruleNameError }}&nbsp;</span>
  </fragment>
</template>

<script>
export default {
  name: "rule-manager",
  data() {
    return {
      ruleNameError: ""
    };
  },
  computed: {
    currentName: {
      get() {
        return $state.RuleManager.name;
      },
      set(value) {
        let ruleName = value.trim();
        if (!ruleName) this.ruleNameError = this.$t("rule.pleaseEnterRuleName");
        $commit("RuleManager/SET_DATA", { name: value });
      }
    }
  },
  watch: {
    currentName(value) {
      let format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      let ruleName = value.trim();
      if (ruleName) this.ruleNameError = "";
      if (format.test(ruleName))
        this.ruleNameError = this.$t("rule.ruleNoSpecialCharacter");
    }
  }
};
</script>

<style lang="scss">
</style>
