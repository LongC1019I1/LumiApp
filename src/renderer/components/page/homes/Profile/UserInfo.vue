<template>
  <div class="userInfo w-50">
    <div>
      <div class="avata">
        <img :src="avatar||'static/img/userDefault.png'" alt>
        <div class="avata-icon c-p">
          <label for="file-input" class="c-p">
            <i class="mdi mdi-camera"></i>
          </label>
          <input
            id="file-input"
            class="d-none"
            accept="image/*"
            ref="file"
            v-on:change="changeAvatar"
            type="file"
          >
        </div>
      </div>
    </div>
    <div role="form" class="mt-5">
      <!-- name -->
      <h6>
        <strong>{{$t('profile.text.name')}}</strong>
      </h6>
      <base-input
        inputID="name"
        type="text"
        :placeholder="$t('profile.text.name')"
        :class="{'input-error':nameError}"
        v-model="name"
        maxlength="35"
        @input="nameError=''"
        @onEnter="submit"
      ></base-input>
      <span class="text-error">&nbsp;{{ nameError }}</span>
      <!-- date -->
      <h6>
        <strong>{{$t('profile.text.createdAt')}}</strong>
      </h6>
      <base-input
        inputID="name"
        type="text"
        :value="userInfo.created_at?timer(userInfo.created_at*1000):'error'"
        disabled
      ></base-input>
      <span>&nbsp;</span>
      <!-- email -->
      <h6>
        <strong>{{$t('profile.text.email')}}</strong>
      </h6>
      <base-input v-if="userInfo.verify_email" :value="userInfo.email" disabled></base-input>
      <base-input
        v-else
        inputID="email"
        v-model="email"
        :class="{'input-error':!isEmailValid||emailError}"
        placeholder="Email"
        addon-left-icon="mdi mdi-email"
        maxlength="30"
        type="text"
        @blur="checkEmailInput"
        @input="checkEmailInput"
        @onEnter="submit"
      />
      <span class="text-error">&nbsp;{{ emailError }}</span>
      <!-- phonenumber -->
      <h6>
        <strong>{{$t('profile.text.phoneNumber')}}</strong>
      </h6>
      <base-input v-if="userInfo.verify_phone" :value="userInfo.phone" disabled></base-input>
      <vue-tel-input
        v-else
        inputId="phonenumber"
        :wrapperClasses="`form-group input-group ${isPhoneValid&&!phoneError?'':'input-error'}`"
        v-model="phonenumber"
        validCharactersOnly
        inputClasses="form-control"
        defaultCountry="vn"
        :maxLen="15"
        :placeholder="$t('account.input_text.phone')"
        @blur="isPhoneValid?phoneError='':''"
        @input="checkPhoneInput"
        @keyup.native.enter="submit"
      />
      <span class="text-error">&nbsp;{{ phoneError }}</span>
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
    <modal
      :show.sync="confirmVerifyCodeModal"
      :showClose="false"
      :backdropClick="false"
      class="overflow-hidden"
      modalClasses="modal-input"
    >
      <div class="lumi-input text-center">
        <h5 class="text-center">{{this.$t('profile.message.enterVerifyCode')}}</h5>
        <base-input
          inputID="verifyCode"
          class="mt-3"
          type="number"
          :class="{'input-error':verifyCodeError}"
          :placeholder="this.$t('profile.text.verifyCode')"
          @input="checkVerifyCode"
          maxlength="15"
          v-model="verifyCode"
        />
        <span class="text-error">{{ verifyCodeError }}&nbsp;</span>
      </div>
      <template slot="footer">
        <base-button
          size="sm"
          type="primary"
          @click="confirmVerifyCode"
        >{{this.$t("confirm")}}</base-button>
        <base-button size="sm" type="primary" @click="submit">{{this.$t("profile.button.reSend")}}</base-button>
        <base-button
          size="sm"
          type="primary"
          @click="confirmVerifyCodeModal=false;verifyCodeError='', verifyCode=''"
        >{{this.$t("cancel")}}</base-button>
      </template>
    </modal>
  </div>
</template>

