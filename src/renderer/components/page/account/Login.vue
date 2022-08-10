<template>
  <div>
    <div role="form">
      <base-checkbox
        v-model="isLoginWithEmail"
        class="mb-3"
        @input="inputError = ''"
        @onEnter="isLoginWithEmail=!isLoginWithEmail"
      >{{ $t('account.text.isLoginWithEmail') }}</base-checkbox>
      <!-- email -->
      <base-input
        inputID="email"
        v-if="isLoginWithEmail"
        v-model="email"
        :class="{'input-error':!isEmailValid||inputError}"
        placeholder="Email"
        addon-left-icon="mdi mdi-email"
        maxlength="30"
        type="text"
        @blur="email?checkEmailInput():''"
        @input="checkEmailInput"
        @onEnter="signin"
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
        autofocus
        :maxLen="15"
        :placeholder="$t('account.input_text.phone')"
        @blur="phonenumber&&isPhoneValid?inputError='':''"
        @input="checkPhoneInput"
        @keyup.native.enter="signin"
      />
      <!-- input error -->
      <span class="text-error">{{inputError}}&nbsp;</span>
      <!-- password -->
      <base-input
        inputID="password"
        :type="isShowPassword?'text':'password'"
        :class="{'input-error':passwordError||!isPassValid}"
        :placeholder="$t('account.input_text.password')"
        addon-left-icon="mdi mdi-lock"
        :addon-right-icon="password?isShowPassword?'mdi mdi-eye':'mdi mdi-eye-off':''"
        @rightIconClick="isShowPassword=!isShowPassword"
        maxlength="15"
        v-model="password"
        @blur="password?checkPassInput():''"
        @input="checkPassInput"
        @onEnter="signin"
      />
      <span class="text-error">&nbsp;{{passwordError}}</span>
      <base-checkbox v-model="rememberMe">
        <strong>{{ $t('account.text.rememberMe') }}</strong>
      </base-checkbox>
      <div class="text-center my-4">
        <base-button
          type="primary"
          @click="signin"
          @keyup.enter="signin"
        >{{ $t('account.buttons.login') }}</base-button>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-4">
        <router-link :to="{name: 'account-forgotPassword'}" class="text-warning">
          <strong>{{ $t('account.text.forgotPassword') }}</strong>
        </router-link>
      </div>
      <div class="col-8 text-right">
        {{ $t('account.text.notHaveAccount') }}
        <router-link :to="{name: 'account-register'}" class="text-warning">
          <strong>{{ $t('account.text.register') }}</strong>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {
  checkPhoneInput,
  checkEmailInput,
  checkPassInput,
  md5
} from "./function.js";

export default {
  name: "login-page",
  data() {
    return {
      isShowPassword: false,
      isLoginWithEmail: false,
      isPhoneValid: true,
      isEmailValid: true,
      isPassValid: true,
      inputError: "",
      passwordError: "",
      rememberMe: false,
      email: "",
      phonenumber: "",
      password: "",
      defaultLang: localStorage.getItem("lang")
    };
  },
  methods: {
    signin,
    checkPhoneInput,
    checkEmailInput,
    checkPassInput
  },
  created,
  mounted
};
//method

async function signin(e) {
  let data = {};
  //email
  if (this.isLoginWithEmail) {
    if (!this.email) {
      this.inputError = this.$t("account.messages.enterYourEmail");
    } else {
      if (!this.isEmailValid) {
        this.inputError = this.$t("account.messages.emailInvalid");
      } else data.email = this.email;
    }
  }
  //check Phonenumber
  else {
    if (!this.phonenumber) {
      this.inputError = this.$t("account.messages.enterYourPhoneNumber");
    } else {
      if (!this.isPhoneValid) {
        this.inputError = this.$t("account.messages.phoneNumberInvalid");
      } else data.phonenumber = this.phonenumber.replace(/\s+/g, "");
    }
  }
  //password
  if (!this.password) {
    this.passwordError = this.$t("account.messages.enterYourPassword");
  } else {
    if (!this.isPassValid) {
      this.passwordError = this.$t("account.messages.passwordInvalid");
    } else data.password = this.password;
  }

  if (!data.phonenumber && !this.isLoginWithEmail) {
    document.getElementById("phonenumber").focus();
    return;
  }

  if (!data.email && this.isLoginWithEmail) {
    document.getElementById("email").focus();
    return;
  }
  if (!data.password) {
    document.getElementById("password").focus();
    return;
  }

  localStorage.setItem("rememberMe", this.rememberMe);
  let loginData = await $dispatch($api.User.login, data);
  if (loginData && loginData.success) {
    sessionStorage.setItem("access_token", loginData.data.access_token);
    if (this.rememberMe) {
      localStorage.setItem("refresh_token", loginData.data.refresh_token);
    } else {
      localStorage.removeItem("refresh_token");
    }

    let password = md5(this.password);
    localStorage.setItem("password", password);

    if (this.email){
      localStorage.setItem("email", this.email)
    }
   if (this.phonenumber){
     localStorage.setItem("phone", this.phonenumber)
   }

    this.$router.push("/Homes");
  } else {
    if (loginData&&loginData.statusCode === 501) {
      this.passwordError = " ";
      this.inputError = this.$t("account.messages.wrongUserNameOrPassword");
    }
  }
}

//life-cycle
async function created() {
  let rememberMe = localStorage.getItem("rememberMe");
  if (rememberMe == "true") this.rememberMe = true;
  if (this.$route.query.phonenumber)
    this.phonenumber = this.$route.query.phonenumberFormat;
  else if (this.$route.query.email) {
    this.isLoginWithEmail = true;
    this.email = this.$route.query.email;
  }
}

function mounted() {
  if (this.isLoginWithEmail) document.getElementById("email").focus();
  else document.getElementById("phonenumber").focus();
}
</script>

<style>
</style>
