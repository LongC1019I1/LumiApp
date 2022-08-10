<template>
  <card id="cameraList" headerClasses="p-0 mb-3" class="border-radius-3 h-100">
    <template>
      <div
          v-for="(list,index) in listSecure"
          :key="index"
          class="camera px-2 mb-3 c-p"
          :class="{
          active: selectedCamera === list.value,
        }"
      >
        <div
            class="name text-overflow-hidden px-2"
            @click="$emit('updateSelectedCamera', list.value)"
        >
          <div class="w-50 text-overflow-hidden">{{  list.value === 1 ? satePinName :list.name }}</div>
        </div>
      </div>
    </template>
  </card>
</template>

<script>
export default {
  name: "camera-list",
  props: {
    viewName: [String, Boolean],
    selectedCamera: [String, Boolean, Number],
  },
  data() {
    return {
      listSecure:[
        {
          name: '',
          value: 1
        },
        {
          name: this.$t('secure.deviceSecure'),
          value: 2
        },
        {
          name: this.$t('secure.deviceIsProtected'),
          value: 3
        }
      ]
    }
  },
  computed: {
    listCamera,
    listCameraHasLicence,
    havePin,
    satePinName
  },
};

function listCamera() {
  return ''
}

function havePin() {
  let users = $state.HomeConfig.users
  let pin = users.find(user => user.pin && user.pin_code)
  return !!pin
}

function satePinName(){
  return $state.HomeConfig.users.find(user => user.pin  && user.pin_code) ? this.$t('secure.changePin') : this.$t('secure.createPin')
}

function listCameraHasLicence() {
  return $state.HomeConfig.cameras.filter((item) => item.type == 2);
}
</script>

<style lang="scss">
</style>
