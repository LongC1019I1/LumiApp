<template>
  <div class="w-50 mh-100 configHC-firmware">
    <span>{{ $t("configHC.text.curentVersion") }}</span>
    <div class="form-group disabled mt-2">
      <div class="form-info">{{ hcData.firmware.version_name }}</div>
    </div>
    <span>{{ $t("configHC.text.builđate") }}</span>
    <div class="form-group disabled mt-2">
      <div class="form-info">{{ date }}</div>
    </div>
    <!-- <h5>
      <strong>{{$t('configHC.text.updateFirmware')}}</strong>
    </h5> -->
    <span>{{ $t("configHC.text.updateFirmware") }}</span>
    <div class="form-group mt-2" :class="{ 'input-error': fileError }">
      <label for="file" class="c-p file-label m-0">
        <div class="form-info">
          {{ filename || $t("configHC.button.chooseFile") }}
        </div>
      </label>
      <input
        id="file"
        type="file"
        class="form-control c-p d-none"
        @change="dataChange"
        accept=".lumi"
      />
    </div>
    <span class="text-error">&nbsp;{{ fileError }}</span>
    <div class="text-center">
      <base-button
        size="sm"
        type="primary"
        class="ml-2"
        :disabled="!filename"
        @click="submit"
        >{{ $t("save") }}</base-button
      >
      <base-button size="sm" type="secondary" @click="cancel">{{
        $t("cancel")
      }}</base-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "addHome",
  props: ["hcData"],
  data() {
    return {
      fileError: "",
      filename: "",
      version: "---",
      date: "---",
    };
  },
  methods: {
    submit,
    cancel,
    dataChange,
  },
};

async function submit() {
  if (document.getElementById("file").files[0]) {
    let loading = $alertify.custom({
      html: `<h5 class="mt-3">${this.$t("configHC.message.uploadFirmware")}</h5>
             <div class="mb-5">
              <div class="loading-dots mt-3 mb-5">
                <div class="loading-dots--dot"></div>
                <div class="loading-dots--dot"></div>
                <div class="loading-dots--dot"></div>
                <div class="loading-dots--dot"></div>
              </div>
            </div>`,
      showConfirmButton: false,
      allowOutsideClick: false,
    });
    let configResponse = await $dispatch($api.ConfigHC.firmwareUpdate, {
      file: document.getElementById("file").files[0],
    });
    loading.close();
    if (configResponse.success) {
      $alertify
        .confirm({
          title: this.$t("notify.notifyDefautlTitle"),
          html: `${this.$t(
            "configHC.message.updateFirmwareText1"
          )}<h6>${this.$t("configHC.message.updateFirmwareText2")}</h6>`,
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
        text: this.$t("configHC.message.pleaseChooseFile"),
      });
  } else fileError = this.$t("configHC.message.pleaseChooseFile");
}

function cancel() {
  this.filename = "";
}

function dataChange() {
  this.fileError = "";
  this.filename = document.getElementById("file").files[0].name;
}
</script>

<style lang="scss">
.configHC-firmware {
  .file-label {
    width: 100%;
  }
}
</style>
