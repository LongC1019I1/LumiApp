<template>
  <div>
    <div role="form">
      <base-checkbox
        v-model="isGetCodeWithEmail"
        class="mb-3"
        @input="inputError=''"
        @onEnter="isGetCodeWithEmail=!isGetCodeWithEmail"
      >{{ $t('account.text.isGetCodeWithEmail') }}</base-checkbox>
      <!-- email -->
      <base-input
        inputID="email"
        v-if="isGetCodeWithEmail"
        v-model="email"
        :class="{'input-error':!isEmailValid||inputError}"
        placeholder="Email"
        addon-left-icon="mdi mdi-email"
        maxlength="30"
        type="text"
        @blur="email?checkEmailInput():''"
        @input="checkEmailInput"
        @keyup.enter="sendRequest"
      />
      <!-- phonenumber -->
      <vue-tel-input
        v-else
        inputId="phonenumber"
        :wrapperClasses="`form-group input-group ${isPhoneValid&&!inputError?'':'input-error'}`"
        v-model="phonenumber"
        inputClasses="form-control"
        defaultCountry="vn"
        validCharactersOnly
        :maxLen="15"
        :placeholder="$t('account.input_text.phone')"
        @blur="isPhoneValid?inputError='':''"
        @input="checkPhoneInput"
        @enter="sendRequest"
      />
      <!-- input error -->
      <span class="text-error">&nbsp;{{inputError}}</span>
      <div class="text-center">
        <base-button type="primary" class="my-4" @click="sendRequest">
          <strong>{{ $t('account.buttons.recoverPass') }}</strong>
        </base-button>
      </div>
    </div>
    <div class="text-center">
      <router-link :to="{name:'account-login', query:$route.query}" class="text-white">
        <i class="mdi mdi-arrow-left"></i>
        <strong>{{ $t('account.text.goPreviousButton') }}</strong>
      </router-link>
    </div>
  </div>
</template>

<script>
import { checkPhoneInput, checkEmailInput } from "./function.js";
export default {
  name: "landing-page",
  data() {
    return {
      isGetCodeWithEmail: false,
      isPhoneValid: true,
      isEmailValid: true,
      email: "",
      phonenumber: "",
      inputError: "",
      defaultLang: localStorage.getItem("lang")
    };
  },
  methods: {
    sendRequest,
    checkPhoneInput,
    checkEmailInput
  },
  mounted
};

async function sendRequest(e) {
  let data = {};
  //checkEmail
  if (this.isGetCodeWithEmail) {
    if (!this.email) {
      this.inputError = this.$t("account.messages.enterYourEmail");
      document.getElementById("email").focus();
      return;
    } else {
      data.email = this.email;
      if (!this.isEmailValid) {
        this.inputError = this.$t("account.messages.emailInvalid");
        document.getElementById("email").focus();
        return;
      }
    }
  }
  //check Phonenumber
  else {
    if (!this.phonenumber) {
      this.inputError = this.$t("account.messages.enterYourPhoneNumber");
      document.getElementById("phonenumber").focus();
      return;
    } else {
      data.phonenumber = this.phonenumber.replace(/\s+/g, "");
      if (!this.isPhoneValid) {
        this.inputError = this.$t("account.messages.phoneNumberInvalid");
        document.getElementById("phonenumber").focus();
        return;
      }
    }
  }
  let verifyData;
  if (data.phonenumber) {
    verifyData = await $dispatch($api.Customer.forgotPassbyPhone, data);
    data.phonenumberFormat = this.phonenumber;
  } else if (data.email) {
    verifyData = await $dispatch($api.Customer.forgotPassbyEmail, data);
  }
  if (verifyData && verifyData.success) {
    this.$router.push({ name: "account-resetPassword", query: data });
  } else {
    if (verifyData && verifyData.statusCode === 501) {
      this.inputError = this.$t("account.messages.accountNotFound");
    }
  }
}

function mounted() {
  document.getElementById("phonenumber").focus();
}
</script>

<style>
</style>
