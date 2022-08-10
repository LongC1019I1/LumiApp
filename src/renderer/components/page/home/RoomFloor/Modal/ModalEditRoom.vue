<template>
  <modal
    :show.sync="isShowModalEditRoom"
    :showClose="false"
    modalClasses="modal-input"
    footerClasses="p-0"
    @close="closeModal"
  >
    <h5 class="text-center">{{$t('roomFloor.title.roomInfo')}}</h5>
    <div class="mt-5 mb-3">
      <base-input
        inputID="roomNameInputEdit"
        maxlength="30"
        type="text"
        :placeholder="$t('roomFloor.text.enterRoomName')"
        v-model="roomName"
        class="mb-0"
        @input="checkInput"
        :inputClasses="roomNameError?'input-error':''"
        @onEnter="condfirmEdit"
      />
      <span class="text-error">{{roomNameError}}&nbsp;</span>
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
  name: "modal-add-room",
  props: {
    isShowModalEditRoom: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      roomid: "",
      roomName: "",
      roomNameError: ""
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
  let roomName = this.roomName.trim();
  if (!roomName)
    this.roomNameError = this.$t("roomFloor.message.pleaseEnterRoomName");
  else if (format.test(roomName))
    this.roomNameError = this.$t("roomFloor.message.roomNoSpecialCharacter");
  else this.roomNameError = "";
}

function condfirmEdit() {
  checkInput.call(this)
  if (!this.roomName.trim() || this.roomNameError) return;
  $dispatch($api.HomeConfig.updateRoom, {
    roomid: this.roomid,
    updateData: { name: this.roomName.trim() }
  });
  closeModal.call(this)
}

function closeModal() {
  (this.roomid = ""),
    (this.roomName = ""),
    (this.roomNameError = ""),
    this.$emit("closeModal");
}

function focusInput() {
  document.getElementById("roomNameInputEdit").focus();
}
</script>

<style scoped lang="scss">
</style>
