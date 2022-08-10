<template>
  <div>
    <div role="form">
      <base-checkbox
        v-model="isRegisterWithEmail"
        class="mb-3"
        @input="inputError=''"
        @onEnter="isRegisterWithEmail=!isRegisterWithEmail"
      >{{ $t('account.text.isRegisterWithEmail') }}</base-checkbox>
      <!-- email -->
      <base-input
        inputID="email"
        v-if="isRegisterWithEmail"
        v-model="email"
        :class="{'input-error':!isEmailValid||inputError}"
        placeholder="Email"
        addon-left-icon="mdi mdi-email"
        maxlength="30"
        type="text"
        @blur="email?checkEmailInput():''"
        @input="checkEmailInput"
        @onEnter="register"
      />
      <!-- phonenumber -->
      <vue-tel-input
        v-else
        inputId="phonenumber"
        :wrapperClasses="`form-group input-group ${isPhoneValid&&!inputError?'':'input-error'}`"
        v-model="phonenumber"
        validCharactersOnly
        inputClasses="form-control"
        defaultCountry="vn"
        :maxLen="15"
        :placeholder="$t('account.input_text.phone')"
        @blur="phonenumber&&isPhoneValid?inputError='':''"
        @input="checkPhoneInput"
        @keyup.native.enter="register"
      />
      <!-- input error -->
      <span v-show="inputError" class="text-error">{{ inputError }}</span>
      <span>&nbsp;</span>
      <!-- password -->
      <!-- password -->
      <base-input
        inputID="password"
        :type="isShowPassword?'text':'password'"
        :placeholder="$t('account.input_text.password')"
        addon-left-icon="mdi mdi-lock"
        :addon-right-icon="password?isShowPassword?'mdi mdi-eye':'mdi mdi-eye-off':''"
        @rightIconClick="isShowPassword=!isShowPassword"
        :class="{'input-error':!isPassValid||passwordError}"
        v-model="password"
        maxlength="15"
        @blur="password?checkPassInput:''"
        @input="checkPassInput"
        @onEnter="register"
      ></base-input>
      <span v-show="passwordError" class="text-error">{{passwordError}}</span>
      <span>&nbsp;</span>
      <!-- confirmpass -->
      <base-input
        inputID="confirmPassword"
        :type="isShowConfirmPassword?'text':'password'"
        :placeholder="$t('account.input_text.confirmPassword')"
        addon-left-icon="mdi mdi-lock"
        :addon-right-icon="confirmPassword?isShowConfirmPassword?'mdi mdi-eye':'mdi mdi-eye-off':''"
        @rightIconClick="isShowConfirmPassword=!isShowConfirmPassword"
        :class="{'input-error':!isConfirmPassValid||confirmPasswordError}"
        v-model="confirmPassword"
        maxlength="15"
        @blur="confirmPassword?checkConfirmPassInput():''"
        @input="checkConfirmPassInput"
        @onEnter="register"
      ></base-input>
      <span v-show="confirmPasswordError" class="text-error">{{confirmPasswordError}}</span>
      <span>&nbsp;</span>
      <!-- country -->
      <div class="selectCountryBox mt-4">
        <span class="country-label">&nbsp;{{$t('account.text.chooseCountry')}}&nbsp;</span>
        <vue-tel-input
          id="selectCounty"
          enabledCountryCode
          wrapperClasses="form-group input-group input-group-alternative"
          inputClasses="form-control"
          defaultCountry="vn"
          :dropdownOptions="{disabledDialCode: true}"
          :placeholder="$t('account.input_text.phone')"
          @country-changed="selectCountry"
        />
      </div>
      <!-- term and policy -->
      <span>
        {{ $t('account.text.termAndPolicyText1') }}
        <strong>
          <a
            class="text-hightlight"
            href="https://lumi.vn/terms-of-service"
            target="_blank"
            rel="noopener noreferrer"
          >{{ $t('account.text.acceptTerm') }}</a>
        </strong>
        {{ $t('account.text.termAndPolicyText2') }}
        <strong>
          <a
            class="text-hightlight"
            href="https://lumi.vn/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >{{ $t('account.text.policy') }}</a>
        </strong>
        {{ $t('account.text.termAndPolicyText3') }}
      </span>
      <!-- button -->
      <div class="text-center">
        <base-button
          type="primary"
          class="my-4"
          @click="register"
        >{{ $t('account.buttons.register') }}</base-button>
      </div>
    </div>
    <div class="text-center">
      {{ $t('account.text.haveAccount') }}
      <router-link to="/account/login" class="text-warning">
        <strong>{{ $t('account.text.login') }}</strong>
      </router-link>
    </div>
  </div>
