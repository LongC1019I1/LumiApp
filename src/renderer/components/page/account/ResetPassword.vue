<template>
  <div>
    <div role="form">
      <div class="mb-2">
        <span>
          {{$t('account.text.verifyCodeSendTo')}}
          <strong>{{account}}&nbsp;</strong>
        </span>
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
        @onEnter="resetPass"
      ></base-input>
      <span class="text-error">{{inputError}}&nbsp;</span>
      <!-- password -->
      <base-input
        inputID="password"
        :type="isShowPassword?'text':'password'"
        :placeholder="$t('account.input_text.newPassword')"
        addon-left-icon="mdi mdi-lock"
        :addon-right-icon="password?isShowPassword?'mdi mdi-eye':'mdi mdi-eye-off':''"
        @rightIconClick="isShowPassword=!isShowPassword"
        :class="{'input-error':!isPassValid||passwordError}"
        v-model="password"
        maxlength="15"
        @blur="password?checkPassInput():''"
        @input="checkPassInput"
        @onEnter="resetPass"
      ></base-input>
      <span class="text-error">{{passwordError}}&nbsp;</span>
      <!-- confirmpass -->
      <base-input
        inputID="confirmPassword"
        :type="isShowConfirmPassword?'text':'password'"
        :placeholder="$t('account.input_text.confirmNewPassword')"
        addon-left-icon="mdi mdi-lock"
        :addon-right-icon="confirmPassword?isShowConfirmPassword?'mdi mdi-eye':'mdi mdi-eye-off':''"
        @rightIconClick="isShowConfirmPassword=!isShowConfirmPassword"
        :class="{'input-error':!isConfirmPassValid||confirmPasswordError}"
        v-model="confirmPassword"
        maxlength="15"
        @blur="confirmPassword?checkConfirmPassInput():''"
        @input="checkConfirmPassInput"
        @onEnter="resetPass"
      ></base-input>
      <span class="text-error">{{confirmPasswordError}}&nbsp;</span>
      <!-- button -->
      <div class="text-center">
        <base-button
          type="primary"
          class="my-4"
          @click="resetPass"
        >{{ $t('account.buttons.resetPass') }}</base-button>
      </div>
    </div>
    <div class="row mt-3">
      <router-link
        :to="{name:'account-forgotPassword', query:$route.query}"
        class="text-white col-6"
      >
        <i class="mdi mdi-arrow-left"></i>
        <strong>{{ $t('account.text.goPreviousButton') }}</strong>
      </router-link>
      <div class="col-6 text-right">
        <span class="text-warning c-p" @click="reSendVerifyCode">
          <strong>{{ $t('account.text.reSendVerifyCode') }}</strong>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  checkConfirmPassInput,
  checkVerifyCode,
  checkPassInput
} from "./function";
export default {
  name: "landing-page",
  data() {
    return {
      isShowPassword: false,
      isShowConfirmPassword: false,

      isRegisterWithEmail: false,

      isPassValid: true,
      isConfirmPassValid: true,
      isVerifyCodeValid: true,

      verifyCode: "",
      password: "",
      confirmPassword: "",
      accountType: "",
      account: "",

      inputError: "",
      passwordError: "",
      confirmPasswordError: ""
    };
  },
  methods: {
    resetPass,
    checkPassInput,
    checkConfirmPassInput,
    checkVerifyCode,
    reSendVerifyCode
  },
  mounted
};

async function resetPass(e) {
  let data = {};

  //verifyCode
  if (!this.verifyCode) {
    this.inputError = this.$t("account.messages.enterYourVerifyCode");
  } else {
    if (!this.isVerifyCodeValid) {
      this.inputError = this.$t("account.messages.verifYCodeInvalid");
    } else data.verify_code = this.verifyCode;
  }

  //password
  if (!this.password) {
    this.passwordError = this.$t("account.messages.enterYourPassword");
  } else {
    if (!this.isPassValid) {
      this.passwordError = this.$t("account.messages.passwordInvalid");
    } else data.password = this.password;
  }
  //confirm pass
  if (data.password)
    if (!this.isConfirmPassValid || !this.confirmPassword) {
      this.confirmPasswordError = this.$t(
        "account.messages.confirmPasswordWrong"
      );
    } else data.password_confirm = this.confirmPassword;

  if (!data.verify_code) {
    document.getElementById("verifyCode").focus();
    return;
  }
  if (!data.password) {
    document.getElementById("password").focus();
    return;
  }
  if (!data.password_confirm) {
    document.getElementById("confirmPassword").focus();
    return;
  }
  let verifyCodeData;
  if (this.$route.query.phonenumber) {
    data.phonenumber = this.$route.query.phonenumber;
    verifyCodeData = await $dispatch(
      $api.Customer.forgotPassConfirmbyPhone,
      data
    );
  } else if (this.$route.query.email) {
    data.email = this.$route.query.email;
    verifyCodeData = await $dispatch(
      $api.Customer.forgotPassConfirmbyEmail,
      data
    );
  } else {
    alerify.error(this.$t("account.messages.accountNotFound"));
    $router.push({ name: "account-forgotPassword" });
    return;
  }
  if (verifyCodeData && verifyCodeData.success) {
    data.customer_id = verifyCodeData.data.customer_id;
    let resetPassData = await $dispatch($api.Customer.resetPass, data);
    if (resetPassData && resetPassData.success) {
      $alertify.confirm({
        title: this.$t("notify.notifyDefautlTitle"),
        text: this.$t("account.messages.successResetpass")
      });
      this.$router.push({ name: "account-login", query: this.$route.query });
    } else this.inputError = resetPassData.message;
  } else {
    if (verifyCodeData && verifyCodeData.statusCode === 501) {
      this.inputError = this.$t("account.messages.verifyCodedWrong");
      document.getElementById("verifyCode").focus();
      return;
    }
  }
}

async function reSendVerifyCode() {
  let verifyData;
  if (this.$route.query.phonenumber) {
    verifyData = await $dispatch($api.Customer.forgotPassbyPhone, {
      phonenumber: this.$route.query.phonenumber
    });
  } else if (this.$route.query.email) {
    verifyData = await $dispatch($api.Customer.forgotPassbyEmail, {
      email: this.$route.query.email
    });
  }
  if (verifyData && verifyData.success) {
    $alertify.success(this.$t("account.messages.reSendSuccess"));
  } else {
    $alertify.error(this.$t("account.messages.accountNotFound"));
    $router.push({ name: "account-forgotPassword" });
    return;
  }
}
//cycle
function mounted() {
  if (this.$route.query.phonenumber)
    this.account = this.$route.query.phonenumberFormat;
  else this.account = this.$route.query.email;
  document.getElementById("verifyCode").focus();
}
</script>

<style>
</style>
