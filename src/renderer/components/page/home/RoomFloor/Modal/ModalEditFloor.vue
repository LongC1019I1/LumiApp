<template>
  <modal
    :show.sync="isShowModalEditFloor"
    :showClose="false"
    modalClasses="modal-input"
    footerClasses="p-0"
    @close="closeModal"
  >
    <h5 class="text-center">{{$t('roomFloor.title.floorInfo')}}</h5>
    <div class="mt-5 mb-3">
      <base-input
        inputID="floorNameInputEdit"
        maxlength="30"
        type="text"
        :placeholder="$t('roomFloor.text.enterFloorName')"
        v-model="floorName"
        class="mb-0"
        @input="checkInput"
        :inputClasses="floorNameError?'input-error':''"
        @onEnter="condfirmEdit"
      />
      <span class="text-error">{{floorNameError}}&nbsp;</span>
    </div>
    <template slot="footer">
      <base-button
        @click="condfirmEdit"
      >{{$t('confirm')}}</base-button>
      <base-button class="ml-auto" @click="closeModal">{{$t('cancel')}}</base-button>
    </template>
  </modal>
</template>

<script>
export default {
  name: "modal-edit-floor",
  props: {
    isShowModalEditFloor: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      floorid: "",
      floorName: "",
      floorNameError: ""
    };
  },
  methods: {
    checkInput,
    condfirmEdit,
    closeModal
  },
  updated: focusInput
};

function checkInput() {
  let format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  let floorName = this.floorName.trim();
  if (!floorName)
    this.floorNameError = this.$t("roomFloor.message.pleaseEnterFloorName");
  else if (format.test(floorName))
    this.floorNameError = this.$t("roomFloor.message.floorNoSpecialCharacter");
  else this.floorNameError = "";
}

function condfirmEdit() {
  checkInput.call(this)
  if (!this.floorName.trim() || this.floorNameError) return;
  $dispatch($api.HomeConfig.updateFloor, {
    floorid: this.floorid,
    name: this.floorName.trim()
  });
  closeModal.call(this)
}

function closeModal() {
  (this.floorid = ""),
    (this.floorName = ""),
    (this.floorNameError = ""),
    this.$emit("closeModal");
}

function focusInput() {
  document.getElementById("floorNameInputEdit").focus();
}
</script>

<style scoped lang="scss">
</style>