</template>

<script>
import {
  checkPhoneInput,
  checkEmailInput,
  checkPassInput,
  checkConfirmPassInput
} from "./function.js";
export default {
  name: "landing-page",
  data() {
    return {
      countryCode: "VN",
      isShowPassword: false,
      isShowConfirmPassword: false,
      isRegisterWithEmail: false,

      isPhoneValid: true,
      isEmailValid: true,
      isPassValid: true,
      isConfirmPassValid: true,

      acceptTerm: false,
      policy: false,
      email: "",
      phonenumber: "",
      password: "",
      confirmPassword: "",

      inputError: "",
      passwordError: "",
      confirmPasswordError: ""
    };
  },
  methods: {
    register,
    checkPhoneInput,
    checkEmailInput,
    checkPassInput,
    checkConfirmPassInput,
    selectCountry
  },
  created,
  mounted
};

async function register(e) {
  let data = {
    country: this.countryCode
  };

  //email
  if (this.isRegisterWithEmail) {
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
      } else {
        data.phonenumber = this.phonenumber.replace(/\s+/g, "");
        data.phonenumberFormat = this.phonenumber;
      }
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
  //confirm pass
  // if (data.password)
  if (!this.isConfirmPassValid || !this.confirmPassword) {
    this.confirmPasswordError = this.$t(
      "account.messages.confirmPasswordWrong"
    );
  } else data.password_confirm = this.confirmPassword;

  if (!data.phonenumber && !this.isRegisterWithEmail) {
    document.getElementById("phonenumber").focus();
    return;
  }
  if (!data.email && this.isRegisterWithEmail) {
    document.getElementById("email").focus();
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

  //register

  let registerData = await $dispatch("User/registerGetVerifyCode", data);
  if (registerData && registerData.success) {
    this.$router.push({ name: "account-verifyCode", query: data });
  } else {
    if (registerData && registerData.statusCode === 501) {
      this.inputError = this.inputError = this.$t(
        "account.messages.accountExist"
      );
    }
  }
}

function selectCountry(e) {
  this.countryCode = e.iso2;
  let keyCode = document.getElementsByClassName("vti__country-code")[0];
  keyCode.innerHTML = ` ${e.name}`;
}

//cyclelife
function created() {
  if (this.$route.query.phonenumber) {
    this.isRegisterWithEmail = false;
    this.phonenumber = this.$route.query.phonenumberFormat;
  } else if (this.$route.query.email) {
    this.isRegisterWithEmail = true;
    this.email = this.$route.query.email;
  }
}

function mounted() {
  if (this.isRegisterWithEmail) document.getElementById("email").focus();
  else document.getElementById("phonenumber").focus();
}
</script>

<style lang="scss">
.selectCountryBox {
  position: relative;
  margin-top: 12px;
  .country-label {
    position: absolute;
    top: -25px;
    left: -3px;
  }
}
#selectCounty {
  height: 55px;
  .vti__dropdown {
    width: 100%;

    .vti__dropdown-arrow {
      position: absolute;
      right: 18px;
    }

    .vti__country-code {
      font-size: 1rem;
    }

    .vti__dropdown-list {
      width: 100%;
      min-height: 200px !important;
    }
  }
  input {
    display: none;
  }
}
</style>
