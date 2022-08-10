<template>
  <div v-if="isRegisterSuccess">
    <div role="form" class="text-center">
      <span v-show="account">
        <strong>{{$t('account.text.registerSuccess')}}</strong>
      </span>
      <span>&nbsp;</span>
      <!-- verifyCode -->
      <span v-show="inputError" class="text-error">{{inputError}}</span>
      <span>&nbsp;</span>
      <!-- button -->
      <div class="text-center">
        <base-button
          type="primary"
          class="my-4"
          @click="$router.push({name: 'account-login', query:$route.query})"
        >{{ $t('account.buttons.continue')}}</base-button>
      </div>
    </div>
  </div>
  <div v-else>
    <div role="form">
      <div class="mb-2">
        <span v-show="account">
          {{$t('account.text.verifyCodeSendTo')}}
          <strong>{{account}}</strong>
        </span>
        <span>&nbsp;</span>
      </div>
      <!-- verifyCode -->
      <base-input
        type="number"
        inputID="verifyCode"
        :placeholder="$t('account.input_text.verifyCode')"
        addon-left-icon="mdi mdi-key"
        :class="{'input-error':!isVerifyCodeValid||inputError}"
        v-model="verifyCode"
        maxlength="15"
        @input="checkVerifyCode"
        @onEnter="confirm"
      ></base-input>
      <span v-show="inputError" class="text-error">{{inputError}}</span>
      <span>&nbsp;</span>
      <!-- button -->
      <div class="text-center">
        <base-button
          type="primary"
          class="my-4"
          @click="confirm"
        >{{ $t('account.buttons.verifyCode') }}</base-button>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-5">
        <router-link :to="{name:'account-register', query:$route.query}" class="text-white">
          <i class="mdi mdi-arrow-left"></i>
          <strong>{{ $t('account.text.goPreviousButton') }}</strong>
        </router-link>
      </div>
      <div class="col-7 text-right">
        <span class="text-warning c-p" @click="reSendVerifyCode">
          <strong>{{ $t('account.text.reSendVerifyCode') }}</strong>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { checkVerifyCode } from "./function";
export default {
  name: "landing-page",
  data() {
    return {
      isVerifyCodeValid: true,
      isRegisterSuccess: false,
      account: "",
      verifyCode: "",
      inputError: ""
    };
  },
  methods: {
    confirm,
    checkVerifyCode,
    reSendVerifyCode
  },
  mounted
};
//methode
async function confirm(e) {
  let data = {};

  if (!this.verifyCode) {
    this.inputError = this.$t("account.messages.enterYourVerifyCode");
  } else {
    if (!this.isVerifyCodeValid) {
      this.inputError = this.$t("account.messages.verifYCodeInvalid");
    } else data.verify_code = this.verifyCode;
  }
  if (!data.verify_code) {
    document.getElementById("verifyCode").focus();
    return;
  }

  if (this.$route.query.phonenumber) {
    data.phonenumber = this.$route.query.phonenumber;
  } else if (this.$route.query.email) {
    data.email = this.$route.query.email;
  } else {
    alerify.error(this.$t("account.messages.accountNotFound"));
    $router.push({ name: "account-register" });
    return;
  }

  let verifyCodeData = await $dispatch($api.User.registerConfirm, data);
  if (verifyCodeData && verifyCodeData.success) {
    this.isRegisterSuccess = true;
  } else {
    if (verifyCodeData && verifyCodeData.statusCode === 501) {
      this.inputError = this.$t("account.messages.verifyCodedWrong");
      document.getElementById("verifyCode").focus();
      return;
    }
  }
}
//cycleLife
function mounted() {
  if (this.$route.query.phonenumber)
    this.account = this.$route.query.phonenumberFormat;
  else this.account = this.$route.query.email;
  document.getElementById("verifyCode").focus();
}

//helper
async function reSendVerifyCode() {
  let data = this.$route.query;
  let verifyData = await $dispatch("User/registerGetVerifyCode", data);
  if (verifyData && verifyData.success) {
    $alertify.success(this.$t("account.messages.reSendSuccess"));
  } else {
    $alertify.error(this.$t("account.messages.accountNotFound"));
    $router.push({ name: "account-register" });
    return;
  }
}
</script>

<style>
</style>
