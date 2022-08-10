<template>
  <div class="w-100 h-100 text-center p-5">
    <span>{{ $t("configHC.text.rebootText") }}</span>
    <div class="mt-3">
      <base-button @click="submit" type="primary">{{
        $t("configHC.button.reboot")
      }}</base-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "configHC-reboot",
  methods: {
    submit,
  },
};

async function submit() {
  let confirm = await $alertify.custom({
    title: this.$t("notify.notifyDefautlTitle"),
    text: this.$t("configHC.message.cormfirmRebootText"),
    showCancelButton: true,
    confirmButtonText: this.$t("confirm"),
    cancelButtonText: this.$t("cancel"),
  });
  if (!confirm.isConfirmed) return;
  let rebootResponse = await $dispatch($api.ConfigHC.reboot);
  if (rebootResponse && rebootResponse.success) {
    $alertify
      .confirm({
        title: this.$t("notify.notifyDefautlTitle"),
        html: `${this.$t("configHC.message.updateFirmwareText1")}<h6>${this.$t(
          "configHC.message.updateFirmwareText2"
        )}</h6>`,
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
