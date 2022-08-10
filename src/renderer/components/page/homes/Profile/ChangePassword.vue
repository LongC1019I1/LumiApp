<template>
  <div class="mt-5 change-password mr-3 w-50">
    <div role="form">
      <!-- oldPassowrd -->
      <h6>
        <strong>{{$t('profile.text.oldPassword')}}</strong>
      </h6>
      <base-input
        inputID="oldPassword"
        :type="isShowOldPassword?'text':'password'"
        :placeholder="$t('profile.text.oldPassword')"
        addon-right-icon="mdi mdi-close"
        @rightIconClick="oldPassword=''"
        :class="{'input-error':oldPasswordError}"
        v-model="oldPassword"
        maxlength="15"
        @input="checkOldPassInput"
        addon-left-icon="mdi mdi-lock"
        @onEnter="submit"
      ></base-input>
      <span class="text-error">&nbsp;{{oldPasswordError}}</span>
      <!-- password -->
      <h6>
        <strong>{{$t('profile.text.newPassword')}}</strong>
      </h6>
      <base-input
        inputID="password"
        :type="isShowPassword?'text':'password'"
        :placeholder="$t('profile.text.newPassword')"
        addon-right-icon="mdi mdi-close"
        @rightIconClick="password=''"
        :class="{'input-error':!isPassValid||passwordError}"
        v-model="password"
        maxlength="15"
        addon-left-icon="mdi mdi-lock"
        @input="checkPassInput"
        @onEnter="submit"
      ></base-input>
      <span class="text-error">&nbsp;{{passwordError}}</span>
      <!-- confirmpass -->
      <h6>
        <strong>{{$t('profile.text.confirmPassword')}}</strong>
      </h6>
      <base-input
        inputID="confirmPassword"
        :type="isShowConfirmPassword?'text':'password'"
        :placeholder="$t('profile.text.confirmPassword')"
        addon-right-icon="mdi mdi-close"
        @rightIconClick="confirmPassword=''"
        :class="{'input-error':!isConfirmPassValid||confirmPasswordError}"
        v-model="confirmPassword"
        maxlength="15"
        addon-left-icon="mdi mdi-lock"
        @input="checkConfirmPassInput"
        @onEnter="submit"
      ></base-input>
      <span class="text-error">&nbsp;{{confirmPasswordError}}</span>
      <base-button
        size="sm"
        type="secondary"
        class="pull-right"
        @click="cancel"
      >{{$t('cancel')}}</base-button>
      <base-button
        size="sm"
        type="primary"
        class="pull-right mr-2"
        @click="submit"
      >{{$t('save')}}</base-button>
    </div>
  </div>
</template>

<script>
import { checkConfirmPassInput, checkPassInput } from "../../account/function";
export default {
  name: "profile-changepassword",
  data() {
    return {
      isShowOldPassword: true,
      isShowPassword: true,
      isShowConfirmPassword: true,
      isPassValid: true,
      isConfirmPassValid: true,
      oldPasswordError: "",
      passwordError: "",
      confirmPasswordError: "",
      oldPassword: "",
      password: "",
      confirmPassword: ""
    };
  },
  methods: {
    checkConfirmPassInput,
    checkPassInput,
    checkOldPassInput,
    submit,
    cancel
  },
  mounted() {
    document.getElementById("oldPassword").focus();
  }
};

function checkOldPassInput() {
  this.oldPassword = this.oldPassword.replace(/\s+/g, "");
  // this.isPassValid = 6 <= this.password.length && this.password.length <= 15;
  // if (this.isPassValid) this.passwordError = "";
}

async function submit() {
  let data = {};
  //Old password
  if (!this.oldPassword) {
    this.oldPasswordError = this.$t("account.messages.enterYourOldPassword");
  } else {
    data.password_old = this.oldPassword;
  }
  //password
  if (!this.password) {
    this.passwordError = this.$t("account.messages.enterYourNewPassword");
  } else {
    if (!this.isPassValid) {
      this.passwordError = this.$t("account.messages.passwordInvalid");
    } else data.password_new = this.password;
  }
  if (!this.confirmPassword) {
    this.confirmPasswordError = this.$t(
      "account.messages.enterYourConfirmPassword"
    );
  }
  //confirm pass
  if (data.password_new)
    if (!this.isConfirmPassValid || !this.confirmPassword) {
      if (!this.confirmPasswordError)
        this.confirmPasswordError = this.$t(
          "account.messages.confirmPasswordWrong"
        );
    } else data.password_retype = this.confirmPassword;

  if (!data.password_old) {
    document.getElementById("oldPassword").focus();
    return;
  }
  if (!data.password_new) {
    document.getElementById("password").focus();
    return;
  }
  if (!data.password_retype) {
    document.getElementById("confirmPassword").focus();
    return;
  }
  let changePasswordResponse = await $dispatch($api.Customer.changePass, data);
  if (changePasswordResponse && changePasswordResponse.success) {
    await $alertify.confirm({
      title: this.$t("notify.notifyDefautlTitle"),
      text: this.$t("account.messages.successResetpass")
    });
    let logoutResponse = await $dispatch($api.User.logout);
    if (logoutResponse && logoutResponse.success) {
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("password");
      sessionStorage.removeItem("access_token");
      restart();
      this.$router.push({ name: "account-login" });
    } else $alertify.error(logoutResponse.message);
  } else {
    if(changePasswordResponse && changePasswordResponse.statusCode===501){
      this.oldPasswordError = this.$t("profile.message.wrongPassword");
      await $alertify.confirm({
        title: this.$t("notify.notifyDefautlTitle"),
        text: this.$t("profile.message.wrongPassword")
      });
      document.getElementById("oldPassword").focus();
    }
  }
}

function cancel() {
  // this.isShowOldPassword = false;
  // this.isShowPassword = false;
  // this.isShowConfirmPassword = false;
  this.isPassValid = true;
  this.isConfirmPassValid = true;
  this.oldPasswordError = "";
  this.passwordError = "";
  this.confirmPasswordError = "";
  this.oldPassword = "";
  this.password = "";
  this.confirmPassword = "";
}
</script>

<style lang="scss">
.profile {
  .change-password {
    position: relative;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    button.btn {
      height: auto;
      padding: 0.25rem 1rem;
      margin-top: 1rem;
      border-radius: 0.5rem;
    }
  }
}
</style>
