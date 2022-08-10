<template>
  <div class="w-100 h-100 text-center p-5">
    <span>{{ $t("configHC.text.factoryResetText") }}</span>
    <div class="mt-3">
      <base-button @click="submit" type="primary">{{
        $t("configHC.button.resetDefault")
      }}</base-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "configHC-factoryReset",
  methods: {
    submit,
  },
};

async function submit() {
  let confirm = await $alertify.custom({
    title: this.$t("notify.notifyDefautlTitle"),
    html: `<h6>${this.$t(
      "configHC.message.confirmResetDefault1"
    )}</h6><h6>${this.$t("configHC.message.confirmResetDefault2")}</h6>`,
    showCancelButton: true,
    confirmButtonText: this.$t("confirm"),
    cancelButtonText: this.$t("cancel"),
  });

  if (!confirm.isConfirmed) return;
  let resetResponse = await $dispatch($api.ConfigHC.reset);
  if (resetResponse && resetResponse.success) {
    $alertify
      .confirm({
        title: this.$t("notify.notifyDefautlTitle"),
        html: `<h6>${this.$t(
          "configHC.message.updateFirmwareText1"
        )}</h6><h6>${this.$t("configHC.message.updateFirmwareText2")}</h6>`,
        allowOutsideClick: false,
      })
      .then(() => {
        if ($state.ConfigHC.currentHcMac)
          $router.push({
            name: "home-controll",
            params: {
              homeID: $router.currentRoute.params.homeID,
            },
          });
        else
          $router.push({
            name: "listHome",
          });
      });
  } else
    $alertify.confirm({
      title: this.$t("notify.notifyDefautlTitle"),
      text: this.$t("notify.errorDefault"),
    });
}
</script>

<style lang="scss">
</style>
