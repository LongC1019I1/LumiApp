<template>

  <modal
      :show.sync="isShowModal"
      :showClose="false"
      :modalClasses="{'modal-full-height': userType === 'guest' || userType === 'supporter','modal-input modal-list-device modal-min-height  lumi-input': userType || !userType }"
      bodyClasses="p-0"
      :backdropClick="false"
      @close="$emit('closeModal')"
      id="addUserPermission"
  >

    <div slot="header" class="w-100 text-center">
      <span>{{ $t('permission.text.add-account') }}</span>
      <i class="pull-right c-p mdi mdi-window-close pull-right" @click="setDefault"></i>
    </div>

    <div class="modal-body">
      <base-checkbox
          v-if="!haveAccount"
          v-model="isLoginWithEmail"
          class="mb-3"
          @onEnter="isLoginWithEmail=!isLoginWithEmail"
      >
        {{ $t('permission.text.share-email') }}
      </base-checkbox>
      <p v-else>
        {{ $t('permission.text.account') }}
      </p>
      <base-input
          inputID="email"
          v-if="isLoginWithEmail"
          v-model="email"
          class="lumi-input"
          :class="{'input-error':!isEmailValid||inputError}"
          placeholder="Email"
          addon-left-icon="mdi mdi-email"
          maxlength="30"
          type="text"
          :disabled="!!haveAccount"
          @blur="email?checkEmail():''"
          @input="checkEmail"
          @keyup.enter="addUser"
      />
      <!-- phonenumber -->
      <vue-tel-input
          v-else
          inputId="phonenumber"
          :wrapperClasses="`form-group lumi-input input-group ${isPhoneValid&&!inputError?'':'input-error'}`"
          v-model="phonenumber"
          inputClasses="form-control "
          defaultCountry="vn"
          validCharactersOnly
          autofocus
          :maxLen="15"
          :placeholder="$t('account.input_text.phone')"
          :disabled="!!haveAccount"
          @blur="phonenumber&&isPhoneValid?inputError='':''"
          @input="checkPhone"
          @keyup.native.enter="addUser"
      />
      <span v-show="inputError" class="text-error">{{ inputError }}&nbsp;</span>
      <p class="mt-3 ml-1"> {{ $t('permission.text.usertype') }}</p>
      <v-select
          class="mb-3 header-select"
          :options="selectUserOption"
          :reduce="(label) => label.value"
          label="label"
          :clearable="false"
          :searchable="false"
          :placeholder="$t('permission.text.choose-role')"
          v-model="userType"

      >
        <template #open-indicator>
        <span v-bind="selectAttributes">
          <i class="mdi mdi-menu-down"></i>
        </span>
        </template>
      </v-select>
      <span v-show="inputRoleEror !== '' && userType ===''" class="text-error">{{ inputRoleEror }}&nbsp;</span>


      <div v-if="userType === 'guest' || userType === 'supporter'">

        <p class="mt-3 ml-1"> {{ $t('permission.text.expired-time') }}</p>

        <date-picker
            prefix-class="pickerPermission mx"
            v-model="time"
            valueType="format"
            value-type="DD/MM/YYYY"
            format="DD-MM-YYYY"
        />
      </div>
    </div>

    <template slot="footer">
      <div class="btn btn-default" @click="addUser">{{ $t('save') }}</div>
      <div class="btn btn-default" @click="setDefault">{{ $t('cancel') }}</div>
    </template>

  </modal>

</template>

<script>

import {
  checkPhone,
  checkEmail,
} from "../../../account/function";
import account from "../../../../../router/account";
import {ROLE, USER_TYPE} from "../../../../../plugins/variableConst";


