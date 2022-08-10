<template>
  <modal-icon :show.sync="modalVerify"
              :showClose="false"
              class="input-password"
              modalClasses="modal-input" footerClasses="p-0">
    <h5 class="modal-title text-center mb-3">{{ $t('homeConfig.text.warnning') }} </h5>

    <div class="mx-auto pb-3" style="width: 500px">{{ $t('homeConfig.text.confirm-verify-code') }}</div>
    <base-input
        class="model-password"
        inputID="password"
        :class="[{'input-error':verifyError||!isVerifyValid}, verify.length > 0 ?  'show-remove-pass' : '' ]"
        :placeholder="$t('homeConfig.text.verify-code')"
        addon-left-icon="mdi mdi-key"
        addon-right-icon="mdi mdi-close"
        @rightIconClick="verify = ''; verifyError = ''; isVerifyValid = true "
        maxlength="15"
        v-model="verify"
        @blur="checkVerifyInput"
        @input="checkVerifyInput"
        @keyup.enter="deleteHome"
    />
    <span
        v-show="verifyError"
        class="password-error"
    >{{ verifyError }}</span>
    <template slot="footer">
      <base-button @click="deleteHome">Xác nhận</base-button>
      <base-button @click="$emit('closeModal'); verify = ''; verifyError = '' ">
        Huỷ
      </base-button>
    </template>
  </modal-icon>
</template>

<script>
import ModalIcon from "../../../../base/element/ModalIcon";
import {md5} from "../../../account/function";

export default {
  name: "ModalVerifyCode",

  props: {
    modalVerify: {
      type: Boolean,
      default: false
    },
    homeInfo: {
      type: Object
    }
  },

  data() {
    return {
      verify: "",
      isVerifyValid: true,
      inputError: "",
      verifyError: ""
    }
  },

  methods: {
    deleteHome,
    checkVerifyInput
  },

  components: {
    ModalIcon
  }
}


function checkVerifyInput() {
  this.verify = this.verify.replace(/\s+/g, "");
  this.isVerifyValid =  this.verify.length > 0;
  if (this.isVerifyValid) this.verifyError = "";
}

async function deleteHome() {

    await $dispatch($api.Home.deleteHomeConfirm, {
          home_id: this.homeInfo.id,
          verify_code: this.verify
        })
        .then(result => {

          if (result.success == false) {
              this.verifyError = this.$t("homes.text.verifyCodeNotCorrect");

          }

          if (result.success == true) {
            this.$emit('closeModal')
            $alertify.success(this.$t("homeConfig.delete-home-success"))
          }

        });
    this.verify = '';

    await $dispatch($api.Home.getListHomeByUserID);

}

</script>

<style scoped>

</style>
