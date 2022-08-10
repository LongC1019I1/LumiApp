<template>
  <div id="rule" class="main-layout">
    <div class="rule-list-box">
      <rule-list
        :selectedRule="selectedRule"
        :ruleType="ruleType"
        @updateRuleType="updateRuleType"
      />
    </div>
    <div class="rule-manager-box">
      <rule-manager/>
    </div>
  </div>
</template>

<script>
import RuleManager from "./RuleManager";
import RuleList from "./RuleList";

export default {
  name: "rule",
  data() {
    return {
      ruleType: "all",
      selectedRule: false
    };
  },
  components: {
    RuleList,
    RuleManager
  },
  methods: { updateRuleType },
  destroyed() {
    $dispatch($api.RuleManager.resetData);
  }
};

function updateRuleType(value) {
  this.ruleType = value;
  $dispatch("RuleManager/setRule", false);
}
</script>

<style scoped lang="scss">
</style>
