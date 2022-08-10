<template>
  <card id="ruleList" header-classes="p-0">
    <v-select
      slot="header"
      class="mb-3 header-select"
      :options="selectRuleTypeOption"
      :reduce="(label) => label.value"
      label="label"
      :clearable="false"
      :searchable="false"
      :placeholder="$t('rule.choosseRuleType')"
      :value="ruleType"
      @input="
        (value) => {
          $emit('updateRuleType', value);
        }
      "
    >
      <template #open-indicator>
        <span v-bind="selectAttributes">
          <i class="mdi mdi-menu-down"></i>
        </span>
      </template>
    </v-select>
    <div v-for="(rule, index) in listRule" :key="index" class="mb-3 c-p">
      <div
        class="rule pr-2"
        :class="{
          active: selectedRule === rule.ruleid,
          'bg-disabled': !rule.enable,
        }"
      >
        <div
          class="name text-overflow-hidden pl-3"
          @click="$store.dispatch('RuleManager/setRule', rule)"
        >
          <span class="text-overflow-hidden">{{ rule.name }}</span>
        </div>
        <div class="option c-p">
          <div @click="deleteRule(rule.ruleid)">
            <div class="tooltip-hover">{{ $t("rule.deleteRule") }}</div>
            <i class="mdi mdi-trash-can" />
          </div>
          <div v-if="rule.enable" @click="toggleEnable(rule.ruleid, 0)">
            <div class="tooltip-hover">{{ $t("rule.turnOffRule") }}</div>
            <i class="mdi mdi-sync-off" />
          </div>
          <div v-else @click="toggleEnable(rule.ruleid, 1)">
            <div class="tooltip-hover">{{ $t("rule.turnOnRule") }}</div>
            <i class="mdi mdi-sync" />
          </div>
        </div>
      </div>
    </div>
  </card>
</template>

<script>
import { TYPE_RULE } from "@/plugins/variableConst";

export default {
  name: "ruleList",
  props: {
    ruleType: [Boolean, String],
  },
  data() {
    return {
      selectRuleTypeOption: [
        {
          label: this.$t("rule.allRule"),
          value: "all",
        },
        {
          label: this.$t("rule.ruleNormal"),
          value: "normal",
        },
        {
          label: this.$t("rule.ruleSecure"),
          value: "secure",
        },
        {
          label: this.$t("rule.ruleTimer"),
          value: "timer",
        },
      ],
      selectAttributes: {
        ref: "openIndicator",
        role: "presentation",
        class: "vs__open-indicator",
      },
    };
  },
  computed: {
    selectedRule,
    listRule,
  },
  methods: {
    deleteRule,
    toggleEnable,
  },
};

function selectedRule() {
  return $state.RuleManager.ruleid;
}

function listRule() {
  if (this.ruleType === "all")
    return $getters["HomeConfig/getAllRulesByType"]([
      TYPE_RULE.rule_nomal,
      TYPE_RULE.rule_security,
    ]).sort((a, b) => b.enable - a.enable);
  if (this.ruleType === "normal")
    return $getters["HomeConfig/getAllRulesByType"]([TYPE_RULE.rule_nomal])
      .filter((item) => !item.in.delay && item.in.delay !== 0)
      .sort((a, b) => b.enable - a.enable);
  if (this.ruleType === "secure")
    return $getters["HomeConfig/getAllRulesByType"]([
      TYPE_RULE.rule_security,
    ]).sort((a, b) => b.enable - a.enable);
  if (this.ruleType === "timer")
    return $getters["HomeConfig/getAllRulesByType"]([TYPE_RULE.rule_nomal])
      .filter((item) => item.in.delay || item.in.delay === 0)
      .sort((a, b) => b.enable - a.enable);
}

async function toggleEnable(ruleid, enable) {
  $dispatch($api.HomeConfig.updateRule, {
    ruleid,
    updateData: {
      enable,
    },
  });
}

function deleteRule(ruleid) {
  return $alertify
    .confirm({
      title: this.$t("notify.notifyWarninglTitle"),
      text: this.$t("rule.confirmDeleteRule"),
      showCancelButton: true,
      confirmButtonText: this.$t("confirm"),
      cancelButtonText: this.$t("cancel"),
    })
    .then((result) => {
      if (result.isConfirmed && ruleid)
        return $dispatch($api.HomeConfig.deleteRule, {
          ruleid,
        });
    });
}
</script>

<style lang="scss">
</style>