<script>
import { checkVerifyCode } from "../../account/function";
export default {
  name: "profile-info",
  data() {
    return {
      isImgChange: false,
      confirmVerifyCodeModal: false,
      verifyCode: "",
      nameError: "",
      emailError: "",
      phoneError: "",
      verifyCodeError: "",
      isEmailValid: true,
      isPhoneValid: true,
      userInfo: $state.Customer.customerData,
      name: $state.Customer.customerData.name,
      avatar: $state.Customer.customerData.avatar,
      email: $state.Customer.customerData.verify_email
        ? $state.Customer.customerData.email
        : "",
      phonenumber: $state.Customer.customerData.verify_phone
        ? $state.Customer.customerData.phone
        : ""
    };
  },
  methods: {
    cancel,
    timer: data => window.timer(data, "DD.MM.YYYY"),
    checkPhoneInput,
    checkEmailInput,
    checkVerifyCode,
    confirmVerifyCode,
    changeAvatar,
    submit
  }
};
function cancel() {
  this.isImgChange = false;
  this.name = this.userInfo.name;
  this.avatar = this.userInfo.avatar;
  this.email = this.userInfo.email;
  this.phonenumber = this.userInfo.phonenumber;
  this.verifyCode = "";
  this.nameError = "";
  this.emailError = "";
  this.phoneError = "";
  this.verifyCodeError = "";
  this.isEmailValid = true;
  this.isPhoneValid = true;
}
async function submit() {
  let data = {};
  if (!this.name || !this.name.trim()) {
    document.getElementById("name").focus();
    this.nameError = this.$t("profile.message.enterName");
    return;
  }
  data.name = this.name;
  if (this.email && !this.userInfo.verify_email) {
    if (!this.isEmailValid) {
      document.getElementById("email").focus();
      this.emailError = this.$t("profile.message.emailInvalid");
      return;
    }
    data.email = this.email;
  }
  if (this.phonenumber && !this.userInfo.verify_phone) {
    if (!this.isPhoneValid) {
      document.getElementById("phonenumber").focus();
      this.phoneError = this.$t("profile.message.phoneNumberInvalid");
      return;
    }
    data.phonenumber = this.phonenumber.replace(/\s+/g, "");
  }

  if (this.isImgChange) {
    let files = document.getElementById("file-input").files[0];
    let uploadFileResponse = await $dispatch($api.Media.uploadFile, {
      files
    });
    if (uploadFileResponse && uploadFileResponse.success)
      this.avatar = uploadFileResponse.data.files[0];
    data.avatar = this.avatar;
  }

  let updateInfoResponse = await $dispatch($api.Customer.updateProfile, data);
  if (updateInfoResponse && updateInfoResponse.success) {
    if (data.phonenumber || data.email) {
      this.confirmVerifyCodeModal = true;
      return;
    }
    $alertify.success(this.$t("profile.message.updateSuccess"));
  } else {
    if (data.email) {
      document.getElementById("email").focus();
      this.emailError = this.$t("profile.message.emailExist");
      return;
    }
    if (data.phonenumber) {
      document.getElementById("phonenumber").focus();
      this.phoneError = this.$t("profile.message.phoneExist");
      return;
    }
  }
}

async function confirmVerifyCode() {
  let data = {
    verify_code: this.verifyCode
  };
  if (this.phonenumber && !this.userInfo.verify_phone)
    data.phone = this.phonenumber.replace(/\s+/g, "");
  if (this.email && !this.userInfo.verify_email) data.email = this.email;
  if (!this.verifyCode) {
    document.getElementById("verifyCode").focus();
    this.verifyCodeError = this.$t("profile.message.pleaseEnterVerifyCode");
    return;
  }
  let confirmVerifyCodeResponse = await $dispatch(
    "Customer/updateProfileConfirm",
    data
  );
  if (confirmVerifyCodeResponse && confirmVerifyCodeResponse.success) {
    $alertify.success(this.$t("profile.message.updateSuccess"));
    this.confirmVerifyCodeModal = false;
  } else {
    // this.verifyCodeError = confirmVerifyCodeResponse.message;
    this.verifyCodeError = this.$t("profile.message.verifyCodeInvalid");
    document.getElementById("verifyCode").focus();
    return;
  }
}

function checkEmailInput() {
  if (this.email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.isEmailValid = re.test(this.email);
    if (this.isEmailValid) this.emailError = "";
    return;
  }
  this.isEmailValid = true;
  this.emailError = "";
}

function checkPhoneInput(string, { number, isValid, country } = {}) {
  if (string && string.trim()) {
    this.isPhoneValid = isValid;
    if (number.international) this.phonenumber = number.international;
    else this.phonenumber = "";
    if (this.isPhoneValid) this.phoneError = "";
    return;
  }
  this.phonenumber = string.trim();
  this.isPhoneValid = true;
  this.phoneError = "";
}

function changeAvatar(e) {
  this.isImgChange = true;
  let reader = new FileReader();
  reader.onload = e => {
    this.avatar = e.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
  // submit.call(this, "avatar");
}
</script>

<style lang="scss">
.profile {
  .userInfo {
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    button.btn {
      height: auto;
      padding: 0.25rem 1rem;
      margin-top: 1rem;
      border-radius: 0.5rem;
    }
    .modal {
      background-color: transparent;
      top: -200px;
      .form-group {
        width: 70%;
        margin: auto;
        border-radius: 0.5rem;
        border: none;
        input.form-control {
          border-radius: 0.5rem;
          font-size: 1rem;
          height: 2.5rem;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      }
      .modal-footer {
        padding: 0px;
        button {
          min-width: 33.33% !important;
        }
      }
    }
    .avata {
      height: 200px;
      position: relative;
      width: 200px;
      border-radius: 50%;
      margin: 0 auto;
      text-align: center;
      img {
        min-height: 100%;
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
      .avata-icon {
        label {
          i {
            position: relative;
            bottom: 4px;
          }
          font-size: 1.5rem;
        }
        position: relative;
        bottom: 35px;
        left: 60px;
        color: white;
        cursor: pointer;
        height: 2rem;
        width: 2rem;
        border-radius: 50%;
        margin: 0 auto;
        background-color: rgba(111, 111, 111, 0.7);
        &:hover {
          background-color: rgba(111, 111, 111, 0.8);
          color: rgb(182, 182, 182);
        }
      }
    }
  }
}
</style>
