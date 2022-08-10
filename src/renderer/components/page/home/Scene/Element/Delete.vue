<template>
  <div
    class="scene-info-box mb-1 bg-gray-2 c-p text-danger text-center justify-center"
    @click="deleteScene"
  >
    <span class="p-2">{{$t('scene.deleteScene')}}</span>
  </div>
</template>

<script>
export default {
  name: "scene-delete",
  methods: {
    deleteScene
  }
};

function deleteScene() {
  $alertify
    .confirm({
      title: this.$t("notify.notifyWarninglTitle"),
      text: this.$t("scene.confirmDeleteScene"),
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
