<template>
  <modal-icon :show.sync="modalDelete"
              :showClose="false"
              class="input-password"
              modalClasses="modal-input modal-delete" footerClasses="p-0">
    <h5 class="modal-title text-center mb-3">{{ $t('permission.text.pass-login') }}</h5>
    <base-input
        class="model-password"
        inputID="password"
        :type="isShowPassword?'text':'password'"
        :class="[{'input-error':passwordError||!isPassValid}, password.length > 0 ?  'show-remove-pass' : '' ]"
        :placeholder="$t('account.input_text.password')"
        :addon-right-icon="password?isShowPassword?'mdi mdi-eye':'mdi mdi-eye-off':''"
        @rightIconClick="isShowPassword=!isShowPassword"
        maxlength="15"
        v-model="password"
        @blur="checkPassInput"
        @input="checkPassInput"
        @keyup.enter="deleteElement"
    />
    <span
        v-show="passwordError"
        class="password-error password-invalid "
        v-if="passwordError.includes($t('account.messages.passwordInvalid'))"

    >{{ passwordError }}</span>

    <span
        v-show="passwordError"
        class="password-error "
        v-else
    >{{ passwordError }}</span>
    <template slot="footer">
      <base-button @click="deleteElement">Xác nhận</base-button>
      <base-button @click="$emit('closeModal'); passwordError = ''; password = ''; isPassValid = true  ">
        Huỷ
      </base-button>
    </template>
  </modal-icon>
</template>

<script>
import {md5} from "../../page/account/function";
import ModalIcon from "../element/ModalIcon";

export default {
  name: "ModalDeleteHome",
  props: {
    modalDelete: {
      type: Boolean,
      default: false
    },
    homeInfo: {
      type: Object
    }
  },

  data() {
    return {
      isShowPassword: false,
      password: "",
      isPassValid: true,
      inputError: "",
      passwordError: ""
    }
  },

  methods: {
    deleteElement,
    checkPassInput
  },
  mounted() {
    focusInput
  },
  updated() {
    focusInput
    },
  components: {
    ModalIcon
  }
}

function focusInput() {

return  document.getElementById("password").focus();
  // document.getElementsByClassName("sixDigitPassword").focus();
}

function checkPassInput() {
  this.password = this.password.replace(/\s+/g, "");
  this.isPassValid = 6 <= this.password.length && this.password.length <= 15;
  if (this.isPassValid) this.passwordError = "";
}

function deleteElement() {

  if (!this.password) {
    return (this.passwordError = this.$t("account.messages.enterYourPassword"));
  } else {
    if (!this.isPassValid) {
      return (this.passwordError = this.$t("account.messages.passwordInvalid") + ' ' + this.$t("account.messages.limitValid"))
    }

    if (md5(this.password) === localStorage.getItem("password")) {
      this.passwordError = '';
      this.password = '';
      this.isPassValid = true
      this.$emit('changeStatus')
    } else {
      return (this.passwordError = this.$t("account.messages.wrongPassword"));
    }
  }
}
</script>

<style scoped>

</style>
