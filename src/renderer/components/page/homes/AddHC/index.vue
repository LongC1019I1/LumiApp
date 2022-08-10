<template>
  <div id="pageContent" class="addHC-page bg-blur lumi-input">
    <div class="m-0 h-100">
      <div class="container h-100">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <card type="secondary" class="border-0 bg-transparent">
              <div class="mb-3 text-center">
                <strong>
                  <h5>{{ $t("configHC.text.addHcText") }}</h5>
                  <h5>{{ $t("configHC.text.addHcText2") }}</h5>
                </strong>
              </div>
              <div>
                <div role="form">
                  <div
                    class="form-group"
                    :class="{ 'input-error': !isMacHCInputValid || inputError }"
                  >
                    <masked-input
                      id="macHC"
                      type="text"
                      name="phone"
                      class="form-control text-center"
                      v-model="macHC"
                      placeholder="__:__:__:__:__:__"
                      :mask="[
                        /[0-9,a-z,A-Z]/,
                        /[0-9,a-z,A-Z]/,
                        ':',
                        /[0-9,a-z,A-Z]/,
                        /[0-9,a-z,A-Z]/,
                        ':',
                        /[0-9,a-z,A-Z]/,
                        /[0-9,a-z,A-Z]/,
                        ':',
                        /[0-9,a-z,A-Z]/,
                        /[0-9,a-z,A-Z]/,
                        ':',
                        /[0-9,a-z,A-Z]/,
                        /[0-9,a-z,A-Z]/,
                        ':',
                        /[0-9,a-z,A-Z]/,
                        /[0-9,a-z,A-Z]/,
                      ]"
                      placeholderChar="_"
                      @input="checkMacHCInput"
                      @keyup.enter="sendRequest"
                    ></masked-input>
                  </div>
                  <span class="text-error">&nbsp;{{ inputError }}</span>
                  <div class="text-center mt-2">
                    <base-button
                      type="primary"
                      block
                      class="mb-4"
                      @click="sendRequest"
                    >
                      <strong>{{ $t("configHC.button.CONTINUE") }}</strong>
                    </base-button>
                  </div>
                </div>
                <div class="text-center">
                  {{ $t("configHC.text.HCNotConnectInternet") }}
                  <router-link
                    :to="{
                      name: 'configHC',
                      params: $route.params,
                      query: { isAddHCToHome: true },
                    }"
                    class="text-warning"
                  >
                    <strong>{{ $t("configHC.text.configHC") }}</strong>
                  </router-link>
                </div>
              </div>
            </card>
          </div>
        </div>
        <div class="back-btn-bottom c-p">
          <span @click="$router.back()">
            <i class="mdi mdi-chevron-double-left"></i>
            <strong>{{ $t("configHC.button.back") }}</strong>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "addHome",
  data() {
    return {
      isMacHCInputValid: true,
      macHC: "",
      inputError: "",
    };
  },
  methods: { sendRequest, checkMacHCInput },
};

function checkMacHCInput(e) {
  this.macHC = this.macHC.toLowerCase();
  if (!this.macHC || this.macHC.includes("_")) this.isMacHCInputValid = false;
  else {
    this.isMacHCInputValid = true;
    this.inputError = "";
  }
}

async function sendRequest() {
  if (!this.macHC) {
    this.inputError = this.$t("configHC.message.pleaseEnterYourMacHC");
    document.getElementById("macHC").focus();
    return;
  }
  if (!this.isMacHCInputValid) {
    this.inputError = this.$t("configHC.message.macHCInvalid");
    document.getElementById("macHC").focus();
    return;
  }

  if (this.$route.params.homeID) {
    let addHCResponse = await $dispatch($api.Mac.addHCToHome, {
      mac: this.macHC,
      home_id: this.$route.params.homeID,
    });
    if (addHCResponse && addHCResponse.success) {
      $commit("Home/UPDATE_LIST_HOME", []);
      await $alertify.confirm({
        title: this.$t("notify.notifyDefautlTitle"),
        text: this.$t("configHC.message.addHCToHomeSuccess"),
      });
      this.$router.push({ name: "listHome" });
    } else {
      if (addHCResponse.statusCode == 597) {
        let confirm = await $alertify.confirm({
          text: this.$t("configHC.message.HCNotConnectInternet"),
          confirmButtonText: this.$t("configHC.button.settingHC"),
          showCancelButton: true,
          cancelButtonText: this.$t("cancel"),
        });
        if (confirm.isConfirmed == true)
          this.$router.push({
            name: "configHC-network",
            query: { isAddHCToHome: true },
          });
      } else {
        await $alertify.confirm({
          text: addHCResponse.message,
        });
      }
      return;
    }
  }
}
</script>

<style lang="scss">
.addHC-page {
  .back-btn-bottom {
    position: absolute;
    bottom: 3rem;
    left: 50%;
    transform: translate(-50%);
  }
}
</style>