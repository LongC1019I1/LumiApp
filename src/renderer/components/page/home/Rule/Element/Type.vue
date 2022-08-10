<template>
  <base-dropdown
    class="rule-info-dropdown w-100 mb-1"
    position="right"
    :ruleType="ruleType"
    :disabled="isDisabled"
  >
    <template #title>
      <div class="rule-info-box" :class="{disabled:isDisabled}">
        <div class="label">{{$t('rule.ruleType')}}</div>
        <div class="info">
          {{$t('rule.'+curenrtRuleType.name)}}
          <i class="dropdown-icon mdi mdi-menu-down"></i>
        </div>
      </div>
    </template>
    <div
      v-for="ruleType in selectRuleTypeOption"
      :key="ruleType.value"
      class="dropdown-item"
      @click="updateRuleType(ruleType.value)"
    >{{$t('rule.'+ruleType.name)}}</div>
  </base-dropdown>
</template>

<script>
let selectRuleTypeOption = [
  {
    name: "ruleNormal",
    value: "normal"
  },
  {
    name: "ruleSecure",
    value: "secure"
  },
  {
    name: "ruleTimer",
    value: "timer"
  }
];
export default {
  name: "rule-manager",
  data() {
    return {
      selectRuleTypeOption,
      curenrtRuleType: selectRuleTypeOption[0]
    };
  },
  computed: {
    ruleType,
    isDisabled
  },
  methods: {
    updateRuleType
  }
};
function isDisabled() {
  return !!$state.RuleManager.ruleid;
}

function ruleType() {
  let ruleType = $state.RuleManager.type;
  if (ruleType === 2) this.curenrtRuleType = this.selectRuleTypeOption[1];
  else if ($state.RuleManager.in.delay || $state.RuleManager.in.delay === 0)
    this.curenrtRuleType = this.selectRuleTypeOption[2];
  else if (ruleType === 0) this.curenrtRuleType = this.selectRuleTypeOption[0];
  else $commit("RuleManager/SET_DATA", { type: 0 });
  return ruleType;
}

async function updateRuleType(value) {
  let newInData = { ...$state.RuleManager.in };
  delete newInData.delay;
  if (value === "normal")
    $commit("RuleManager/SET_DATA", { type: 0, in: newInData });
  if (value === "secure")
    $commit("RuleManager/SET_DATA", { type: 2, in: newInData });
  if (value === "timer") {
    if (newInData.devices.length && newInData.devices.length > 1) {
      let checkChangeTypeConfirm = await $alertify.confirm({
        title: this.$t("notify.notifyWarninglTitle"),
        text: this.$t("rule.notifyChangeTypeWarning"),
        showCancelButton: true,
        confirmButtonText: this.$t("confirm"),
        cancelButtonText: this.$t("cancel")
      });
      if (!(checkChangeTypeConfirm && checkChangeTypeConfirm.isConfirmed))
        return;
      newInData.devices = [];
    }
    $commit("RuleManager/SET_DATA", {
      type: 0,
      in: { delay: 0, ...newInData }
    });
  }
}
</script>

<style lang="scss">
</style>