export default {
  name: "AddUser",
  props: {
    isShowModal: {
      type: Boolean,
      default: false
    },
    haveAccount: [Object, Array, String]
  },
  data() {
    return {
      isLoginWithEmail: false,
      updateUser: false,
      email: "",
      phonenumber: "",
      isPhoneValid: true,
      isEmailValid: true,
      inputError: "",
      inputRoleEror: "",
      userType: '',
      time: timer(new Date().getTime(), "DD-MM-YYYY"),
      selectUserOption: [
        {
          label: this.$t('permission.role.admin'),
          value: 'admin'
        },
        {
          label: this.$t('permission.role.usernormal'),
          value: 'user'
        },
        {
          label: this.$t('permission.role.guest'),
          value: 'guest'
        },
        {
          label: this.$t('permission.role.supporter'),
          value: 'supporter'
        },
      ],
      selectAttributes: {
        ref: "openIndicator",
        role: "presentation",
        class: "vs__open-indicator",
      },
    }
  },

  watch: {
    haveAccount(haveAccount) {

      console.log('haveAccount', haveAccount)
      if (haveAccount) {
        console.log('accountEdit', haveAccount)

        if (haveAccount.email) {
          this.isLoginWithEmail = true
        }

        haveAccount.email ? this.email = haveAccount.email : ''
        haveAccount.phone ? this.phonenumber = haveAccount.phone : ''
        haveAccount.expire_time ? this.time = timer(haveAccount.expire_time * 1000, "DD-MM-YYYY") : ''

        haveAccount.admin === ROLE.ADMIN ? this.userType = 'admin' :
            haveAccount.user_type === USER_TYPE.GUEST ? this.userType = 'guest' :
                haveAccount.user_type === USER_TYPE.SUPPORTER ? this.userType = 'supporter' : this.userType = 'user'

        this.updateUser = true
      } else {
        this.isLoginWithEmail = false;
        this.updateUser = false
      }
    }
  },
  methods: {
    checkPhone,
    checkEmail,
    addUser,
    setDefault
  },
  updated() {
    if (this.isLoginWithEmail) document.getElementById("email").focus();
    else document.getElementById("phonenumber").focus();
  },
  mounted() {
    if (this.isLoginWithEmail) document.getElementById("email").focus();
    else document.getElementById("phonenumber").focus();
  }
}


async function addUser() {

  //email
  if (this.isLoginWithEmail) {
    if (!this.email) {
      this.inputError = this.$t("account.messages.enterEmail");
    } else {
      if (!this.isEmailValid) {
        this.inputError = this.$t("account.messages.emailInvalid");
      }
    }
  }
  //check Phonenumber
  else {
    if (!this.phonenumber) {
      this.inputError = this.$t("account.messages.enterPhone");
    } else {
      if (!this.isPhoneValid) {
        this.inputError = this.$t("account.messages.phoneNumberInvalid");
      } else this.phonenumber = this.phonenumber.replace(/\s+/g, "");
    }
  }

  if (this.userType === ''){
    this.inputRoleEror = this.$t("permission.text.inputRole");
    return
  }


  if (!this.isEmailValid && this.isLoginWithEmail) {
    document.getElementById("email").focus();
    return;
  }
  if (!this.isPhoneValid && !this.isLoginWithEmail) {
    document.getElementById("phonenumber").focus();
    return;
  }



  // Covner date to milisecond
  let arrDate = this.time.split("-");
  let date = [arrDate[2], arrDate[1] - 1, arrDate[0]]

  let time = (new Date(...date).getTime()) / 1000;
  let userType = this.userType

  if (!!this.haveAccount) {
    await $dispatch('User/addPermission', {
      userid: this.haveAccount.userid,
      userType: userType,
      expire_time: time,
      update: true
    })
  } else {
    let userid = this.isLoginWithEmail ? await $dispatch('Customer/getUserId', {email: this.email}) : await $dispatch('Customer/getUserId', {phone: this.phonenumber})
    if (userid) {
      await $dispatch('User/addPermission', {userid: userid, userType: userType, expire_time: time})
    }
  }
  this.isLoginWithEmail = false
  this.inputRoleEror = ''
  await $dispatch('HomeConfig/getListHomeConfigByHomeIDNoAnimation', {
    homeid: Number(this.$route.params.homeID)
  });
  await $dispatch('HomeConfig/getListHomeConfigByHomeIDNoAnimation', {
    homeid: Number(this.$route.params.homeID)
  });
  this.$emit('closeModal')
}

function setDefault(){
  this.email = ""
  this.phonenumber = ""
  this.inputError = ""
  this.userType = ''
  this.inputRoleEror = ""
  this.isLoginWithEmail = false
  this.$emit('closeModal')
}
</script>

<style scoped>

</style>
