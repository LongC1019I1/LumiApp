<template>
  <div
    class="rule-info-box mt-3 bg-gray-2 c-p text-danger text-center justify-center mb-0"
    @click="deleteRule"
  >
    <span class="p-2">{{$t('rule.deleteRule')}}</span>
  </div>
</template>

<script>
export default {
  name: "rule-delete",
  methods: {
    deleteRule
  }
};

function deleteRule() {
  $alertify
    .confirm({
      title: this.$t("notify.notifyWarninglTitle"),
      text: this.$t("rule.confirmDeleteRule"),
      showCancelButton: true,
      confirmButtonText: this.$t("confirm"),
      cancelButtonText: this.$t("cancel")
    })
    .then(result => {
      if (result.isConfirmed && $state.RuleManager.ruleid)
        $dispatch($api.HomeConfig.deleteRule, {
          ruleid: $state.RuleManager.ruleid
        });
    });
}
</script>

<style lang="scss">
</style>
