<template>
  <modal-icon :show.sync="modal"
              :showClose="false"
              class="input-password"
              modalClasses="modal-input" footerClasses="p-0">
    <h5 class="modal-title text-center mb-3">{{ $t('homeConfig.text.warnning') }}</h5>
    <div class="mx-auto p-2" style="text-align: center">{{
        $t('homeConfig.text.do-you-want-to-delete-this-home')
      }}
    </div>
    <div class="mx-auto pb-3" style="text-align: center">{{ $t('homeConfig.text.input-password-to-continue') }}</div>
    <base-input
        class="model-password"
        inputID="password"
        :class="[{'input-error':passwordError||!isPassValid}, password.length > 0 ?  'show-remove-pass' : '' ]"
        :placeholder="$t('account.input_text.password')"
        addon-left-icon="mdi mdi-lock"
        addon-right-icon="mdi mdi-close"
        @rightIconClick="password = ''; passwordError = '' "
        maxlength="15"
        v-model="password"
        @blur="checkPassInput"
        @input="checkPassInput"
        @keyup.enter="deleteHome"
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
      <base-button @click="deleteHome">Xác nhận</base-button>
      <base-button @click="$emit('closeModal'); passwordError = ''; password = ''; isPassValid = true  ">
        Huỷ
      </base-button>
    </template>
  </modal-icon>
</template>

<script>
import {md5} from "../../../account/function";
import ModalIcon from "../../../../base/element/ModalIcon";

export default {
  name: "ModalDeleteHome",


  props: {
    modal: {
      type: Boolean,
      default: false
    },
    homeInfo: {
      type: Object
    }
  },

  data() {
    return {
      password: "",
      isPassValid: true,
      inputError: "",
      passwordError: ""
    }
  },

  methods: {
    deleteHome,
    checkPassInput
  },

  components: {
    ModalIcon
  }
}

function checkPassInput() {
  this.password = this.password.replace(/\s+/g, "");
  this.isPassValid = 6 <= this.password.length && this.password.length <= 15;
  if (this.isPassValid) this.passwordError = "";
}

async function deleteHome() {

  if (!this.password) {
    return (this.passwordError = this.$t("account.messages.enterYourPassword"));
  } else {
    if (!this.isPassValid) {
      return (this.passwordError = this.$t("account.messages.passwordInvalid") + ' ' + this.$t("account.messages.limitValid"))
    }

    if (md5(this.password) == localStorage.getItem("password")) {
      this.$emit('closeModal')

      //Xoa nha
      let deleteHomeResponse = await $dispatch($api.Home.deleteHome, {
        home_id: this.homeInfo.id
      });

      if (deleteHomeResponse && deleteHomeResponse.success) {
        this.password = '';
        this.$emit('showModalVerify')

      }
    } else {
      this.password = '';
      return (this.passwordError = this.$t("account.messages.wrongPassword"));
    }
  }
}
</script>

<style scoped>

</style>
