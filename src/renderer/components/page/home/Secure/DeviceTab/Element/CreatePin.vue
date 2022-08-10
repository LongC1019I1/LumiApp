<template>
  <div v-if="!havePin" class="create-pin mt-4">
    <p>{{ $t('secure.createNewPin') }}</p>
    <base-input type="password"
                maxlength="4"
                @keyup.enter="createPin"
                class="w-100 "
                inputID="notPinInput"
                autofocus
                @input="checkNumer"
                v-model="password"
    />

    <p>{{ $t('secure.repeatPin') }}</p>
    <base-input
        type="password"
        class="w-100 mb-5"
        maxlength="4"
        @keyup.enter="createPin"
        autofocus
        @input="checkNumer"
        v-model="confirmPassword"
    />

    <base-button @click="createPin"
                 :disabled="checkValidInput"
    >
      {{ $t('secure.createPin') }}
    </base-button>
  </div>


  <div v-else class="create-pin mt-4">
    <p>{{ $t('secure.oldPin') }}</p>
    <base-input type="password"
                maxlength="4"
                @keyup.enter="changePin"
                class="w-100 auto-focus"
                inputID="havePinInput"
                @input="checkNumer"
                v-model="password"

    />
    <p>{{ $t('secure.newPin') }}</p>
    <base-input
        type="password"
        class="w-100"
        maxlength="4"
        @keyup.enter="changePin"
        @input="checkNumer"
        v-model="confirmPassword"
    />
    <base-button class="mt-4" @click="changePin" :disabled="checkValidInput">
      {{ $t('secure.changePin') }}
    </base-button>

    <p @click="forgotPassword" class="forgot-pin">{{ $t('secure.pin.forgot-pin') }}</p>
  </div>
</template>

<script>
export default {
  name: "CreatePin",
  data() {
    return {
      password: '',
      confirmPassword: '',
      checkValidInput: true
    }
  },
  methods: {
    checkNumer,
    createPin,
    changePin,
    forgotPassword
  },
  computed: {
    havePin
  },
  mounted: focusInput,
}

function focusInput() {
  setTimeout( ()=>{
    this.havePin? document.getElementById("havePinInput").focus() :  document.getElementById("notPinInput").focus() ;
  }, 500 )
}

async function forgotPassword() {

  let confirm = await $alertify.confirm(
      {
        title: this.$t('secure.notification'),
        text: this.$t('secure.pin.sentPinInPassword'),
        showCancelButton: true,
        confirmButtonText: this.$t("confirm"),
        cancelButtonText: this.$t("cancel")
      })

  if (confirm.value) {
    await $dispatch('PinCode/forgotPin')

    await $dispatch($api.HomeConfig.getListHomeConfigByHomeID, {
      homeid: Number(this.$route.params.homeID)
    });
  }
}

function havePin() {
  let users = $state.HomeConfig.users
  let pin = users.find(user => user.pin  && user.pin_code )
  return !!pin
}

function checkNumer() {
  this.password = this.password.replace(/[^0-9]+/g, "");
  this.confirmPassword = this.confirmPassword.replace(/[^0-9]+/g, "");

  if (this.confirmPassword === '' || this.confirmPassword.length < 4) {
    this.checkValidInput = true
  } else if (this.password === '' || this.password.length < 4) {
    this.checkValidInput = true
  } else {
    this.checkValidInput = false
  }

}

 function createPin() {
  if (this.password !== this.confirmPassword || this.password === '' || this.confirmPassword === '') {
    $alertify.custom({
      title: this.$t('secure.notification'),
      text: this.$t('secure.repeatPinNotTue')
    })
  } else {
    return $dispatch('PinCode/updatePinCode', {is: '1', pin: this.password}).then( async result => {
      if (result.success) {
        this.password = ''
        this.confirmPassword = ''
        $alertify.success(this.$t('secure.pin.create-pin-success'))

        //update to see new pincode
     await $dispatch($api.HomeConfig.getListHomeConfigByHomeID, {
          homeid: Number(this.$route.params.homeID)
        });
        this.checkValidInput = true
      }
    })
  }
}


function changePin() {
  let homeid = this.$route.params.homeID;

  let myPin = $state.HomeConfig.users.find(user => user.pin && user.pin_code)

  if (this.password !== (myPin && myPin.pin)) {
    return $alertify.custom({
      title: this.$t('secure.notification'),
      text: this.$t('secure.pin.old-pin-not-correct')
    })
  } else {

    return $dispatch('PinCode/updateNewPinCode', {is: '0', oldpin: this.password, newpin: this.confirmPassword})
        .then(async result => {
          if (result.success) {
            this.password = ''
            this.confirmPassword = ''
            $alertify.success(this.$t('secure.pin.change-pin-success'))

            //update to see new pincode
           await $dispatch($api.HomeConfig.getListHomeConfigByHomeID, {
              homeid: Number(this.$route.params.homeID)
            });
            this.checkValidInput = true
          }
        })
  }
}
</script>

<style scoped>

</style>
